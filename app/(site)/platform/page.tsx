import type { Metadata } from "next";
import Anchored from "@/components/Anchored";
import Button from "@/components/Button";
import MicroHeading, { MicroHeadingInline } from "@/components/MicroHeading";
import OperatingRecordCard from "@/components/OperatingRecordCard";
import ScreenshotFrame from "@/components/ScreenshotFrame";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import WorkstationIcon from "@/components/WorkstationIcon";
import WorkstationNode from "@/components/WorkstationNode";
import type {
  ConnectedToolKind,
  PersonaSlug,
  WorkstationDetail,
} from "@/lib/content-types";
import { DEMO_EVENT } from "@/lib/demo-canon";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import {
  CONNECTED_TOOLS,
  OPERATING_FLOW,
  WORKSTATION_DETAILS,
} from "@/lib/workstation-details";

export const metadata: Metadata = buildMetadata({
  title: "Workstations",
  description:
    "How ASO's four Workstations — Event, Inventory, Marketing, and Signage — work together around one shared operating record.",
});

// ── Page-local presentation data ───────────────────────────────────────────────

/** On-page navigation, in section order. Ids are stable anchor targets;
 *  the four workstation ids match WorkstationSlug for deep links. */
const PAGE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "organizations", label: "Organizations" },
  { id: "solo-organization", label: "Working Solo" },
  { id: "operating-record", label: "Operating Record" },
  { id: "event", label: "Event" },
  { id: "inventory", label: "Inventory" },
  { id: "marketing", label: "Marketing" },
  { id: "signage", label: "Signage" },
  { id: "tools", label: "Connected Tools" },
  { id: "how-it-connects", label: "How It Connects" },
] as const;

/** What an organization holds, for the Organizations section. Categories the
 *  platform actually keeps against an organization, in the order a visitor
 *  meets them when running an event. */
const ORGANIZATION_HOLDINGS: { label: string; description: string }[] = [
  {
    label: "Events",
    description:
      "Every event the organization runs, from the first request through the final invoice.",
  },
  {
    label: "People",
    description:
      "The professionals who hold membership, with their roles and what each of them can reach.",
  },
  {
    label: "Inventory",
    description:
      "Gear and packages, and which event each item is committed to.",
  },
  {
    label: "Documents",
    description:
      "Quotes, invoices, briefs, and pack lists, issued under the organization's own name and numbering.",
  },
  {
    label: "Financial records",
    description:
      "Deposits, payouts, and margin across the work the organization has taken on.",
  },
  {
    label: "Media and assets",
    description: "Photos, video, and files kept with the events they came from.",
  },
  {
    label: "History",
    description:
      "All of the above, retained after each event closes and available for the next one.",
  },
];

const KIND_BADGE_DARK_CLASSES: Record<ConnectedToolKind, string> = {
  tool: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  mode: "border-violet-300/30 bg-violet-300/10 text-violet-200",
  page: "border-white/20 bg-white/10 text-white/70",
  document: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  surface: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
};

const PERSONA_NAMES: Record<PersonaSlug, string> = Object.fromEntries(
  PERSONAS.map((persona) => [persona.slug, persona.name]),
) as Record<PersonaSlug, string>;

// ── Workstation section ────────────────────────────────────────────────────────

function WorkstationSection({ detail, index }: { detail: WorkstationDetail; index: number }) {
  return (
    <>
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
          Workstation {String(index + 1).padStart(2, "0")} / {String(WORKSTATION_DETAILS.length).padStart(2, "0")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">{detail.name}</h2>
        <p className="text-gray-500 leading-relaxed">{detail.definition}</p>
      </div>

      {/* Screenshot area dominates; text below supports it. */}
      <ScreenshotFrame name={detail.name} />

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-5">
        {/* What it owns — reference list */}
        <div className="lg:col-span-3">
          <MicroHeading>What it owns</MicroHeading>
          <div className="divide-y divide-gray-100 border-y border-gray-100">
            {detail.owns.map((owned) => (
              <div key={owned.surface} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                <p className="w-40 shrink-0 text-sm font-semibold text-aso-navy">
                  {owned.surface}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">{owned.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Record contract — accent lists */}
        <div className="space-y-8 lg:col-span-2">
          <div className="border-l-2 border-aso-blue pl-5">
            <MicroHeading>Reads from the record</MicroHeading>
            <ul className="space-y-2">
              {detail.reads.map((item) => (
                <li key={item} className="text-sm text-gray-600 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-aso-navy pl-5">
            <MicroHeading>Writes to the record</MicroHeading>
            <ul className="space-y-2">
              {detail.writes.map((item) => (
                <li key={item} className="text-sm text-gray-600 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Worked example */}
      <div className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-gray-200 bg-aso-bg px-5 py-3">
          <MicroHeadingInline>Worked example</MicroHeadingInline>
          <span className="rounded border border-gray-200 bg-white px-2 py-0.5 font-mono text-xs text-gray-500">
            {DEMO_EVENT.code}
          </span>
        </div>
        <ol className="divide-y divide-gray-100">
          {detail.exampleSteps.map((step, stepIndex) => (
            <li key={step} className="flex gap-4 px-5 py-3.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aso-bg text-xs font-bold text-aso-blue">
                {stepIndex + 1}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Who works here */}
      <div className="mt-12">
        <MicroHeading>Who works here</MicroHeading>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {detail.roles.map((role) => (
            <div key={role.persona} className="text-sm leading-relaxed">
              <span className="font-semibold text-aso-navy">{PERSONA_NAMES[role.persona]}</span>
              <span className="text-gray-500"> — {role.note}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WorkstationsPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* On-page navigation — sticky just below the h-16 site header */}
      <nav
        aria-label="Page sections"
        className="sticky top-16 z-40 border-b border-gray-200 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto text-sm font-medium text-gray-500">
          {PAGE_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="whitespace-nowrap py-3 hover:text-aso-navy transition"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO / PLATFORM DEFINITION */}
      <Anchored id="overview">
        <Section background="navy">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue-light mb-4">
              Platform
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              One operational foundation for your organization
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              AnchorStage Operations is a connected operations platform for live event
              work. Your organization gets one place where its events, records, and
              day to day operations live together.
            </p>
            <p className="text-white/60 leading-relaxed">
              The platform is organized into purpose-built Workstations. Each one is
              built for a different kind of work, and they all operate on the same
              connected information instead of separate copies that drift apart.
            </p>
          </div>
        </Section>
      </Anchored>

      {/* ORGANIZATIONS */}
      <Anchored id="organizations">
        <Section background="white">
          <SectionHeader
            title="Organizations"
            lead="Everyone who joins ASO works through an organization. An organization might be one independent professional, a production company, a venue operator, an event organizer, a musician or performing act, or a rental provider. ASO does not sort members into categories. The organization is simply how you and your work are represented."
          />

          <div className="max-w-3xl mb-12">
            <p className="text-gray-500 leading-relaxed mb-4">
              Professionals reach the work through membership in an organization, and
              that membership is granted, not assumed. What each person can see and
              change is set by the organization they belong to.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The organization is what holds everything. Events start and finish, but
              the record of how they ran stays with the organization that did the work.
            </p>
          </div>

          <MicroHeading>What an organization holds</MicroHeading>
          <div className="divide-y divide-gray-100 border-y border-gray-100 mb-12">
            {ORGANIZATION_HOLDINGS.map((holding) => (
              <div
                key={holding.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6"
              >
                <p className="w-40 shrink-0 text-sm font-semibold text-aso-navy">
                  {holding.label}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {holding.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl border-l-2 border-aso-blue pl-5">
            <p className="text-lg text-aso-navy leading-relaxed">
              Events are what an organization does. The organization is what remains.
            </p>
          </div>
        </Section>
      </Anchored>

      {/* THE ONE-PERSON ORGANIZATION */}
      <Anchored id="solo-organization">
        <Section background="navy">
          <SectionHeader
            dark
            title="The One-Person Organization"
            lead="A one-person organization is a complete organization. If you work independently, you get the same platform as an operation running a full crew."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-white/15 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                On your own
              </p>
              <p className="text-white/70 leading-relaxed">
                You run your own events, track your own gear, issue your own quotes and
                invoices, keep your own documents and media, and build your own
                operating history. Nothing is held back until you add other people. You
                do not need a second organization for the platform to do its job.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                When the work grows
              </p>
              <p className="text-white/70 leading-relaxed">
                When a job is bigger than you want to take on alone, an organization you
                already work with can be added to that event as Primary Collaborator,
                with the access you decide to give them. Your organization stays as it
                is and your history stays where it is.
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-3xl text-white/60 leading-relaxed">
            Collaboration is something you add when the work calls for it, not something
            the platform asks for before it becomes useful.
          </p>
        </Section>
      </Anchored>

      {/* SHARED OPERATING RECORD */}
      <Anchored id="operating-record">
        <Section background="bg">
          <SectionHeader
            title="The Shared Operating Record"
            lead="Every event in ASO is one record. The workstations don't copy it, sync it, or export it to each other — they work directly on it. Here is the flagship demo event, field by field, with the surface that maintains each field."
          />

          {/* Constellation: the four workstations arranged around the record.
              On mobile the nodes stack above the card; the connecting lines
              only render on desktop. */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:hidden">
            {WORKSTATION_DETAILS.map((detail) => (
              <WorkstationNode key={detail.slug} slug={detail.slug} name={detail.name} />
            ))}
          </div>

          <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)_12rem] xl:grid-cols-[13rem_minmax(0,1fr)_13rem] lg:items-center">
            <div className="hidden lg:flex lg:flex-col lg:gap-20">
              <WorkstationNode
                slug={WORKSTATION_DETAILS[0].slug}
                name={WORKSTATION_DETAILS[0].name}
                line="left"
              />
              <WorkstationNode
                slug={WORKSTATION_DETAILS[1].slug}
                name={WORKSTATION_DETAILS[1].name}
                line="left"
              />
            </div>

            <OperatingRecordCard />

            <div className="hidden lg:flex lg:flex-col lg:gap-20">
              <WorkstationNode
                slug={WORKSTATION_DETAILS[2].slug}
                name={WORKSTATION_DETAILS[2].name}
                line="right"
              />
              <WorkstationNode
                slug={WORKSTATION_DETAILS[3].slug}
                name={WORKSTATION_DETAILS[3].name}
                line="right"
              />
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm text-gray-500 leading-relaxed">
            One record means one answer to every question. The crew count the Event
            Workstation fills is the crew count the quote bills for. The gear the
            Inventory Workstation assigns is the gear the Pack List loads. The quote
            Financials issues is the quote the Marketing Workstation follows up on.
          </p>
        </Section>
      </Anchored>

      {/* FOUR WORKSTATIONS */}
      {WORKSTATION_DETAILS.map((detail, index) => (
        <Anchored key={detail.slug} id={detail.slug}>
          <Section background={index % 2 === 0 ? "white" : "bg"}>
            <WorkstationSection detail={detail} index={index} />
          </Section>
        </Anchored>
      ))}

      {/* CONNECTED TOOLS */}
      <Anchored id="tools">
        <Section background="navy">
          <SectionHeader
            dark
            title="Connected Tools"
            lead="The workstations don't work alone. These tools, pages, modes, documents, and surfaces feed the operating record and carry its outputs — but none of them is a Workstation."
          />

          {/* The four workstations, for contrast with the reference table below */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
              Workstations
            </p>
            <div className="flex flex-wrap gap-2">
              {WORKSTATION_DETAILS.map((detail) => (
                <a
                  key={detail.slug}
                  href={`#${detail.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-aso-navy transition hover:bg-aso-blue-light"
                >
                  <WorkstationIcon slug={detail.slug} className="h-3.5 w-3.5 text-aso-blue" />
                  {detail.name}
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
            Connected tools
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/15">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/15 text-xs font-semibold uppercase tracking-widest text-white/50">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Surface
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Kind
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {CONNECTED_TOOLS.map((tool) => (
                  <tr key={tool.name}>
                    <th scope="row" className="whitespace-nowrap px-5 py-3.5 align-top font-semibold text-white">
                      {tool.name}
                    </th>
                    <td className="px-5 py-3.5 align-top">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${KIND_BADGE_DARK_CLASSES[tool.kind]}`}
                      >
                        {tool.kind}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 align-top text-white/60 leading-relaxed">
                      {tool.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Anchored>

      {/* HOW EVERYTHING CONNECTS */}
      <Anchored id="how-it-connects">
        <Section background="white">
          <SectionHeader
            title="How Everything Connects"
            lead="The same demo event, end to end. Each step happens on a different surface — and every step lands on the same operating record."
          />

          <ol className="relative max-w-3xl space-y-0">
            {OPERATING_FLOW.map((step, index) => (
              <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                {index < OPERATING_FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-4 top-8 h-full w-px bg-gray-200"
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-aso-blue shadow-sm">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold text-aso-navy">{step.label}</p>
                    <span className="text-xs font-medium text-gray-400">{step.surface}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </Anchored>

      {/* CTA */}
      <Section background="white" className="border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">
            One record. Four workstations. Your operation.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Membership is free — use the workstations that fit how you work.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
