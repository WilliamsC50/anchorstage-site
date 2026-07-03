import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "./constants";
import type { NavItem } from "./content-types";

// Referenced directly (not just via PRIMARY_NAV) because Nav.tsx renders
// this item as a dropdown/accordion instead of a plain link.
export const FOR_MEMBERS_HREF = "/for-members";

// Order is significant — mirrors the approved site architecture.
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "For Members", href: FOR_MEMBERS_HREF },
  { label: "Network", href: "/network" },
  { label: "Workstations", href: "/workstations" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const AUTH_NAV: { login: NavItem; join: NavItem } = {
  login: { label: "Log In", href: INTAKE_LOGIN_URL },
  // "Join the Network" everywhere on the marketing site — "Create Account"
  // is reserved for the actual registration page on intake.anchorstageops.com.
  join: { label: "Join the Network", href: INTAKE_REGISTER_URL },
};
