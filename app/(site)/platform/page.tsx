import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import Section from "@/components/Section";
import WorkstationIcon from "@/components/WorkstationIcon";
import PlatformHero from "@/components/platform/PlatformHero";
import PlatformLifecycle from "@/components/platform/PlatformLifecycle";
import PlatformRecord from "@/components/platform/PlatformRecord";
import { INTAKE_REGISTER_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import { WORKSTATIONS } from "@/lib/workstations";
import "./platform.css";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "How the ASO connected operations platform works. Organizations own the work, each event is one connected operating record, and purpose-built Workstations operate on the same information.",
});

const ORGANIZATION_POINTS = [
  {
    title: "Every member operates through an organization",
    body: "Your organization is how you and your work are represented on ASO. It might be one professional or a company with a full crew.",
  },
  {
    title: "A one-person organization is complete",
    body: "Working independently gets you the same platform as a large operation. Nothing is held back until you add other people.",
  },
  {
    title: "The organization keeps the work",
    body: "Events start and finish. The events, gear, documents, financial records, media, and history stay with the organization that did the work.",
  },
  {
    title: "Collaboration is optional",
    body: "You can bring in an organization you already work with when a job calls for it. Until then, nothing about the platform waits on anyone else.",
  },
];

export default function PlatformPage() {
  return (
    <main className="bg-white">
      <PlatformHero />

      {/* EVENT LIFECYCLE — leads into the Connected Operating Record below */}
      <PlatformLifecycle />

      {/* CONNECTED OPERATING RECORD — a static before-and-after example */}
      <PlatformRecord />

      {/* WORKSTATIONS */}
      <Section background="bg" plot>
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Purpose-built Workstations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Different work needs different tools, but it does not need different
            information. ASO uses purpose-built Workstations for the different parts of
            running live events. As the platform grows, new Workstations work from the
            same Connected Operating Record.
          </p>
        </div>

        {/* Offset pairs so the set reads as placed panels, not a grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {WORKSTATIONS.map((workstation, i) => (
            <div
              key={workstation.slug}
              className={`group relative aso-panel aso-panel-lift overflow-hidden rounded-xl border border-aso-blue/12 bg-white p-7 ${
                i % 2 === 1 ? "sm:translate-y-6" : ""
              }`}
            >
              {/* Road-case edge: hairline that lights up on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 bg-aso-blue/20 transition-colors group-hover:bg-aso-orange"
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue transition-colors group-hover:text-aso-orange">
                  <WorkstationIcon slug={workstation.slug} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-aso-navy">
                  {workstation.name}
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">{workstation.tagline}</p>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="hidden sm:block h-6" />
      </Section>

      {/* ORGANIZATIONS — heading left, points right, orange tick per point.
          Moved, unchanged, after the Workstations (DESIGN-13D.3) so the
          lifecycle leads straight into the record. */}
      <Section background="bg" plot>
        <div className="grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-5">
              Organizations
            </h2>
            <p className="text-gray-500 leading-relaxed">
              The organization is the root of the platform. It is what owns the work, and
              it is what keeps the work after each event is over.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {ORGANIZATION_POINTS.map((point) => (
              <div key={point.title}>
                <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-4" />
                <h3 className="text-base font-semibold text-aso-navy mb-2.5 leading-snug">
                  {point.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl border-l-2 border-aso-orange pl-6">
          <p className="text-xl text-aso-navy leading-relaxed">
            Events are what an organization does. The organization is what remains.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <ClosingCta
        heading="Set up your organization"
        body="Creating an account is free. Start with your own events and records, and add collaboration when the work calls for it."
        primary={{ label: "Create Your Organization", href: INTAKE_REGISTER_URL }}
        secondary={{ label: "Explore the Network", href: "/network" }}
      />
    </main>
  );
}
