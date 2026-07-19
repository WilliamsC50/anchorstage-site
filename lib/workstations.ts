import type { Workstation } from "./content-types";

// The four ASO Workstations, matching the platform application.
// Public-facing taglines only. Full capability breakdowns belong in the
// product, not on the marketing site.
export const WORKSTATIONS: Workstation[] = [
  {
    slug: "event",
    name: "Event",
    tagline: "Run each event from the first request through the final invoice.",
  },
  {
    slug: "inventory",
    name: "Inventory",
    tagline: "Track gear and packages, and see what is committed to which event.",
  },
  {
    slug: "marketing",
    name: "Marketing",
    tagline: "Follow up on quotes and build on the events you have already run.",
  },
  {
    slug: "signage",
    name: "Signage",
    tagline: "Drive venue screens and event displays from live event information.",
  },
];
