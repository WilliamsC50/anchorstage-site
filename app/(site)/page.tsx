import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import HeroLight from "@/components/HeroLight";
import HeroMedia from "@/components/HeroMedia";
import PersonaIcon from "@/components/PersonaIcon";
import HomeClosing from "@/components/home/HomeClosing";
import HomeScene from "@/components/home/HomeScene";
import HudPointer from "@/components/home/HudPointer";
import ProblemField from "@/components/home/ProblemField";
import SceneStack from "@/components/home/SceneStack";
import { SignalWave } from "@/components/home/SoundGeometry";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
// Homepage-only visual system; every rule is scoped under .aso-home.
import "./home.css";

export const metadata: Metadata = {
  title: "AnchorStage Ops | Connected Operations Platform for Live Events",
  description:
    "A professional network and connected operations platform built for the live event industry. Run your events, gear, documents, and financial records in one place, and work with the organizations you already work with. Join free.",
};

// The two halves of ASO, introduced together so they read as one product.
// Network first: the platform exists because the network does.
const HALVES = [
  {
    label: "Network",
    href: "/network",
    headline: "Connect the people you already work with.",
    body: [
      "The live event industry already runs on trusted relationships.",
      "ASO keeps those organizations connected around the work instead of scattered across emails, spreadsheets, and disconnected tools.",
    ],
    cta: "Explore the Network",
  },
  {
    label: "Platform",
    href: "/platform",
    headline: "Run every event from one connected record.",
    body: [
      "Purpose-built Workstations keep events, equipment, crew, finances, marketing, and collaboration organized while staying connected to the same operational record.",
    ],
    cta: "Explore the Platform",
  },
];

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
    <main className="aso-home">
      {/* Homepage-only: pointer lighting for HUD panels, scene stacking, and a
          scroll readout. */}
      <HudPointer />
      <SceneStack />
      <div aria-hidden="true" className="home-progress" />

      {/* HERO — the first scene in the stack; the scenes below rise over it. */}
      <section className="home-stack relative bg-aso-navy overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />

        {/* Hero media: full-bleed background below lg, flush-right band at lg
            and up. z-[1] lifts it above the plot-grid layer; the stage light
            is z-[2], the mobile copy veil z-[3], and the copy below is z-10.

            The desktop width widens at larger breakpoints on purpose. The band
            is anchored to the viewport's right edge while the copy is centred
            in a fixed-width column, so a flat width would let the photograph
            drift right and open a growing navy gap on wide screens. Widening
            with the viewport keeps the image tracking the copy instead. */}
        <HeroMedia
          className="absolute inset-0 z-[1] lg:left-auto lg:w-[56%] xl:w-[62%] 2xl:w-[66%]"
          fadeLeft
          objectPosition="57% 50%"
          sizes="(min-width: 1536px) 66vw, (min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
        />

        {/* Side light from the left, raking across the headline, under the
            copy. Pointer-reactive on fine pointers; static on touch and with
            reduced motion. */}
        <HeroLight />

        {/* Below lg only: extra veil so copy over the photo reaches AA. */}
        <div aria-hidden="true" className="home-hero-scrim" />

        <div className="home-frame-content relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">
                Live Event Network • Live Event Operations Platform
              </p>
            </div>

            {/* Dimensional lettering: extrusion and projected shadow are drawn
                from data-text by home.css, lit by HeroLight. The heading text
                and its accessible name are unchanged. */}
            <h1
              data-hero-title=""
              data-text="AnchorStage Ops"
              className="home-title text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.03] mb-7"
            >
              AnchorStage Ops
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl">
              ASO keeps your events, equipment, people, and partner organizations
              connected so the work stays organized from intake to invoice.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button href={AUTH_NAV.join.href} className="home-cta">
                {AUTH_NAV.join.label}
              </Button>
              <Link
                href="/platform"
                className="home-ghost inline-block border border-white/25 text-white px-8 py-3.5 rounded-lg font-medium transition hover:border-aso-orange hover:bg-white/5"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="home-stack-veil" />
      </section>

      {/* WHAT ASO IS — the two halves of the product, network first */}
      <HomeScene tone="deep" seed={11} rings="signal" fromHero>
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            One Connected Industry.
            <br />
            One Connected Platform.
          </h2>
          <p className="text-lg home-copy leading-relaxed mb-4">
            Live events are built by people working together.
          </p>
          <p className="text-lg home-copy leading-relaxed mb-4">
            Production companies, venues, freelancers, musicians, rental providers, and
            event organizers already depend on one another to make every show happen.
          </p>
          <p className="text-lg home-copy leading-relaxed">
            AnchorStage Ops connects those relationships through a shared network
            and gives every organization the tools to manage the work together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {HALVES.map((half) => (
            <Link
              key={half.href}
              href={half.href}
              className="group hud-panel hud-panel-interactive flex w-full flex-col p-7 md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-0.5 bg-aso-blue/30 transition-colors group-hover:bg-aso-orange"
              />

              <p className="hud-tag text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange mb-4">
                {half.label}
              </p>

              <h3 className="text-xl font-bold text-white tracking-tight mb-4 leading-snug">
                {half.headline}
              </h3>

              <div className="flex-1 space-y-4 mb-7">
                {half.body.map((paragraph) => (
                  <p key={paragraph} className="home-copy leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-aso-orange">
                {half.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </HomeScene>

      {/* THE PROBLEM — single column, wide measure, deliberately quiet. Two
          signal traces drift in and out of step beneath it, and a field of
          operational fragments that never quite agree surrounds the copy. */}
      <HomeScene
        tone="navy"
        seed={23}
        rings={false}
        backdrop={
          <>
            <div aria-hidden="true" className="home-problem-waves">
              <SignalWave seed={101} traces={2} amplitude={0.62} className="home-wave-drift" />
              <SignalWave
                seed={101}
                traces={1}
                amplitude={0.62}
                stroke="rgb(255, 122, 26)"
                className="home-wave-drift home-wave-drift-slow"
              />
            </div>
            <ProblemField />
          </>
        }
      >
        <div className="grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10">
          <p className="hidden md:block text-xs font-semibold uppercase tracking-[0.18em] text-aso-blue-light/80 pt-3">
            The problem
          </p>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              The work is not the hard part
            </h2>
            <p className="text-lg home-copy leading-relaxed mb-4">
              Most people in live events already know how to run a show. What breaks is
              everything around it. The crew list is in a text thread, the gear list is in
              a spreadsheet, the quote is in an email, and the venue has a version of the
              schedule that is two days old.
            </p>
            <p className="text-lg home-copy leading-relaxed">
              The moment a second organization joins the job, everyone starts working from
              their own copy, and the copies stop matching.
            </p>
          </div>
        </div>
      </HomeScene>

      {/* WHAT ASO CHANGES — staggered floating panels */}
      <HomeScene tone="deep" seed={37}>
        <div className="max-w-2xl mb-16">
          <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            What ASO changes
          </h2>
          <p className="text-lg home-copy leading-relaxed">
            ASO puts the operational work and the working relationships in the same
            place, so the information behind an event stays current for everyone who
            needs it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {CHANGES.map((item, i) => (
            <div
              key={item.title}
              className={`hud-panel h-full p-7 ${i === 1 ? "md:translate-y-7" : ""} ${
                i === 2 ? "md:translate-y-3" : ""
              }`}
            >
              <p className="hud-tag font-mono text-xs text-aso-orange mb-5">{item.index}</p>
              <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="home-copy leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        {/* Reclaims the space the staggered cards push down */}
        <div aria-hidden="true" className="hidden md:block h-7" />
      </HomeScene>

      {/* WHO IT SERVES — right-weighted list against a left-set heading */}
      <HomeScene tone="navy" seed={53}>
        <div className="grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
              Built for the people who make events happen
            </h2>
            <p className="home-copy leading-relaxed mb-6">
              Whether you work alone or run a company with a full crew, you operate
              through your own organization on ASO.
            </p>
            <Link
              href="/who-its-for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-aso-orange hover:gap-3 transition-all"
            >
              See how ASO fits your work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <li
                key={persona.slug}
                className="group home-menu-item flex items-center gap-4 py-3 px-4 -mx-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-aso-blue-light ring-1 ring-aso-blue-light/15 transition group-hover:bg-white/15 group-hover:text-aso-orange group-hover:ring-aso-orange/40">
                  <PersonaIcon slug={persona.slug} className="h-6 w-6" />
                </span>
                <span className="font-medium text-white">{persona.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </HomeScene>

      {/* CTA */}
      <HomeClosing
        heading="Keep exploring ASO"
        body="Learn how the network connects the live event industry, then see how the platform keeps the work organized."
        primary={{ label: "Explore the Network", href: "/network" }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
      />
    </main>
  );
}
