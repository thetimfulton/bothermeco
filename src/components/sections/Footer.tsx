"use client";

import { useState } from "react";

/* ─── Social icons (X, Instagram, TikTok) ─── */
function XIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  const [phone, setPhone] = useState("");

  return (
    <section
      id="cta"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-primary to-[#7C3AED]" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Ready to be bothered?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Text{" "}
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm font-bold text-white">
            START
          </span>{" "}
          to{" "}
          <span className="font-semibold text-white">(855) 812-6669</span>{" "}or
          drop your number below and we&apos;ll text YOU first. (See? We&apos;re
          already being pushy.)
        </p>

        {/* Phone input */}
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 transition-all focus-within:ring-2 focus-within:ring-white/40">
            <span className="flex items-center gap-1 border-r border-white/10 px-4 py-3.5 text-sm text-white/50">
              🇺🇸 +1
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              aria-label="Phone number"
              className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-white/35 outline-none"
            />
          </div>
          <button className="rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.98] hover:animate-wiggle">
            Bother Me
          </button>
        </div>

        <p className="mt-4 text-sm text-white/60">
          We&apos;ll text you once to get started. No spam. We&apos;re annoying
          on purpose, not by accident.
        </p>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/65">
          <span className="flex items-center gap-1.5">
            <span>🔒</span> No spam ever
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="flex items-center gap-1.5">
            <span>📱</span> Works on all phones
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="flex items-center gap-1.5">
            <span>❌</span> Cancel anytime via text
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
export default function Footer() {
  return (
    <>
      <CTASection />

      <footer className="bg-[#1A1A2E] px-6 pt-16 pb-8">
        <div className="mx-auto max-w-6xl">
          {/* Main footer grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Left — Brand */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-bold text-white">
                  BotherMe
                </span>
                <span className="text-lg font-bold text-accent">.co</span>
              </div>
              <p className="mt-3 text-sm text-white/40">
                High Function. Mild Chaos.&trade;
              </p>
              <p className="mt-1 text-sm text-white/25">
                &copy; 2026 BotherMe.co
              </p>
            </div>

            {/* Center — Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                Company
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Blog", href: "/blog" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/careers"
                    className="group text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Careers{" "}
                    <span className="text-xs text-accent/70 transition-colors group-hover:text-accent">
                      &mdash; We&apos;re hiring people who are annoyingly
                      persistent
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Right — Social + contact */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                Connect
              </p>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: <XIcon />, label: "X" },
                  { icon: <InstagramIcon />, label: "Instagram" },
                  { icon: <TikTokIcon />, label: "TikTok" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/40 transition-all hover:bg-white/10 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <a
                href="mailto:hello@botherme.co"
                className="mt-4 inline-block text-sm text-white/50 transition-colors hover:text-white"
              >
                hello@botherme.co
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <div className="flex gap-6 text-xs text-white/50">
              <a href="/privacy" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/80 hover:decoration-white/40">
                Privacy Policy
              </a>
              <a href="/terms" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/80 hover:decoration-white/40">
                Terms of Service
              </a>
            </div>
            <p className="text-xs text-white/35">
              Built with Twilio and spite.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
