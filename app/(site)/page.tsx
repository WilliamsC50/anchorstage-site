import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import PersonaCard from "@/components/PersonaCard";
import NetworkTree from "@/components/NetworkTree";
import EventWorkflowExplorer from "@/components/EventWorkflowExplorer";
import ChaosToRecord from "@/components/ChaosToRecord";
import WorkstationIcon from "@/components/WorkstationIcon";
import WorkstationPreview from "@/components/WorkstationPreview";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import { SUPPORT_TOOLS, WORKSTATIONS } from "@/lib/workstations";

export const metadata: Metadata = {
  title: "AnchorStage Operations | Live Event Production - Orlando & Central Florida",
  description:
    "AnchorStage Operations LLC provides professional live sound, staging, lighting, and full event production in Orlando and Central Florida, from bar shows to outdoor stages.",
};

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
            <PersonaCard key={persona.slug} persona={persona} />
          ))}
        </div>
      </Section>

      {/* EVERYTHING STARTS WITH ONE CONNECTION */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything Starts With One Connection.
          </h2>
          <p className="text-white/70 leading-relaxed">
            When you join ASO, you&apos;re not just creating another account.
            You&apos;re joining a professional network built around the live event
            industry, connecting you with the people, opportunities, and resources
            that help events happen.
          </p>
        </div>

        <NetworkTree />
      </Section>

      {/* EVENT LIFECYCLE EXPLORER */}
      <Section background="bg">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Built Around the Way Live Events Actually Work
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Every event moves through a lifecycle. ASO keeps the people,
            planning, gear, documents, money, and media connected from the
            first intake submission to the final invoice.
          </p>
        </div>

        <EventWorkflowExplorer />
      </Section>

      {/* THE PROBLEM */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live Events Are Not the Problem. Fragmentation Is.
          </h2>
          <p className="text-white/70 leading-relaxed">
            Most event professionals already know how to do the work. The hard part
            is keeping the people, gear, schedules, documents, media, marketing, and
            communication connected before the event ever happens. ASO exists to
            bring that work into one connected operating network.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ChaosToRecord />
        </div>
      </Section>

      {/* WORKSTATIONS PREVIEW */}
      <Section background="gray">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            Purpose-Built Workstations for Each Operation.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Every organization works differently. Use the workstations that fit your
            operation while every event, document, crew assignment, gear
            assignment, asset, and financial record stays connected through one
            operating record.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {WORKSTATIONS.map((workstation) => (
            <div
              key={workstation.slug}
              className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 p-5 pb-0">
                <div className="w-10 h-10 rounded-lg bg-aso-bg flex items-center justify-center text-aso-blue shrink-0">
                  <WorkstationIcon slug={workstation.slug} className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base leading-snug text-aso-navy">
                  {workstation.name}
                </h3>
              </div>
              <p className="px-5 pt-3 text-sm leading-relaxed text-gray-500">
                {workstation.tagline}
              </p>
              <div className="mt-auto p-5 pt-4">
                <WorkstationPreview slug={workstation.slug} />
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Connected tools that keep the record complete
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUPPORT_TOOLS.map((tool) => (
              <span
                key={tool.name}
                className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            href="/platform"
            className="inline-block text-sm font-medium text-aso-blue hover:text-aso-navy transition"
          >
            Explore Workstations →
          </Link>
        </div>
      </Section>

      {/* JOIN THE NETWORK */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join the Network
          </h2>
          <p className="text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Membership is free. Whether you&apos;re a freelancer, production
            company, venue, musician, rental provider, or event organizer, ASO
            was built to help you collaborate, grow, and operate bigger. The
            network becomes more valuable every time another professional joins.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>

    </main>
  );
}
