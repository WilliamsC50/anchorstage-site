import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Team - AnchorStage Operations LLC",
  description:
    "Meet the operator behind AnchorStage Operations LLC, focused on clean execution and reliable live event production.",
};

export default function TeamPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          The Operator Behind AnchorStage
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Hands-on production from a single point of contact.
        </p>
      </section>

      {/* ── FOUNDER PROFILE ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-[260px_1fr] gap-12 items-start">

          {/* Left: founder photo */}
          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
            <Image
              src="/images/Headshot.jpg"
              alt="Cody Williams, Founder of AnchorStage Operations LLC"
              fill
              className="object-cover object-top"
              sizes="260px"
            />
          </div>

          {/* Right: identity + bio */}
          <div>
            <p
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--aso-navy)" }}
            >
              Cody Williams
            </p>
            <p className="text-sm text-gray-500 mb-1">Founder / Production Lead</p>
            <p className="text-sm text-gray-500 mb-8">AnchorStage Operations LLC</p>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed max-w-2xl">
              <p>
                Cody Williams leads production and event execution at AnchorStage
                Operations LLC, focusing on clean setups, reliable systems, and shows
                that run smoothly from start to finish.
              </p>
              <p>
                With over 10 years of experience running sound in the Central Florida
                area, Cody has worked across a wide range of events, from open mics
                and small venue shows to larger productions. His approach is
                hands-on and detail-driven, with an emphasis on getting things right
                before the show even begins.
              </p>
              <p>
                Cody is a three-time graduate of the F.I.R.S.T. Institute, with
                training in Audio Engineering, Video Production, and Graphic
                Design/Web Development. That broader background allows him to think
                beyond just equipment. Understanding how production, content, and
                execution all need to align on event day.
              </p>
              <p>
                AnchorStage was built around a simple idea: most problems on show
                site come from small details being missed. By standardizing workflows,
                refining pack lists, and building systems that are tested in
                real-world conditions, Cody works to eliminate those issues before
                they happen.
              </p>
              <p>
                Whether supporting a small event or working alongside trusted
                production partners on larger shows, the goal stays the same: make the
                event run cleanly, efficiently, and without surprises.
              </p>
              <p>
                If it matters on show day, it&apos;s handled ahead of time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── OUR APPROACH ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          <div>
            <h2
              className="text-xl font-semibold mb-5"
              style={{ color: "var(--aso-navy)" }}
            >
              Our approach
            </h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                We handle the stage, sound, and production side of your event so
                you can focus on everything else.
              </p>
              <p>
                AnchorStage Operations LLC is built around execution, not theory,
                overpromising, or unnecessary complexity. Every setup is
                designed to be practical, reliable, and appropriate for the event
                it supports.
              </p>
              <p>
                We don&apos;t try to be everything. We focus on doing the
                production side right.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── TRUSTED PARTNERS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-base font-semibold mb-2"
            style={{ color: "var(--aso-navy)" }}
          >
            Built with trusted partners
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            For larger productions, we work with trusted partners like{" "}
            <a
              href="https://cfav.solutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--aso-blue)" }}
              className="hover:underline"
            >
              Central Florida AV Solutions
            </a>
            {" "}to scale up while maintaining the same level of execution and
            reliability.
          </p>
        </div>
      </section>

    </main>
  );
}
