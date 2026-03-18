import { twilioClient, TWILIO_PHONE_NUMBER } from "./twilio";

/**
 * Send an SMS via Twilio REST API.
 */
export async function sendSms(to: string, body: string) {
  return twilioClient.messages.create({
    body,
    from: TWILIO_PHONE_NUMBER,
    to,
  });
}

/**
 * Return a TwiML XML response that sends a message back to the user.
 * Used as the webhook return value.
 */
export function twimlResponse(message: string): Response {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(message)}</Message>
</Response>`;

  return new Response(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}

/**
 * Return an empty TwiML response (no reply message).
 * Used when we've already sent messages via REST API.
 */
export function twimlEmpty(): Response {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`;

  return new Response(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}

/** Escape special XML characters in message text. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
