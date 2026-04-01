import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Team — AnchorStage Operations LLC",
  description:
    "Meet the operators behind AnchorStage Operations LLC — focused on clean execution and reliable live event production.",
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
          Meet the team behind AnchorStage
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Focused on execution. Built for live events.
        </p>
      </section>

      {/* ── FOUNDER PROFILE ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-[260px_1fr] gap-12 items-start">

          {/* Left: founder photo */}
          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
            <Image
              src="/images/Headshot.jpg"
              alt="Cody Williams — Founder, AnchorStage Operations LLC"
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
                Cody Williams leads production and event execution for AnchorStage
                Operations LLC, with a focus on clean audio, efficient setups, and
                shows that run right from load-in to strike.
              </p>
              <p>
                With hands-on experience in live music, open mic events, and
                small-to-mid scale productions, Cody operates directly in the field
                — not from a distance. Every system is built and tested with
                real-world use in mind, prioritizing reliability, clarity, and speed.
              </p>
              <p>
                AnchorStage was built around a simple idea: most events don&apos;t
                fail because of big problems — they fail because of small details
                that get missed. The goal is to eliminate those problems before they
                happen, and to keep everything running smoothly once the show starts.
              </p>
              <p>
                Whether it&apos;s a small venue or a larger production supported by
                trusted partners, the focus stays the same — make the show run
                right, every time.
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
                AnchorStage Operations LLC is built around execution — not theory,
                not overpromising, and not unnecessary complexity. Every setup is
                designed to be practical, reliable, and appropriate for the event
                it supports.
              </p>
              <p>
                We don&apos;t try to be everything. We focus on doing the
                production side right.
              </p>
            </div>
          </div>

          {/* What we do */}
          <div>
            <h2
              className="text-xl font-semibold mb-5"
              style={{ color: "var(--aso-navy)" }}
            >
              What we do
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Live event audio systems",
                "Stage and PA setups",
                "Lighting for small to mid-size events",
                "Event videography (as scoped per event)",
                "On-site podcast / recording setups",
                "Technical execution and show operation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: "var(--aso-orange)" }} className="mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
