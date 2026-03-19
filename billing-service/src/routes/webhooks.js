const express = require("express");
const { constructWebhookEvent } = require("../services/stripe");
const { upsertUser, getUserByStripeCustomerId } = require("../db/users");
const { sendSMS } = require("../services/twilio");

const router = express.Router();

const BASE_URL = process.env.BASE_URL;

// Stripe sends the raw body — this route must be registered BEFORE
// the global JSON body-parser in server.js.
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    try {
      event = constructWebhookEvent(
        req.body,
        req.headers["stripe-signature"]
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Always return 200 to Stripe — log errors but don't cause retries.
    try {
      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutCompleted(event.data.object);
          break;

        case "invoice.payment_succeeded":
          await handlePaymentSucceeded(event.data.object);
          break;

        case "invoice.payment_failed":
          await handlePaymentFailed(event.data.object);
          break;

        case "customer.subscription.deleted":
          await handleSubscriptionDeleted(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      console.error(`Error processing ${event.type}:`, err);
    }

    res.status(200).json({ received: true });
  }
);

// --- Event handlers ---

async function handleCheckoutCompleted(session) {
  const phoneNumber = session.metadata?.phone_number;
  const services = session.metadata?.services
    ? JSON.parse(session.metadata.services)
    : [];

  const userId = phoneNumber; // use phone as user key for now

  upsertUser(userId, {
    phone: phoneNumber,
    stripeCustomerId: session.customer,
    subscriptionId: session.subscription,
    subscriptionStatus: "active",
    services,
    failedPaymentCount: 0,
  });

  if (phoneNumber) {
    await sendSMS(
      phoneNumber,
      "You're in! Your first bother arrives tomorrow at your preferred time. Current streak: 0. Let's fix that."
    );
  }
}

async function handlePaymentSucceeded(invoice) {
  console.log(
    `Payment succeeded for customer ${invoice.customer}, amount: ${invoice.amount_paid}`
  );

  const user = getUserByStripeCustomerId(invoice.customer);
  if (!user) return;

  // If they had previous failed payments, this is a recovery
  if (user.failedPaymentCount > 0) {
    upsertUser(user.userId, {
      failedPaymentCount: 0,
      subscriptionStatus: "active",
    });

    if (user.phone) {
      await sendSMS(
        user.phone,
        "Payment went through — you're back in the game. Streak preserved."
      );
    }
  }
}

async function handlePaymentFailed(invoice) {
  const user = getUserByStripeCustomerId(invoice.customer);
  if (!user) {
    console.error(
      `Payment failed for unknown customer: ${invoice.customer}`
    );
    return;
  }

  const failCount = (user.failedPaymentCount || 0) + 1;
  upsertUser(user.userId, { failedPaymentCount: failCount });

  if (!user.phone) return;

  if (failCount >= 3) {
    // 3rd failure — pause services
    upsertUser(user.userId, { subscriptionStatus: "paused" });
    await sendSMS(
      user.phone,
      "We paused your bothers until your payment is sorted. Text RESUME when you're ready. We'll be here. Waiting. Annoyingly."
    );
  } else {
    await sendSMS(
      user.phone,
      `Heads up — your payment didn't go through. Update your card here: ${BASE_URL}/update-payment/${invoice.customer} or reply HELP.`
    );
  }
}

async function handleSubscriptionDeleted(subscription) {
  const user = getUserByStripeCustomerId(subscription.customer);
  if (!user) return;

  upsertUser(user.userId, { subscriptionStatus: "canceled" });

  if (user.phone) {
    await sendSMS(
      user.phone,
      "You've officially un-bothered yourself. We'll miss nagging you. Text START anytime to come back. Your streaks will be waiting. (They're disappointed in you.)"
    );
  }
}

module.exports = router;
