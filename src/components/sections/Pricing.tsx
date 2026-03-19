"use client";

import { useState } from "react";

interface Plan {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PLANS: Plan[] = [
  {
    name: "The Gentle Nudge",
    tagline: "For people who need a little push",
    monthlyPrice: 2,
    annualPrice: 20,
    features: [
      "1 bother service",
      "Daily texts at your preferred time",
      "Weekly streak reports",
    ],
    cta: "Get Nudged",
    highlighted: false,
  },
  {
    name: "The Full Nag",
    tagline: "For people who need to be hunted",
    monthlyPrice: 7,
    annualPrice: 70,
    features: [
      "Up to 5 bother services",
      "Daily texts + mid-day check-ins",
      "Weekly streak reports + monthly summaries",
      "Accountability buddy alerts",
    ],
    cta: "Get Nagged",
    highlighted: true,
  },
  {
    name: "The Relentless",
    tagline:
      "For people who\u2019ve given up on self-discipline and outsourced it to texts",
    monthlyPrice: 12,
    annualPrice: 120,
    features: [
      "Unlimited bother services",
      "Aggressive timing (morning, afternoon, evening)",
      "Real-time streak protection alerts",
      "Family/partner dashboard",
      "Monthly PDF progress report",
    ],
    cta: "Get Relentless",
    highlighted: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative px-6 py-24 sm:py-32">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Simple pricing
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Cheaper than therapy.
            <br className="hidden sm:block" />
            <span className="text-primary">
              {" "}
              More persistent than your ex.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-dark/50">
            Pick a plan. Cancel anytime. We won&apos;t cry&hellip; much.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium ${!annual ? "text-dark" : "text-dark/40"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-7 w-[52px] rounded-full transition-colors duration-300 ${
              annual ? "bg-primary" : "bg-dark/15"
            }`}
            aria-label="Toggle annual billing"
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                annual ? "translate-x-[25px]" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${annual ? "text-dark" : "text-dark/40"}`}
          >
            Annual
          </span>
          {annual && (
            <span className="rounded-full bg-success/10 px-3 py-0.5 text-xs font-bold text-success">
              2 months free
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid items-start gap-6 md:grid-cols-3 lg:gap-8">
          {PLANS.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const period = annual ? "/yr" : "/mo";
            const monthlyEquiv = annual
              ? (plan.annualPrice / 12).toFixed(2)
              : null;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-lg ${
                  plan.highlighted
                    ? "border-2 border-primary bg-card shadow-xl shadow-primary/10 md:-mt-4 md:mb-[-1rem] md:p-10"
                    : "border border-dark/[0.06] bg-card shadow-sm"
                }`}
              >
                {/* Most Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1 text-xs font-bold tracking-wide text-white shadow-lg shadow-accent/25">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan name & tagline */}
                <h3 className="font-display text-xl font-bold text-dark">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-dark/45">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold tracking-tight text-dark">
                    ${price}
                  </span>
                  <span className="text-base text-dark/40">{period}</span>
                </div>
                {annual && monthlyEquiv && (
                  <p className="mt-1 text-xs text-dark/35">
                    That&apos;s ${monthlyEquiv}/mo &mdash; less than a bad
                    coffee
                  </p>
                )}

                {/* CTA */}
                <a
                  href="#cta"
                  className={`mt-8 block rounded-full py-3.5 text-center text-sm font-bold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:brightness-110"
                      : "border border-dark/10 text-dark hover:border-primary hover:bg-primary/[0.04] hover:text-primary"
                  }`}
                >
                  {plan.cta}
                </a>

                {/* Features */}
                <ul className="mt-8 space-y-3 border-t border-dark/[0.06] pt-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-dark/65"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Included in all plans note */}
        <div className="mt-16 rounded-2xl border border-dark/[0.05] bg-card p-8 text-center sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-dark/30">
            All plans include
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "💬", text: "Unlimited replies" },
              { icon: "📵", text: "Zero apps to download" },
              { icon: "🚪", text: "No contracts (quit anytime)" },
              { icon: "📟", text: "Works on every phone since 2003" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-dark/55">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise note */}
        <p className="mt-8 text-center text-sm text-dark/35">
          <span className="font-semibold text-dark/50">Enterprise pricing</span>{" "}
          available for companies that want to bother their employees into
          wellness.{" "}
          <span className="text-dark/45">
            We&apos;re serious.{" "}
            <a
              href="mailto:hello@botherme.co?subject=BotherMe%20enterprise%20inquiry"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
            >
              Email us
            </a>
            .
          </span>
        </p>
      </div>
    </section>
  );
}
