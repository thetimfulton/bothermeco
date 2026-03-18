"use client";

import { useState } from "react";

type Category =
  | "Health & Body"
  | "Money & Career"
  | "Relationships"
  | "Mind & Mood"
  | "Home & Life";

const CATEGORY_COLORS: Record<Category, string> = {
  "Health & Body": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Money & Career": "bg-amber-50 text-amber-700 border-amber-200",
  Relationships: "bg-pink-50 text-pink-700 border-pink-200",
  "Mind & Mood": "bg-violet-50 text-violet-700 border-violet-200",
  "Home & Life": "bg-sky-50 text-sky-700 border-sky-200",
};

const FILTERS: ("All" | Category)[] = [
  "All",
  "Health & Body",
  "Money & Career",
  "Relationships",
  "Mind & Mood",
  "Home & Life",
];

interface Product {
  emoji: string;
  name: string;
  category: Category;
  sampleText: string;
  price: string;
}

const PRODUCTS: Product[] = [
  {
    emoji: "💊",
    name: "PillPing",
    category: "Health & Body",
    sampleText: "Did you take your meds today?",
    price: "$3/mo",
  },
  {
    emoji: "💧",
    name: "HydroNudge",
    category: "Health & Body",
    sampleText: "You\u2019re dehydrated and we both know it.",
    price: "$2/mo",
  },
  {
    emoji: "👋",
    name: "FriendPoke",
    category: "Relationships",
    sampleText: "Text Sarah. It\u2019s been 18 days.",
    price: "$3/mo",
  },
  {
    emoji: "💸",
    name: "SpendAlert",
    category: "Money & Career",
    sampleText: "You spent HOW much today?",
    price: "$3/mo",
  },
  {
    emoji: "🧠",
    name: "MoodPulse",
    category: "Mind & Mood",
    sampleText: "Rate your day 1\u20135. We\u2019re tracking.",
    price: "$4/mo",
  },
  {
    emoji: "🦷",
    name: "FlossCoach",
    category: "Health & Body",
    sampleText: "Floss. Now. Streak: 12 days.",
    price: "$2/mo",
  },
  {
    emoji: "🙏",
    name: "GratitudeText",
    category: "Mind & Mood",
    sampleText: "Name one good thing. Go.",
    price: "$2/mo",
  },
  {
    emoji: "👨",
    name: "DadText",
    category: "Relationships",
    sampleText: "Text your kid. Here\u2019s a prompt.",
    price: "$3/mo",
  },
  {
    emoji: "📞",
    name: "CallMom",
    category: "Relationships",
    sampleText: "It\u2019s been 11 days. Call her.",
    price: "$2/mo",
  },
  {
    emoji: "🚫",
    name: "NoSpendDay",
    category: "Money & Career",
    sampleText: "Can you not spend money today? Try.",
    price: "$2/mo",
  },
  {
    emoji: "😴",
    name: "SleepLog",
    category: "Health & Body",
    sampleText: "How many hours? Be honest.",
    price: "$2/mo",
  },
  {
    emoji: "🪴",
    name: "PlantParent",
    category: "Home & Life",
    sampleText: "Water your monstera. Reply DONE.",
    price: "$2/mo",
  },
];

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const tagColor = CATEGORY_COLORS[product.category];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-dark/[0.05] bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/[0.08]">
      {/* Emoji + name row */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl leading-none">{product.emoji}</span>
        <span
          className={`inline-flex flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tagColor}`}
        >
          {product.category}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold text-dark">
        {product.name}
      </h3>

      {/* Sample text message */}
      <p className="mt-2 flex-1 text-sm italic leading-relaxed text-dark/50">
        &ldquo;{product.sampleText}&rdquo;
      </p>

      {/* Price + Add button */}
      <div className="mt-4 flex items-center justify-between border-t border-dark/[0.05] pt-4">
        <span className="text-lg font-bold text-dark">
          {product.price}
        </span>
        <button
          onClick={() => setAdded(!added)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
            added
              ? "bg-success text-white shadow-sm"
              : "bg-primary/[0.08] text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {added ? (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Added
            </span>
          ) : (
            "+ Add"
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const visible = showAll ? filtered : filtered.slice(0, 12);

  return (
    <section id="services" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1 text-sm font-medium text-accent">
            The menu
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            50 ways to be a better human{" "}
            <span className="text-primary">(via text)</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark/50">
            Pick one. Pick five. Pick all of them. We don&apos;t judge.
            <br className="hidden sm:block" />
            <span className="text-dark/40">
              (We do judge if you pick zero.)
            </span>
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-dark/[0.04] text-dark/60 hover:bg-dark/[0.08] hover:text-dark"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* Show more button */}
        {!showAll && filtered.length > 12 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-dark/10 px-6 py-3 text-sm font-semibold text-dark/60 transition-all hover:border-primary/30 hover:text-primary"
            >
              See all 50
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        )}

        {/* Bottom CTA nudge */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary/[0.06] to-accent/[0.06] p-8 text-center sm:p-10">
          <p className="font-display text-xl font-bold text-dark sm:text-2xl">
            Can&apos;t decide? Start with the{" "}
            <span className="text-primary">Starter Bundle</span> &mdash; 5
            bothers for $7/mo
          </p>
          <p className="mt-2 text-sm text-dark/50">
            That&apos;s less than one bad impulse purchase. You know the one.
          </p>
          <a
            href="#pricing"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110"
          >
            See pricing plans
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
