import type { Metadata } from "next";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import WorkstationIcon from "@/components/WorkstationIcon";
import type {
  ConnectedToolKind,
  PersonaSlug,
  WorkstationDetail,
  WorkstationSlug,
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
  { id: "operating-record", label: "Operating Record" },
  { id: "event", label: "Event" },
  { id: "inventory", label: "Inventory" },
  { id: "marketing", label: "Marketing" },
  { id: "signage", label: "Signage" },
  { id: "tools", label: "Connected Tools" },
  { id: "how-it-connects", label: "How It Connects" },
] as const;

interface RecordField {
  label: string;
  value: string;
  maintainedIn: string;
}

/** The record fields shown as tiles in the centerpiece card. Values come
 *  only from DEMO_EVENT; each is attributed to the surface maintaining it. */
const RECORD_PRIMARY_FIELDS: RecordField[] = [
  { label: "Client", value: DEMO_EVENT.client, maintainedIn: "Event Workstation" },
  { label: "Venue", value: DEMO_EVENT.venue, maintainedIn: "Event Workstation" },
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
  { label: "Quote", value: DEMO_EVENT.quoteNumber, maintainedIn: "Financials" },
  { label: "Invoice", value: DEMO_EVENT.invoiceStatus, maintainedIn: "Financials" },
  {
    label: "Media & Assets",
    value: `${DEMO_EVENT.mediaAssetCount} Tagged`,
    maintainedIn: "Media & Assets",
  },
];

/** The rest of the record, shown as a compact footer strip on the card. */
const RECORD_SECONDARY_FIELDS: { label: string; value: string }[] = [
  { label: "Owner", value: DEMO_EVENT.ownerOrg },
  { label: "Primary Collaborator", value: DEMO_EVENT.primaryCollaborator },
  { label: "Planned Power", value: DEMO_EVENT.powerPlannedAmps },
  { label: "Deposit", value: DEMO_EVENT.depositStatus },
  { label: "Production Brief", value: DEMO_EVENT.productionBriefStatus },
  { label: "Pack List", value: DEMO_EVENT.packListStatus },
  { label: "Projected Margin", value: `${DEMO_EVENT.projectedMarginPct}%` },
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

/** Short display name for constellation nodes ("Event Workstation" → "Event"). */
function shortName(name: string): string {
  return name.replace(" Workstation", "");
}

// ── Documentation atoms ────────────────────────────────────────────────────────

function MicroHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </p>
  );
}

/** MicroHeading without the bottom margin, for inline header rows. */
function MicroHeadingInline({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{children}</p>
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

function SectionHeader({
  title,
  lead,
  dark = false,
}: {
  title: string;
  lead: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-aso-navy"}`}
      >
        {title}
      </h2>
      <p className={`leading-relaxed ${dark ? "text-white/60" : "text-gray-500"}`}>{lead}</p>
    </div>
  );
}

// ── Screenshot placeholder ─────────────────────────────────────────────────────

/**
 * Reserved frame for a real product capture. Swapping in a screenshot later
 * means replacing the inner placeholder <div> with an <Image> at the same
 * 16:9 ratio (1600 × 900) — the figure, border, and layout stay untouched.
 */
function ScreenshotFrame({ name }: { name: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex aspect-video flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="mb-1 h-8 w-8 text-slate-300"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10.5" r="1.5" />
          <path d="m5.5 16.5 4-4 3 3 3-3 3 3" />
        </svg>
        <figcaption className="text-sm font-semibold text-slate-500">
          {name} Screenshot
        </figcaption>
        <p className="font-mono text-xs text-slate-400">1600 × 900</p>
        <p className="text-xs text-slate-400">Replace with real product capture</p>
      </div>
    </figure>
  );
}

// ── Operating record constellation ─────────────────────────────────────────────

function WorkstationNode({
  slug,
  name,
  line,
}: {
  slug: WorkstationSlug;
  name: string;
  line?: "left" | "right";
}) {
  const card = (
    <a
      href={`#${slug}`}
      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-aso-blue"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue">
        <WorkstationIcon slug={slug} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-aso-navy">
          {shortName(name)}
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Workstation
        </span>
      </span>
    </a>
  );

  if (!line) return card;

  return (
    <div className="flex items-center">
      {line === "right" && <span aria-hidden className="h-px flex-1 bg-slate-300" />}
      <div className="w-44 xl:w-48 shrink-0">{card}</div>
      {line === "left" && <span aria-hidden className="h-px flex-1 bg-slate-300" />}
    </div>
  );
}

function OperatingRecordCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-aso-navy px-6 py-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <p className="truncate font-semibold text-white">{DEMO_EVENT.name}</p>
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
            {DEMO_EVENT.code}
          </span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
          Operating Record
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-px bg-slate-100 md:grid-cols-4">
        {RECORD_PRIMARY_FIELDS.map((field) => (
          <div key={field.label} className="bg-white px-4 py-4 sm:px-5">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
              {field.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-aso-navy sm:text-base">
              {field.value}
            </dd>
            <dd className="mt-1 text-[10px] text-gray-400 sm:text-xs">{field.maintainedIn}</dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
        <dl className="flex flex-wrap gap-x-6 gap-y-1.5">
          {RECORD_SECONDARY_FIELDS.map((field) => (
            <div key={field.label} className="flex items-baseline gap-1.5 text-xs">
              <dt className="text-gray-400">{field.label}</dt>
              <dd className="font-semibold text-gray-600">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

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
  const workstationNames = WORKSTATION_DETAILS.map((detail) => detail.name);

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

      {/* HERO / OVERVIEW */}
      <Anchored id="overview">
        <Section background="navy">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue-light mb-4">
              Platform Reference
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Workstations</h1>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              A Workstation is a purpose-built working surface over the shared operating
              record. Each one gives a different operation — running an event, managing
              gear, filling the booking pipeline, driving screens — the tools that
              operation needs, while every workstation reads and writes the same record.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              That&apos;s why ASO has multiple Workstations instead of one giant
              application: different operations need different tools, but they never
              need different data. Assign gear in one workstation and the event&apos;s
              quote already knows about it. Issue the quote and the marketing pipeline
              already tracks the follow-up.
            </p>
            <div className="rounded-lg border border-white/15 bg-white/5 p-5">
              <p className="text-sm text-white/70 leading-relaxed">
                <span className="font-semibold text-white">
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
