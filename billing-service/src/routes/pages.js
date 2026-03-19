const express = require("express");
const { createPortalSession } = require("../services/stripe");

const router = express.Router();

// GET /welcome?session_id={id}
router.get("/welcome", (_req, res) => {
  res.send(/* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BotherMe</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .container {
      max-width: 420px;
      width: 100%;
      text-align: center;
    }

    .logo {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }

    .logo span { color: #a855f7; }

    .tagline {
      font-size: 0.85rem;
      color: #888;
      margin-bottom: 48px;
      font-style: italic;
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .check {
      display: inline-block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #a855f7;
      line-height: 48px;
      font-size: 1.5rem;
      margin-bottom: 24px;
    }

    .subtitle {
      color: #aaa;
      font-size: 1rem;
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .tips {
      text-align: left;
      list-style: none;
      margin-bottom: 40px;
    }

    .tips li {
      padding: 14px 16px;
      background: #151515;
      border: 1px solid #222;
      border-radius: 10px;
      margin-bottom: 10px;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .tips li strong {
      color: #a855f7;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.85rem;
    }

    .tips li span {
      display: block;
      color: #888;
      font-size: 0.8rem;
      margin-top: 4px;
    }

    .footer {
      color: #555;
      font-size: 0.75rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Bother<span>Me</span>.co</div>
    <div class="tagline">High Function. Mild Chaos.</div>

    <div class="check">&#10003;</div>
    <h1>You're officially getting bothered.</h1>
    <p class="subtitle">
      Your first text arrives tomorrow.<br>
      In the meantime, here's what you can do:
    </p>

    <ul class="tips">
      <li>
        <strong>Text ADD [keyword]</strong>
        <span>Add more services to your bother list</span>
      </li>
      <li>
        <strong>Text PAUSE</strong>
        <span>Take a break anytime — no charge while paused</span>
      </li>
      <li>
        <strong>Text UPGRADE</strong>
        <span>Move to a higher tier for more intense bothering</span>
      </li>
      <li>
        <strong>Text BILLING</strong>
        <span>Manage your plan, update your card, or view invoices</span>
      </li>
    </ul>

    <p class="footer">&copy; ${new Date().getFullYear()} BotherMe.co</p>
  </div>
</body>
</html>`);
});

// GET /update-payment/:customerId
// Redirects to the Stripe Customer Portal for updating payment method.
// This is the link sent via SMS when a payment fails.
router.get("/update-payment/:customerId", async (req, res) => {
  try {
    const session = await createPortalSession(req.params.customerId);
    res.redirect(303, session.url);
  } catch (err) {
    console.error("Portal session error:", err);
    res.status(500).send("Something went wrong. Please text BILLING to get a new link.");
  }
});

module.exports = router;
