"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Wait, there\u2019s no app?",
    a: "Correct. No app. No download. No storage space. No \u2018please rate us 5 stars\u2019 popup. No updates. It\u2019s just texts. Your phone already has texts. We checked.",
  },
  {
    q: "How is this different from setting a phone alarm?",
    a: "Your phone alarm doesn\u2019t track your streaks, guilt-trip you when you miss a day, send your mom a report card, or adjust its persistence based on your behavior. Also, you\u2019ve been ignoring your alarms for years. Don\u2019t lie.",
  },
  {
    q: "What if I want to cancel?",
    a: "Text STOP. Done. No retention specialist. No \u2018are you sure?\u2019 screen. No 30-day notice period. No breakup conversation. Just\u2026 stop. (We\u2019ll miss you though. Genuinely.)",
  },
  {
    q: "Is my data private?",
    a: "Yes. We store your phone number, your chosen services, and your reply history. We don\u2019t sell it, share it, or use it to target ads. We make money from subscriptions, not surveillance. Radical concept.",
  },
  {
    q: "What if I don\u2019t reply to the text?",
    a: "We mark it as a miss and your streak resets. If you\u2019ve set an accountability buddy, we tattle on you after your chosen threshold. If you\u2019ve ghosted us for 7 days, we send one final \u2018we miss you\u2019 text and then leave you alone. We have boundaries.",
  },
  {
    q: "Can I customize when I get texted?",
    a: "Yes. During setup, you choose your preferred time for each service. Morning person? 6 AM. Night owl? 10 PM. Chaotic? Random times to keep you on your toes.",
  },
  {
    q: "Does this work on Android AND iPhone?",
    a: "It works on any phone that receives text messages. iPhone, Android, flip phones, your aunt\u2019s ancient BlackBerry, a Nokia from 2004. If it has SMS, we can bother it.",
  },
  {
    q: "$2\u201312/month? Really?",
    a: "Really. Our entire infrastructure is text messages and a database. We don\u2019t have a fancy office or a ping pong table. We have a Twilio account and a dream.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isOpen
          ? "border-primary/20 bg-card shadow-sm"
          : "border-dark/[0.06] bg-card hover:border-dark/10"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`font-display text-[15px] font-semibold transition-colors sm:text-base ${
            isOpen ? "text-primary" : "text-dark"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-primary text-white rotate-45"
              : "bg-dark/[0.06] text-dark/40"
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-[15px] leading-relaxed text-dark/55">
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            FAQ
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Questions we get asked{" "}
            <span className="text-primary">
              <br className="hidden sm:block" />
              (and some we made up)
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-dark/50">
            Everything you need to know before you let a stranger text you daily.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="text-sm text-dark/40">
            Still have questions?{" "}
            <a
              href="sms:+18558126669"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
            >
              Text us
            </a>{" "}
            (obviously) or email{" "}
            <a
              href="mailto:hello@botherme.co?subject=BotherMe%20support%20request"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
            >
              hello@botherme.co
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
