export interface NavItem {
  label: string;
  href: string;
}

/**
 * Official product terminology: "Workstations" — never "Modules" or
 * "Features" in marketing-facing content.
 */
export interface Workstation {
  slug: string;
  name: string;
  icon: string;
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
}

export interface PricingTier {
  slug: string;
  name: string;
  isMembership: boolean;
}
