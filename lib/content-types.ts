export interface NavItem {
  label: string;
  href: string;
}

/**
 * Official product terminology: "Workstations" — never "Workspaces",
 * "Modules", or "Features" in public content.
 */
export type WorkstationSlug = "event" | "inventory" | "marketing" | "signage";

export interface Workstation {
  slug: WorkstationSlug;
  name: string;
  /** One public-facing line describing what this Workstation is for. */
  tagline: string;
}

export type PersonaSlug =
  | "freelancers"
  | "production-companies"
  | "venues"
  | "event-organizers"
  | "musicians"
  | "rental-providers";

/**
 * One public audience on /who-its-for. These are marketing classifications
 * only. The platform does not store or act on an organization type, so
 * nothing here may imply ASO configures itself per audience.
 */
export interface Persona {
  slug: PersonaSlug;
  /** Group label used as the card heading ("Venues"). */
  name: string;
  /** Concrete real-world examples, for the "that's me" signal. */
  examples: string;
  /** Who this audience is, in one sentence. */
  whoTheyAre: string;
  /** The operational problem they have before ASO, in one sentence. */
  problem: string;
  /** What ASO supports for them today. Current capability only. */
  support: string;
}
