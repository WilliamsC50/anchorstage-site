/**
 * ASO Demo Data Canon — the official fictional universe for ALL public-facing
 * marketing, homepage interactions, workstation previews, screenshots,
 * documentation examples, and tutorials.
 *
 * Rules:
 * - Never use real customers, venues, organizations, or events in marketing.
 * - Never invent new fake names in a section/screenshot — import from here.
 * - Values must stay believable and mutually consistent (one universe).
 * - Only depict data the platform actually supports.
 */

export interface DemoOrg {
  id: string;
  name: string;
  /** What kind of member org this represents in demo scenarios. */
  kind:
    | "production-company"
    | "audio-production"
    | "event-organizer"
    | "rental-provider"
    | "venue-group";
}

export const DEMO_ORGS: DemoOrg[] = [
  { id: "blue-ridge", name: "Blue Ridge Productions", kind: "production-company" },
  { id: "stagecraft", name: "StageCraft Audio", kind: "audio-production" },
  { id: "horizon", name: "Horizon Events", kind: "event-organizer" },
  { id: "summit", name: "Summit Rentals", kind: "rental-provider" },
  { id: "north-point", name: "North Point Venues", kind: "venue-group" },
];

export interface DemoClient {
  id: string;
  name: string;
}

export const DEMO_CLIENTS: DemoClient[] = [
  { id: "sunset-events", name: "Sunset Events" },
  { id: "city-arts", name: "City Arts Council" },
  { id: "downtown", name: "Downtown Partnership" },
  { id: "winter-arts", name: "Winter Arts Festival" },
];

export interface DemoVenue {
  id: string;
  name: string;
}

export const DEMO_VENUES: DemoVenue[] = [
  { id: "lakeside", name: "Lakeside Pavilion" },
  { id: "harbor-hall", name: "Harbor Hall" },
  { id: "riverfront", name: "Riverfront Park" },
  { id: "grand-ballroom", name: "Grand Ballroom" },
];

/** Recurring series names for demos of the Series (parent/child) system. */
export const DEMO_RECURRING_EVENTS: string[] = [
  "Summer Concert Series",
  "Friday Night Market",
  "Community Food Festival",
  "Jazz Under the Stars",
];

/** Canonical demo identifiers — reuse these exact values everywhere. */
export const DEMO_IDS = {
  eventCode: "EVT-20260704-0001",
  quoteNumber: "Q-00027",
  invoiceNumber: "INV-00027",
} as const;

/**
 * The flagship demo event — one fully-specified operating record used by the
 * homepage Fragmentation → Operating Record interaction and reusable for
 * screenshots and previews. Every field maps to a real platform capability
 * (readiness, crew fill counts, gear packages/items, Power Planner amperage,
 * issued quote/invoice, deposit tracking, Production Brief, Pack List,
 * Media & Assets counts, projected margin).
 */
export const DEMO_EVENT = {
  name: "Summer Concert Series",
  code: DEMO_IDS.eventCode,
  readiness: "Ready",
  client: DEMO_CLIENTS[0].name, // Sunset Events
  venue: DEMO_VENUES[0].name, // Lakeside Pavilion
  ownerOrg: DEMO_ORGS[0].name, // Blue Ridge Productions
  primaryCollaborator: DEMO_ORGS[1].name, // StageCraft Audio
  crew: { filled: 7, total: 7 },
  gear: { packages: 3, items: 126 },
  powerPlannedAmps: "18.4A",
  quoteNumber: DEMO_IDS.quoteNumber,
  depositStatus: "Received",
  productionBriefStatus: "Generated",
  packListStatus: "Ready",
  mediaAssetCount: 214,
  invoiceStatus: "Pending",
  projectedMarginPct: 31,
} as const;
