"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "I\u2019ve taken my blood pressure medication every single day for 47 days. Before BotherMe, my record was 6 days. My doctor asked what changed. I said \u2018I hired a robot to guilt-trip me via text.\u2019",
    name: "Marcus T.",
    detail: "PillPing subscriber",
    service: "PillPing",
  },
  {
    quote:
      "The FlossCoach texts are passive-aggressive in the best possible way. Yesterday it said \u2018Your streak is 28 days. Your dentist would be so proud. IF you had a dentist appointment. Do you? Book one.\u2019 Savage. Effective.",
    name: "Priya K.",
    detail: "FlossCoach subscriber",
    service: "FlossCoach",
  },
  {
    quote:
      "I signed up for CallMom and FriendPoke. My mom called ME last week to say \u2018you\u2019ve been calling so much, is everything okay?\u2019 Mission accomplished.",
    name: "Jake R.",
    detail: "Relationships bundle subscriber",
    service: "Relationships",
  },
  {
    quote:
      "I was skeptical that a $2/month text message could fix my water intake. Then I realized I\u2019d been dehydrated for approximately 15 years. I drink 8 glasses a day now. The bar was underground.",
    name: "Sarah L.",
    detail: "HydroNudge subscriber",
    service: "HydroNudge",
  },
  {
    quote:
      "My partner and I both use CoupleCheckIn. We rate our week separately, then compare notes. It replaced about $400/month in couples therapy. (We still go. But now we have data.)",
    name: "Anonymous",
    detail: "CoupleCheckIn subscribers",
    service: "CoupleCheckIn",
  },
  {
    quote:
      "I set the accountability buddy to text my older sister if I miss my workout 3 days in a row. I have not missed a workout in 2 months. Fear is the greatest motivator and my sister is terrifying.",
    name: "David M.",
    detail: "StepCheck subscriber",
    service: "StepCheck",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary/15"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
    </svg>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
        disabled
          ? "border-dark/5 text-dark/15 cursor-not-allowed"
          : "border-dark/10 text-dark/50 hover:border-primary hover:bg-primary/5 hover:text-primary"
      }`}
      aria-label={`Scroll ${direction}`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        )}
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Determine active dot
    const cardWidth = el.scrollWidth / TESTIMONIALS.length;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, TESTIMONIALS.length - 1));
  }, []);

  const scrollTo = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.querySelector("div")?.offsetWidth ?? 400;
      const gap = 20;
      el.scrollBy({
        left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
        behavior: "smooth",
      });
    },
    []
  );

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / TESTIMONIALS.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, []);

  // Auto-scroll
  useEffect(() => {
    const start = () => {
      autoScrollRef.current = setInterval(() => {
        const el = scrollRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollTo("right");
        }
      }, 5000);
    };
    start();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [scrollTo]);

  // Pause auto-scroll on hover
  const pauseAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  };
  const resumeAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollTo("right");
      }
    }, 5000);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Real stories
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
              People who pay us
              <br className="hidden lg:block" />{" "}
              <span className="text-primary">to bother them</span>
            </h2>
          </div>
          {/* Desktop arrows */}
          <div className="hidden items-center gap-2 sm:flex">
            <ArrowButton
              direction="left"
              onClick={() => scrollTo("left")}
              disabled={!canScrollLeft}
            />
            <ArrowButton
              direction="right"
              onClick={() => scrollTo("right")}
              disabled={!canScrollRight}
            />
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="w-[340px] flex-shrink-0 snap-start rounded-2xl border border-dark/[0.05] bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-md sm:w-[400px]"
            >
              {/* Quote icon + stars */}
              <div className="flex items-start justify-between">
                <QuoteIcon />
                <StarRating />
              </div>

              {/* Quote text */}
              <p className="mt-4 text-[15px] leading-relaxed text-dark/70">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-dark/[0.05] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.08] font-display text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{t.name}</p>
                  <p className="text-xs text-dark/45">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-dark/15 hover:bg-dark/25"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
          <ArrowButton
            direction="left"
            onClick={() => scrollTo("left")}
            disabled={!canScrollLeft}
          />
          <ArrowButton
            direction="right"
            onClick={() => scrollTo("right")}
            disabled={!canScrollRight}
          />
        </div>
      </div>
    </section>
  );
}
