import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import PersonaIcon from "@/components/PersonaIcon";
import NetworkDiagram from "@/components/NetworkDiagram";
import WorkstationIcon from "@/components/WorkstationIcon";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import { WORKSTATIONS } from "@/lib/workstations";

export const metadata: Metadata = {
  title: "AnchorStage Operations | Live Event Production - Orlando & Central Florida",
  description:
    "AnchorStage Operations LLC provides professional live sound, staging, lighting, and full event production in Orlando and Central Florida, from bar shows to outdoor stages.",
};

const DISCONNECTED_TODAY = [
  "Texts",
  "Email",
  "Messenger",
  "Spreadsheets",
  "Phone Calls",
  "Paper Notes",
  "Cloud Drives",
  "Memory",
] as const;

const CONNECTED_THROUGH_ASO = [
  "Members",
  "Events",
  "Gear",
  "Crew",
  "Venues",
  "Documents",
  "Media",
  "Marketing",
] as const;

const WORKING_ALONE = [
  "Limited crew",
  "Scattered tools",
  "No shared gear",
  "Manual follow-up",
  "Harder to scale",
] as const;

const OPERATING_THROUGH_ASO = [
  "Connected collaborators",
  "Shared resources",
  "Professional workstations",
  "Repeatable workflows",
  "Room to grow",
] as const;

function TransitionArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 md:w-10 md:h-10 text-aso-blue rotate-90 md:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <Hero
        eyebrow="The Operating System for Live Events"
        title="The Professional Network for Live Events"
        description="Join the free professional network where production companies, freelancers, venues, musicians, rental providers, and event organizers collaborate to plan, staff, equip, market, and grow live events."
        primaryCta={AUTH_NAV.join}
        backgroundImage="/images/hero-stage.jpg"
      />

      {/* WHO ARE YOU */}
      <Section background="white">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Where do you fit in live events?
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Whether you&apos;re building events, performing on stage, managing venues,
            renting equipment, or supporting productions, ASO helps you connect with
            the people and tools you need to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAS.map((persona) => (
            <Card
              key={persona.slug}
              title={persona.singularName}
              centered
              icon={
                <div className="w-12 h-12 rounded-full bg-aso-bg flex items-center justify-center text-aso-blue">
                  <PersonaIcon slug={persona.slug} />
                </div>
              }
            >
              {persona.tagline}
            </Card>
          ))}
        </div>
      </Section>

      {/* NETWORK OVERVIEW */}
      <Section background="bg">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Built Around the Way Live Events Actually Work
          </h2>
          <p className="text-gray-500 leading-relaxed">
            The live event industry is already full of talented people, great
            companies, trusted venues, and valuable equipment. The problem isn&apos;t
            a lack of resources. It&apos;s that everyone operates separately. ASO
            connects those people, organizations, and opportunities into one
            professional network built for collaboration.
          </p>
        </div>

        <NetworkDiagram />

        <p className="text-center text-sm font-medium text-aso-navy mt-10">
          Every new member strengthens the network.
        </p>
      </Section>

      {/* THE PROBLEM */}
      <Section background="white">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Live Events Are Not the Problem. Fragmentation Is.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Most event professionals already know how to do the work. The hard part
            is keeping the people, gear, schedules, documents, media, marketing, and
            communication connected before the event ever happens. ASO exists to
            bring that work into one connected operating network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Disconnected Today
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DISCONNECTED_TODAY.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <TransitionArrow />
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-4">
              Connected Through ASO
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CONNECTED_THROUGH_ASO.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-aso-navy text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* WORKSTATIONS PREVIEW */}
      <Section background="gray">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Workstations Built for Real Event Work
          </h2>
          <p className="text-gray-500 leading-relaxed">
            ASO gives members connected workstations for planning events, managing
            operations, coordinating people, organizing media, building documents,
            and growing their business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSTATIONS.map((workstation) => (
            <Card
              key={workstation.slug}
              title={workstation.name}
              centered
              icon={
                <div className="w-12 h-12 rounded-full bg-aso-bg flex items-center justify-center text-aso-blue">
                  <WorkstationIcon slug={workstation.slug} />
                </div>
              }
            >
              {workstation.tagline}
            </Card>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/workstations"
            className="inline-block text-sm font-medium text-aso-blue hover:text-aso-navy transition"
          >
            Explore Workstations →
          </Link>
        </div>
      </Section>

      {/* OPERATE BIGGER */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Operate Like a Larger Company
          </h2>
          <p className="text-white/70 leading-relaxed mb-3">
            ASO gives members the structure, collaborators, and connected workflows
            to take on bigger opportunities without building everything alone.
          </p>
          <p className="text-white/70 leading-relaxed">
            Whether you&apos;re a solo freelancer, musician, venue, rental provider,
            or growing production company, the network helps you move with more
            confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Working Alone
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {WORKING_ALONE.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <TransitionArrow />
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-orange mb-4">
              Operating Through ASO
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {OPERATING_THROUGH_ASO.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-aso-orange text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-12"
            style={{ color: "var(--aso-navy)" }}
          >
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Tell us about your event",
                desc: "Submit your event details: date, location, type, and any technical needs. Takes a few minutes.",
              },
              {
                step: "02",
                title: "We scope and confirm",
                desc: "We review your event and follow up with a clear picture of what we'll bring, how it'll run, and what it costs.",
              },
              {
                step: "03",
                title: "We show up and execute",
                desc: "On the day, we handle setup, direction, and strike. Your event runs clean. That's the job.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <p
                  className="text-3xl font-bold mb-4"
                  style={{ color: "var(--aso-blue)" }}
                >
                  {step}
                </p>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--aso-navy)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--aso-navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to plan your event?
          </h2>
          <p
            className="text-sm mb-8 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--aso-blue-light)", opacity: 0.85 }}
          >
            Start with the intake form. It takes a few minutes and gives us
            everything we need to follow up with a clear plan.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://intake.anchorstageops.com"
              className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
              style={{ backgroundColor: "var(--aso-orange)" }}
            >
              Start Your Event
            </a>
            <a
              href="/contact"
              className="inline-block border border-white/30 text-white px-8 py-3.5 rounded-lg font-medium transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>

          <p className="mt-5 text-xs" style={{ color: "var(--aso-blue-light)", opacity: 0.55 }}>
            Already have an account?{" "}
            <a
              href="https://intake.anchorstageops.com/login"
              className="underline hover:opacity-100 transition"
            >
              Log In →
            </a>
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--aso-blue-light)", opacity: 0.55 }}>
            New here?{" "}
            <a
              href="https://intake.anchorstageops.com/register"
              className="underline hover:opacity-100 transition"
            >
              Create an account →
            </a>
          </p>

        </div>
      </section>

    </main>
  );
}
