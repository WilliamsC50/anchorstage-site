import type { Workstation } from "./content-types";

// Only the six featured on the homepage preview so far. The remaining
// canonical slugs (operations, media, power, automation) get populated
// when the full /workstations page is built.
export const WORKSTATIONS: Workstation[] = [
  {
    slug: "event",
    name: "Event Workstation",
    tagline: "Plan events from inquiry to wrap-up.",
  },
  {
    slug: "crew",
    name: "Crew Workstation",
    tagline: "Coordinate people, roles, and collaborators.",
  },
  {
    slug: "inventory",
    name: "Inventory Workstation",
    tagline: "Track gear, packages, and shared resources.",
  },
  {
    slug: "financial",
    name: "Financial Workstation",
    tagline: "Build quotes, invoices, and business records.",
  },
  {
    slug: "marketing",
    name: "Marketing Workstation",
    tagline: "Turn event history into repeatable campaigns.",
  },
  {
    slug: "practice",
    name: "Practice Workstation",
    tagline: "Learn the system without risking real work.",
  },
];
