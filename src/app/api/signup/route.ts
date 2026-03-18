import { NextResponse } from "next/server";
import catalog from "@/data/services.json";
import type { Service } from "@/types/services";

export const dynamic = "force-dynamic";

/**
 * POST /api/signup
 *
 * Web signup endpoint. Accepts a phone number and list of service keywords.
 * Creates user + starts onboarding for the first service via SMS.
 *
 * Body: { phoneNumber: string, services: string[] }
 */

const PHONE_REGEX = /^\+?1?\d{10,15}$/;

const services = catalog.services as Service[];
const KEYWORD_MAP = new Map(services.map((s) => [s.keyword.toLowerCase(), s]));
const NAME_MAP = new Map(services.map((s) => [s.name.toLowerCase(), s]));

interface SignupRequest {
  phoneNumber?: string;
  services?: string[];
}

export async function POST(request: Request) {
  try {
    const body: SignupRequest = await request.json();
    const { phoneNumber, services: requestedServices } = body;

    // --- Validate phone number ---
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const cleaned = phoneNumber.replace(/[\s\-()]/g, "");
    if (!PHONE_REGEX.test(cleaned)) {
      return NextResponse.json(
        { error: "Invalid phone number format. Please provide a valid US phone number." },
        { status: 400 }
      );
    }

    const phone = cleaned.startsWith("+") ? cleaned : `+1${cleaned}`;

    // --- Validate services ---
    if (!requestedServices || !Array.isArray(requestedServices) || requestedServices.length === 0) {
      return NextResponse.json(
        { error: "At least one service is required." },
        { status: 400 }
      );
    }

    // Resolve service keywords/names to Service objects
    const resolvedServices: Service[] = [];
    const invalid: string[] = [];

    for (const s of requestedServices) {
      const lower = s.toLowerCase();
      const service = KEYWORD_MAP.get(lower) || NAME_MAP.get(lower);
      if (service) {
        resolvedServices.push(service);
      } else {
        invalid.push(s);
      }
    }

    if (invalid.length > 0) {
      return NextResponse.json(
        { error: `Unknown services: ${invalid.join(", ")}` },
        { status: 400 }
      );
    }

    // --- Start onboarding for the first service ---
    // Lazy import to avoid Prisma connection at build time
    const { startOnboarding } = await import("@/lib/onboarding");
    const { sendSms } = await import("@/lib/sms");

    const firstService = resolvedServices[0];
    const welcomeMessage = await startOnboarding(phone, firstService);

    // Send the first onboarding question via SMS
    await sendSms(phone, welcomeMessage);

    // If multiple services, let the user know they'll set up the rest after
    if (resolvedServices.length > 1) {
      const remaining = resolvedServices
        .slice(1)
        .map((s) => `${s.emoji} ${s.name}`)
        .join(", ");
      await sendSms(
        phone,
        `After setting up ${firstService.name}, we'll get you started on: ${remaining}. One at a time!`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Welcome to BotherMe! Check your phone — we've sent you a text to set up ${firstService.name}.`,
        data: {
          phoneNumber: phone,
          services: resolvedServices.map((s) => ({
            name: s.name,
            keyword: s.keyword,
          })),
          subscribedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON with phoneNumber and services." },
      { status: 400 }
    );
  }
}
