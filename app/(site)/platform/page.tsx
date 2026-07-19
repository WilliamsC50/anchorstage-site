import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import WorkstationIcon from "@/components/WorkstationIcon";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { WORKSTATIONS } from "@/lib/workstations";

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
      <PageHeader
        eyebrow="Platform"
        title="One operational foundation for your organization"
        lead="AnchorStage Operations is a connected operations platform for live event work. Your organization gets one place where its events, records, and day to day operations live together."
      />

      {/* ORGANIZATIONS */}
      <Section background="white">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-6">
            Organizations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            The organization is the root of the platform. It is what owns the work, and
            it is what keeps the work after each event is over.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 mb-14">
          {ORGANIZATION_POINTS.map((point) => (
            <div key={point.title}>
              <h3 className="text-lg font-semibold text-aso-navy mb-3">{point.title}</h3>
              <p className="text-gray-500 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-l-2 border-aso-blue pl-6">
          <p className="text-lg text-aso-navy leading-relaxed">
            Events are what an organization does. The organization is what remains.
          </p>
        </div>
      </Section>

      {/* CONNECTED OPERATING RECORD */}
      <Section background="navy">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Connected Operating Record
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-5">
            Each event on ASO is one connected operating record. The client, the venue,
            the crew, the gear, the documents, and the money are all part of the same
            record rather than separate files that have to be kept in step by hand.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            That is what makes the rest of the platform work. When something changes on
            an event, it changes for everyone working on it, because they are all
            looking at the same record instead of their own copy of it.
          </p>
        </div>
      </Section>

      {/* WORKSTATIONS */}
      <Section background="bg">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-6">
            Purpose-built Workstations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Different work needs different tools, but it does not need different
            information. ASO is organized into four Workstations, each built for a
            different part of running events, all working on the same connected
            operating record.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {WORKSTATIONS.map((workstation) => (
            <div
              key={workstation.slug}
              className="rounded-xl border border-aso-blue/15 bg-white p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue">
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
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-6">
            Set up your organization
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Creating an account is free. Start with your own events and records, and add
            collaboration when the work calls for it.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
