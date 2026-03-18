import { prisma } from "./prisma";
import type { Service } from "@/types/services";
import type { Subscription } from "@/generated/prisma/client";

/**
 * Start onboarding a user for a service.
 * Creates user (if new) and subscription, returns first setup question.
 */
export async function startOnboarding(
  phone: string,
  service: Service
): Promise<string> {
  // Find or create user
  const user = await prisma.user.upsert({
    where: { phone },
    create: { phone },
    update: {},
  });

  // Check for existing subscription
  const existing = await prisma.subscription.findUnique({
    where: { userId_serviceId: { userId: user.id, serviceId: service.id } },
  });

  if (existing) {
    if (existing.status === "active") {
      return `You're already subscribed to ${service.emoji} ${service.name}! Text STATUS to see your active services.`;
    }
    if (existing.status === "onboarding") {
      // Resume onboarding from current step
      const step = existing.onboardingStep;
      if (step < service.setup_questions.length) {
        return `Let's pick up where we left off!\n\n${service.setup_questions[step]}`;
      }
    }
    // Reactivate cancelled/paused subscription
    await prisma.subscription.update({
      where: { id: existing.id },
      data: { status: "onboarding", onboardingStep: 0, setupAnswers: {} },
    });
  } else {
    // Create new subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        serviceKeyword: service.keyword,
        status: "onboarding",
        onboardingStep: 0,
        setupAnswers: {},
      },
    });
  }

  // Create streak record if service tracks streaks
  if (service.streak_tracking) {
    const sub = await prisma.subscription.findUnique({
      where: { userId_serviceId: { userId: user.id, serviceId: service.id } },
    });
    if (sub) {
      await prisma.streak.upsert({
        where: { subscriptionId: sub.id },
        create: { subscriptionId: sub.id },
        update: {},
      });
    }
  }

  const welcome = `${service.emoji} Welcome to ${service.name}!\n${service.tagline}\n\nLet's get you set up. I have ${service.setup_questions.length} quick question${service.setup_questions.length > 1 ? "s" : ""}.\n\n${service.setup_questions[0]}`;

  return welcome;
}

/**
 * Handle a reply from a user who is in the onboarding flow.
 * Stores the answer, advances the step, and returns the next question or completion message.
 */
export async function handleOnboardingReply(
  subscription: Subscription,
  body: string,
  service: Service
): Promise<{ message: string; completed: boolean }> {
  const step = subscription.onboardingStep;
  const answers = (subscription.setupAnswers as Record<string, string>) || {};

  // Store the answer
  answers[String(step)] = body;

  const nextStep = step + 1;
  const isComplete = nextStep >= service.setup_questions.length;

  if (isComplete) {
    // Parse preferred times from answers
    const preferredTimes = extractPreferredTimes(answers, service);
    const buddyPhone = extractBuddyPhone(answers, service);

    // Activate subscription
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "active",
        onboardingStep: nextStep,
        setupAnswers: answers,
        preferredTimes,
        buddyPhone,
      },
    });

    return {
      message: `${service.emoji} You're all set! ${service.name} is now active.\n\nYour first text is coming soon. Reply to any text to log your response.\n\nText CANCEL ${service.keyword} to unsubscribe anytime.`,
      completed: true,
    };
  }

  // Save answer and advance to next question
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      onboardingStep: nextStep,
      setupAnswers: answers,
    },
  });

  return {
    message: `Got it! ✓\n\n${service.setup_questions[nextStep]}`,
    completed: false,
  };
}

// ─── Helpers ───

/**
 * Extract preferred times from setup answers.
 * Looks for time-related answers and parses them to HH:MM format.
 */
function extractPreferredTimes(
  answers: Record<string, string>,
  service: Service
): string[] {
  const times: string[] = [];

  for (const [idx, answer] of Object.entries(answers)) {
    const question = service.setup_questions[Number(idx)]?.toLowerCase() || "";
    if (
      question.includes("time") ||
      question.includes("when") ||
      question.includes("hour")
    ) {
      const parsed = parseTimeFromAnswer(answer);
      if (parsed) times.push(parsed);
    }
  }

  // Default to 9am if no time was extracted
  if (times.length === 0) {
    times.push("09:00");
  }

  return times;
}

/**
 * Extract accountability buddy phone from setup answers.
 */
function extractBuddyPhone(
  answers: Record<string, string>,
  service: Service
): string | null {
  for (const [idx, answer] of Object.entries(answers)) {
    const question = service.setup_questions[Number(idx)]?.toLowerCase() || "";
    if (
      question.includes("alert") ||
      question.includes("buddy") ||
      question.includes("emergency") ||
      question.includes("who should")
    ) {
      const cleaned = answer.replace(/[\s\-()]/g, "");
      if (/^\+?1?\d{10,15}$/.test(cleaned) && answer.toUpperCase() !== "SKIP") {
        return cleaned.startsWith("+") ? cleaned : `+1${cleaned}`;
      }
    }
  }
  return null;
}

/**
 * Parse a time string like "9am", "9:30 PM", "morning", "evening" → "HH:MM".
 */
function parseTimeFromAnswer(answer: string): string | null {
  const text = answer.trim().toLowerCase();

  // Named times
  if (text === "morning" || text === "am") return "08:00";
  if (text === "afternoon") return "14:00";
  if (text === "evening" || text === "pm" || text === "night") return "20:00";

  // Patterns: "9am", "9:30am", "9:30 AM", "9:00", "21:00"
  const match = text.match(
    /^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?$/i
  );
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3]?.toLowerCase().replace(/\./g, "");

  if (period === "pm" && hours < 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
