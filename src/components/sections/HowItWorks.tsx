const STEPS = [
  {
    number: "01",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    title: "Text us a keyword",
    description:
      'Text WATER, PILLS, FLOSS, or any of our 50 services to (555) 268-4371. That\u2019s it. That\u2019s the signup.',
    detail: "Takes 11 seconds. We timed it.",
  },
  {
    number: "02",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "Answer 3 setup questions",
    description:
      "We\u2019ll text you back to ask when you want to be bothered, how aggressively, and who to tattle on if you ghost us.",
    detail: "Yes, we will text your mom.",
  },
  {
    number: "03",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    ),
    title: "Get bothered. Get better.",
    description:
      "Every day, you get a text. You reply YES or NO or a number. We track your streaks, celebrate your wins, and guilt-trip your losses.",
    detail: "Streaks are weirdly addictive.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Stupidly simple
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Three steps. No app.{" "}
            <span className="text-primary">No excuses.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-dark/50">
            If you can text, you can use BotherMe. Seriously.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-3 lg:gap-6">
          {/* Connecting arrows — desktop only */}
          <div className="pointer-events-none absolute top-[3.5rem] z-10 hidden md:flex left-0 right-0 justify-center">
            <div className="flex w-full max-w-4xl items-center justify-around px-[15%]">
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="text-primary/30">
                <line x1="0" y1="12" x2="65" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M62 6 L74 12 L62 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="text-primary/30">
                <line x1="0" y1="12" x2="65" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M62 6 L74 12 L62 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-dark/[0.04] bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/[0.08]"
            >
              {/* Step number + icon row */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>
                <span className="font-display text-4xl font-bold text-dark/[0.08]">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-bold text-dark">
                {step.title}
              </h3>

              <p className="mt-3 leading-relaxed text-dark/55">
                {step.description}
              </p>

              {/* Fun detail line */}
              <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary/70">
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
