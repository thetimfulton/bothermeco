import { SERVICE_KEYWORD_MAP } from "./keywords";
import type { Subscription } from "@/generated/prisma/client";

// ─── Parsed reply types ───

export type ParsedReply =
  | { type: "boolean"; value: string } // YES, NO, DONE, SKIP, SNOOZE, etc.
  | { type: "number"; value: number }
  | { type: "range"; value: number; min: number; max: number }
  | { type: "bp"; systolic: number; diastolic: number }
  | { type: "baby_log"; diapers: number; feedings: number; notes?: string }
  | { type: "yes_with_detail"; confirmed: boolean; detail: string }
  | { type: "free_text"; value: string }
  | { type: "unrecognized"; raw: string };

// ─── Reply format patterns by service keyword ───

const BOOLEAN_KEYWORDS = new Set([
  "YES", "NO", "DONE", "SKIP", "SNOOZE", "OK",
  "CALLED", "LATER", "FIXED", "BOOKED", "GO",
  "COOL", "THANKS", "INTERESTED", "CHECK-IN",
]);

const BP_PATTERN = /^(\d{2,3})\s*\/\s*(\d{2,3})$/;
const BABY_LOG_PATTERN = /D(\d+)\s*F(\d+)\s*(.*)?/i;
const YES_WITH_NUMBER = /^YES\s+(\d+)/i;
const YES_WITH_TEXT = /^YES\s+(.+)/i;

// Services that expect free text (no specific format)
const FREE_TEXT_SERVICES = new Set([
  "GRATEFUL", "JOURNAL", "DECLUTTER", "KINDNESS",
]);

// Services that expect a 1-5 range
const RANGE_1_5_SERVICES = new Set(["MOOD"]);

// Services that expect a 1-10 range
const RANGE_1_10_SERVICES = new Set(["COUPLE"]);

/**
 * Parse a user's reply based on the service they're replying to.
 */
export function parseReply(body: string, serviceKeyword: string): ParsedReply {
  const trimmed = body.trim();
  const upper = trimmed.toUpperCase();
  const keyword = serviceKeyword.toUpperCase();

  // Free text services — accept anything
  if (FREE_TEXT_SERVICES.has(keyword)) {
    return { type: "free_text", value: trimmed };
  }

  // Blood pressure format: 128/82
  if (keyword === "BP" || BP_PATTERN.test(trimmed)) {
    const match = trimmed.match(BP_PATTERN);
    if (match) {
      return {
        type: "bp",
        systolic: parseInt(match[1], 10),
        diastolic: parseInt(match[2], 10),
      };
    }
  }

  // Baby log format: D8 F6 fussy afternoon
  if (keyword === "BABY") {
    const match = trimmed.match(BABY_LOG_PATTERN);
    if (match) {
      return {
        type: "baby_log",
        diapers: parseInt(match[1], 10),
        feedings: parseInt(match[2], 10),
        notes: match[3]?.trim() || undefined,
      };
    }
  }

  // Range 1-5
  if (RANGE_1_5_SERVICES.has(keyword)) {
    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      return { type: "range", value: num, min: 1, max: 5 };
    }
  }

  // Range 1-10
  if (RANGE_1_10_SERVICES.has(keyword)) {
    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      return { type: "range", value: num, min: 1, max: 10 };
    }
  }

  // YES with number: "YES 30" (DogWalk minutes, etc.)
  const yesNumMatch = trimmed.match(YES_WITH_NUMBER);
  if (yesNumMatch) {
    return {
      type: "yes_with_detail",
      confirmed: true,
      detail: yesNumMatch[1],
    };
  }

  // YES with text: "YES Acme Corp" (ApplyOne company name)
  if (keyword === "JOBHUNT") {
    const yesTextMatch = trimmed.match(YES_WITH_TEXT);
    if (yesTextMatch) {
      return {
        type: "yes_with_detail",
        confirmed: true,
        detail: yesTextMatch[1],
      };
    }
  }

  // Boolean keywords
  if (BOOLEAN_KEYWORDS.has(upper)) {
    return { type: "boolean", value: upper };
  }

  // Plain number
  const num = parseFloat(trimmed);
  if (!isNaN(num) && /^[\d.]+$/.test(trimmed)) {
    return { type: "number", value: num };
  }

  // Fallback: treat as free text for services that accept it,
  // or unrecognized for strict-format services
  const service = SERVICE_KEYWORD_MAP.get(keyword);
  if (service?.reply_format.toLowerCase().includes("free text")) {
    return { type: "free_text", value: trimmed };
  }

  return { type: "unrecognized", raw: trimmed };
}

/**
 * When a user has multiple active subscriptions, try to guess
 * which service their reply is for based on the reply format.
 */
export function guessServiceFromReply(
  body: string,
  subscriptions: Subscription[]
): Subscription | null {
  const trimmed = body.trim();

  if (subscriptions.length === 0) return null;
  if (subscriptions.length === 1) return subscriptions[0];

  // BP format is unique — only BPLog uses it
  if (BP_PATTERN.test(trimmed)) {
    const bp = subscriptions.find((s) => s.serviceKeyword === "BP");
    if (bp) return bp;
  }

  // Baby log format is unique
  if (BABY_LOG_PATTERN.test(trimmed)) {
    const baby = subscriptions.find((s) => s.serviceKeyword === "BABY");
    if (baby) return baby;
  }

  // YES with number — could be DogWalk, etc.
  if (YES_WITH_NUMBER.test(trimmed)) {
    const candidates = subscriptions.filter((s) =>
      ["DOGWALK", "STEPS"].includes(s.serviceKeyword)
    );
    if (candidates.length === 1) return candidates[0];
  }

  // For ambiguous replies, fall back to the most recently sent-to subscription
  const sorted = [...subscriptions].sort((a, b) => {
    const aTime = a.lastSentAt?.getTime() ?? 0;
    const bTime = b.lastSentAt?.getTime() ?? 0;
    return bTime - aTime;
  });

  return sorted[0] ?? null;
}
