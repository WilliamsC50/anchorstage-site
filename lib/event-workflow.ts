import type { WorkflowStage } from "./content-types";

/**
 * The event lifecycle as ASO models it: ten stages from first inquiry to
 * final reporting. Drives the homepage Event Workflow Explorer.
 *
 * Placeholder-quality copy authored for review — not confirmed final.
 */
export const EVENT_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: "inquiry",
    title: "Inquiry",
    description:
      "Every event starts as an inquiry. Capture the client, date, and scope in one intake record instead of an email thread.",
    tasks: [
      "Receive Intake Submission",
      "Create Client Record",
      "Capture Event Details",
      "Check Date Availability",
      "Qualify the Request",
    ],
    modules: ["Intake", "Clients", "Events", "Calendar"],
    usedBy: ["production-companies", "event-organizers", "venues"],
  },
  {
    id: "planning",
    title: "Planning",
    description:
      "Turn a confirmed inquiry into a working event plan — one record that holds the schedule, documents, and production requirements.",
    tasks: [
      "Create Event",
      "Select Client",
      "Assign Venue",
      "Add Schedule",
      "Upload Documents",
      "Build Packages",
      "Estimate Power",
      "Invite Collaborators",
    ],
    modules: ["Events", "Clients", "Venues", "Documents", "Packages", "Power Planner"],
    usedBy: ["production-companies", "event-organizers", "venues"],
  },
  {
    id: "staffing",
    title: "Staffing",
    description:
      "Assign the people the event needs — in-house crew, freelancers from the network, and collaborators from partner companies.",
    tasks: [
      "Define Crew Roles",
      "Assign In-House Crew",
      "Request Freelancers",
      "Confirm Availability",
      "Set Call Times",
    ],
    modules: ["Crew", "Network", "Scheduling", "Messages"],
    usedBy: ["production-companies", "freelancers", "event-organizers"],
  },
  {
    id: "equipment",
    title: "Equipment",
    description:
      "Reserve gear against the event date — from your own inventory, shared packages, or rental providers in the network.",
    tasks: [
      "Build Equipment List",
      "Reserve Inventory",
      "Request Rentals",
      "Resolve Shortages",
      "Prep Load Sheets",
    ],
    modules: ["Inventory", "Packages", "Rentals", "Events"],
    usedBy: ["production-companies", "rental-providers", "freelancers"],
  },
  {
    id: "quote",
    title: "Quote",
    description:
      "Generate the quote from what's already planned — labor, equipment, and services priced from the event record itself.",
    tasks: [
      "Price Labor & Gear",
      "Apply Package Rates",
      "Add Terms",
      "Generate Quote PDF",
      "Send to Client",
    ],
    modules: ["Financial", "Packages", "Clients", "Documents"],
    usedBy: ["production-companies", "event-organizers", "rental-providers"],
  },
  {
    id: "approval",
    title: "Approval",
    description:
      "Client sign-off, deposits, and agreements tracked on the event — so everyone works from one confirmed scope.",
    tasks: [
      "Send Agreement",
      "Collect Signature",
      "Record Deposit",
      "Lock Event Scope",
      "Confirm Bookings",
    ],
    modules: ["Documents", "Financial", "Clients", "Events"],
    usedBy: ["production-companies", "event-organizers", "venues"],
  },
  {
    id: "show-day",
    title: "Show Day",
    description:
      "Run the event from the same record it was planned in — schedules, contacts, stage plots, and checklists in one place on site.",
    tasks: [
      "Publish Day-of Schedule",
      "Run Load-In Checklist",
      "Track Crew Check-Ins",
      "Access Show Documents",
      "Log Changes On Site",
    ],
    modules: ["Events", "Crew", "Documents", "Scheduling"],
    usedBy: ["production-companies", "freelancers", "venues", "musicians"],
  },
  {
    id: "media",
    title: "Media",
    description:
      "Collect photos, video, and recordings from the event and attach them where they belong — to the event, the venue, and the artists.",
    tasks: [
      "Upload Event Media",
      "Tag People & Venues",
      "Organize Albums",
      "Handle Releases",
      "Share with Collaborators",
    ],
    modules: ["Media", "Events", "Documents"],
    usedBy: ["musicians", "venues", "event-organizers"],
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Turn finished events into the next booking — recaps, promotion, and campaigns built from real event history and media.",
    tasks: [
      "Build Event Recap",
      "Publish Highlights",
      "Promote Upcoming Dates",
      "Reuse Media Assets",
      "Track Engagement",
    ],
    modules: ["Marketing", "Media", "Events"],
    usedBy: ["venues", "musicians", "event-organizers"],
  },
  {
    id: "reporting",
    title: "Reporting",
    description:
      "Close the event out — final invoices, settlement, and the numbers that show what worked and what to improve next time.",
    tasks: [
      "Send Final Invoice",
      "Reconcile Costs",
      "Settle Payouts",
      "Review Event Metrics",
      "Archive the Event",
    ],
    modules: ["Financial", "Events", "Automation"],
    usedBy: ["production-companies", "event-organizers", "venues"],
  },
];
