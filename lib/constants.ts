export const INTAKE_URL =
  process.env.NEXT_PUBLIC_INTAKE_URL ?? "https://intake.anchorstageops.com";

export const INTAKE_LOGIN_URL = `${INTAKE_URL}/login`;
export const INTAKE_REGISTER_URL = `${INTAKE_URL}/register`;

// Public contact points. Single source of truth for the contact panel and
// the Privacy page.
export const CONTACT_EMAIL = "contact@anchorstageops.com";
export const FACEBOOK_URL = "https://www.facebook.com/AnchorStageOps/";
