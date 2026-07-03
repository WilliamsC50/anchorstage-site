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
    examples: ["Audio Techs", "Video Techs", "Lighting Techs", "Camera Operators", "Video Wall Specialists"],
    relatedPersonas: ["production-companies", "venues", "rental-providers", "event-organizers", "musicians"],
  },
  {
    slug: "production-companies",
    name: "Production Companies",
    singularName: "Production Company",
    tagline: "Collaborate and grow.",
    description:
      "Expand your crew, equipment, partnerships, and production capabilities through connected organizations.",
    checklist: ["Find Crew", "Share Inventory", "Win Larger Events", "Scale Operations"],
    examples: ["Live Event Productions", "Conferences", "Galas", "General Sessions", "Corporate Events"],
    relatedPersonas: ["freelancers", "venues", "rental-providers", "event-organizers", "musicians"],
  },
  {
    slug: "musicians",
    name: "Musicians",
    singularName: "Musician",
    tagline: "Find gigs and manage your career.",
    description:
      "Find opportunities, promote your work, manage performances, and build lasting industry relationships.",
    checklist: ["Find Gigs", "Promote Shows", "Source Support", "Build Your Career"],
    examples: ["Original Bands", "Cover Bands", "Solo Musicians", "Theatrical Performers", "DJs"],
    relatedPersonas: ["venues", "event-organizers", "production-companies", "freelancers"],
  },
  {
    slug: "venues",
    name: "Venues",
    singularName: "Venue",
    tagline: "Build better events.",
    description:
      "Build stronger events by connecting with performers, production partners, organizers, and rental providers.",
    checklist: ["Book Talent", "Find Production", "Promote Events", "Build Programs"],
    examples: ["Breweries", "Pubs", "Clubs", "Performance Houses", "Places of Worship", "Concert Halls"],
    relatedPersonas: ["musicians", "production-companies", "event-organizers", "rental-providers", "freelancers"],
  },
  {
    slug: "rental-providers",
    name: "Rental Providers",
    singularName: "Rental Provider",
    tagline: "Keep your inventory working.",
    description:
      "Keep your equipment working by connecting with productions, venues, and professionals who need it.",
    checklist: ["List Equipment", "Receive Requests", "Connect with Productions", "Increase Utilization"],
    examples: ["PA Systems", "Lighting Packages", "Video Walls", "IEM Racks", "Backline", "Staging"],
    relatedPersonas: ["production-companies", "freelancers", "venues", "event-organizers"],
  },
  {
    slug: "event-organizers",
    name: "Event Organizers",
    singularName: "Event Organizer",
    tagline: "Bring everything together.",
    description:
      "Bring together the people, venues, equipment, documents, media, and marketing behind every event.",
    checklist: ["Coordinate People", "Source Gear", "Manage Documents", "Promote Events"],
    examples: ["Festivals", "Fundraisers", "Open Mics", "Community Events", "Corporate Events", "Private Events"],
    relatedPersonas: ["venues", "production-companies", "freelancers", "musicians", "rental-providers"],
  },
];
