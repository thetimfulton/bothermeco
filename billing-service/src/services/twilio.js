const twilio = require("twilio");
const {
  stripe,
  PRICES,
  TIER_NAMES,
  getPriceId,
  getTierByPriceId,
  updateSubscriptionPrice,
  pauseSubscription,
  resumeSubscription,
  cancelSubscriptionAtPeriodEnd,
  createPortalSession,
} = require("./stripe");
const { getUserByPhone } = require("../db/users");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to, body) {
  return client.messages.create({
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body,
  });
}

const NOT_FOUND_MSG =
  "Hmm, I don't have you in the system. Text START to sign up, or reply HELP if something's wrong.";

// Tier ordering for upgrade vs downgrade detection
const TIER_ORDER = { GENTLE_NUDGE: 1, FULL_NAG: 2, THE_RELENTLESS: 3 };

/**
 * Parse and handle billing-related SMS commands.
 * Called from the main Twilio inbound webhook.
 * Returns true if the message was handled, false if it's not a billing command.
 */
async function handleBillingCommand(phoneNumber, messageBody) {
  const cmd = messageBody.trim().toUpperCase();

  // Match commands
  if (/^UPGRADE(\s+(NAG|RELENTLESS))?$/.test(cmd)) {
    return await handleTierChange(phoneNumber, cmd, "upgrade");
  }
  if (/^DOWNGRADE(\s+NUDGE)?$/.test(cmd)) {
    return await handleTierChange(phoneNumber, cmd, "downgrade");
  }
  if (cmd === "PAUSE") return await handlePause(phoneNumber);
  if (cmd === "RESUME") return await handleResume(phoneNumber);
  if (cmd === "STOP" || cmd === "CANCEL") return await handleCancel(phoneNumber);
  if (cmd === "BILLING" || cmd === "ACCOUNT") return await handleBilling(phoneNumber);

  return false; // Not a billing command
}

function resolveTargetTier(cmd, direction) {
  if (direction === "upgrade") {
    if (cmd.includes("RELENTLESS")) return "THE_RELENTLESS";
    if (cmd.includes("NAG")) return "FULL_NAG";
    // Plain "UPGRADE" — go up one tier
    return null; // will be resolved from current tier
  }
  // downgrade
  if (cmd.includes("NUDGE")) return "GENTLE_NUDGE";
  return null; // will be resolved from current tier
}

function getNextTier(currentTier, direction) {
  const order = TIER_ORDER[currentTier];
  if (!order) return null;

  if (direction === "upgrade") {
    const target = order + 1;
    return Object.keys(TIER_ORDER).find((t) => TIER_ORDER[t] === target) || null;
  }
  const target = order - 1;
  return Object.keys(TIER_ORDER).find((t) => TIER_ORDER[t] === target) || null;
}

async function getUserWithSubscription(phoneNumber) {
  const user = getUserByPhone(phoneNumber);
  if (!user || !user.subscriptionId) return null;
  return user;
}

async function handleTierChange(phoneNumber, cmd, direction) {
  const user = await getUserWithSubscription(phoneNumber);
  if (!user) {
    await sendSMS(phoneNumber, NOT_FOUND_MSG);
    return true;
  }

  // Figure out the current tier from Stripe
  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
  const currentPriceId = subscription.items.data[0].price.id;
  const currentTier = getTierByPriceId(currentPriceId);

  // Resolve target tier
  let targetTier = resolveTargetTier(cmd, direction);
  if (!targetTier) {
    targetTier = getNextTier(currentTier, direction);
  }

  if (!targetTier) {
    const msg =
      direction === "upgrade"
        ? "You're already on our highest tier! You're fully committed to being bothered."
        : "You're already on our lowest tier! Can't go any lower.";
    await sendSMS(phoneNumber, msg);
    return true;
  }

  if (targetTier === currentTier) {
    await sendSMS(phoneNumber, `You're already on ${TIER_NAMES[currentTier]}.`);
    return true;
  }

  const newPriceId = getPriceId(targetTier);
  const proration =
    direction === "upgrade" ? "create_prorations" : "none";

  await updateSubscriptionPrice(user.subscriptionId, newPriceId, proration);

  if (direction === "upgrade") {
    await sendSMS(
      phoneNumber,
      `Done! You're now on ${TIER_NAMES[targetTier]}. Changes take effect immediately. Your card will be prorated.`
    );
  } else {
    await sendSMS(
      phoneNumber,
      `Downgraded to ${TIER_NAMES[targetTier]}. You'll keep your current tier until the end of this billing cycle.`
    );
  }

  return true;
}

async function handlePause(phoneNumber) {
  const user = await getUserWithSubscription(phoneNumber);
  if (!user) {
    await sendSMS(phoneNumber, NOT_FOUND_MSG);
    return true;
  }

  await pauseSubscription(user.subscriptionId);
  await sendSMS(
    phoneNumber,
    "Paused. Your bothers are on hold. Text RESUME whenever you're ready. No charge while paused."
  );
  return true;
}

async function handleResume(phoneNumber) {
  const user = await getUserWithSubscription(phoneNumber);
  if (!user) {
    await sendSMS(phoneNumber, NOT_FOUND_MSG);
    return true;
  }

  await resumeSubscription(user.subscriptionId);
  await sendSMS(
    phoneNumber,
    "Welcome back! Bothers resume tomorrow. Your streak resets though. Sorry, rules are rules."
  );
  return true;
}

async function handleCancel(phoneNumber) {
  const user = await getUserWithSubscription(phoneNumber);
  if (!user) {
    await sendSMS(phoneNumber, NOT_FOUND_MSG);
    return true;
  }

  const subscription = await cancelSubscriptionAtPeriodEnd(user.subscriptionId);
  const periodEnd = new Date(
    subscription.current_period_end * 1000
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  await sendSMS(
    phoneNumber,
    `Canceled. You'll keep getting bothered until ${periodEnd}. After that, you're on your own. Good luck out there.`
  );
  return true;
}

async function handleBilling(phoneNumber) {
  const user = await getUserWithSubscription(phoneNumber);
  if (!user) {
    await sendSMS(phoneNumber, NOT_FOUND_MSG);
    return true;
  }

  const session = await createPortalSession(user.stripeCustomerId);
  await sendSMS(
    phoneNumber,
    `Here's your billing portal: ${session.url} — update your card, view invoices, or manage your plan.`
  );
  return true;
}

module.exports = { client, sendSMS, handleBillingCommand };
