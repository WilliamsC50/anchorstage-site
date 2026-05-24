import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Team - AnchorStage Operations LLC",
  description:
    "Meet the operator behind AnchorStage Operations LLC, focused on clean execution and reliable live event production.",
};

const FOCUS_AREAS = [
  "Live Sound",
  "Corporate AV",
  "Small Venue Production",
  "Open Mics",
  "Event Operations",
];

export default function TeamPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-16">
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
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Left: identity + bio */}
          <div>
            <p
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--aso-navy)" }}
            >
              Cody Williams
            </p>
            <p className="text-sm text-gray-500 mb-1">Founder / Production Lead</p>
            <p className="text-sm text-gray-500 mb-6">AnchorStage Operations LLC</p>

            {/* Focus strip */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500 bg-gray-50"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Bio sections */}
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed max-w-2xl">

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Background
                </h3>
                <p>
                  Over 10 years running live sound in Central Florida, across open mics,
                  small venues, and larger productions. Three-time graduate of the
                  F.I.R.S.T. Institute, with training in Audio Engineering, Video
                  Production, and Graphic Design/Web Development. That background means
                  production, content, and show-day execution are all part of how I
                  think about an event.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  How I Work
                </h3>
                <p>
                  Hands-on and detail-driven. Every setup runs through a standardized
                  workflow: pack lists, system checks, and advance prep. Show day
                  isn&apos;t where problems get discovered. The goal is to identify and
                  resolve issues before load-in, not during it.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Why AnchorStage
                </h3>
                <p>
                  Most production problems trace back to small things being missed.
                  AnchorStage was built around standardized processes, tested systems,
                  and a single point of contact who owns the outcome. Whether it&apos;s
                  a small venue or a larger show with trusted production partners, the
                  approach stays the same.
                </p>
              </div>

            </div>
          </div>

          {/* Right: founder photo */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src="/images/ASO_Headshot.JPG"
              alt="Cody Williams, Founder of AnchorStage Operations LLC"
              fill
              className="object-cover object-[center_15%]"
              sizes="300px"
            />
          </div>

        </div>
      </section>

      {/* ── OUR APPROACH ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
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
                overpromising, or unnecessary complexity. Every setup is designed to
                be practical, reliable, and appropriate for the event it supports.
              </p>
              <p>
                We don&apos;t try to be everything. We focus on doing the production
                side right.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── TRUSTED PARTNERS ─────────────────────────────────────────────────── */}
      <section className="pt-14 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-base font-semibold mb-2"
            style={{ color: "var(--aso-navy)" }}
          >
            Built with trusted partners
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            For larger productions, AnchorStage works alongside trusted local
            production partners including{" "}
            <a
              href="https://cfav.solutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--aso-blue)" }}
              className="hover:underline"
            >
              Central Florida AV Solutions
            </a>
            {" "}to scale crew, staging, audio, and logistics while maintaining
            a single operational workflow.
          </p>
        </div>
      </section>

    </main>
  );
}
