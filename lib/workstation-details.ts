import type {
  ConnectedTool,
  OperatingFlowStep,
  WorkstationDetail,
} from "./content-types";
import {
  DEMO_EVENT,
  DEMO_INVENTORY,
  DEMO_MARKETING,
  DEMO_SIGNAGE,
} from "./demo-canon";

/**
 * Content layer for the /workstations documentation page.
 *
 * Sources of truth:
 * - Surfaces and section names mirror the real platform implementations
 *   (Event Workstation nav: Overview / Setup / Collaborators / Operations /
 *   Financials / Deliverables; Inventory: Overview / Inventory / Packages +
 *   Power Audit; Marketing tabs: Overview / Campaigns / Content /
 *   Announcements; Signage: screen registry + Now Playing / Queue / config).
 * - All worked-example data comes from lib/demo-canon.ts — never invent
 *   names or figures inline.
 * - Role notes stay consistent with STAGE_PERSPECTIVES in
 *   lib/event-workflow.ts.
 */
export const WORKSTATION_DETAILS: WorkstationDetail[] = [
  {
    slug: "event",
    name: "Event Workstation",
    definition:
      "The working surface for a single event — every crew slot, gear assignment, document, and dollar attached to one operating record, from intake conversion to final invoice.",
    owns: [
      {
        surface: "Overview",
        description: "Event status, Readiness, and recent activity at a glance.",
      },
      {
        surface: "Setup",
        description: "Client, venue, schedule, event notes, and linked documents.",
      },
      {
        surface: "Collaborators",
        description:
          "Participating organizations on the event, including the Primary Collaborator.",
      },
      {
        surface: "Operations",
        description:
          "Crew Assignments, Gear, the event checklist, and show-day outputs — Production Brief and Pack List.",
      },
      {
        surface: "Financials",
        description:
          "Quote and invoice line items, deposit tracking, and every issued document — including sub quotes and sub invoices from collaborators.",
      },
      {
        surface: "Deliverables",
        description: "Outputs promised on the event, tracked through completion.",
      },
    ],
    reads: [
      "The intake submission it was converted from",
      "Client record",
      "Venue record",
      "Gear inventory and gear packages",
      "Collaborator organizations",
    ],
    writes: [
      "The event record itself",
      "Crew assignments",
      "Gear assignments",
      "Readiness state",
      "Issued documents — quotes, invoices, sub quotes, sub invoices",
      "Production Brief and Pack List",
    ],
    exampleSteps: [
      `An intake submission from ${DEMO_EVENT.client} is reviewed, qualified, and converted into ${DEMO_EVENT.code} — ${DEMO_EVENT.name} at ${DEMO_EVENT.venue}, owned by ${DEMO_EVENT.ownerOrg}.`,
      `${DEMO_EVENT.primaryCollaborator} joins as Primary Collaborator, and the crew list fills ${DEMO_EVENT.crew.filled} of ${DEMO_EVENT.crew.total} roles.`,
      `Quote ${DEMO_EVENT.quoteNumber} is issued from the planned gear and crew, and the deposit is recorded as ${DEMO_EVENT.depositStatus.toLowerCase()}.`,
      `Readiness reads ${DEMO_EVENT.readiness}, the Production Brief is ${DEMO_EVENT.productionBriefStatus.toLowerCase()}, and the Pack List is ${DEMO_EVENT.packListStatus.toLowerCase()} for show day.`,
    ],
    roles: [
      {
        persona: "production-companies",
        note: "Run each event end to end — setup, crew, gear, documents, and money.",
      },
      {
        persona: "event-organizers",
        note: "Bring the venue, production partners, and documents together on one record.",
      },
      {
        persona: "venues",
        note: "Hold the date, keep house notes, and run the room from the same record.",
      },
      {
        persona: "freelancers",
        note: "Work from the crew list, Production Brief, and Pack List.",
      },
    ],
  },
  {
    slug: "inventory",
    name: "Inventory Workstation",
    definition:
      "The working surface for an organization's gear — items, reusable packages, incoming requests, and the power data that every event draws against.",
    owns: [
      {
        surface: "Gear Inventory",
        description: "Every gear item your organization owns, with status and power data.",
      },
      {
        surface: "Gear Packages",
        description: "Reusable bundles of gear assigned to events as one unit.",
      },
      {
        surface: "Gear Requests",
        description:
          "Requests for gear from other organizations — received, reviewed, and resolved.",
      },
      {
        surface: "Power Audit",
        description: "A check that gear power data is complete, so event power estimates hold.",
      },
    ],
    reads: [
      "Gear demand from events being planned",
      "Your organization's gear items and packages",
      "Gear requests sent by other organizations",
    ],
    writes: [
      "Gear availability and item status",
      "Gear packages",
      "Gear request status",
      "Power data used by the Power Planner",
    ],
    exampleSteps: [
      `${DEMO_EVENT.name} draws ${DEMO_EVENT.gear.packages} gear packages — ${DEMO_EVENT.gear.items} items — from ${DEMO_EVENT.ownerOrg}' gear inventory.`,
      `${DEMO_INVENTORY.gearRequestsOpen} open gear requests track what is being sourced from other organizations.`,
      `The Power Audit reads ${DEMO_INVENTORY.powerAuditStatus}, and the event's planned power lands at ${DEMO_EVENT.powerPlannedAmps} in the Power Planner.`,
    ],
    roles: [
      {
        persona: "rental-providers",
        note: "Keep inventory and packages current, and respond to gear requests.",
      },
      {
        persona: "production-companies",
        note: "Assign gear items and packages to events, and resolve shortages.",
      },
      {
        persona: "venues",
        note: "List the house rig so productions can see what's already in the room.",
      },
      {
        persona: "freelancers",
        note: "List your own gear and respond to requests from productions.",
      },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing Workstation",
    definition:
      "The working surface for the booking pipeline — lead health, quote follow-up, and the content and announcements that win the next event.",
    owns: [
      {
        surface: "Overview",
        description:
          "KPI tiles — new leads, quotes sent, upcoming revenue — and the Needs Attention groups: leads waiting too long, leads on hold, and unpaid converted events.",
      },
      {
        surface: "Campaigns",
        description: "Coming soon — campaign tracking and outreach tools.",
      },
      {
        surface: "Content",
        description:
          "The Asset Library — tagged media from your events, organized for reuse.",
      },
      {
        surface: "Announcements",
        description: "Announcements drafted, published, and tracked from the workstation.",
      },
    ],
    reads: [
      "Event history",
      "Quote and payment status",
      "Tagged media from Media & Assets",
    ],
    writes: [
      "Lead and follow-up state",
      "Announcements",
      "Asset organization in the Asset Library",
    ],
    exampleSteps: [
      `The overview shows ${DEMO_MARKETING.newLeads30d} new leads in the last 30 days and ${DEMO_MARKETING.quotesSent} quotes sent.`,
      `Needs Attention flags ${DEMO_MARKETING.needsAttentionCount} items — ${DEMO_MARKETING.waitingLead.label} has waited ${DEMO_MARKETING.waitingLead.daysWaiting} days without a quote follow-up.`,
      `Media from ${DEMO_EVENT.name} — ${DEMO_EVENT.mediaAssetCount} tagged assets — is organized in the Asset Library, ready for the next pitch.`,
    ],
    roles: [
      {
        persona: "venues",
        note: "Keep the calendar full — lead health, quote follow-up, and show content.",
      },
      {
        persona: "production-companies",
        note: "Watch lead health and follow up on outstanding quotes.",
      },
      {
        persona: "event-organizers",
        note: "Track inquiries for the next events and keep content organized.",
      },
      {
        persona: "freelancers",
        note: "Solo operators run their own pipeline of inquiries and quotes.",
      },
    ],
  },
  {
    slug: "signage",
    name: "Signage Workstation",
    definition:
      "The working surface for screens — registered venue displays driven straight from the operating record: what's playing now, what's queued, and how each screen is configured.",
    owns: [
      {
        surface: "Registered Screens",
        description:
          "The screen registry — each venue display registered with a name, slug, and type.",
      },
      {
        surface: "Now Playing",
        description: "What's on the screen right now.",
      },
      {
        surface: "Queue",
        description: "What runs next, plus completed and skipped entries.",
      },
      {
        surface: "Screen Configuration",
        description: "Per-screen display settings and session behavior.",
      },
    ],
    reads: [
      "Event and venue data",
      "Performer and display names",
      "The screen registry",
    ],
    writes: [
      "Signage session state — now playing, queue order, completed and skipped",
      "Screen configuration",
    ],
    exampleSteps: [
      `Two screens are registered — ${DEMO_SIGNAGE.screens[0].name} and ${DEMO_SIGNAGE.screens[1].name}.`,
      `${DEMO_SIGNAGE.nowPlaying} is now playing on the ${DEMO_SIGNAGE.screens[0].type} screen; ${DEMO_SIGNAGE.queue[0]} and ${DEMO_SIGNAGE.queue[1]} are queued.`,
    ],
    roles: [
      {
        persona: "venues",
        note: "Run in-house screens — open mic queues and lobby displays.",
      },
      {
        persona: "event-organizers",
        note: "Drive event displays from the same record the event runs on.",
      },
    ],
  },
];

/**
 * Connected tools, pages, modes, documents, and surfaces documented on
 * /workstations — everything here supports the workstations and the shared
 * operating record, and none of it is a workstation. Superset of the
 * homepage SUPPORT_TOOLS strip, with descriptions and relationships.
 */
export const CONNECTED_TOOLS: ConnectedTool[] = [
  {
    name: "Intake",
    kind: "tool",
    description:
      "Where every event starts — submissions are reviewed, qualified, and converted into events in the Event Workstation.",
  },
  {
    name: "Financials",
    kind: "tool",
    description:
      "Quotes, invoices, deposits, payouts, and projected profit across every event.",
  },
  {
    name: "Dashboard",
    kind: "page",
    description:
      "The landing view across your organization — events, blockers, and activity at a glance.",
  },
  {
    name: "Media & Assets",
    kind: "tool",
    description:
      "Photos, video, and recordings uploaded and tagged on the event — they feed the Marketing Workstation's Asset Library.",
  },
  {
    name: "Power Planner",
    kind: "tool",
    description:
      "Estimates event power from assigned gear, using power data kept current in the Inventory Workstation.",
  },
  {
    name: "Practice Mode",
    kind: "mode",
    description:
      "A guided sandbox for learning the platform without touching real records.",
  },
  {
    name: "Gear Requests",
    kind: "tool",
    description:
      "Cross-organization gear sourcing — sent from an event, answered from the Inventory Workstation.",
  },
  {
    name: "Readiness",
    kind: "surface",
    description:
      "The pre-show check on the event record that flags blockers before show day.",
  },
  {
    name: "Production Brief",
    kind: "document",
    description:
      "Issued from the event — timing, gear summary, logistics, crew, and show contacts for on-site work.",
  },
  {
    name: "Pack List",
    kind: "document",
    description:
      "Issued from the event — what's going, how it loads, and who to contact.",
  },
  {
    name: "Issued Documents",
    kind: "document",
    description:
      "Numbered, point-in-time copies of quotes, invoices, sub quotes, and sub invoices issued from the event.",
  },
];

/**
 * The end-to-end trace shown in the "How Everything Connects" section —
 * the flagship demo event moving through the platform, one surface at a
 * time, with the operating record accumulating state at every step.
 */
export const OPERATING_FLOW: OperatingFlowStep[] = [
  {
    label: "Intake Submission",
    surface: "Intake",
    detail: `${DEMO_EVENT.client} submits the request; it's reviewed and qualified.`,
  },
  {
    label: "Convert to Event",
    surface: "Intake → Event Workstation",
    detail: `The submission becomes ${DEMO_EVENT.code} — one operating record.`,
  },
  {
    label: "Plan the Event",
    surface: "Event Workstation",
    detail: `Client, venue, schedule, collaborators — and a crew list filled ${DEMO_EVENT.crew.filled} of ${DEMO_EVENT.crew.total}.`,
  },
  {
    label: "Assign Gear",
    surface: "Inventory Workstation",
    detail: `${DEMO_EVENT.gear.packages} packages, ${DEMO_EVENT.gear.items} items assigned; planned power ${DEMO_EVENT.powerPlannedAmps}.`,
  },
  {
    label: "Quote",
    surface: "Event Workstation · Financials",
    detail: `${DEMO_EVENT.quoteNumber} issued from the planned gear and crew; deposit ${DEMO_EVENT.depositStatus.toLowerCase()}.`,
  },
  {
    label: "Readiness",
    surface: "Event record",
    detail: `Blockers cleared — the event reads ${DEMO_EVENT.readiness}.`,
  },
  {
    label: "Show Day",
    surface: "Production Brief · Pack List",
    detail:
      "Generated from the record — timing, logistics, and the load list on site.",
  },
  {
    label: "Media",
    surface: "Media & Assets",
    detail: `${DEMO_EVENT.mediaAssetCount} assets tagged to the event, feeding the Asset Library.`,
  },
  {
    label: "Close Out",
    surface: "Invoice · Financials",
    detail: `Invoice ${DEMO_EVENT.invoiceStatus.toLowerCase()}; projected margin ${DEMO_EVENT.projectedMarginPct}%.`,
  },
];
