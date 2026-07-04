/**
 * Data for the homepage "Fragmentation → Operating Record" interaction
 * (components/ChaosToRecord.tsx). All positions, connectors, and timings are
 * authored constants — the scene is deterministic for every visitor.
 *
 * Record labels use ASO Platform Canon terminology only; all fictional
 * names/values come from the ASO Demo Data Canon (lib/demo-canon.ts).
 */
import { DEMO_EVENT } from "./demo-canon";

/** One scattered information source in the chaos field. */
export interface ChaosSource {
  id: string;
  label: string;
  /** 1-based consumption order (Memory first, Spreadsheets last). */
  consumeOrder: number;
  /** Authored position as % of the chaos stage (chip center). */
  x: number;
  y: number;
  /** Static rotation in degrees for the scattered look. */
  rotate: number;
  /** Idle drift stagger, in ms. */
  driftDelay: number;
}

/**
 * Positions form a loose ring so the stage center stays clear for the ASO
 * mark on every breakpoint (mobile renders the logo inside this same field).
 */
export const CHAOS_SOURCES: ChaosSource[] = [
  { id: "memory", label: "Memory", consumeOrder: 1, x: 72, y: 10, rotate: -3, driftDelay: 0 },
  { id: "paper-notes", label: "Paper Notes", consumeOrder: 2, x: 13, y: 64, rotate: 2, driftDelay: 900 },
  { id: "texts", label: "Text Messages", consumeOrder: 3, x: 10, y: 34, rotate: -2, driftDelay: 1800 },
  { id: "messenger", label: "Messenger", consumeOrder: 4, x: 80, y: 64, rotate: -1, driftDelay: 2600 },
  { id: "phone", label: "Phone Calls", consumeOrder: 5, x: 86, y: 34, rotate: 3, driftDelay: 3400 },
  { id: "email", label: "Email", consumeOrder: 6, x: 28, y: 8, rotate: 2, driftDelay: 4100 },
  { id: "cloud", label: "Cloud Drives", consumeOrder: 7, x: 62, y: 88, rotate: -2, driftDelay: 4900 },
  { id: "spreadsheets", label: "Spreadsheets", consumeOrder: 8, x: 30, y: 90, rotate: 1, driftDelay: 5600 },
];

/**
 * Tangled peer-to-peer dotted connectors (sources linked to each other, not
 * to a hub — that's the point). Drawn in a 0–100 viewBox over the stage.
 */
export const CHAOS_CONNECTORS: ReadonlyArray<readonly [string, string]> = [
  ["memory", "email"],
  ["email", "texts"],
  ["texts", "messenger"],
  ["messenger", "phone"],
  ["phone", "cloud"],
  ["paper-notes", "texts"],
  ["paper-notes", "cloud"],
  ["cloud", "spreadsheets"],
  ["spreadsheets", "messenger"],
  ["email", "phone"],
];

/** One row of the operating record that assembles on the right. */
export interface RecordStep {
  id: string;
  /** Canonical platform term. */
  label: string;
  /** Operational value from the ASO Demo Data Canon (lib/demo-canon.ts). */
  value?: string;
  /** Reveal delay in ms from the start of the "building" phase. */
  delayMs: number;
  /** Optional platform-authentic badge. */
  badge?: { text: string; tone: "code" | "ready" };
  /** Event row is the record's identity line. */
  emphasis?: boolean;
}

/**
 * The record assembles as the flagship demo event (DEMO_EVENT), not a
 * generic checklist — every value maps to a real platform capability.
 * Nine beats (~160ms apart), 80ms stagger inside a beat; last row lands at
 * 1880ms so the total interaction stays under ~7 seconds.
 */
export const RECORD_STEPS: RecordStep[] = [
  { id: "intake", label: "Intake Submission", value: "Converted", delayMs: 0 },
  {
    id: "event",
    label: "Event",
    value: DEMO_EVENT.name,
    delayMs: 80,
    emphasis: true,
    badge: { text: DEMO_EVENT.code, tone: "code" },
  },
  { id: "client", label: "Client", value: DEMO_EVENT.client, delayMs: 240 },
  { id: "venue", label: "Venue", value: DEMO_EVENT.venue, delayMs: 320 },
  { id: "owner", label: "Owner", value: DEMO_EVENT.ownerOrg, delayMs: 480 },
  {
    id: "primary-collaborator",
    label: "Primary Collaborator",
    value: DEMO_EVENT.primaryCollaborator,
    delayMs: 560,
  },
  {
    id: "gear",
    label: "Gear",
    value: `${DEMO_EVENT.gear.packages} Packages · ${DEMO_EVENT.gear.items} Items`,
    delayMs: 720,
  },
  {
    id: "power",
    label: "Power Planner",
    value: `${DEMO_EVENT.powerPlannedAmps} Planned`,
    delayMs: 800,
  },
  {
    id: "crew",
    label: "Crew Assignments",
    value: `${DEMO_EVENT.crew.filled} / ${DEMO_EVENT.crew.total} Filled`,
    delayMs: 960,
  },
  { id: "quote", label: "Quote", value: DEMO_EVENT.quoteNumber, delayMs: 1120 },
  { id: "deposit", label: "Deposit", value: DEMO_EVENT.depositStatus, delayMs: 1200 },
  {
    id: "readiness",
    label: "Readiness",
    delayMs: 1360,
    badge: { text: DEMO_EVENT.readiness, tone: "ready" },
  },
  {
    id: "production-brief",
    label: "Production Brief",
    value: DEMO_EVENT.productionBriefStatus,
    delayMs: 1500,
  },
  { id: "pack-list", label: "Pack List", value: DEMO_EVENT.packListStatus, delayMs: 1580 },
  {
    id: "media-assets",
    label: "Media & Assets",
    value: `${DEMO_EVENT.mediaAssetCount} Assets`,
    delayMs: 1660,
  },
  { id: "invoice", label: "Invoice", value: DEMO_EVENT.invoiceStatus, delayMs: 1800 },
  {
    id: "margin",
    label: "Projected Margin",
    value: `${DEMO_EVENT.projectedMarginPct}%`,
    delayMs: 1880,
  },
];

/** Master timeline (ms). All offsets are relative to the CTA click. */
export const TIMELINE = {
  /** Dotted connectors die first. */
  disconnectMs: 400,
  /**
   * Unstable beat: chips stay put and wiggle, fully readable, before ASO
   * starts consuming them.
   */
  unstableMs: 1050,
  /**
   * Departure offsets from the start of the consuming phase — accelerating
   * cadence with a deliberate hesitation before the final item.
   */
  departOffsetsMs: [0, 280, 520, 730, 920, 1090, 1240, 1520] as readonly number[],
  /** Chip travel time into the ASO mark. */
  travelMs: 380,
  /** Pause after the last arrival before the Intake Submission beat. */
  intakeLeadMs: 120,
  /** Intake Submission chip visible duration. */
  intakeHoldMs: 600,
  /** Glow (~600ms) + stillness (150ms). */
  absorbMs: 750,
  /** Build phase duration (last row delay + settle). */
  buildMs: 2150,
} as const;

export const COMPLETE_STORAGE_KEY = "aso-chaos-to-record-complete";
