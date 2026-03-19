import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 BotherMe.co",
  description: "How BotherMe.co collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-dark/40">
          Last updated: March 18, 2026
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-dark/70">
          {/* Intro */}
          <section>
            <p>
              BotherMe.co (&ldquo;BotherMe,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates an SMS-based
              micro-habit tracking service. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use
              our text message services and website at botherme.co.
            </p>
            <p className="mt-3">
              We take your privacy seriously. We make money from subscriptions,
              not surveillance. If you have questions, email us at{" "}
              <a
                href="mailto:privacy@botherme.co"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
              >
                privacy@botherme.co
              </a>
              .
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              1. Information We Collect
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-dark">
                  Information you provide directly:
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Phone number</strong> &mdash; Required to send and
                    receive text messages. Stored in E.164 format.
                  </li>
                  <li>
                    <strong>Service preferences</strong> &mdash; Which BotherMe
                    services you subscribe to, your preferred text times, and
                    your setup answers (e.g., medication names, contact lists,
                    daily goals).
                  </li>
                  <li>
                    <strong>Text message replies</strong> &mdash; Your responses
                    to our daily texts (e.g., &ldquo;YES,&rdquo; a number, free
                    text entries like gratitude journal responses).
                  </li>
                  <li>
                    <strong>Accountability buddy phone number</strong> &mdash;
                    If you choose to set one up, we store the phone number of
                    your designated accountability contact.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-dark">
                  Information collected automatically:
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Streak and tracking data</strong> &mdash;
                    Consecutive-day counts, reply history, and progress toward
                    your goals.
                  </li>
                  <li>
                    <strong>Message delivery metadata</strong> &mdash;
                    Timestamps, delivery status, and Twilio message identifiers.
                  </li>
                  <li>
                    <strong>Website analytics</strong> &mdash; Standard web
                    analytics (page views, referral source) collected via
                    privacy-respecting tools. No third-party ad trackers.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              2. How We Use Your Information
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Deliver our service</strong> &mdash; Send you daily text
                messages, track your streaks, and generate progress reports.
              </li>
              <li>
                <strong>Personalize your experience</strong> &mdash; Customize
                message content based on your setup answers and reply history.
              </li>
              <li>
                <strong>Accountability alerts</strong> &mdash; If you opt in,
                notify your designated accountability buddy when you miss
                consecutive days.
              </li>
              <li>
                <strong>Safety escalations</strong> &mdash; For certain services
                (e.g., ElderCheck, SobrietyCounter), detect potential crisis
                situations and provide resource information or alert emergency
                contacts.
              </li>
              <li>
                <strong>Improve our service</strong> &mdash; Analyze aggregate,
                anonymized usage patterns to improve message timing, content, and
                service design.
              </li>
              <li>
                <strong>Billing</strong> &mdash; Process subscription payments
                through our payment processor (Stripe).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              3. What We Do NOT Do
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>
                We do <strong>not</strong> sell your personal data to third
                parties. Ever.
              </li>
              <li>
                We do <strong>not</strong> use your data for targeted
                advertising.
              </li>
              <li>
                We do <strong>not</strong> share your phone number, reply
                content, or health-related data with data brokers, advertisers,
                or marketing companies.
              </li>
              <li>
                We do <strong>not</strong> use your data to build advertising
                profiles.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              4. Data Sharing
            </h2>
            <p className="mt-4">
              We share your information only in these limited circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Twilio</strong> &mdash; Our SMS infrastructure provider.
                Twilio processes your phone number and message content to deliver
                texts. See{" "}
                <a
                  href="https://www.twilio.com/legal/privacy"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twilio&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Stripe</strong> &mdash; Our payment processor. Stripe
                handles billing information. We do not store your credit card
                details. See{" "}
                <a
                  href="https://stripe.com/privacy"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Your accountability buddy</strong> &mdash; If you opt
                in, we send limited notifications (e.g., &ldquo;Your person
                missed their medication 2 days in a row&rdquo;) to the phone
                number you provide. We never share your full reply history with
                them.
              </li>
              <li>
                <strong>Law enforcement</strong> &mdash; Only when required by
                valid legal process (subpoena, court order). We will notify you
                unless legally prohibited from doing so.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              5. Data Retention
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Active accounts</strong> &mdash; We retain your data for
                as long as your account is active.
              </li>
              <li>
                <strong>After cancellation</strong> &mdash; We delete your reply
                history and setup answers within 30 days of account
                cancellation. Your phone number is retained for 90 days to
                prevent accidental re-billing, then deleted.
              </li>
              <li>
                <strong>Anonymized data</strong> &mdash; Aggregate, anonymized
                statistics (e.g., &ldquo;72% of HydroNudge users hit their
                water goal&rdquo;) may be retained indefinitely.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              6. Data Security
            </h2>
            <p className="mt-4">
              We protect your data with industry-standard measures including:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Encrypted database connections (TLS/SSL)</li>
              <li>
                Twilio webhook signature validation to prevent spoofed messages
              </li>
              <li>
                No plain-text storage of sensitive data (accountability buddy
                numbers are stored but never displayed in full)
              </li>
              <li>Access controls limiting employee access to production data</li>
            </ul>
            <p className="mt-3">
              No system is 100% secure. If we discover a breach affecting your
              data, we will notify you via SMS and email within 72 hours.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              7. Your Rights
            </h2>
            <p className="mt-4">You can:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Access your data</strong> &mdash; Text STATUS to see
                your active services and streaks. Email us for a full data
                export.
              </li>
              <li>
                <strong>Delete your data</strong> &mdash; Text STOP to cancel
                all services. Email{" "}
                <a
                  href="mailto:privacy@botherme.co"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                >
                  privacy@botherme.co
                </a>{" "}
                to request complete data deletion.
              </li>
              <li>
                <strong>Pause without deleting</strong> &mdash; Text PAUSE to
                stop all messages while keeping your data and streaks intact.
              </li>
              <li>
                <strong>Opt out of accountability alerts</strong> &mdash; Text
                HELP and we&apos;ll walk you through removing your buddy
                contact.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              8. SMS-Specific Disclosures
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>
                Message frequency varies by service (1&ndash;4 messages per day
                per service).
              </li>
              <li>
                Message and data rates may apply depending on your mobile
                carrier plan.
              </li>
              <li>
                Text STOP at any time to unsubscribe from all services. Text
                HELP for support.
              </li>
              <li>
                Supported carriers include AT&amp;T, T-Mobile, Verizon, and all
                major US carriers.
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              9. Children&apos;s Privacy
            </h2>
            <p className="mt-4">
              BotherMe is not intended for use by individuals under 13 years of
              age. We do not knowingly collect personal information from children
              under 13. If we learn we have collected data from a child under 13,
              we will delete it promptly.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              10. Changes to This Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. We will notify
              you of material changes via SMS to your registered phone number.
              Continued use of our services after notification constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-dark/[0.06] bg-card p-6">
            <h2 className="font-display text-xl font-bold text-dark">
              Contact Us
            </h2>
            <p className="mt-3">
              Questions about this policy or your data? Reach out:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@botherme.co"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                >
                  privacy@botherme.co
                </a>
              </li>
              <li>
                Text: Send HELP to{" "}
                <span className="font-semibold">(855) 812-6669</span>
              </li>
              <li>
                Mail: BotherMe.co, Attn: Privacy, [Address to be added]
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
