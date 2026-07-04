import type {
  PersonaSlug,
  StagePerspective,
  WorkflowStage,
  WorkflowStageId,
} from "./content-types";

/**
 * The event lifecycle as ASO models it: ten stages from first inquiry to
 * final reporting. Drives the homepage Event Workflow Explorer.
 *
 * The stage list is role-independent and never reorders or hides stages.
 * What changes per role is the perspective: STAGE_PERSPECTIVES holds each
 * member type's view of each stage (relevance, description, tasks, and the
 * ASO workstations that role touches).
 *
 * Placeholder-quality copy authored for review — not confirmed final.
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
  { id: "reporting", title: "Reporting", usedBy: ["production-companies", "event-organizers", "venues"] },
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
 * Each role's view of each lifecycle stage. Workstation chips use display
 * names from the canonical workstation set (see WorkstationSlug) — real ASO
 * capabilities only, no invented features.
 */
export const STAGE_PERSPECTIVES: Record<
  PersonaSlug,
  Record<WorkflowStageId, StagePerspective>
> = {
  "production-companies": {
    inquiry: {
      relevance: "primary",
      description:
        "Every event starts as an inquiry. Capture the client, date, and scope in one intake record instead of an email thread.",
      tasks: [
        "Receive Intake Submission",
        "Create Client Record",
        "Capture Event Details",
        "Check Date Availability",
        "Qualify the Request",
      ],
      workstations: ["Event"],
    },
    planning: {
      relevance: "primary",
      description:
        "Turn a confirmed inquiry into a working event plan — one record that holds the schedule, documents, and production requirements.",
      tasks: [
        "Create Event",
        "Assign Venue",
        "Build Schedule",
        "Upload Documents",
        "Estimate Power",
        "Invite Collaborators",
      ],
      workstations: ["Event", "Power", "Crew"],
    },
    staffing: {
      relevance: "primary",
      description:
        "Assign the people the event needs — in-house crew, freelancers from the network, and collaborators from partner companies.",
      tasks: [
        "Define Crew Roles",
        "Assign In-House Crew",
        "Request Freelancers",
        "Confirm Availability",
        "Set Call Times",
      ],
      workstations: ["Crew", "Event"],
    },
    equipment: {
      relevance: "primary",
      description:
        "Reserve gear against the event date — from your own inventory, shared packages, or rental providers in the network.",
      tasks: [
        "Build Equipment List",
        "Reserve Inventory",
        "Request Rentals",
        "Resolve Shortages",
        "Prep Load Sheets",
      ],
      workstations: ["Inventory", "Event"],
    },
    quote: {
      relevance: "primary",
      description:
        "Generate the quote from what's already planned — labor, equipment, and services priced from the event record itself.",
      tasks: [
        "Price Labor & Gear",
        "Apply Package Rates",
        "Generate Quote PDF",
        "Send to Client",
      ],
      workstations: ["Financial", "Event"],
    },
    approval: {
      relevance: "primary",
      description:
        "Client sign-off, deposits, and agreements tracked on the event — so everyone works from one confirmed scope.",
      tasks: [
        "Send Agreement",
        "Collect Signature",
        "Record Deposit",
        "Lock Event Scope",
      ],
      workstations: ["Event", "Financial"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Run the event from the same record it was planned in — schedules, contacts, stage plots, and checklists in one place on site.",
      tasks: [
        "Publish Day-of Schedule",
        "Run Load-In Checklist",
        "Track Crew Check-Ins",
        "Access Show Documents",
        "Log Changes On Site",
      ],
      workstations: ["Event", "Crew", "Operations"],
    },
    media: {
      relevance: "secondary",
      description:
        "Collect the photos, video, and recordings captured at the event and attach them to the record — ready for recaps and future proposals.",
      tasks: ["Upload Event Media", "Tag People & Venues", "Share with Collaborators"],
      workstations: ["Media", "Event"],
    },
    marketing: {
      relevance: "secondary",
      description:
        "Turn finished events into the next booking — recaps and promotion built from real event history and media.",
      tasks: ["Build Event Recap", "Reuse Media Assets", "Promote Your Work"],
      workstations: ["Marketing", "Media"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close the event out — final invoices, settlement, and the numbers that show what worked and what to improve next time.",
      tasks: [
        "Send Final Invoice",
        "Reconcile Costs",
        "Settle Payouts",
        "Review Event Metrics",
        "Archive the Event",
      ],
      workstations: ["Financial", "Event", "Automation"],
    },
  },

  freelancers: {
    inquiry: {
      relevance: "not-used",
      description:
        "Inquiries are handled by the production company or organizer booking the event. You enter the workflow once staffing begins.",
      tasks: [],
      workstations: [],
    },
    planning: {
      relevance: "occasional",
      description:
        "On larger shows you may be looped in early — reviewing schedules and documents shared to the event record.",
      tasks: ["Review Shared Schedule", "Access Event Documents"],
      workstations: ["Event"],
    },
    staffing: {
      relevance: "primary",
      description:
        "This is where work finds you. Crew requests from the network arrive with the role, dates, and rate — confirm and you're on the show.",
      tasks: [
        "Receive Crew Requests",
        "Confirm Availability",
        "Accept the Booking",
        "Review Call Times",
      ],
      workstations: ["Crew", "Event"],
    },
    equipment: {
      relevance: "secondary",
      description:
        "Know exactly what gear the event carries before you arrive — and flag anything your position needs.",
      tasks: ["Review Equipment List", "Flag Position Needs", "Request Rentals"],
      workstations: ["Inventory", "Event"],
    },
    quote: {
      relevance: "not-used",
      description:
        "Quoting happens between the production company and the client. Your confirmed rate is already part of it.",
      tasks: [],
      workstations: [],
    },
    approval: {
      relevance: "secondary",
      description:
        "When the client signs off, your booking is confirmed — dates, role, and scope locked on the event record.",
      tasks: ["Receive Booking Confirmation", "Review Locked Scope"],
      workstations: ["Event", "Crew"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Everything you need on site — schedule, contacts, stage documents, and check-in — from the same event record the show was planned in.",
      tasks: [
        "Check In On Site",
        "Follow Day-of Schedule",
        "Access Show Documents",
        "Log Changes On Site",
      ],
      workstations: ["Event", "Crew", "Operations"],
    },
    media: {
      relevance: "primary",
      description:
        "Your work, on the record. Media from the event tags you — building a portfolio from shows you actually worked.",
      tasks: ["Upload Your Media", "Get Tagged in Event Media", "Build Your Portfolio"],
      workstations: ["Media", "Event"],
    },
    marketing: {
      relevance: "occasional",
      description:
        "Reuse tagged event media to promote your services to companies in the network.",
      tasks: ["Share Event Highlights"],
      workstations: ["Marketing", "Media"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close out your side of the show — confirm your hours, track your payout, and keep your work history complete.",
      tasks: ["Confirm Hours Worked", "Track Your Payout", "Review Your Event History"],
      workstations: ["Financial", "Event"],
    },
  },

  venues: {
    inquiry: {
      relevance: "primary",
      description:
        "Booking requests land in one intake queue — date, act, and production needs captured against your calendar from the start.",
      tasks: [
        "Receive Booking Requests",
        "Check Calendar Availability",
        "Capture Event Details",
        "Qualify the Request",
      ],
      workstations: ["Event"],
    },
    planning: {
      relevance: "primary",
      description:
        "Hold the event on your calendar and share what productions need — house specs, load-in details, and venue documents.",
      tasks: [
        "Hold the Date",
        "Share Venue Specs",
        "Upload House Documents",
        "Coordinate with Production",
      ],
      workstations: ["Event"],
    },
    staffing: {
      relevance: "occasional",
      description:
        "Most crewing is handled by the production. You may add house staff to the event when the room provides them.",
      tasks: ["Assign House Staff"],
      workstations: ["Crew"],
    },
    equipment: {
      relevance: "occasional",
      description:
        "Your house rig lives in inventory, so productions know what's already in the room before they load a truck.",
      tasks: ["Share House Inventory"],
      workstations: ["Inventory"],
    },
    quote: {
      relevance: "occasional",
      description:
        "Room rates and house fees feed the event's pricing when the booking calls for them.",
      tasks: ["Provide Venue Rates"],
      workstations: ["Financial"],
    },
    approval: {
      relevance: "primary",
      description:
        "Confirm the booking — agreements signed, deposit recorded, and the date locked on your calendar.",
      tasks: [
        "Send Venue Agreement",
        "Collect Signature",
        "Record Deposit",
        "Confirm the Date",
      ],
      workstations: ["Event", "Financial"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Run the room from the same record the production planned in — schedule, contacts, and house documents on site.",
      tasks: [
        "Publish House Schedule",
        "Coordinate Load-In",
        "Track Arrivals",
        "Log Changes On Site",
      ],
      workstations: ["Event", "Operations"],
    },
    media: {
      relevance: "secondary",
      description:
        "Media from every show stays attached to your venue — a growing visual record of what your room looks like full.",
      tasks: ["Collect Event Media", "Tag Your Venue"],
      workstations: ["Media"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Fill the calendar. Promote upcoming shows and turn past events into proof your room delivers.",
      tasks: [
        "Promote Upcoming Shows",
        "Publish Event Recaps",
        "Reuse Event Media",
        "Build Your Program",
      ],
      workstations: ["Marketing", "Media"],
    },
    reporting: {
      relevance: "secondary",
      description:
        "Settle the event and see how your calendar is performing — what booked, what drew, what to bring back.",
      tasks: ["Settle the Event", "Review Booking Metrics"],
      workstations: ["Financial", "Event"],
    },
  },

  musicians: {
    inquiry: {
      relevance: "primary",
      description:
        "Gigs start here. Booking requests from venues and organizers arrive with the date, room, and terms attached.",
      tasks: ["Receive Booking Requests", "Check Your Availability", "Respond to Inquiries"],
      workstations: ["Event"],
    },
    planning: {
      relevance: "occasional",
      description:
        "Share what your act needs — stage plot, input list, and set details — on the event record everyone works from.",
      tasks: ["Upload Stage Plot", "Share Set Details"],
      workstations: ["Event"],
    },
    staffing: {
      relevance: "not-used",
      description:
        "Crewing is handled by the production and venue. Your booking already covers the performance.",
      tasks: [],
      workstations: [],
    },
    equipment: {
      relevance: "occasional",
      description:
        "List backline needs on the event so the production and rental providers can cover them.",
      tasks: ["List Backline Needs"],
      workstations: ["Event", "Inventory"],
    },
    quote: {
      relevance: "not-used",
      description:
        "Pricing between the production and the client happens without you. Your performance fee is set in your booking.",
      tasks: [],
      workstations: [],
    },
    approval: {
      relevance: "secondary",
      description:
        "Sign the performance agreement and the date is locked — no chasing confirmations by text.",
      tasks: ["Sign Performance Agreement", "Confirm the Date"],
      workstations: ["Event"],
    },
    "show-day": {
      relevance: "primary",
      description:
        "Everything for the show in one place — set times, contacts, and stage documents from the same record the venue runs on.",
      tasks: ["Review Set Times", "Access Stage Documents", "Check In at the Venue"],
      workstations: ["Event"],
    },
    media: {
      relevance: "primary",
      description:
        "Photos, video, and recordings from the show tag your act — every performance builds your catalog.",
      tasks: ["Collect Show Media", "Tag Your Act", "Organize Your Catalog"],
      workstations: ["Media"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Turn shows into a following — promote upcoming dates and publish highlights from real performances.",
      tasks: ["Promote Upcoming Dates", "Publish Show Highlights", "Reuse Show Media"],
      workstations: ["Marketing", "Media"],
    },
    reporting: {
      relevance: "occasional",
      description:
        "Confirm your payout and keep your performance history complete.",
      tasks: ["Track Your Payout"],
      workstations: ["Financial"],
    },
  },

  "rental-providers": {
    inquiry: {
      relevance: "occasional",
      description:
        "Rental requests can arrive directly — capture what's needed and for which dates before it becomes a scramble.",
      tasks: ["Receive Rental Requests"],
      workstations: ["Event", "Inventory"],
    },
    planning: {
      relevance: "secondary",
      description:
        "See what productions are planning early, so your gear is reserved before shortages appear.",
      tasks: ["Review Equipment Requests", "Check Gear Availability"],
      workstations: ["Inventory", "Event"],
    },
    staffing: {
      relevance: "not-used",
      description:
        "Crewing is handled by the production. Unless you also freelance, this stage runs without you.",
      tasks: [],
      workstations: [],
    },
    equipment: {
      relevance: "primary",
      description:
        "This is your stage. Rental requests come to you from the network — reserve gear, confirm availability, and keep inventory working.",
      tasks: [
        "Receive Rental Requests",
        "Reserve Inventory",
        "Confirm Availability",
        "Prep the Order",
        "Schedule Delivery",
      ],
      workstations: ["Inventory", "Event"],
    },
    quote: {
      relevance: "secondary",
      description:
        "Price the rental from your inventory rates and send it back to the production.",
      tasks: ["Price the Rental", "Send Rental Quote"],
      workstations: ["Financial", "Inventory"],
    },
    approval: {
      relevance: "occasional",
      description:
        "Rental agreement signed and the reservation is locked against the event date.",
      tasks: ["Confirm the Reservation"],
      workstations: ["Event", "Financial"],
    },
    "show-day": {
      relevance: "secondary",
      description:
        "Deliver, check gear out, and know exactly where every piece is while the show runs.",
      tasks: ["Deliver & Check Out Gear", "Track Gear On Site"],
      workstations: ["Inventory", "Operations"],
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
        "Keep your catalog visible to the productions and venues that rent it.",
      tasks: ["Update Your Listings"],
      workstations: ["Marketing", "Inventory"],
    },
    reporting: {
      relevance: "secondary",
      description:
        "Close the rental — invoice it, check gear back in, and review how hard your inventory is working.",
      tasks: ["Invoice the Rental", "Check Gear In", "Review Utilization"],
      workstations: ["Financial", "Inventory"],
    },
  },

  "event-organizers": {
    inquiry: {
      relevance: "primary",
      description:
        "Start the event — capture the concept, date, and requirements in one record everyone else will work from.",
      tasks: ["Create the Inquiry", "Define Event Scope", "Check Date Availability"],
      workstations: ["Event"],
    },
    planning: {
      relevance: "primary",
      description:
        "Bring the pieces together — venue, production, schedule, and documents coordinated on one event record.",
      tasks: [
        "Create Event",
        "Assign Venue",
        "Build Schedule",
        "Upload Documents",
        "Invite Collaborators",
      ],
      workstations: ["Event"],
    },
    staffing: {
      relevance: "occasional",
      description:
        "Crewing is led by your production partners — you track that the key roles are covered.",
      tasks: ["Review Crew Coverage"],
      workstations: ["Crew", "Event"],
    },
    equipment: {
      relevance: "occasional",
      description:
        "Equipment is sourced by production and rental partners — you watch it come together on the event.",
      tasks: ["Review Equipment Plan"],
      workstations: ["Event", "Inventory"],
    },
    quote: {
      relevance: "primary",
      description:
        "Review pricing from your production partners against the event budget — all of it attached to the event record.",
      tasks: [
        "Receive Quotes",
        "Compare Against Budget",
        "Request Revisions",
        "Approve Pricing",
      ],
      workstations: ["Financial", "Event"],
    },
    approval: {
      relevance: "primary",
      description:
        "Sign off and lock the event — agreements, deposits, and confirmed scope in one place.",
      tasks: [
        "Sign Agreements",
        "Record Deposits",
        "Lock Event Scope",
        "Confirm Bookings",
      ],
      workstations: ["Event", "Financial"],
    },
    "show-day": {
      relevance: "secondary",
      description:
        "Follow the show from the shared record — schedule, contacts, and status without chasing anyone by phone.",
      tasks: ["Monitor the Schedule", "Access Event Documents", "Log Changes"],
      workstations: ["Event", "Operations"],
    },
    media: {
      relevance: "secondary",
      description:
        "Everything captured at the event stays attached to it — ready for recaps, sponsors, and next year's pitch.",
      tasks: ["Collect Event Media", "Share with Stakeholders"],
      workstations: ["Media", "Event"],
    },
    marketing: {
      relevance: "primary",
      description:
        "Promote the event before and after — campaigns, recaps, and promotion built from the event's own media and history.",
      tasks: [
        "Promote the Event",
        "Publish Recaps",
        "Reuse Event Media",
        "Track Engagement",
      ],
      workstations: ["Marketing", "Media"],
    },
    reporting: {
      relevance: "primary",
      description:
        "Close the event out — final costs, settlement, and the numbers that shape the next one.",
      tasks: [
        "Reconcile Final Costs",
        "Settle Invoices",
        "Review Event Metrics",
        "Archive the Event",
      ],
      workstations: ["Financial", "Event", "Automation"],
    },
  },
};
