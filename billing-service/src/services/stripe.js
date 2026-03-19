const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Subscription tier price IDs — set these in .env after creating
// the products in the Stripe dashboard.
const PRICES = {
  GENTLE_NUDGE: process.env.STRIPE_PRICE_GENTLE, // $2/mo
  FULL_NAG: process.env.STRIPE_PRICE_NAG, // $7/mo
  THE_RELENTLESS: process.env.STRIPE_PRICE_RELENTLESS, // $12/mo
};

function getPriceId(tier) {
  const id = PRICES[tier];
  if (!id) throw new Error(`Unknown tier: ${tier}`);
  return id;
}

async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata,
  paymentMethodTypes,
  allowPromotionCodes,
}) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...(metadata && { metadata }),
    ...(paymentMethodTypes && { payment_method_types: paymentMethodTypes }),
    ...(allowPromotionCodes && { allow_promotion_codes: allowPromotionCodes }),
  });
}

async function findOrCreateCustomerByPhone(phoneNumber) {
  // Search for existing customer by phone_number metadata to avoid duplicates
  const existing = await stripe.customers.search({
    query: `metadata["phone_number"]:"${phoneNumber}"`,
  });

  if (existing.data.length > 0) {
    return existing.data[0];
  }

  return stripe.customers.create({
    phone: phoneNumber,
    metadata: { phone_number: phoneNumber },
  });
}

async function createCustomer({ email, phone, metadata }) {
  return stripe.customers.create({ email, phone, metadata });
}

// Human-readable tier names
const TIER_NAMES = {
  GENTLE_NUDGE: "Gentle Nudge ($2/mo)",
  FULL_NAG: "Full Nag ($7/mo)",
  THE_RELENTLESS: "The Relentless ($12/mo)",
};

// Reverse lookup: price ID → tier key
function getTierByPriceId(priceId) {
  for (const [tier, id] of Object.entries(PRICES)) {
    if (id === priceId) return tier;
  }
  return null;
}

async function updateSubscriptionPrice(subscriptionId, newPriceId, proration) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const itemId = subscription.items.data[0].id;

  return stripe.subscriptions.update(subscriptionId, {
    items: [{ id: itemId, price: newPriceId }],
    proration_behavior: proration,
  });
}

async function pauseSubscription(subscriptionId) {
  return stripe.subscriptions.update(subscriptionId, {
    pause_collection: { behavior: "void" },
  });
}

async function resumeSubscription(subscriptionId) {
  return stripe.subscriptions.update(subscriptionId, {
    pause_collection: "",
  });
}

async function cancelSubscriptionAtPeriodEnd(subscriptionId) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

async function createPortalSession(customerId) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
  });
}

function constructWebhookEvent(payload, signature) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

module.exports = {
  stripe,
  PRICES,
  TIER_NAMES,
  getPriceId,
  getTierByPriceId,
  createCheckoutSession,
  createCustomer,
  findOrCreateCustomerByPhone,
  updateSubscriptionPrice,
  pauseSubscription,
  resumeSubscription,
  cancelSubscriptionAtPeriodEnd,
  createPortalSession,
  constructWebhookEvent,
};
