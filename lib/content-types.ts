export interface NavItem {
  label: string;
  href: string;
  /** Optional dropdown (desktop) / accordion (mobile) links under this item.
   *  Rendered by Nav.tsx only — the footer lists top-level items alone. */
  children?: readonly NavItem[];
}

/**
 * Official product terminology: "Workstations" — never "Modules" or
 * "Features" in marketing-facing content.
 *
 * Only four workstations exist in the platform: Event, Inventory,
 * Marketing, and Signage. Every other surface (Intake, Financials,
 * Dashboard, Practice Mode, ...) is a tool, mode, or page — model
 * those as PlatformTool, never as a Workstation.
 */
export type WorkstationSlug = "event" | "inventory" | "marketing" | "signage";

export interface Workstation {
  slug: WorkstationSlug;
  name: string;
  tagline: string;
  /** Canonical capability names surfaced on the homepage preview card. */
  capabilities: readonly string[];
}

/** A supporting platform surface that is not a workstation. */
export interface PlatformTool {
  name: string;
  /** What kind of surface this is inside the platform. */
  kind: "tool" | "mode" | "page";
}

/**
 * Kinds of connected surfaces listed on /workstations. Extends the
 * PlatformTool kinds with issued documents and in-workstation surfaces.
 */
export type ConnectedToolKind = "tool" | "mode" | "page" | "document" | "surface";

/** One connected tool/page/mode/document as documented on /workstations. */
export interface ConnectedTool {
  name: string;
  kind: ConnectedToolKind;
  /** What it does and how it relates to the workstations. Doc tone. */
  description: string;
}

/** One surface or section a workstation owns, shown on /workstations. */
export interface OwnedSurface {
  surface: string;
  description: string;
}

/** One member type's presence inside a workstation. */
export interface WorkstationRole {
  persona: PersonaSlug;
  /** What this member type does in the workstation, one line. */
  note: string;
}

/**
 * Documentation-page detail for one workstation — drives the /workstations
 * sections. Content must follow platform canon (real surfaces only) and pull
 * example data from lib/demo-canon.ts, never inline inventions.
 */
export interface WorkstationDetail {
  slug: WorkstationSlug;
  name: string;
  /** One-sentence definition, product-documentation tone. */
  definition: string;
  /** The surfaces/sections this workstation owns, in platform nav order. */
  owns: readonly OwnedSurface[];
  /** What it reads from the shared operating record and network. */
  reads: readonly string[];
  /** What it writes to the shared operating record. */
  writes: readonly string[];
  /** Worked example following the flagship demo event, in order. */
  exampleSteps: readonly string[];
  /** Who typically works here, most active first. */
  roles: readonly WorkstationRole[];
}

/** One step in the end-to-end operating flow shown on /workstations. */
export interface OperatingFlowStep {
  /** Short step label ("Convert to Event"). */
  label: string;
  /** The platform surface(s) active at this step. */
  surface: string;
  /** What changes on the operating record, using demo-canon values. */
  detail: string;
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
