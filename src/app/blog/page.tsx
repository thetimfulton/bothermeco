import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Blog \u2014 BotherMe.co",
  description:
    "Thoughts on habit-building, accountability via text, and why we chose to annoy people for a living.",
};

const POSTS = [
  {
    slug: "why-we-built-a-company-that-annoys-people",
    title: "Why We Built a Company That Annoys People on Purpose",
    excerpt:
      "Most startups try to make users happy. We decided to make them mildly uncomfortable — and it turns out that's way more effective.",
    date: "Mar 12, 2026",
    readTime: "6 min read",
    gradient: "from-primary to-[#7C3AED]",
  },
  {
    slug: "science-of-text-message-habits",
    title: "The Science of Why Text Message Habits Beat Apps Every Time",
    excerpt:
      "App fatigue is real. We looked at the research on SMS-based interventions and the results were annoyingly clear.",
    date: "Mar 5, 2026",
    readTime: "8 min read",
    gradient: "from-accent to-[#F59E0B]",
  },
  {
    slug: "100-days-of-flossing",
    title:
      "I Flossed for 100 Days Straight and All I Got Was Healthy Gums",
    excerpt:
      "A first-person account of what happens when you let a text message bully you into dental hygiene. Spoiler: your dentist notices.",
    date: "Feb 24, 2026",
    readTime: "5 min read",
    gradient: "from-primary to-accent",
  },
];

function BlogCard({
  post,
  index,
}: {
  post: (typeof POSTS)[number];
  index: number;
}) {
  return (
    <FadeIn delay={index * 100}>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-dark/[0.05] bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/[0.06] dark:border-white/[0.06]">
        {/* Gradient placeholder image */}
        <div
          className={`relative h-48 bg-gradient-to-br ${post.gradient} sm:h-56`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="h-32 w-32 rounded-full bg-white/30 blur-2xl" />
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium text-dark/40 dark:text-white/40">
            {post.date}
          </p>

          <h2 className="mt-2 font-display text-lg font-bold leading-snug text-dark transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary sm:text-xl">
            {post.title}
          </h2>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/55 dark:text-white/50">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
          >
            Read
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}

export default function BlogPage() {
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeIn>
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
              Blog
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-dark dark:text-white sm:text-4xl lg:text-5xl">
              Thoughts, stories &{" "}
              <span className="text-primary">unsolicited advice</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-dark/50 dark:text-white/50">
              On habit-building, accountability via text, and why we chose to
              annoy people for a living.
            </p>
          </div>
        </FadeIn>

        {/* Post grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* Coming soon note */}
        <FadeIn>
          <div className="mt-16 rounded-2xl border border-dashed border-dark/10 bg-dark/[0.02] p-8 text-center dark:border-white/10 dark:bg-white/[0.02]">
            <p className="text-2xl">✍️</p>
            <p className="mt-3 font-display text-lg font-bold text-dark dark:text-white">
              More posts coming soon
            </p>
            <p className="mt-1 text-sm text-dark/45 dark:text-white/40">
              We&apos;re too busy bothering people to write blog posts. But
              we&apos;re working on it.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
