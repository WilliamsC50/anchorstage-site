import { INTAKE_REGISTER_URL } from "./constants";

// Registration call to action: wording, destination, and the FREE badge.
// Every "create an organization" button on the marketing site reads from
// here (header, mobile menu, footer, and the page CTAs).

/**
 * FREE badge switch. When paid subscriptions arrive, set this to false and
 * the badge disappears from every registration button. Labels, sizes, and
 * hover behavior stay exactly as they are; the badge is only appended.
 */
export const SHOW_FREE_BADGE = true;

/** Page CTAs and the footer. */
export const REGISTER_LABEL = "Create Your Organization";

/** Header and mobile navigation, where space is tight. */
export const REGISTER_LABEL_SHORT = "Create Org";

export const REGISTER_URL = INTAKE_REGISTER_URL;
