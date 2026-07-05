import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "./constants";
import type { NavItem } from "./content-types";
import { PERSONAS } from "./personas";
import { WORKSTATIONS } from "./workstations";

const FOR_MEMBERS_HREF = "/for-members";

// Order is significant — mirrors the approved site architecture.
// Items with `children` render as a dropdown (desktop) / accordion (mobile).
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "For Members",
    href: FOR_MEMBERS_HREF,
    children: PERSONAS.map((persona) => ({
      label: persona.name,
      href: `${FOR_MEMBERS_HREF}/${persona.slug}`,
    })),
  },
  { label: "Network", href: "/network" },
  {
    label: "Workstations",
    href: "/workstations",
    // Anchors match the section ids on /workstations, which use the
    // canonical WorkstationSlug values (#event, #inventory, #marketing,
    // #signage).
    children: WORKSTATIONS.map((ws) => ({
      label: ws.name,
      href: `/workstations#${ws.slug}`,
    })),
  },
  { label: "Plans", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const AUTH_NAV: { login: NavItem; join: NavItem } = {
  login: { label: "Log In", href: INTAKE_LOGIN_URL },
  // "Join the Network" everywhere on the marketing site — "Create Account"
  // is reserved for the actual registration page on intake.anchorstageops.com.
  join: { label: "Join the Network", href: INTAKE_REGISTER_URL },
};
