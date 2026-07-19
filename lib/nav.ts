import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "./constants";
import type { NavItem } from "./content-types";

// The complete public marketing navigation. Five pages, no dropdowns,
// no nested items. The logo returns Home, so Home is not listed here.
export const PRIMARY_NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Network", href: "/network" },
  { label: "Who It's For", href: "/who-its-for" },
  { label: "About", href: "/about" },
];

export const AUTH_NAV: { login: NavItem; join: NavItem } = {
  login: { label: "Log In", href: INTAKE_LOGIN_URL },
  // "Join Free" everywhere on the marketing site. "Create Account" is
  // reserved for the registration page on intake.anchorstageops.com.
  join: { label: "Join Free", href: INTAKE_REGISTER_URL },
};
