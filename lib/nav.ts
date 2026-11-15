import { INTAKE_LOGIN_URL } from "./constants";
import { REGISTER_LABEL_SHORT, REGISTER_URL } from "./registration";
import type { NavItem } from "./content-types";

// The complete public marketing navigation. Five pages, no dropdowns,
// no nested items. The logo returns Home, so Home is not listed here.
//
// Platform first (DESIGN-17A.3): the platform is what an organization signs
// up to run; the network is what it connects to once it is there.
export const PRIMARY_NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Network", href: "/network" },
  { label: "Who It's For", href: "/who-its-for" },
  { label: "About", href: "/about" },
];

export const AUTH_NAV: { login: NavItem; join: NavItem } = {
  login: { label: "Log In", href: INTAKE_LOGIN_URL },
  // Header and mobile menu registration button. Wording and the FREE badge
  // live in lib/registration.ts.
  join: { label: REGISTER_LABEL_SHORT, href: REGISTER_URL },
};
