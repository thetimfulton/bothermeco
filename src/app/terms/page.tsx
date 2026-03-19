import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service \u2014 BotherMe.co",
  description: "Terms and conditions for using BotherMe.co SMS services.",
};

export default function TermsOfService() {
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-dark/40">
          Last updated: March 18, 2026
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-dark/70">
          {/* Intro */}
          <section>
            <p>
              Welcome to BotherMe.co (&ldquo;BotherMe,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Service
              (&ldquo;Terms&rdquo;) govern your use of our SMS-based habit
              tracking services and website. By texting our service number or
              using our website, you agree to these Terms.
            </p>
            <p className="mt-3">
              Plain English version: We text you. You text back. We track your
              habits. If you want to stop, text STOP. That&apos;s the gist.
              Below are the details your lawyer would want you to read.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              1. The Service
            </h2>
            <p className="mt-4">
              BotherMe provides SMS-based micro-habit tracking and accountability
              services. We send you daily text messages at times you choose, you
              reply to log your activity, and we track your streaks and progress.
              That&apos;s it. We&apos;re not a medical device, a therapist, or a
              substitute for professional advice.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              2. Eligibility
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>You must be at least 13 years old to use BotherMe.</li>
              <li>
                You must have a valid US mobile phone number capable of sending
                and receiving SMS text messages.
              </li>
              <li>
                You must have authorization to use the phone number you provide.
                Don&apos;t sign up your ex. (Seriously.)
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              3. Account &amp; Subscription
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                <strong>Signing up:</strong> You create an account by texting a
                service keyword (e.g., WATER, PILLS) to our number. We&apos;ll
                ask you a few setup questions via text to configure your service.
              </p>
              <p>
                <strong>Subscription plans:</strong> Services are billed monthly
                at the prices listed on our website. Prices range from $2 to
                $12 per month depending on the plan and services selected.
              </p>
              <p>
                <strong>Payment:</strong> Payments are processed through Stripe.
                Your subscription renews automatically each month until you
                cancel.
              </p>
              <p>
                <strong>Free trial:</strong> We may offer trial periods at our
                discretion. We&apos;ll always tell you before we charge you.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              4. Cancellation
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                You can cancel anytime. No retention specialists. No guilt
                trips. (Okay, maybe one guilt trip. We&apos;re BotherMe after
                all.)
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Cancel everything:</strong> Text STOP to our number.
                  All services end immediately.
                </li>
                <li>
                  <strong>Cancel one service:</strong> Text CANCEL followed by
                  the service keyword (e.g., CANCEL WATER).
                </li>
                <li>
                  <strong>Pause:</strong> Text PAUSE to temporarily stop all
                  texts while keeping your data and streaks. Text RESUME to
                  restart.
                </li>
              </ul>
              <p>
                Cancellations take effect immediately. We do not offer prorated
                refunds for partial months, but we won&apos;t charge you for the
                next month.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              5. SMS Terms
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>
                Message frequency varies by service. Most services send 1&ndash;4
                messages per day. Some (like EyeBreak) may send more frequently
                during configured hours.
              </li>
              <li>
                Message and data rates may apply. Check with your mobile carrier.
              </li>
              <li>
                We are not responsible for delayed or undelivered messages due to
                carrier issues, phone settings, or network outages.
              </li>
              <li>
                You consent to receive recurring automated text messages at the
                phone number you provide. This consent is not a condition of
                purchasing any goods or services.
              </li>
              <li>
                Text STOP to opt out. Text HELP for support information.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              6. Accountability Buddy Feature
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Some services allow you to designate an &ldquo;accountability
                buddy&rdquo; &mdash; someone who receives a text notification
                if you miss your habit for a set number of days.
              </p>
              <p>
                By providing a buddy&apos;s phone number, you represent that
                you have their consent to receive occasional text messages from
                BotherMe on your behalf. We will send them a one-time
                introductory text explaining the service.
              </p>
              <p>
                Your buddy can text STOP at any time to opt out of
                notifications.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              7. Health &amp; Safety Disclaimers
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                <strong>BotherMe is not a medical service.</strong> Our
                medication reminders (PillPing), blood pressure tracking
                (BPLog), sobriety support (SobrietyCounter), and other
                health-related services are accountability tools, not medical
                devices or clinical services.
              </p>
              <p>
                We do not provide medical advice, diagnoses, or treatment. Always
                consult your healthcare provider for medical decisions.
              </p>
              <p>
                <strong>Crisis resources:</strong> Certain services include
                automated crisis detection. If our system detects potential
                distress signals, we may send crisis resource information
                (e.g., 988 Suicide &amp; Crisis Lifeline). This is not a
                substitute for emergency services. If you are in immediate
                danger, call 911.
              </p>
              <p>
                <strong>ElderCheck:</strong> Our daily wellness check service is
                a supplementary tool, not a replacement for professional
                caregiving, medical monitoring, or emergency response systems.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              8. Acceptable Use
            </h2>
            <p className="mt-4">You agree not to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                Use the service to harass, stalk, or send unwanted messages to
                others (including via the accountability buddy feature).
              </li>
              <li>
                Provide someone else&apos;s phone number without their consent.
              </li>
              <li>
                Attempt to reverse-engineer, exploit, or interfere with our
                systems.
              </li>
              <li>
                Use automated tools to send messages to our service number.
              </li>
              <li>
                Resell or redistribute our services.
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              9. Intellectual Property
            </h2>
            <p className="mt-4">
              BotherMe, the BotherMe logo, and all service names (PillPing,
              HydroNudge, FlossCoach, etc.) are trademarks of BotherMe.co. The
              content, design, and code of our website and services are our
              property or licensed to us.
            </p>
            <p className="mt-3">
              Your reply data belongs to you. We store it to provide the service
              and you can request deletion at any time.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              10. Limitation of Liability
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                BotherMe is provided &ldquo;as is&rdquo; and &ldquo;as
                available.&rdquo; We make no warranties, express or implied,
                regarding the reliability, accuracy, or availability of the
                service.
              </p>
              <p>
                To the maximum extent permitted by law, BotherMe shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of the service, including
                but not limited to:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Missed or delayed text messages</li>
                <li>
                  Health consequences resulting from reliance on our reminders
                </li>
                <li>Broken streaks due to system outages</li>
                <li>
                  Accountability buddy notifications sent in error or not sent
                  when expected
                </li>
              </ul>
              <p>
                Our total liability to you for any claims arising from the
                service shall not exceed the amount you paid us in the 12 months
                prior to the claim.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              11. Dispute Resolution
            </h2>
            <p className="mt-4">
              Any disputes arising from these Terms or your use of BotherMe will
              be resolved through binding arbitration in accordance with the
              rules of the American Arbitration Association, rather than in
              court. You agree to waive your right to participate in a class
              action lawsuit or class-wide arbitration.
            </p>
            <p className="mt-3">
              You may opt out of this arbitration clause by emailing{" "}
              <a
                href="mailto:hello@botherme.co?subject=BotherMe%20legal%20inquiry"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
              >
                hello@botherme.co
              </a>{" "}
              within 30 days of creating your account.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              12. Changes to Terms
            </h2>
            <p className="mt-4">
              We may update these Terms from time to time. Material changes will
              be communicated via SMS to your registered phone number at least 14
              days before they take effect. Continued use of BotherMe after
              changes take effect constitutes acceptance.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="font-display text-xl font-bold text-dark">
              13. Governing Law
            </h2>
            <p className="mt-4">
              These Terms are governed by the laws of the State of Delaware,
              without regard to its conflict of laws provisions.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-dark/[0.06] bg-card p-6">
            <h2 className="font-display text-xl font-bold text-dark">
              Contact Us
            </h2>
            <p className="mt-3">
              Questions about these terms? We&apos;re here:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>
                Email:{" "}
                <a
                  href="mailto:hello@botherme.co?subject=BotherMe%20legal%20inquiry"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                >
                  hello@botherme.co
                </a>
              </li>
              <li>
                General support:{" "}
                <a
                  href="mailto:hello@botherme.co"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/60"
                >
                  hello@botherme.co
                </a>
              </li>
              <li>
                Text HELP to{" "}
                <span className="font-semibold">(855) 812-6669</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
