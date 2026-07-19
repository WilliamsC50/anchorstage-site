import type { Persona } from "./content-types";

// Public audiences for /who-its-for, in canonical order.
//
// Rules for this content:
// - Every "support" line must describe something the platform does today.
// - No discovery, hiring, booking, or marketplace language.
// - Nothing may imply ASO detects or configures itself by audience type.
export const PERSONAS: Persona[] = [
  {
    slug: "freelancers",
    name: "Freelancers",
    examples: "Audio, lighting, and video technicians, camera operators, engineers",
    whoTheyAre:
      "Independent professionals who own their client relationships and run their own work.",
    problem:
      "You are the crew, the office, and the warehouse, and the details of every job live in your phone, your inbox, and your memory.",
    support:
      "Run a complete one-person organization. Keep your events, gear, documents, and financial records in one place, and issue quotes and invoices under your own name. Bring in an organization you already work with when a job needs more hands.",
  },
  {
    slug: "production-companies",
    name: "Production Companies",
    examples: "Live event production, corporate AV, conferences, galas",
    whoTheyAre:
      "Organizations delivering production work across several events at once.",
    problem:
      "Crew, gear, documents, and money are tracked separately for each event, and every partner you work with holds a copy that drifts out of date.",
    support:
      "Keep every event under one organization. When you work with a partner organization, they can join the same event and see current information instead of a copy, with the access you decide to give them.",
  },
  {
    slug: "venues",
    name: "Venues",
    examples: "Breweries, clubs, performance houses, concert halls",
    whoTheyAre:
      "The business or operator running a room and its calendar. Venue organizations run programming. A venue on its own is only a location.",
    problem:
      "Recurring programming gets rebuilt by hand every cycle, requests arrive in three different inboxes, and the screens in the room are updated separately from the schedule.",
    support:
      "Run recurring nights as a series instead of starting over. Take in structured requests, keep your house inventory and power planning in one place, and drive in-venue screens from the same event information.",
  },
  {
    slug: "event-organizers",
    name: "Event Organizers",
    examples: "Festivals, fundraisers, community events, private events",
    whoTheyAre:
      "The organization that owns an event and coordinates the people delivering it.",
    problem:
      "Every provider holds one piece of the event, and finding out whether the event is actually ready means calling all of them.",
    support:
      "Give the organizations working your event scoped access to the same record. Readiness, documents, and promotion all work from current information rather than from the last email anyone sent.",
  },
  {
    slug: "musicians",
    name: "Musicians",
    examples: "Bands, solo performers, DJs, theatrical performers",
    whoTheyAre:
      "Performing acts running the shows and recurring events they organize themselves.",
    problem:
      "The nights you run yourself are coordinated with no system at all, and your promo material, stage requirements, and show history are spread across other people's platforms.",
    support:
      "Operate your own organization around the shows you control. Keep media, documents, and financial records together, and run open mic signup, queues, and signage from one place.",
  },
  {
    slug: "rental-providers",
    name: "Rental Providers",
    examples: "PA systems, lighting packages, backline, staging, video walls",
    whoTheyAre:
      "Organizations whose inventory is the business, and operations that regularly supply partners.",
    problem:
      "Requests arrive by phone and text with the dates missing, and availability lives in a spreadsheet that is out of date as soon as two jobs overlap.",
    support:
      "Keep inventory in one place and receive structured requests tied to a real event. Give a partner organization you approve visibility into what is available so requests start from current information.",
  },
];
