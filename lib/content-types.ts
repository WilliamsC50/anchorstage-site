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
  name: string;
}

export interface PricingTier {
  slug: string;
  name: string;
  isMembership: boolean;
}
