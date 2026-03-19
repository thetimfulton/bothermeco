"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const messages: { sender: "bot" | "user"; text: string }[] = [
  { sender: "bot", text: "Did you drink water today? 💧" },
  { sender: "user", text: "no" },
  { sender: "bot", text: "Unacceptable. Drink a glass right now. I'll wait." },
  { sender: "bot", text: "...still waiting." },
  { sender: "user", text: "fine. done." },
  {
    sender: "bot",
    text: "That's 4 glasses today. 4 more to go. I believe in you (but I'll also check back in 2 hours).",
  },
];

function PhoneMockup() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const delay = visibleCount === 0 ? 600 : 900 + Math.random() * 400;
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div className="animate-float relative mx-auto w-[300px] sm:w-[320px]">
      {/* Phone shell — hardcoded colors so dark mode doesn't affect the phone UI */}
      <div className="rounded-[2.5rem] border-[3px] border-[#1A1A2E]/10 bg-white p-2 shadow-2xl shadow-[#1A1A2E]/10">
        {/* Notch */}
        <div className="relative rounded-[2rem] bg-gradient-to-b from-[#f5f5f4] to-[#ececea] px-4 pb-5 pt-8">
          {/* Status bar */}
          <div className="absolute top-2 left-0 flex w-full items-center justify-center">
            <div className="h-[5px] w-20 rounded-full bg-[#1A1A2E]/10" />
          </div>

          {/* Header bar */}
          <div className="mb-4 flex items-center gap-2 border-b border-[#1A1A2E]/5 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              B
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A2E]">BotherMe</p>
              <p className="text-[10px] text-[#1A1A2E]/40">SMS &middot; Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex min-h-[280px] flex-col gap-2.5">
            {messages.slice(0, visibleCount).map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`animate-msg-in max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
                    msg.sender === "bot"
                      ? "rounded-bl-sm bg-white text-[#1A1A2E] shadow-sm"
                      : "rounded-br-sm bg-primary text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {visibleCount < messages.length && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-white px-4 py-2.5 shadow-sm">
                  <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-[#1A1A2E]/30" />
                  <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-[#1A1A2E]/30 [animation-delay:0.15s]" />
                  <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-[#1A1A2E]/30 [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="mt-3 flex items-center gap-2 rounded-full border border-[#1A1A2E]/10 bg-white px-4 py-2">
            <span className="flex-1 text-xs text-[#1A1A2E]/30">iMessage</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind phone */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-60 -left-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — Copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              SMS-first micro-habits
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-6xl">
              We text you.
              <br />
              You become a better person.
              <br />
              <span className="text-primary">That&apos;s the whole app.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dark/55 lg:mx-0 lg:text-xl">
              No downloads. No logins. No willpower required. Just a daily text
              that won&apos;t leave you alone until you do the thing.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#pricing"
                className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.98] hover:animate-wiggle"
              >
                Start Getting Bothered &mdash; $3/mo
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-1.5 text-base font-semibold text-dark/60 transition-colors hover:text-primary"
              >
                See all 50 ways we&apos;ll annoy you
                <span className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              {/* Avatars cluster */}
              <div className="flex -space-x-2">
                {["bg-primary", "bg-accent", "bg-success", "bg-primary-light"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-full border-2 border-bg ${color} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {["S", "M", "J", "A"][i]}
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-dark/45">
                <span className="font-semibold text-dark/70">2,847</span> people
                are already being productively annoyed
              </p>
            </div>

            {/* Streak counter */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-2 lg:ml-0">
              <span className="text-lg">🔥</span>
              <p className="text-sm text-dark/60">
                <AnimatedCounter
                  target={14892}
                  duration={2500}
                  className="font-display text-base font-bold text-success"
                />{" "}
                habits tracked today
              </p>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex-shrink-0">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
