import Twilio from "twilio";

// Singleton Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

export const twilioClient = Twilio(accountSid, authToken);

export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!;

/**
 * Validate that an inbound request is genuinely from Twilio.
 *
 * Uses the exact webhook URL from env to avoid mismatches caused by
 * www redirects, proxies, or Vercel's host rewriting.
 */
export async function validateTwilioSignature(
  request: Request,
  params: Record<string, string>
): Promise<boolean> {
  // Skip validation in development
  if (process.env.NODE_ENV === "development") return true;

  const signature = request.headers.get("x-twilio-signature") || "";

  // Use the configured site URL so it matches exactly what Twilio signed
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://botherme.co";
  const url = `${siteUrl}/api/twilio/webhook`;

  const isValid = Twilio.validateRequest(authToken, signature, url, params);

  // If the primary URL fails, try the www variant (Twilio may have signed
  // against whichever URL was configured in the console)
  if (!isValid) {
    const altUrl = siteUrl.includes("www.")
      ? siteUrl.replace("www.", "")
      : siteUrl.replace("https://", "https://www.");
    return Twilio.validateRequest(
      authToken,
      signature,
      `${altUrl}/api/twilio/webhook`,
      params
    );
  }

  return isValid;
}
