import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "./constants";
import type { NavItem } from "./content-types";

// The complete public marketing navigation. Five pages, no dropdowns,
// no nested items. The logo returns Home, so Home is not listed here.
//
// Order is the story order: Network before Platform. The network is why ASO
// exists; the platform is how the work gets done inside it.
export const PRIMARY_NAV: NavItem[] = [
  { label: "Network", href: "/network" },
  { label: "Platform", href: "/platform" },
  { label: "Who It's For", href: "/who-its-for" },
  { label: "About", href: "/about" },
];

export const AUTH_NAV: { login: NavItem; join: NavItem } = {
  login: { label: "Log In", href: INTAKE_LOGIN_URL },
  // "Join Free" everywhere on the marketing site. "Create Account" is
  // reserved for the registration page on intake.anchorstageops.com.
  join: { label: "Join Free", href: INTAKE_REGISTER_URL },
};
