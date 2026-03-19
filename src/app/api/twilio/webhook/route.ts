import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateTwilioSignature } from "@/lib/twilio";
import { twimlResponse, twimlEmpty, sendSms } from "@/lib/sms";
import {
  classifyInbound,
  getServiceMenu,
  SERVICE_KEYWORD_MAP,
} from "@/lib/keywords";
import { startOnboarding, handleOnboardingReply } from "@/lib/onboarding";
import { parseReply, guessServiceFromReply } from "@/lib/reply-parser";
import { recordActivity, getStreakText } from "@/lib/streaks";
import { checkEscalation } from "@/lib/escalation";

export const dynamic = "force-dynamic";

/**
 * POST /api/twilio/webhook
 *
 * Central inbound handler for all SMS messages.
 * Twilio POSTs form-encoded data: Body, From, To, MessageSid, etc.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse form data
    const text = await request.text();
    const params = Object.fromEntries(new URLSearchParams(text));
    const body = (params.Body || "").trim();
    const from = params.From || "";
    const messageSid = params.MessageSid || "";

    // 2. Validate Twilio signature
    if (!(await validateTwilioSignature(request, params))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!from || !body) {
      return twimlResponse(
        "Hmm, something went wrong. Text HELP for support."
      );
    }

    // 3. Classify the inbound message
    const classification = classifyInbound(body);

    // 4. Route based on classification
    switch (classification.type) {
      case "reserved":
        return handleReservedKeyword(from, classification.keyword);

      case "service_keyword":
        return handleServiceKeyword(from, classification.service);

      case "cancel_service":
        return handleCancelService(from, classification.serviceKeyword);

      case "reply":
        return handleReply(from, classification.body, messageSid);
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return twimlResponse(
      "Something went wrong on our end. Text HELP for support."
    );
  }
}

// ─── Handler functions ───

import type { Service } from "@/types/services";
import type { ReservedKeyword } from "@/lib/keywords";

async function handleReservedKeyword(
  phone: string,
  keyword: ReservedKeyword
): Promise<Response> {
  switch (keyword) {
    case "STOP": {
      const user = await prisma.user.findUnique({ where: { phone } });
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { status: "stopped" },
        });
        await prisma.subscription.updateMany({
          where: { userId: user.id, status: { in: ["active", "onboarding"] } },
          data: { status: "cancelled" },
        });
      }
      return twimlResponse(
        "You've been unsubscribed from all BotherMe services. We'll miss you. 💔\n\nText START anytime to come back."
      );
    }

    case "START": {
      await prisma.user.upsert({
        where: { phone },
        create: { phone, status: "active" },
        update: { status: "active" },
      });
      return twimlResponse(
        "Welcome to BotherMe! 🎉\n\nText any service keyword to subscribe. Here are some popular ones:\n\n💊 PILLS - Medication reminders\n💧 WATER - Hydration tracking\n🦷 FLOSS - Flossing streaks\n🧠 MOOD - Daily mood check\n👋 FRIENDS - Stay in touch\n\nText MENU for the full list of 50 services."
      );
    }

    case "PAUSE": {
      const user = await prisma.user.findUnique({ where: { phone } });
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { status: "paused" },
        });
      }
      return twimlResponse(
        "All texts paused. ⏸️ Your streaks and data are saved.\n\nText RESUME whenever you're ready."
      );
    }

    case "RESUME": {
      const user = await prisma.user.findUnique({ where: { phone } });
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { status: "active" },
        });
      }
      return twimlResponse(
        "Welcome back! ▶️ Your texts will resume at your next scheduled time."
      );
    }

    case "MENU":
      return twimlResponse(getServiceMenu());

    case "STATUS": {
      const user = await prisma.user.findUnique({
        where: { phone },
        include: {
          subscriptions: {
            where: { status: "active" },
            include: { streak: true },
          },
        },
      });
      if (!user || user.subscriptions.length === 0) {
        return twimlResponse(
          "You don't have any active services. Text START to get going!"
        );
      }
      let status = "Your active services:\n\n";
      for (const sub of user.subscriptions) {
        const svc = SERVICE_KEYWORD_MAP.get(sub.serviceKeyword.toUpperCase());
        const streak = sub.streak?.currentCount || 0;
        const fire = streak >= 7 ? " 🔥" : "";
        status += `${svc?.emoji || "•"} ${svc?.name || sub.serviceKeyword}`;
        if (streak > 0) status += ` — ${streak} day streak${fire}`;
        status += "\n";
      }
      return twimlResponse(status);
    }

    case "HELP":
      return twimlResponse(
        "BotherMe Help:\n\n• Text a keyword (e.g., WATER) to subscribe\n• MENU — See all services\n• STATUS — Your active subscriptions\n• PAUSE — Pause all texts\n• RESUME — Resume texts\n• CANCEL [SERVICE] — Cancel one service\n• STOP — Unsubscribe from everything\n• BILLING — Manage your subscription\n\nQuestions? Email hello@botherme.co"
      );

    case "BILLING":
      return twimlResponse(
        "Manage your billing at: https://botherme.co/billing\n\nOr email hello@botherme.co for help."
      );
  }
}

async function handleServiceKeyword(
  phone: string,
  service: Service
): Promise<Response> {
  const message = await startOnboarding(phone, service);
  return twimlResponse(message);
}

async function handleCancelService(
  phone: string,
  serviceKeyword: string
): Promise<Response> {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    return twimlResponse("You don't have an account. Text START to sign up!");
  }

  const sub = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      serviceKeyword: { equals: serviceKeyword, mode: "insensitive" },
      status: { in: ["active", "onboarding"] },
    },
  });

  if (!sub) {
    return twimlResponse(
      `You don't have an active subscription for "${serviceKeyword}". Text STATUS to see your services.`
    );
  }

  await prisma.subscription.update({
    where: { id: sub.id },
    data: { status: "cancelled" },
  });

  const svc = SERVICE_KEYWORD_MAP.get(serviceKeyword.toUpperCase());
  return twimlResponse(
    `${svc?.emoji || "✓"} ${svc?.name || serviceKeyword} has been cancelled.\n\nText the keyword again anytime to re-subscribe.`
  );
}

async function handleReply(
  phone: string,
  body: string,
  messageSid: string
): Promise<Response> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const user: any = await prisma.user.findUnique({
    where: { phone },
    include: {
      subscriptions: {
        where: { status: { in: ["active", "onboarding"] } },
        include: { streak: true },
      },
    },
  });

  if (!user || user.subscriptions.length === 0) {
    return twimlResponse(
      "Hmm, I don't recognize that. Text START to sign up, or MENU to see services."
    );
  }

  // Check for onboarding in progress
  const onboarding = user.subscriptions.find(
    (s: { status: string }) => s.status === "onboarding"
  );
  if (onboarding) {
    const service = SERVICE_KEYWORD_MAP.get(
      onboarding.serviceKeyword.toUpperCase()
    );
    if (service) {
      const result = await handleOnboardingReply(onboarding, body, service);
      return twimlResponse(result.message);
    }
  }

  // Route reply to the right subscription
  const activeSubs: any[] = user.subscriptions.filter((s: any) => s.status === "active");

  let targetSub = activeSubs.length === 1
    ? activeSubs[0]
    : guessServiceFromReply(body, activeSubs);

  if (!targetSub) {
    // Ambiguous — ask user to clarify
    const names = activeSubs
      .map((s) => {
        const svc = SERVICE_KEYWORD_MAP.get(s.serviceKeyword.toUpperCase());
        return svc ? `${svc.emoji} ${svc.name}` : s.serviceKeyword;
      })
      .join("\n");
    return twimlResponse(
      `Got it! Which service is this reply for?\n\n${names}\n\nReply with the service keyword.`
    );
  }

  // Parse the reply
  const parsed = parseReply(body, targetSub.serviceKeyword);

  // Store the reply
  await prisma.reply.create({
    data: {
      userId: user.id,
      subscriptionId: targetSub.id,
      rawBody: body,
      parsedValue: parsed as object,
      twilioSid: messageSid,
    },
  });

  // Update lastRepliedAt
  await prisma.subscription.update({
    where: { id: targetSub.id },
    data: { lastRepliedAt: new Date() },
  });

  // Update streak if applicable
  const service = SERVICE_KEYWORD_MAP.get(
    targetSub.serviceKeyword.toUpperCase()
  );
  if (service?.streak_tracking) {
    await recordActivity(targetSub.id);
  }

  // Check escalation rules
  const recentReplies = await prisma.reply.findMany({
    where: { subscriptionId: targetSub.id },
    orderBy: { createdAt: "desc" },
    take: 7,
  });

  const escalation = checkEscalation(targetSub, parsed, recentReplies);
  if (escalation) {
    switch (escalation.type) {
      case "crisis_resource":
        return twimlResponse(escalation.message);

      case "alert_buddy":
        // Send alert via REST API (separate from the TwiML reply)
        await sendSms(escalation.phone, escalation.message);
        break;

      case "send_warning":
        return twimlResponse(escalation.message);
    }
  }

  // Generate acknowledgment based on reply type
  const streakText = service?.streak_tracking
    ? await getStreakText(targetSub.id)
    : "";

  let ack = "Got it! ✓";
  if (parsed.type === "boolean" && parsed.value === "YES") {
    ack = "Great job! ✓";
  } else if (parsed.type === "boolean" && parsed.value === "DONE") {
    ack = "Done and logged! ✓";
  } else if (parsed.type === "number") {
    ack = `Logged: ${parsed.value} ✓`;
  } else if (parsed.type === "range") {
    ack = `Logged: ${parsed.value} ✓`;
  }

  if (streakText) ack += `\n${streakText}`;

  return twimlResponse(ack);
}
