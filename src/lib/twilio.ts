import Twilio from "twilio";

// Singleton Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

export const twilioClient = Twilio(accountSid, authToken);

export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!;

/**
 * Validate that an inbound request is genuinely from Twilio.
 * Reads the X-Twilio-Signature header and validates against the auth token.
 */
export async function validateTwilioSignature(
  request: Request,
  params: Record<string, string>
): Promise<boolean> {
  // Skip validation in development
  if (process.env.NODE_ENV === "development") return true;

  const signature = request.headers.get("x-twilio-signature") || "";

  // Reconstruct the full URL that Twilio signed against
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("host") || "localhost:3000";
  const url = `${proto}://${host}/api/twilio/webhook`;

  return Twilio.validateRequest(authToken, signature, url, params);
}
