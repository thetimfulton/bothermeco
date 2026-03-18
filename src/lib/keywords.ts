import catalog from "@/data/services.json";
import type { Service } from "@/types/services";

// ─── Build lookup maps at module load time ───

const services = catalog.services as Service[];

/** Map of uppercased keyword → Service object */
export const SERVICE_KEYWORD_MAP = new Map<string, Service>(
  services.map((s) => [s.keyword.toUpperCase(), s])
);

/** Reserved system keywords */
export const RESERVED_KEYWORDS = new Set([
  "START",
  "STOP",
  "PAUSE",
  "RESUME",
  "MENU",
  "STATUS",
  "HELP",
  "BILLING",
]);

export type ReservedKeyword =
  | "START"
  | "STOP"
  | "PAUSE"
  | "RESUME"
  | "MENU"
  | "STATUS"
  | "HELP"
  | "BILLING";

/** Pattern for "CANCEL WATER", "CANCEL PILLS", etc. */
const CANCEL_PATTERN = /^CANCEL\s+(.+)$/i;

// ─── Classification types ───

export type InboundClassification =
  | { type: "service_keyword"; service: Service }
  | { type: "reserved"; keyword: ReservedKeyword }
  | { type: "cancel_service"; serviceKeyword: string }
  | { type: "reply"; body: string };

/**
 * Classify an inbound SMS message.
 * Returns a discriminated union indicating what kind of message it is.
 */
export function classifyInbound(body: string): InboundClassification {
  const trimmed = body.trim();
  const upper = trimmed.toUpperCase();

  // 1. Check reserved keywords
  if (RESERVED_KEYWORDS.has(upper)) {
    return { type: "reserved", keyword: upper as ReservedKeyword };
  }

  // 2. Check CANCEL pattern
  const cancelMatch = upper.match(CANCEL_PATTERN);
  if (cancelMatch) {
    return { type: "cancel_service", serviceKeyword: cancelMatch[1].trim() };
  }

  // 3. Check service keywords
  const service = SERVICE_KEYWORD_MAP.get(upper);
  if (service) {
    return { type: "service_keyword", service };
  }

  // 4. Default: it's a reply to an existing conversation
  return { type: "reply", body: trimmed };
}

/**
 * Generate a categorized menu of all services for the MENU command.
 */
export function getServiceMenu(): string {
  const categories = new Map<string, Service[]>();
  for (const s of services) {
    const list = categories.get(s.category) || [];
    list.push(s);
    categories.set(s.category, list);
  }

  let menu = "BotherMe Services:\n\n";
  for (const [category, items] of categories) {
    menu += `${category}:\n`;
    for (const s of items) {
      menu += `  ${s.emoji} ${s.name} - Text ${s.keyword} ($${s.price_monthly}/mo)\n`;
    }
    menu += "\n";
  }
  menu += "Text any keyword to subscribe!";
  return menu;
}
