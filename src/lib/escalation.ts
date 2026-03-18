import type { Subscription, Reply } from "@/generated/prisma/client";
import type { ParsedReply } from "./reply-parser";

// ─── Escalation action types ───

export type EscalationAction =
  | { type: "alert_buddy"; phone: string; message: string }
  | { type: "crisis_resource"; message: string }
  | { type: "send_warning"; message: string };

// Crisis keywords for SobrietyCounter
const CRISIS_KEYWORDS = [
  "relapse",
  "can't do this",
  "giving up",
  "want to drink",
  "want to use",
  "hopeless",
  "ending it",
  "hurt",
  "suicide",
  "die",
  "kill",
];

/**
 * Check if an escalation action is needed based on the subscription,
 * the current reply, and recent reply history.
 */
export function checkEscalation(
  subscription: Subscription,
  reply: ParsedReply,
  recentReplies: Reply[]
): EscalationAction | null {
  const keyword = subscription.serviceKeyword.toUpperCase();

  switch (keyword) {
    case "SOBER":
      return checkSobrietyCrisis(reply, recentReplies);

    case "ELDERCHECK":
      return checkElderHelp(subscription, reply);

    case "MOOD":
      return checkMoodSustainedLow(recentReplies);

    case "PILLS":
      return checkPillMissed(subscription, recentReplies);

    case "DATENIGHT":
      return checkDateSkipped(recentReplies);

    case "GOALS":
      return checkGoalAbandoned(recentReplies);

    case "DRINKLESS":
      return checkDrinkExceeded(subscription, recentReplies);

    default:
      return null;
  }
}

// ─── Service-specific escalation checks ───

function checkSobrietyCrisis(
  reply: ParsedReply,
  recentReplies: Reply[]
): EscalationAction | null {
  // Check current reply for crisis keywords
  const text =
    reply.type === "free_text"
      ? reply.value
      : reply.type === "boolean" && reply.value === "CHECK-IN"
        ? recentReplies[0]?.rawBody || ""
        : "";

  const lower = text.toLowerCase();
  const hasCrisisKeyword = CRISIS_KEYWORDS.some((kw) => lower.includes(kw));

  if (hasCrisisKeyword) {
    return {
      type: "crisis_resource",
      message:
        "I hear you. You're not alone. Text HOME to 741741 or call 988. I'll be here tomorrow too. 💙",
    };
  }
  return null;
}

function checkElderHelp(
  subscription: Subscription,
  reply: ParsedReply
): EscalationAction | null {
  if (reply.type === "boolean" && reply.value === "NEED HELP") {
    if (subscription.buddyPhone) {
      return {
        type: "alert_buddy",
        phone: subscription.buddyPhone,
        message: `🚨 BotherMe ElderCheck Alert: Your loved one replied "NEED HELP" to their daily check-in. Please check on them immediately.`,
      };
    }
  }
  return null;
}

function checkMoodSustainedLow(
  recentReplies: Reply[]
): EscalationAction | null {
  // Check if last 3 replies are all 1-2
  const lastThree = recentReplies.slice(0, 3);
  if (lastThree.length < 3) return null;

  const allLow = lastThree.every((r) => {
    const parsed = r.parsedValue as { type: string; value: number } | null;
    return parsed?.type === "range" && parsed.value <= 2;
  });

  if (allLow) {
    return {
      type: "crisis_resource",
      message:
        "I've noticed a tough stretch. Here's a resource if you want it: text HOME to 741741 or call 988 (Suicide & Crisis Lifeline). No pressure. I'm here tomorrow too. 💙",
    };
  }
  return null;
}

function checkPillMissed(
  subscription: Subscription,
  recentReplies: Reply[]
): EscalationAction | null {
  const lastTwo = recentReplies.slice(0, 2);
  if (lastTwo.length < 2) return null;

  const bothMissed = lastTwo.every((r) => {
    const parsed = r.parsedValue as { type: string; value: string } | null;
    return parsed?.type === "boolean" && parsed.value === "NO";
  });

  if (bothMissed && subscription.buddyPhone) {
    return {
      type: "alert_buddy",
      phone: subscription.buddyPhone,
      message: `BotherMe PillPing Alert: Your person has missed their medication 2 days in a row. A gentle check-in might help.`,
    };
  }
  return null;
}

function checkDateSkipped(recentReplies: Reply[]): EscalationAction | null {
  const lastThree = recentReplies.slice(0, 3);
  if (lastThree.length < 3) return null;

  const allSkipped = lastThree.every((r) => {
    const parsed = r.parsedValue as { type: string; value: string } | null;
    return parsed?.type === "boolean" && parsed.value === "SKIP";
  });

  if (allSkipped) {
    return {
      type: "send_warning",
      message:
        "Hey, it's been 3 weeks without a date. Your partner might not say it, but they notice. Try this week? 💛",
    };
  }
  return null;
}

function checkGoalAbandoned(recentReplies: Reply[]): EscalationAction | null {
  const lastFive = recentReplies.slice(0, 5);
  if (lastFive.length < 5) return null;

  const allNo = lastFive.every((r) => {
    const parsed = r.parsedValue as { type: string; value: string } | null;
    return (
      (parsed?.type === "boolean" && parsed.value === "NO") ||
      r.rawBody.trim().toUpperCase() === "NO"
    );
  });

  if (allNo) {
    return {
      type: "send_warning",
      message:
        "It's been 5 days with no progress on your goal. Want to adjust the goal, or recommit? Reply ADJUST or RECOMMIT.",
    };
  }
  return null;
}

function checkDrinkExceeded(
  subscription: Subscription,
  recentReplies: Reply[]
): EscalationAction | null {
  // Sum last 7 replies (weekly total)
  const lastWeek = recentReplies.slice(0, 7);
  if (lastWeek.length < 7) return null;

  const total = lastWeek.reduce((sum, r) => {
    const parsed = r.parsedValue as { type: string; value: number } | null;
    return sum + (parsed?.type === "number" ? parsed.value : 0);
  }, 0);

  // Get goal from setup answers
  const answers = subscription.setupAnswers as Record<string, string> | null;
  const goalAnswer = answers?.["0"]; // first question is weekly goal
  const goal = goalAnswer ? parseInt(goalAnswer, 10) : 7;

  if (!isNaN(goal) && total > goal * 1.5) {
    return {
      type: "send_warning",
      message: `Your weekly total is ${total} drinks (goal: ${goal}). No judgment — just awareness. You've got this. 💪`,
    };
  }
  return null;
}
