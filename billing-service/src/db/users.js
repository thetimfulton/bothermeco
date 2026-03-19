// TODO: Replace with Postgres/Redis in production.
// This in-memory store loses all data on restart.

const users = new Map();

function getUser(userId) {
  return users.get(userId) || null;
}

function upsertUser(userId, data) {
  const existing = users.get(userId) || {};
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
  users.set(userId, updated);
  return updated;
}

function getUserByStripeCustomerId(stripeCustomerId) {
  for (const [userId, user] of users) {
    if (user.stripeCustomerId === stripeCustomerId) {
      return { userId, ...user };
    }
  }
  return null;
}

function getUserByPhone(phone) {
  for (const [userId, user] of users) {
    if (user.phone === phone) {
      return { userId, ...user };
    }
  }
  return null;
}

// Pending signups keyed by token — created during the Twilio onboarding
// flow and consumed when the user visits /pay/:token.
const pendingSignups = new Map();

function createPendingSignup(token, { phoneNumber, tier, services }) {
  pendingSignups.set(token, { phoneNumber, tier, services, createdAt: new Date().toISOString() });
}

function getPendingSignup(token) {
  return pendingSignups.get(token) || null;
}

function deletePendingSignup(token) {
  pendingSignups.delete(token);
}

module.exports = {
  getUser,
  upsertUser,
  getUserByStripeCustomerId,
  getUserByPhone,
  createPendingSignup,
  getPendingSignup,
  deletePendingSignup,
};
