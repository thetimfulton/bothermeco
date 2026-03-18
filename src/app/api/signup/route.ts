import { NextResponse } from "next/server";

/**
 * POST /api/signup
 *
 * Accepts a phone number and list of services to subscribe to.
 * Currently a stub — will connect to Twilio in the future.
 *
 * Body: { phoneNumber: string, services: string[] }
 */

// E.164 format: +1XXXXXXXXXX or basic US format
const PHONE_REGEX = /^\+?1?\d{10,15}$/;

// Valid service slugs
const VALID_SERVICES = [
  "pillping",
  "hydronudge",
  "friendpoke",
  "spendalert",
  "moodpulse",
  "flosscoach",
  "gratitudetext",
  "dadtext",
  "callmom",
  "nospendday",
  "sleeplog",
  "plantparent",
];

interface SignupRequest {
  phoneNumber?: string;
  services?: string[];
}

export async function POST(request: Request) {
  try {
    const body: SignupRequest = await request.json();
    const { phoneNumber, services } = body;

    // --- Validate phone number ---
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Strip spaces, dashes, and parens for validation
    const cleaned = phoneNumber.replace(/[\s\-()]/g, "");

    if (!PHONE_REGEX.test(cleaned)) {
      return NextResponse.json(
        {
          error:
            "Invalid phone number format. Please provide a valid US phone number.",
        },
        { status: 400 }
      );
    }

    // --- Validate services ---
    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { error: "At least one service is required." },
        { status: 400 }
      );
    }

    const invalidServices = services.filter(
      (s) => !VALID_SERVICES.includes(s.toLowerCase())
    );

    if (invalidServices.length > 0) {
      return NextResponse.json(
        {
          error: `Unknown services: ${invalidServices.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // --- TODO: Connect to Twilio ---
    // 1. Send welcome SMS via Twilio
    // 2. Store signup in database
    // 3. Initialize streak tracking
    //
    // const twilio = require('twilio')(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    //
    // await twilio.messages.create({
    //   body: `Welcome to BotherMe! You signed up for: ${services.join(', ')}. Reply HELP for options or STOP to cancel.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: cleaned,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to BotherMe! You'll receive your first text shortly.",
        data: {
          phoneNumber: cleaned,
          services: services.map((s) => s.toLowerCase()),
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
