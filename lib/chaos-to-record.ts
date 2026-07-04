/**
 * Data for the homepage "Fragmentation → Operating Record" interaction
 * (components/ChaosToRecord.tsx). All positions, connectors, and timings are
 * authored constants — the scene is deterministic for every visitor.
 *
 * Record labels use ASO Platform Canon terminology only.
 */

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
  /** Reveal delay in ms from the start of the "building" phase. */
  delayMs: number;
  /** Optional platform-authentic badge. */
  badge?: { text: string; tone: "code" | "ready" };
  /** Event row is the record's identity line. */
  emphasis?: boolean;
}

/**
 * Seven beats (~220–340ms apart), 90ms stagger inside a beat:
 * [Intake, Event] [Client, Venue] [Collaborators] [Gear, Crew Assignments]
 * [Quote, Readiness] [Production Brief, Pack List, Media & Assets]
 * [Invoice, Financials]
 */
export const RECORD_STEPS: RecordStep[] = [
  { id: "intake", label: "Intake Submission", delayMs: 0 },
  { id: "event", label: "Event", delayMs: 90, emphasis: true, badge: { text: "EVT-20260704-0001", tone: "code" } },
  { id: "client", label: "Client", delayMs: 340 },
  { id: "venue", label: "Venue", delayMs: 430 },
  { id: "collaborators", label: "Collaborators", delayMs: 640 },
  { id: "gear", label: "Gear", delayMs: 900 },
  { id: "crew", label: "Crew Assignments", delayMs: 990 },
  { id: "quote", label: "Quote", delayMs: 1240 },
  { id: "readiness", label: "Readiness", delayMs: 1330, badge: { text: "Ready", tone: "ready" } },
  { id: "production-brief", label: "Production Brief", delayMs: 1580 },
  { id: "pack-list", label: "Pack List", delayMs: 1670 },
  { id: "media-assets", label: "Media & Assets", delayMs: 1760 },
  { id: "invoice", label: "Invoice", delayMs: 2000 },
  { id: "financials", label: "Financials", delayMs: 2090 },
];

/** Master timeline (ms). All offsets are relative to the CTA click. */
export const TIMELINE = {
  /** Dotted connectors die first. */
  disconnectMs: 400,
  /**
   * Departure offsets from the start of the consuming phase — accelerating
   * cadence with a deliberate hesitation before the final item.
   */
  departOffsetsMs: [0, 340, 640, 910, 1150, 1370, 1570, 1910] as readonly number[],
  /** Chip travel time into the ASO mark. */
  travelMs: 420,
  /** Pause after the last arrival before the Intake Submission beat. */
  intakeLeadMs: 120,
  /** Intake Submission chip visible duration. */
  intakeHoldMs: 750,
  /** Glow (700ms) + stillness (200ms). */
  absorbMs: 900,
  /** Build phase duration (last row delay + settle). */
  buildMs: 2500,
} as const;

export const COMPLETE_STORAGE_KEY = "aso-chaos-to-record-complete";
