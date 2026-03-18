import { prisma } from "./prisma";

/**
 * Record activity for a subscription's streak.
 * Increments if yesterday was the last activity, resets if gap > 1 day.
 */
export async function recordActivity(subscriptionId: string) {
  const streak = await prisma.streak.findUnique({
    where: { subscriptionId },
  });

  if (!streak) return;

  const now = new Date();
  const today = startOfDay(now);
  const lastActivity = streak.lastActivityAt
    ? startOfDay(streak.lastActivityAt)
    : null;

  let newCount = streak.currentCount;

  if (!lastActivity) {
    // First ever activity
    newCount = 1;
  } else if (lastActivity.getTime() === today.getTime()) {
    // Already recorded today — no change
    return streak;
  } else if (lastActivity.getTime() === today.getTime() - 86400000) {
    // Yesterday — increment streak
    newCount = streak.currentCount + 1;
  } else {
    // Gap of 2+ days — reset
    newCount = 1;
  }

  return prisma.streak.update({
    where: { subscriptionId },
    data: {
      currentCount: newCount,
      longestCount: Math.max(newCount, streak.longestCount),
      lastActivityAt: now,
    },
  });
}

/**
 * Get a formatted streak text for use in messages.
 */
export async function getStreakText(subscriptionId: string): Promise<string> {
  const streak = await prisma.streak.findUnique({
    where: { subscriptionId },
  });

  if (!streak || streak.currentCount === 0) {
    return "Start your streak today!";
  }

  const fire = streak.currentCount >= 7 ? " 🔥" : "";
  return `Current streak: ${streak.currentCount} day${streak.currentCount === 1 ? "" : "s"}${fire}`;
}

/** Get midnight (start of day) for a given date in UTC. */
function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
