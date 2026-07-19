import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import PersonaIcon from "@/components/PersonaIcon";
import Section from "@/components/Section";
import SignalFlow from "@/components/SignalFlow";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";

export const metadata: Metadata = {
  title: "AnchorStage Operations | Connected Operations Platform for Live Events",
  description:
    "A professional network and connected operations platform built for the live event industry. Run your events, gear, documents, and financial records in one place, and work with the organizations you already work with. Join free.",
};

const CHANGES = [
  {
    index: "01",
    title: "One record per event",
    body: "Everything about an event lives in one connected operating record instead of a dozen places that disagree with each other.",
  },
  {
    index: "02",
    title: "One organization that keeps the work",
    body: "Events start and finish. Your organization keeps the gear, documents, financial records, and history that came out of them.",
  },
  {
    index: "03",
    title: "Partners on the same information",
    body: "When another organization joins your event, they work from current information with the access you give them, not from a copy you emailed last week.",
  },
];

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="relative bg-aso-navy overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 820px 560px at 78% -12%, rgba(145, 205, 255, 0.20) 0%, rgba(70, 135, 200, 0.10) 32%, transparent 72%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">
                  For the live event industry
                </p>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-7">
                The operations behind live events, connected to the people doing the work
              </h1>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
                AnchorStage Operations is a professional network and connected operations
                platform built for live events. Run your events, gear, documents, and
                financial records in one place, and stay connected to the organizations
                you work with.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
                <Link
                  href="/platform"
                  className="inline-block border border-white/25 text-white px-8 py-3.5 rounded-lg font-medium transition hover:border-aso-orange hover:bg-white/5"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* Signal-flow motif, desktop only so mobile stays typographic */}
            <div className="hidden lg:block">
              <SignalFlow className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — single column, wide measure, deliberately quiet */}
      <Section background="white">
        <div className="grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10">
          <p className="hidden md:block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 pt-3">
            The problem
          </p>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
              The work is not the hard part
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-4">
              Most people in live events already know how to run a show. What breaks is
              everything around it. The crew list is in a text thread, the gear list is in
              a spreadsheet, the quote is in an email, and the venue has a version of the
              schedule that is two days old.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              The moment a second organization joins the job, everyone starts working from
              their own copy, and the copies stop matching.
            </p>
          </div>
        </div>
      </Section>

      {/* WHAT ASO CHANGES — staggered floating panels */}
      <Section background="bg" plot>
        <div className="max-w-2xl mb-16">
          <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            What ASO changes
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            ASO puts the operational work and the working relationships in the same
            place, so the information behind an event stays current for everyone who
            needs it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {CHANGES.map((item, i) => (
            <div
              key={item.title}
              className={`aso-panel aso-panel-lift rounded-xl border border-aso-blue/12 bg-white p-7 ${
                i === 1 ? "md:translate-y-7" : ""
              } ${i === 2 ? "md:translate-y-3" : ""}`}
            >
              <p className="font-mono text-xs text-aso-orange-ink mb-5">{item.index}</p>
              <h3 className="text-lg font-semibold text-aso-navy mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        {/* Reclaims the space the staggered cards push down */}
        <div aria-hidden="true" className="hidden md:block h-7" />
      </Section>

      {/* WHO IT SERVES — right-weighted list against a left-set heading */}
      <Section background="white">
        <div className="grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-5">
              Built for the people who make events happen
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Whether you work alone or run a company with a full crew, you operate
              through your own organization on ASO.
            </p>
            <Link
              href="/who-its-for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-aso-orange-ink hover:gap-3 transition-all"
            >
              See how ASO fits your work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <li
                key={persona.slug}
                className="group flex items-center gap-4 rounded-lg border border-transparent py-3 px-4 -mx-1 transition hover:border-aso-blue/15 hover:bg-aso-bg"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue transition group-hover:bg-white group-hover:text-aso-orange">
                  <PersonaIcon slug={persona.slug} className="h-5 w-5" />
                </span>
                <span className="font-medium text-aso-navy">{persona.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section background="navy" plot>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Start with your own organization
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            Creating an account is free, and a one-person organization is a complete
            one. You do not need anyone else on the platform to start running your work
            through it.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>

    </main>
  );
}
