import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSms } from "@/lib/sms";
import { generateMessage } from "@/lib/message-generator";
import { SERVICE_KEYWORD_MAP } from "@/lib/keywords";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes max for Vercel

/**
 * POST /api/cron/send-texts
 *
 * Cron-compatible endpoint that sends scheduled texts.
 * Runs every 5 minutes via Vercel Cron. Authenticated with CRON_SECRET.
 */
export async function POST(request: Request) {
  // 1. Authenticate
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  let sentCount = 0;
  let errorCount = 0;

  try {
    // 2. Query all active subscriptions with active users
    const subscriptions = await prisma.subscription.findMany({
      where: {
        status: "active",
        user: { status: "active" },
      },
      include: {
        user: true,
        streak: true,
      },
    });

    // 3. For each subscription, check if it's time to send
    for (const sub of subscriptions) {
      try {
        if (!shouldSendNow(sub, now)) continue;

        // 4. Generate message
        const service = SERVICE_KEYWORD_MAP.get(
          sub.serviceKeyword.toUpperCase()
        );
        if (!service) continue;

        const content = generateMessage(sub, service);

        // 5. Send via Twilio
        const result = await sendSms(sub.user.phone, content);

        // 6. Record the sent text
        await prisma.scheduledText.create({
          data: {
            subscriptionId: sub.id,
            scheduledFor: now,
            sentAt: now,
            content,
            twilioSid: result.sid,
            status: "sent",
          },
        });

        // 7. Update lastSentAt
        await prisma.subscription.update({
          where: { id: sub.id },
          data: { lastSentAt: now },
        });

        sentCount++;
      } catch (err) {
        console.error(
          `Failed to send to ${sub.user.phone} (${sub.serviceKeyword}):`,
          err
        );
        errorCount++;
      }
    }

    // 8. Handle time-based escalations
    await handleTimedEscalations(now);
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json(
      { error: "Internal error", sent: sentCount, errors: errorCount },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    sent: sentCount,
    errors: errorCount,
    checked: "all active subscriptions",
    timestamp: now.toISOString(),
  });
}

// ─── Helpers ───

/**
 * Check if it's time to send a message for this subscription.
 * Converts current time to user's timezone and checks against preferredTimes.
 */
function shouldSendNow(
  sub: { preferredTimes: unknown; lastSentAt: Date | null; user: { timezone: string } },
  now: Date
): boolean {
  const times = sub.preferredTimes as string[] | null;
  if (!times || times.length === 0) return false;

  // Get current time in user's timezone as HH:MM
  const userTime = new Intl.DateTimeFormat("en-US", {
    timeZone: sub.user.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  // Check if current time matches any preferred time (within 5-min window)
  const [currentH, currentM] = userTime.split(":").map(Number);
  const currentMinutes = currentH * 60 + currentM;

  const isTimeMatch = times.some((t) => {
    const [h, m] = t.split(":").map(Number);
    const targetMinutes = h * 60 + m;
    return Math.abs(currentMinutes - targetMinutes) < 5;
  });

  if (!isTimeMatch) return false;

  // Deduplicate: don't send if we already sent within the last 30 minutes
  if (sub.lastSentAt) {
    const minutesSinceLastSend =
      (now.getTime() - sub.lastSentAt.getTime()) / 60000;
    if (minutesSinceLastSend < 30) return false;
  }

  return true;
}

/**
 * Handle time-based escalations that aren't triggered by user replies.
 * - ElderCheck: no-reply alerts
 * - PlantParent: 4-hour follow-up
 * - CallMom: 24h re-send after LATER
 */
async function handleTimedEscalations(now: Date) {
  // ElderCheck: alert buddy if no reply within 2 hours of send
  const elderSubs = await prisma.subscription.findMany({
    where: {
      serviceKeyword: "ELDERCHECK",
      status: "active",
      buddyPhone: { not: null },
      lastSentAt: {
        // Sent 2-3 hours ago (check window to avoid re-alerting)
        gte: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        lte: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
    },
    include: { user: true },
  });

  for (const sub of elderSubs) {
    // Check if they replied after the last send
    if (
      !sub.lastRepliedAt ||
      sub.lastRepliedAt < (sub.lastSentAt ?? new Date(0))
    ) {
      if (sub.buddyPhone) {
        const answers = sub.setupAnswers as Record<string, string> | null;
        const name = answers?.["0"] || "your loved one";
        await sendSms(
          sub.buddyPhone,
          `🚨 BotherMe ElderCheck Alert: ${name} did not respond to their daily check-in within 2 hours. Please check on them.`
        );
      }
    }
  }
}
