import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — BotherMe.co",
  description:
    "We're hiring people who are annoyingly persistent. Sound like you?",
};

const PERKS = [
  {
    emoji: "🏠",
    title: "Fully remote",
    description: "Work from anywhere with Wi-Fi and poor impulse control.",
  },
  {
    emoji: "📱",
    title: "Unlimited texting plan",
    description: "Obviously. It's literally the product.",
  },
  {
    emoji: "🧘",
    title: "Wellness stipend",
    description:
      "We'll pay you to do the things we nag other people about. Lead by example.",
  },
  {
    emoji: "🗓️",
    title: "Flexible hours",
    description:
      "As long as you're annoyingly responsive during your timezone's core hours.",
  },
  {
    emoji: "📈",
    title: "Equity",
    description:
      "Own a piece of the company that professionally bothers people. Tell your parents.",
  },
  {
    emoji: "🎉",
    title: "Unlimited PTO",
    description:
      "We trust you. But we will text you if you've been gone too long. It's what we do.",
  },
];

const OPENINGS = [
  {
    title: "Senior Backend Engineer",
    type: "Full-time / Remote",
    description:
      "Build the systems that send millions of annoying texts per day. You'll work with Twilio, Stripe, and an unreasonable number of cron jobs. Must be comfortable with the knowledge that your code will interrupt people's showers.",
  },
  {
    title: "Growth Marketer",
    type: "Full-time / Remote",
    description:
      "Convince people to pay us to bother them. If you can make that pitch with a straight face, you're hired. Experience with SMS marketing, content strategy, and unhinged Twitter threads preferred.",
  },
  {
    title: "Copywriter",
    type: "Contract / Remote",
    description:
      "Write the texts that make people drink water, call their mom, and floss. Tone: supportive but slightly passive-aggressive. If your friends describe you as 'a lot,' this is your dream job.",
  },
  {
    title: "Customer Support (via text, obviously)",
    type: "Part-time / Remote",
    description:
      "Help users who text HELP. Troubleshoot billing issues. Convince people who text STOP that they're making a huge mistake. Must type fast and have strong opinions about hydration.",
  },
];

export default function CareersPage() {
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-primary">Careers</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          We&apos;re hiring people who are annoyingly persistent.
        </h1>
        <p className="mt-4 text-lg text-dark/60">
          Sound like you? Good. We need that energy.
        </p>

        <div className="mt-10 space-y-16 text-[15px] leading-relaxed text-dark/70">
          {/* Intro */}
          <section>
            <p>
              BotherMe is a small, remote team building the world&apos;s most
              lovably annoying product. We send people texts that make them
              better humans. It&apos;s simple, it&apos;s weird, and it actually
              works.
            </p>
            <p className="mt-3">
              We&apos;re looking for people who care about craft, don&apos;t
              take themselves too seriously, and understand that sometimes the
              best product is the one that won&apos;t leave you alone.
            </p>
          </section>

          {/* Values */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              What we value
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <strong className="text-dark">Ship fast, apologize never.</strong>{" "}
                We&apos;d rather launch something imperfect than debate it for
                three sprints. Our users literally signed up to be bothered
                &mdash; they can handle a rough edge.
              </li>
              <li>
                <strong className="text-dark">Be the user.</strong> Everyone on
                the team uses BotherMe. If you don&apos;t drink your water,
                we&apos;ll know.
              </li>
              <li>
                <strong className="text-dark">Write like a human.</strong> No
                corporate speak. No &ldquo;leveraging synergies.&rdquo; If it
                sounds like it came from a press release, rewrite it until it
                sounds like a text from a friend who cares too much.
              </li>
              <li>
                <strong className="text-dark">Persistence is a feature.</strong>{" "}
                We don&apos;t give up on our users and we don&apos;t give up on
                hard problems. Stubbornness is in the job description. Literally.
              </li>
            </ul>
          </section>

          {/* Perks */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">Perks</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PERKS.map((perk) => (
                <div
                  key={perk.title}
                  className="rounded-xl border border-dark/[0.06] bg-dark/[0.02] p-5"
                >
                  <span className="text-2xl">{perk.emoji}</span>
                  <h3 className="mt-2 font-semibold text-dark">{perk.title}</h3>
                  <p className="mt-1 text-sm text-dark/50">{perk.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open roles */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              Open roles
            </h2>
            <div className="mt-6 space-y-6">
              {OPENINGS.map((role) => (
                <div
                  key={role.title}
                  className="rounded-xl border border-dark/[0.06] p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-dark">{role.title}</h3>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {role.type}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-dark/60">{role.description}</p>
                  <a
                    href="mailto:careers@botherme.co"
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    Apply &rarr;
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-dark">
              Don&apos;t see your role?
            </h2>
            <p className="mt-2 text-dark/60">
              We&apos;re always looking for talented, slightly unhinged people.
              Send us a note at{" "}
              <a
                href="mailto:careers@botherme.co"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
              >
                careers@botherme.co
              </a>{" "}
              and tell us why you&apos;d be a great addition to the team that
              professionally nags strangers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
