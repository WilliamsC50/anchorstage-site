import type { PersonaBenefit, PersonaSlug } from "./content-types";

/**
 * What each role gains from every other role, through ASO. Drives the
 * homepage network map's hover/focus benefit panel. Placeholder-quality
 * copy authored for review — not confirmed final.
 */
export const PERSONA_NETWORK_BENEFITS: Record<PersonaSlug, PersonaBenefit[]> = {
  freelancers: [
    { from: "production-companies", benefit: "Steady work on larger productions and crew opportunities." },
    { from: "venues", benefit: "Recurring gigs and direct access to house shows." },
    { from: "musicians", benefit: "Referrals for audio, lighting, and technical support." },
    { from: "rental-providers", benefit: "Gear access without owning or storing everything yourself." },
    { from: "event-organizers", benefit: "Freelance bookings across festivals, private events, and shows." },
  ],
  "production-companies": [
    { from: "freelancers", benefit: "Skilled techs and engineers to scale crew on demand." },
    { from: "venues", benefit: "Recurring venue partnerships and installed production work." },
    { from: "musicians", benefit: "Acts that need full production support for their shows." },
    { from: "rental-providers", benefit: "Additional inventory to cover larger or overlapping events." },
    { from: "event-organizers", benefit: "Contracted production work across bigger events." },
  ],
  musicians: [
    { from: "venues", benefit: "Places to perform and recurring event opportunities." },
    { from: "event-organizers", benefit: "Booked shows, festivals, open mics, and private events." },
    { from: "production-companies", benefit: "Professional sound, lighting, staging, and technical support." },
    { from: "freelancers", benefit: "Engineers, techs, camera operators, and crew support." },
    { from: "rental-providers", benefit: "Backline, IEM rigs, PA, lighting, and specialty gear." },
  ],
  venues: [
    { from: "musicians", benefit: "Acts and performers to book and build programming around." },
    { from: "production-companies", benefit: "Reliable technical partners for bigger shows." },
    { from: "event-organizers", benefit: "Outside events that fill your calendar and draw new crowds." },
    { from: "rental-providers", benefit: "Extra gear on hand for shows beyond your house system." },
    { from: "freelancers", benefit: "On-call techs for nights your in-house crew can't cover." },
  ],
  "rental-providers": [
    { from: "production-companies", benefit: "Regular equipment orders for ongoing productions." },
    { from: "freelancers", benefit: "Independent techs who rent gear for their own bookings." },
    { from: "venues", benefit: "Venues that need extra equipment beyond their house rig." },
    { from: "event-organizers", benefit: "Equipment orders tied to festivals and larger events." },
    { from: "musicians", benefit: "Touring and performing acts who rent backline and gear." },
  ],
  "event-organizers": [
    { from: "venues", benefit: "Locations to host festivals, fundraisers, and private events." },
    { from: "production-companies", benefit: "Full production support for large or complex events." },
    { from: "freelancers", benefit: "On-demand crew to staff events of any size." },
    { from: "musicians", benefit: "Talent to book for festivals, private events, and shows." },
    { from: "rental-providers", benefit: "Equipment to outfit events without owning inventory." },
  ],
};

export const ASO_NETWORK_VALUE =
  "ASO connects live event professionals into one operating network for opportunities, collaboration, resources, planning, media, documents, marketing, and growth.";
