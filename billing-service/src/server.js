require("dotenv").config();

const express = require("express");
const webhookRoutes = require("./routes/webhooks");
const checkoutRoutes = require("./routes/checkout");
const pageRoutes = require("./routes/pages");

const app = express();

// Webhook route must come before the JSON body-parser so it
// receives the raw body needed for signature verification.
app.use("/webhooks", webhookRoutes);

app.use(express.json());

app.use("/api/checkout", checkoutRoutes);
app.use("/", checkoutRoutes);
app.use("/", pageRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Billing service listening on port ${PORT}`);
});

module.exports = app;
