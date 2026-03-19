const express = require("express");
const {
  getPriceId,
  createCheckoutSession,
  findOrCreateCustomerByPhone,
} = require("../services/stripe");
const { getPendingSignup, deletePendingSignup } = require("../db/users");

const router = express.Router();

/**
 * Core checkout logic — shared by both the API endpoint and the /pay/:token
 * redirect. Returns the Stripe Checkout Session URL.
 */
async function buildCheckoutUrl({ phoneNumber, tier, services }) {
  const priceId = getPriceId(tier);
  const customer = await findOrCreateCustomerByPhone(phoneNumber);
  const baseUrl = process.env.BASE_URL;

  const session = await createCheckoutSession({
    customerId: customer.id,
    priceId,
    successUrl: `${baseUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${baseUrl}/canceled`,
    metadata: {
      phone_number: phoneNumber,
      services: JSON.stringify(services || []),
    },
    paymentMethodTypes: ["card"],
    allowPromotionCodes: true,
  });

  return session.url;
}

// POST /api/checkout
// Body: { phoneNumber, tier, services[] }
router.post("/", async (req, res) => {
  try {
    const { phoneNumber, tier, services } = req.body;

    if (!phoneNumber || !tier) {
      return res
        .status(400)
        .json({ error: "phoneNumber and tier are required" });
    }

    const url = await buildCheckoutUrl({ phoneNumber, tier, services });
    res.json({ url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /pay/:token
// The link texted to users: botherme.co/pay/{token}
// Looks up the pending signup created during Twilio onboarding and
// redirects to the Stripe Checkout page.
router.get("/pay/:token", async (req, res) => {
  try {
    const signup = getPendingSignup(req.params.token);

    if (!signup) {
      return res.status(404).json({ error: "Invalid or expired payment link" });
    }

    const url = await buildCheckoutUrl({
      phoneNumber: signup.phoneNumber,
      tier: signup.tier,
      services: signup.services,
    });

    // Token is single-use — remove it so the link can't be reused
    deletePendingSignup(req.params.token);

    res.redirect(303, url);
  } catch (err) {
    console.error("Pay link error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
