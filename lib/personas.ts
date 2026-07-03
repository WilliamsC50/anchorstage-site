import type { Persona } from "./content-types";

export const PERSONAS: Persona[] = [
  {
    slug: "freelancers",
    name: "Freelancers",
    singularName: "Freelancer",
    tagline: "Operate like a larger company.",
    description:
      "Find work, source collaborators, request gear, and grow your business through one connected network.",
    checklist: ["Get Hired", "Find Gear", "Build Crew", "Grow Your Business"],
    networkNodes: ["Events", "Crew", "Gear", "Marketing"],
  },
  {
    slug: "production-companies",
    name: "Production Companies",
    singularName: "Production Company",
    tagline: "Collaborate and grow.",
    description:
      "Expand your crew, equipment, partnerships, and production capabilities through connected organizations.",
    checklist: ["Find Crew", "Share Inventory", "Win Larger Events", "Scale Operations"],
    networkNodes: ["Crew", "Inventory", "Events", "Media"],
  },
  {
    slug: "musicians",
    name: "Musicians",
    singularName: "Musician",
    tagline: "Find gigs and manage your career.",
    description:
      "Find opportunities, promote your work, manage performances, and build lasting industry relationships.",
    checklist: ["Find Gigs", "Promote Shows", "Source Support", "Build Your Career"],
    networkNodes: ["Venues", "Events", "Marketing", "Crew"],
  },
  {
    slug: "venues",
    name: "Venues",
    singularName: "Venue",
    tagline: "Build better events.",
    description:
      "Build stronger events by connecting with performers, production partners, organizers, and rental providers.",
    checklist: ["Book Talent", "Find Production", "Promote Events", "Build Programs"],
    networkNodes: ["Musicians", "Production", "Marketing", "Events"],
  },
  {
    slug: "rental-providers",
    name: "Rental Providers",
    singularName: "Rental Provider",
    tagline: "Keep your inventory working.",
    description:
      "Keep your equipment working by connecting with productions, venues, and professionals who need it.",
    checklist: ["List Equipment", "Receive Requests", "Connect with Productions", "Increase Utilization"],
    networkNodes: ["Inventory", "Production", "Events", "Crew"],
  },
  {
    slug: "event-organizers",
    name: "Event Organizers",
    singularName: "Event Organizer",
    tagline: "Bring everything together.",
    description:
      "Bring together the people, venues, equipment, documents, media, and marketing behind every event.",
    checklist: ["Coordinate People", "Source Gear", "Manage Documents", "Promote Events"],
    networkNodes: ["Crew", "Production", "Venues", "Marketing"],
  },
];
