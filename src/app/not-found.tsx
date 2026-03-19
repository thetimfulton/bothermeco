import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Big 404 */}
      <p className="font-display text-8xl font-bold text-primary/20 sm:text-9xl">
        404
      </p>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-dark/55">
        But you know what does exist?{" "}
        <span className="font-semibold text-dark/80">
          Your unfinished to-do list.
        </span>{" "}
        Text{" "}
        <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-sm font-bold text-primary">
          START
        </span>{" "}
        to{" "}
        <span className="font-semibold text-dark">(855) 812-6669</span> and
        let us bother you about it.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110"
        >
          Go Home
        </Link>
        <Link
          href="/#services"
          className="text-sm font-semibold text-dark/50 transition-colors hover:text-primary"
        >
          Browse Services &rarr;
        </Link>
      </div>
    </div>
  );
}
