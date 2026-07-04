import type {
  PersonaSlug,
  StagePerspective,
  WorkflowStage,
  WorkflowStageId,
} from "./content-types";

/**
 * The event lifecycle as ASO models it: ten stages from first intake
 * submission to financial close-out. Drives the homepage Event Workflow
 * Explorer.
 *
 * Content follows the ASO Platform Canon Audit — every task and chip below
 * names a real, shipped platform capability (Intake Review & Convert, the
 * Event Workstation, Gear Requests, Power Planner, Readiness, Production
 * Brief, Pack List, Media & Assets / Asset Library, the Marketing
 * Workstation lead pipeline, Financials, and the Dashboard). No invented
 * or future features.
 *
 * The stage list is role-independent and never reorders or hides stages.
 * What changes per role is the perspective: STAGE_PERSPECTIVES holds each
 * member type's view of each stage (relevance, description, tasks, and the
 * ASO surfaces that role touches).
 *
 * Stage titles are visitor-facing wayfinding labels ("Inquiry",
 * "Equipment"); descriptions and tasks use platform canon (Intake, Gear).
 */
export const EVENT_WORKFLOW_STAGES: WorkflowStage[] = [
  { id: "inquiry", title: "Inquiry", usedBy: ["production-companies", "event-organizers", "venues"] },
  { id: "planning", title: "Planning", usedBy: ["production-companies", "event-organizers", "venues"] },
  { id: "staffing", title: "Staffing", usedBy: ["production-companies", "freelancers", "event-organizers"] },
  { id: "equipment", title: "Equipment", usedBy: ["production-companies", "rental-providers", "freelancers"] },
  { id: "quote", title: "Quote", usedBy: ["production-companies", "event-organizers", "rental-providers"] },
  { id: "approval", title: "Approval", usedBy: ["production-companies", "event-organizers", "venues"] },
  { id: "show-day", title: "Show Day", usedBy: ["production-companies", "freelancers", "venues", "musicians"] },
  { id: "media", title: "Media", usedBy: ["musicians", "venues", "event-organizers"] },
  { id: "marketing", title: "Marketing", usedBy: ["venues", "musicians", "event-organizers"] },
  { id: "reporting", title: "Financials", usedBy: ["production-companies", "event-organizers", "venues"] },
];

/** Roles offered by the "View As" selector, in display order. */
export const WORKFLOW_ROLES: readonly PersonaSlug[] = [
  "production-companies",
  "freelancers",
  "venues",
  "musicians",
  "rental-providers",
  "event-organizers",
];

export const DEFAULT_WORKFLOW_ROLE: PersonaSlug = "production-companies";

/**
 * Each role's view of each lifecycle stage. Chips under "ASO Workstations
 * Used" name the platform surfaces involved: the named workstations (Event,
 * Inventory, Marketing, Signage) plus canonical tools and views (Intake,
 * Gear Requests, Power Planner, Media & Assets, Asset Library, Financials,
 * Dashboard, Calendar).
 */
export const STAGE_PERSPECTIVES: Record<
  PersonaSlug,
  Record<WorkflowStageId, StagePerspective>
> = {
  "production-companies": {
    inquiry: {
      relevance: "primary",
      description:
        "Every event starts as an intake submission. Review it, qualify it, and convert it into an event — client, date, and scope captured from first contact.",
      tasks: [
        "Receive Intake Submissions",
        "Create Client Record",
        "Review & Qualify",
        "Quote from Intake",
        "Convert to Event",
      ],
      workstations: ["Intake", "Event Workstation"],
    },
    planning: {
      relevance: "primary",
      description:
        "Turn a converted intake into a working event — one record that holds the client, venue, schedule, notes, and linked documents.",
      tasks: [
        "Create the Event",
        "Start from an Event Template",
        "Link Client & Venue",
        "Set Up a Recurring Series",
        "Add Event Notes",
        "Invite Collaborators",
      ],
      workstations: ["Event Workstation", "Calendar"],
    },
    staffing: {
      relevance: "primary",
      description:
        "Build the crew list on the event — define the roles the show needs, then fill each slot.",
      tasks: [
        "Define Crew Roles",
        "Fill Crew Slots",
        "Pick from Your Roster",
        "Share the Crew List",
      ],
      workstations: ["Event Workstation"],
    },
    equipment: {
      relevance: "primary",
      description:
        "Assign gear to the event — your own gear items, reusable gear packages, or gear requested from other organizations.",
      tasks: [
        "Assign Gear Packages",
        "Add Gear Items",
        "Send Gear Requests",
        "Resolve Shortages",
        "Estimate Power",
      ],
      workstations: ["Inventory Workstation", "Gear Requests", "Power Planner"],
    },
    quote: {
      relevance: "primary",
      description:
        "Build the quote from what's already planned — line items come straight from the event's gear and crew, then issue a numbered, revisable quote.",
      tasks: [
        "Build Line Items",
        "Apply a Discount",
        "Issue the Quote",
        "Send to Client",
        "Revise if Needed",
      ],
      workstations: ["Event Workstation", "Financials"],
    },
    approval: {
      relevance: "primary",
      description:
        "Track sign-off on the event — quote approval, the deposit, and a Readiness check that flags blockers before show day.",
      tasks: [
        "Track Quote Approval",
        "Record the Deposit",
        "Clear Readiness Blockers",
        "Confirm the Event",
      ],
      workstations: ["Event Workstation", "Financials", "Dashboard"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Run the show from the event record — the Production Brief and Pack List carry timing, gear, logistics, crew, and show contacts on site.",
      tasks: [
        "Print the Production Brief",
        "Run the Pack List",
        "Set Call & Show Times",
        "Work the Checklist",
        "Mark the Event Active",
      ],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "secondary",
      description:
        "Attach photos, video, and recordings to the event — tagged and searchable in your Asset Library.",
      tasks: ["Upload Event Media", "Tag Assets", "Browse the Asset Library"],
      workstations: ["Media & Assets", "Asset Library"],
    },
    marketing: {
      relevance: "secondary",
      description:
        "Marketing in ASO is the booking pipeline — lead health, quote follow-up, and the content that wins the next event.",
      tasks: [
        "Watch Lead Health",
        "Follow Up on Quotes",
        "Organize Content in the Asset Library",
      ],
      workstations: ["Marketing Workstation", "Asset Library"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close the event out — issue the invoice, record payment, settle payouts, and see projected profit across your events in Financials.",
      tasks: [
        "Issue the Invoice",
        "Record Payment",
        "Settle Payouts",
        "Review Projected Profit",
        "Archive the Event",
      ],
      workstations: ["Financials", "Event Workstation", "Dashboard"],
    },
  },

  freelancers: {
    inquiry: {
      relevance: "not-used",
      description:
        "Intake is handled by the organization booking the event. You enter the workflow once the crew list is being built.",
      tasks: [],
      workstations: [],
    },
    planning: {
      relevance: "occasional",
      description:
        "On larger shows you may be brought in early as a collaborator, with access to the event's details and notes.",
      tasks: ["Join as a Collaborator", "Review Event Details"],
      workstations: ["Event Workstation"],
    },
    staffing: {
      relevance: "primary",
      description:
        "This is where you land on the show — you're added to the event's crew list with a role, and solo operators can join as the event's Primary Collaborator.",
      tasks: [
        "Get Added to the Crew List",
        "Take a Role Slot",
        "Join as Primary Collaborator",
      ],
      workstations: ["Event Workstation"],
    },
    equipment: {
      relevance: "secondary",
      description:
        "See what gear the event carries — and if you run your own inventory, respond to gear requests from the production.",
      tasks: ["Review Assigned Gear", "Respond to Gear Requests", "List Your Own Gear"],
      workstations: ["Inventory Workstation", "Gear Requests"],
    },
    quote: {
      relevance: "not-used",
      description:
        "Quoting happens between the production company and the client.",
      tasks: [],
      workstations: [],
    },
    approval: {
      relevance: "secondary",
      description:
        "When the event is confirmed and clears its Readiness checks, your spot on the crew list is part of a locked plan.",
      tasks: ["Review the Confirmed Plan"],
      workstations: ["Event Workstation"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Everything you need on site comes from the Production Brief — timing, gear summary, logistics, and show contacts.",
      tasks: [
        "Work from the Production Brief",
        "Follow Call & Show Times",
        "Use the Pack List",
      ],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "primary",
      description:
        "Media from your events stays attached to them — upload and tag assets so the work you do is organized in your own Asset Library.",
      tasks: ["Upload Show Media", "Tag Your Assets", "Build Your Asset Library"],
      workstations: ["Media & Assets", "Asset Library"],
    },
    marketing: {
      relevance: "occasional",
      description:
        "Solo operators run their own pipeline — track inquiries and outstanding quotes for your services.",
      tasks: ["Track Your Own Leads"],
      workstations: ["Marketing Workstation"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close out your side — as a collaborator organization you can issue a Sub Invoice and get paid through the event's payout ledger.",
      tasks: ["Issue a Sub Invoice", "Track Your Payout", "Review Your Financials"],
      workstations: ["Financials", "Event Workstation"],
    },
  },

  venues: {
    inquiry: {
      relevance: "primary",
      description:
        "Booking requests land as intake submissions — review, qualify, and convert the ones that fit your calendar.",
      tasks: [
        "Receive Intake Submissions",
        "Review & Qualify",
        "Check the Calendar",
        "Convert to Event",
      ],
      workstations: ["Intake", "Calendar"],
    },
    planning: {
      relevance: "primary",
      description:
        "Hold the date and build the event record — house notes and linked documents the production can work from.",
      tasks: [
        "Create the Event",
        "Set Up a Recurring Series",
        "Add House Notes",
        "Link House Documents",
        "Invite the Production as a Collaborator",
      ],
      workstations: ["Event Workstation", "Calendar"],
    },
    staffing: {
      relevance: "occasional",
      description:
        "Most crewing is handled by the production — add house staff to the crew list when your room provides them.",
      tasks: ["Add House Staff to the Crew List"],
      workstations: ["Event Workstation"],
    },
    equipment: {
      relevance: "occasional",
      description:
        "Keep your house rig in your gear inventory so productions can see what's already in the room.",
      tasks: ["List House Gear"],
      workstations: ["Inventory Workstation"],
    },
    quote: {
      relevance: "occasional",
      description:
        "House fees can be added to the event as quote line items when the booking calls for them.",
      tasks: ["Add House Fees as Line Items"],
      workstations: ["Event Workstation", "Financials"],
    },
    approval: {
      relevance: "primary",
      description:
        "Confirm the booking — quote approved, deposit recorded, and the date locked on your calendar.",
      tasks: ["Track Quote Approval", "Record the Deposit", "Confirm the Event"],
      workstations: ["Event Workstation", "Financials"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Run the room from the same record the production planned in — Production Brief timing, contacts, and the event checklist on site.",
      tasks: [
        "Work from the Production Brief",
        "Track Load-In & Doors Times",
        "Run the Checklist",
      ],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "secondary",
      description:
        "Media from every show stays attached to your events — a growing, tagged record of your room in your Asset Library.",
      tasks: ["Collect Show Media", "Tag Assets"],
      workstations: ["Media & Assets", "Asset Library"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Keep the calendar full — track booking inquiries from first contact, follow up on outstanding quotes, and keep your show content organized.",
      tasks: [
        "Watch Lead Health",
        "Follow Up on Quotes",
        "Organize Content in the Asset Library",
        "Run In-House Signage",
      ],
      workstations: ["Marketing Workstation", "Asset Library", "Signage Workstation"],
    },
    reporting: {
      relevance: "secondary",
      description:
        "Settle each event — invoices, payments, and payouts tracked in Financials across your calendar.",
      tasks: ["Record Payments", "Review Financials"],
      workstations: ["Financials", "Dashboard"],
    },
  },

  musicians: {
    inquiry: {
      relevance: "primary",
      description:
        "Shows you play start as intake submissions with the venue or production — the act, date, and scope captured from first contact.",
      tasks: ["Share Show Details for Intake", "Confirm the Date"],
      workstations: ["Intake"],
    },
    planning: {
      relevance: "occasional",
      description:
        "Your stage needs live on the event record — notes and linked documents like stage plots and input lists.",
      tasks: ["Share Stage Plot & Input List"],
      workstations: ["Event Workstation"],
    },
    staffing: {
      relevance: "not-used",
      description:
        "Crewing is handled by the production and venue — your performance is already on the event.",
      tasks: [],
      workstations: [],
    },
    equipment: {
      relevance: "occasional",
      description:
        "Backline and stage needs are captured as gear on the event, so nothing is missing on show day.",
      tasks: ["List Backline Needs"],
      workstations: ["Event Workstation"],
    },
    quote: {
      relevance: "not-used",
      description:
        "Pricing between the production and the client happens without you.",
      tasks: [],
      workstations: [],
    },
    approval: {
      relevance: "secondary",
      description:
        "When the event is confirmed and clears its Readiness checks, your date is locked.",
      tasks: ["Get the Confirmed Date"],
      workstations: ["Event Workstation"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Set times, doors, and show contacts come from the Production Brief — the same record the venue and production run on.",
      tasks: [
        "Follow Set & Doors Times",
        "Check the Production Brief",
        "Know Your Show Contacts",
      ],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "primary",
      description:
        "Media from your shows is uploaded to the event and tagged with your act — organized and findable after every performance.",
      tasks: ["Get Show Media Tagged", "Collect Assets from Your Shows"],
      workstations: ["Media & Assets", "Asset Library"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Show media tagged to your act gives the venues and productions you work with ready content when promoting the dates you play.",
      tasks: ["Source Tagged Show Media"],
      workstations: ["Asset Library"],
    },
    reporting: {
      relevance: "occasional",
      description:
        "Payment for your performance is tracked on the event by the organization that booked you.",
      tasks: [],
      workstations: [],
    },
  },

  "rental-providers": {
    inquiry: {
      relevance: "occasional",
      description:
        "Gear requests can arrive alongside a new event — what's needed and for which dates.",
      tasks: ["Receive Gear Requests"],
      workstations: ["Gear Requests"],
    },
    planning: {
      relevance: "secondary",
      description:
        "See what events need early — gear requests reference the event, so you can plan against real dates.",
      tasks: ["Review Incoming Gear Requests", "Review Your Gear Inventory"],
      workstations: ["Gear Requests", "Inventory Workstation"],
    },
    staffing: {
      relevance: "not-used",
      description:
        "Crewing is handled by the production — this stage runs without you.",
      tasks: [],
      workstations: [],
    },
    equipment: {
      relevance: "primary",
      description:
        "This is your stage. Keep your gear inventory and gear packages current, and respond to gear requests from productions and venues.",
      tasks: [
        "Maintain Your Gear Inventory",
        "Build Gear Packages",
        "Respond to Gear Requests",
        "Keep Power Data Current",
      ],
      workstations: ["Inventory Workstation", "Gear Requests", "Power Audit"],
    },
    quote: {
      relevance: "secondary",
      description:
        "When you're the event's Primary Collaborator, issue a Sub Quote to the owner organization for your side of the work.",
      tasks: ["Issue a Sub Quote"],
      workstations: ["Financials", "Event Workstation"],
    },
    approval: {
      relevance: "occasional",
      description:
        "The gear request is accepted and tied to the confirmed event.",
      tasks: ["Confirm the Gear Request"],
      workstations: ["Gear Requests"],
    },
    "show-day": {
      relevance: "secondary",
      description:
        "Your gear travels on the event's Pack List — what's going, where it loads in, and who to contact.",
      tasks: ["Work from the Pack List", "Coordinate Load-In"],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "not-used",
      description:
        "Event media is collected by the production, venue, and artists. This stage runs without you.",
      tasks: [],
      workstations: [],
    },
    marketing: {
      relevance: "occasional",
      description:
        "Keep your gear inventory current and visible to the organizations that request it.",
      tasks: ["Keep Your Inventory Current"],
      workstations: ["Inventory Workstation"],
    },
    reporting: {
      relevance: "secondary",
      description:
        "Close the loop — issue your Sub Invoice and track the payout from the event in Financials.",
      tasks: ["Issue a Sub Invoice", "Track the Payout"],
      workstations: ["Financials"],
    },
  },

  "event-organizers": {
    inquiry: {
      relevance: "primary",
      description:
        "Start the event as an intake submission — or create it directly — with the concept, date, and requirements captured once.",
      tasks: ["Submit or Create the Intake", "Review & Qualify", "Convert to Event"],
      workstations: ["Intake", "Event Workstation"],
    },
    planning: {
      relevance: "primary",
      description:
        "Bring the pieces together on one event record — venue, production partners, notes, and linked documents.",
      tasks: [
        "Create the Event",
        "Link Client & Venue",
        "Invite Collaborators",
        "Link Planning Documents",
      ],
      workstations: ["Event Workstation", "Calendar"],
    },
    staffing: {
      relevance: "occasional",
      description:
        "Crewing is led by your production partners — the event's crew list shows how roles are filling.",
      tasks: ["Review the Crew List"],
      workstations: ["Event Workstation"],
    },
    equipment: {
      relevance: "occasional",
      description:
        "Gear is sourced by production partners and gear requests — you watch it come together on the event.",
      tasks: ["Review Assigned Gear"],
      workstations: ["Event Workstation"],
    },
    quote: {
      relevance: "primary",
      description:
        "Quotes are issued from the event itself — numbered, revisable, and built from the planned gear and crew.",
      tasks: ["Receive the Issued Quote", "Request a Revision", "Approve Pricing"],
      workstations: ["Financials", "Event Workstation"],
    },
    approval: {
      relevance: "primary",
      description:
        "Sign off and lock the event — approved quote, recorded deposit, and a Readiness check before show day.",
      tasks: ["Approve the Quote", "Record the Deposit", "Clear Readiness Blockers"],
      workstations: ["Event Workstation", "Financials", "Dashboard"],
    },
    "show-day": {
      relevance: "secondary",
      description:
        "Follow the show from the shared record — Production Brief timing, contacts, and the checklist without chasing anyone.",
      tasks: ["Follow the Production Brief", "Watch the Checklist"],
      workstations: ["Event Workstation"],
    },
    media: {
      relevance: "secondary",
      description:
        "Everything captured at the event stays attached to it — tagged assets ready for stakeholders and next year's pitch.",
      tasks: ["Collect Event Media", "Tag Assets"],
      workstations: ["Media & Assets", "Asset Library"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Marketing in ASO is the pipeline — track inquiries for your next events, follow up on outstanding quotes, and keep event content organized.",
      tasks: [
        "Track Event Inquiries",
        "Follow Up on Quotes",
        "Organize Content in the Asset Library",
      ],
      workstations: ["Marketing Workstation", "Asset Library"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close the event — final invoice, payments, payouts to partners, and the Financials view across your events.",
      tasks: [
        "Reconcile Payments",
        "Settle Payouts",
        "Review Financials",
        "Archive the Event",
      ],
      workstations: ["Financials", "Dashboard"],
    },
  },
};
