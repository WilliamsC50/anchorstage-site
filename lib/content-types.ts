export interface NavItem {
  label: string;
  href: string;
}

/**
 * Official product terminology: "Workstations" — never "Modules" or
 * "Features" in marketing-facing content.
 *
 * Full canonical set per the approved architecture; only a subset is
 * populated in lib/workstations.ts until the Workstations page ships.
 */
export type WorkstationSlug =
  | "event"
  | "operations"
  | "crew"
  | "inventory"
  | "marketing"
  | "media"
  | "financial"
  | "power"
  | "practice"
  | "automation";

export interface Workstation {
  slug: WorkstationSlug;
  name: string;
  tagline: string;
  comingSoon?: boolean;
}

export type PersonaSlug =
  | "freelancers"
  | "production-companies"
  | "venues"
  | "musicians"
  | "rental-providers"
  | "event-organizers";

export interface Persona {
  slug: PersonaSlug;
  /** Category label, e.g. nav/index listings ("Musicians"). */
  name: string;
  /** Individual-identity label, e.g. "Which one are you?" cards ("Musician"). */
  singularName: string;
  /** Short one-line description used on identity/path-selector cards. */
  tagline: string;
  /** Longer descriptive sentence, reserved for the future /for-members/[slug] page. */
  description: string;
  /** Four action-oriented items shown on the homepage identity card. */
  checklist: readonly [string, string, string, string];
  /** Concrete role/event examples revealed on the identity card's hover/focus
   *  state — "people like me belong here." Length varies by persona (5-6). */
  examples: readonly string[];
}

export interface PricingTier {
  slug: string;
  name: string;
  isMembership: boolean;
}
