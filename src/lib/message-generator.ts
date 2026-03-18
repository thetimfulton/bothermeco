import type { Subscription, Streak } from "@/generated/prisma/client";
import type { Service } from "@/types/services";
import { SERVICE_KEYWORD_MAP } from "./keywords";

type SubscriptionWithStreak = Subscription & { streak: Streak | null };

/**
 * Generate the outbound message for a subscription.
 * Personalizes the service's sample_text using setup answers and streak data.
 */
export function generateMessage(
  subscription: SubscriptionWithStreak,
  service?: Service
): string {
  const svc =
    service || SERVICE_KEYWORD_MAP.get(subscription.serviceKeyword.toUpperCase());
  if (!svc) return "Something went wrong. Text HELP for support.";

  const answers = (subscription.setupAnswers as Record<string, string>) || {};
  const streak = subscription.streak;
  const streakCount = streak?.currentCount ?? 0;

  // Base message from the service spec
  let message = svc.sample_text;

  // ─── Service-specific personalization ───

  switch (svc.keyword) {
    case "PILLS":
      // Add medication name if provided
      if (answers["0"]) {
        message = `Did you take your ${answers["0"]} today? Reply YES or SNOOZE (I'll bug you again in 30 min).`;
      }
      break;

    case "WATER":
      // Use actual progress — default to generic if no reply history
      message = svc.sample_text;
      break;

    case "FRIENDS":
      // Rotate through contacts (stored in setup answers)
      message = svc.sample_text;
      break;

    case "CALLMOM": {
      // Use names from setup answers
      const names = answers["0"] || "your family";
      message = `It's been a while since you called ${names.split(",")[0]?.trim() || "them"}. They'd love to hear from you. Reply CALLED when done.`;
      break;
    }

    case "DADTEXT":
      message = svc.sample_text;
      break;

    case "ELDERCHECK": {
      const name = answers["0"] || "there";
      message = `Good morning, ${name}! How are you feeling today? Reply OK or NEED HELP.`;
      break;
    }

    case "DOGWALK": {
      const dogName = answers["0"] || "your dog";
      message = `Did you walk ${dogName} today? Reply YES + minutes (e.g., YES 30) or NO.`;
      break;
    }

    case "PETMEDS": {
      const petName = answers["0"] || "your pet";
      message = `${petName}'s medication is due today. Reply DONE when given.`;
      break;
    }

    case "BABY": {
      const babyName = answers["0"] || "baby";
      message = `${babyName} log time! Reply: D[diapers] F[feedings] and any notes. Example: D8 F6 fussy afternoon.`;
      break;
    }

    default:
      // Use sample_text as-is for most services
      break;
  }

  // Add streak info for services that track it
  if (svc.streak_tracking && streakCount > 0) {
    const fire = streakCount >= 7 ? " 🔥" : "";
    message += `\n\nStreak: ${streakCount} day${streakCount === 1 ? "" : "s"}${fire}`;
  }

  return message;
}
