import type { PlatformTool, Workstation } from "./content-types";

// The four real ASO workstations — matches the platform dashboard
// (Event, Inventory, Marketing, Signage). Capability names are canonical
// platform labels; keep them aligned with lib/event-workflow.ts.
export const WORKSTATIONS: Workstation[] = [
  {
    slug: "event",
    name: "Event Workstation",
    tagline: "Run each event from intake conversion to final invoice.",
    capabilities: ["Crew Assignments", "Gear", "Readiness", "Issued Documents"],
  },
  {
    slug: "inventory",
    name: "Inventory Workstation",
    tagline: "Track gear, packages, and requests across every event.",
    capabilities: ["Gear Inventory", "Gear Packages", "Gear Requests", "Power Audit"],
  },
  {
    slug: "marketing",
    name: "Marketing Workstation",
    tagline: "Turn event history into repeatable campaigns.",
    capabilities: ["Lead Pipeline", "Quote Follow-Up", "Asset Library", "Announcements"],
  },
  {
    slug: "signage",
    name: "Signage Workstation",
    tagline: "Drive screens and displays straight from the operating record.",
    capabilities: ["Screen Management", "Venue Signage", "Event Displays"],
  },
];

// Supporting surfaces shown in the homepage tools strip. These are
// tools, modes, and pages — never call them workstations.
export const SUPPORT_TOOLS: PlatformTool[] = [
  { name: "Intake", kind: "tool" },
  { name: "Financials", kind: "tool" },
  { name: "Dashboard", kind: "page" },
  { name: "Media & Assets", kind: "tool" },
  { name: "Power Planner", kind: "tool" },
  { name: "Practice Mode", kind: "mode" },
];
