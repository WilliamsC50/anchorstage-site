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

/** One "what this role gains from that role" entry, keyed by the other role. */
export interface PersonaBenefit {
  from: PersonaSlug;
  benefit: string;
}

/** The ten canonical event lifecycle stages, in order. */
export type WorkflowStageId =
  | "inquiry"
  | "planning"
  | "staffing"
  | "equipment"
  | "quote"
  | "approval"
  | "show-day"
  | "media"
  | "marketing"
  | "reporting";

/**
 * How much a given member type participates in a given lifecycle stage.
 * Drives timeline styling only — every stage stays visible for every role.
 */
export type StageRelevance = "primary" | "secondary" | "occasional" | "not-used";

/**
 * One stage in the event lifecycle, from first inquiry through reporting.
 * Drives the homepage Event Workflow Explorer. Stage content (description,
 * tasks, workstations) is role-specific and lives in StagePerspective.
 */
export interface WorkflowStage {
  id: WorkflowStageId;
  title: string;
  /** Member types most commonly active in this stage (role-independent). */
  usedBy: readonly PersonaSlug[];
}

/** One role's view of one lifecycle stage. */
export interface StagePerspective {
  relevance: StageRelevance;
  /** What this stage means for this role, product-documentation tone. */
  description: string;
  /** Actions this role performs inside ASO during this stage. Empty when
   *  the role isn't active in the stage. */
  tasks: readonly string[];
  /** ASO workstations this role touches during this stage (display names
   *  from the canonical workstation set). Empty when the role isn't active. */
  workstations: readonly string[];
}
