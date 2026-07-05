import type { Metadata } from "next";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import type { ConnectedToolKind, PersonaSlug, WorkstationDetail } from "@/lib/content-types";
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
  { id: "operating-record", label: "Operating Record" },
  { id: "event", label: "Event" },
  { id: "inventory", label: "Inventory" },
  { id: "marketing", label: "Marketing" },
  { id: "signage", label: "Signage" },
  { id: "tools", label: "Connected Tools" },
  { id: "how-it-connects", label: "How It Connects" },
] as const;

/** The flagship operating record rendered field by field, each attributed to
 *  the surface that maintains it. Values come only from DEMO_EVENT. */
const RECORD_FIELDS: { label: string; value: string; maintainedIn: string }[] = [
  { label: "Event Code", value: DEMO_EVENT.code, maintainedIn: "Intake → Event" },
  { label: "Client", value: DEMO_EVENT.client, maintainedIn: "Event Workstation" },
  { label: "Venue", value: DEMO_EVENT.venue, maintainedIn: "Event Workstation" },
  { label: "Owner", value: DEMO_EVENT.ownerOrg, maintainedIn: "Event Workstation" },
  {
    label: "Primary Collaborator",
    value: DEMO_EVENT.primaryCollaborator,
    maintainedIn: "Event Workstation",
  },
  { label: "Readiness", value: DEMO_EVENT.readiness, maintainedIn: "Event Workstation" },
  {
    label: "Crew",
    value: `${DEMO_EVENT.crew.filled} / ${DEMO_EVENT.crew.total} Filled`,
    maintainedIn: "Event Workstation",
  },
  {
    label: "Gear",
    value: `${DEMO_EVENT.gear.packages} Packages · ${DEMO_EVENT.gear.items} Items`,
    maintainedIn: "Inventory Workstation",
  },
  { label: "Planned Power", value: DEMO_EVENT.powerPlannedAmps, maintainedIn: "Power Planner" },
  { label: "Quote", value: DEMO_EVENT.quoteNumber, maintainedIn: "Financials" },
  { label: "Deposit", value: DEMO_EVENT.depositStatus, maintainedIn: "Financials" },
  {
    label: "Production Brief",
    value: DEMO_EVENT.productionBriefStatus,
    maintainedIn: "Event Workstation",
  },
  { label: "Pack List", value: DEMO_EVENT.packListStatus, maintainedIn: "Event Workstation" },
  {
    label: "Media & Assets",
    value: `${DEMO_EVENT.mediaAssetCount} Tagged`,
    maintainedIn: "Media & Assets",
  },
  { label: "Invoice", value: DEMO_EVENT.invoiceStatus, maintainedIn: "Financials" },
  {
    label: "Projected Margin",
    value: `${DEMO_EVENT.projectedMarginPct}%`,
    maintainedIn: "Financials",
  },
];

const KIND_BADGE_CLASSES: Record<ConnectedToolKind, string> = {
  tool: "bg-sky-50 text-sky-700 border-sky-200",
  mode: "bg-violet-50 text-violet-700 border-violet-200",
  page: "bg-gray-100 text-gray-600 border-gray-200",
  document: "bg-amber-50 text-amber-700 border-amber-200",
  surface: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const PERSONA_NAMES: Record<PersonaSlug, string> = Object.fromEntries(
  PERSONAS.map((persona) => [persona.slug, persona.name]),
) as Record<PersonaSlug, string>;

// ── Documentation atoms ────────────────────────────────────────────────────────

function MicroHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </p>
  );
}

function KindBadge({ kind }: { kind: ConnectedToolKind }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${KIND_BADGE_CLASSES[kind]}`}
    >
      {kind}
    </span>
  );
}

/** Anchor wrapper: gives each Section a stable id with room for the sticky
 *  header + jump bar when the browser scrolls to it. */
function Anchored({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28">
      {children}
    </div>
  );
}

function SectionHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="max-w-3xl mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-aso-navy mb-4">{title}</h2>
      <p className="text-gray-500 leading-relaxed">{lead}</p>
    </div>
  );
}

// ── Workstation section ────────────────────────────────────────────────────────

function WorkstationSection({ detail }: { detail: WorkstationDetail }) {
  return (
    <>
      <SectionHeader title={detail.name} lead={detail.definition} />

      <div className="space-y-12">
        {/* What it owns */}
        <div>
          <MicroHeading>What it owns</MicroHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.owns.map((owned) => (
              <div
                key={owned.surface}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <p className="font-semibold text-sm text-aso-navy mb-1">{owned.surface}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{owned.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Record contract */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <MicroHeading>Reads from the record</MicroHeading>
            <ul className="space-y-2">
              {detail.reads.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-600">
                  <span aria-hidden className="mt-0.5 shrink-0 text-aso-blue">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <MicroHeading>Writes to the record</MicroHeading>
            <ul className="space-y-2">
              {detail.writes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-600">
                  <span aria-hidden className="mt-0.5 shrink-0 text-aso-navy">
                    ←
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Worked example */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-200 bg-aso-bg px-5 py-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <MicroHeadingInline>Worked example</MicroHeadingInline>
            <span className="rounded bg-white border border-gray-200 px-2 py-0.5 font-mono text-xs text-gray-500">
              {DEMO_EVENT.code}
            </span>
          </div>
          <ol className="divide-y divide-gray-100">
            {detail.exampleSteps.map((step, index) => (
              <li key={step} className="flex gap-4 px-5 py-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aso-bg text-xs font-bold text-aso-blue">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Who works here */}
        <div>
          <MicroHeading>Who works here</MicroHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {detail.roles.map((role) => (
              <div key={role.persona} className="text-sm leading-relaxed">
                <span className="font-semibold text-aso-navy">
                  {PERSONA_NAMES[role.persona]}
                </span>
                <span className="text-gray-500"> — {role.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/** MicroHeading without the bottom margin, for inline header rows. */
function MicroHeadingInline({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{children}</p>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WorkstationsPage() {
  const workstationNames = WORKSTATION_DETAILS.map((detail) => detail.name);

  return (
    <main className="bg-white text-gray-900">
      {/* On-page navigation — sticky just below the h-16 site header */}
      <nav
        aria-label="Page sections"
        className="sticky top-16 z-40 border-b border-gray-200 bg-white/95 backdrop-blur"
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

      {/* OVERVIEW */}
      <Anchored id="overview">
        <Section background="white">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-4">
              Platform Reference
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-aso-navy mb-6">Workstations</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A Workstation is a purpose-built working surface over the shared operating
              record. Each one gives a different operation — running an event, managing
              gear, filling the booking pipeline, driving screens — the tools that
              operation needs, while every workstation reads and writes the same record.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              That&apos;s why ASO has multiple Workstations instead of one giant
              application: different operations need different tools, but they never
              need different data. Assign gear in one workstation and the event&apos;s
              quote already knows about it. Issue the quote and the marketing pipeline
              already tracks the follow-up.
            </p>
            <div className="rounded-lg border border-gray-200 bg-aso-bg p-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-aso-navy">
                  There are exactly four Workstations:
                </span>{" "}
                {workstationNames.join(", ")}. Other surfaces — Intake, Financials, the
                Dashboard, Power Planner, Media &amp; Assets, Practice Mode — are
                connected tools, pages, or modes that keep the record complete. They are
                not Workstations.
              </p>
            </div>
          </div>
        </Section>
      </Anchored>

      {/* SHARED OPERATING RECORD */}
      <Anchored id="operating-record">
        <Section background="bg">
          <SectionHeader
            title="The Shared Operating Record"
            lead="Every event in ASO is one record. The workstations don't copy it, sync it, or export it to each other — they work directly on it. Here is the flagship demo event, field by field, with the surface that maintains each field."
          />

          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-6 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-aso-navy">{DEMO_EVENT.name}</p>
                <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500">
                  {DEMO_EVENT.code}
                </span>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                {DEMO_EVENT.readiness}
              </span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-gray-100 sm:divide-y-0">
              {RECORD_FIELDS.map((field) => (
                <div
                  key={field.label}
                  className="px-6 py-4 sm:border-b sm:border-gray-100 lg:[&:nth-last-child(-n+4)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {field.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-aso-navy">{field.value}</dd>
                  <dd className="mt-1 text-xs text-gray-400">{field.maintainedIn}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-gray-500 leading-relaxed">
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
            <WorkstationSection detail={detail} />
          </Section>
        </Anchored>
      ))}

      {/* CONNECTED TOOLS */}
      <Anchored id="tools">
        <Section background="white">
          <SectionHeader
            title="Connected Tools"
            lead="The workstations don't work alone. These tools, pages, modes, documents, and surfaces feed the operating record and carry its outputs — but none of them is a Workstation."
          />

          <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
            {CONNECTED_TOOLS.map((tool) => (
              <div key={tool.name} className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <p className="font-semibold text-sm text-aso-navy">{tool.name}</p>
                  <KindBadge kind={tool.kind} />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </Anchored>

      {/* HOW EVERYTHING CONNECTS */}
      <Anchored id="how-it-connects">
        <Section background="bg">
          <SectionHeader
            title="How Everything Connects"
            lead="The same demo event, end to end. Each step happens on a different surface — and every step lands on the same operating record."
          />

          <ol className="relative max-w-3xl space-y-0">
            {OPERATING_FLOW.map((step, index) => (
              <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
                {/* rail */}
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
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            One record. Four workstations. Your operation.
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Membership is free — use the workstations that fit how you work.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
