import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import Section from "@/components/Section";
import WhoShowcase, { type ShowcaseRole } from "@/components/who/WhoShowcase";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import "./who.css";

/*
 * Who It's For (DESIGN-15A.2 to 15A.8: cinematic visual proof of concept, local only).
 *
 * The full-viewport interactive stage (DESIGN-15A.3) replaces the photo hero (whose montage carried
 * invented names printed into the image) and the six persona cards. Five
 * scenes are finished (Freelancers & Technicians, Production Companies,
 * Venues, Event Organizers & Producers, Musicians & Touring Acts); Rental
 * Warehouses & Providers shows an empty stage and its existing approved description,
 * marked "Scene in development". "What everyone shares" and the shared
 * closing are unchanged.
 *
 * Persona descriptions are read from lib/personas.ts and not modified (the
 * homepage also uses them).
 *
 * LAUNCH-DEPENDENT copy: see the note above ROLES below.
 */

export const metadata: Metadata = buildMetadata({
  title: "Who It's For",
  description:
    "ASO is built for freelancers and technicians, production companies, venues, event organizers, musicians, and rental providers.",
});

const who = (slug: string) => PERSONAS.find((p) => p.slug === slug)?.whoTheyAre ?? "";

/*
 * Freelancer copy (DESIGN-15A.4, founder direction refined). Checked against
 * anchorstage-intake (read-only):
 *   Live today: a person can belong to several organizations independently;
 *   the events list spans the organizations they belong to (where that
 *   organization gives them event access); crew calls can be answered from a
 *   link without an account.
 *   LAUNCH-DEPENDENT: "More gigs", "finding your next opportunity", and
 *   "connections that bring you back" depend on public profiles, discovery,
 *   and standing Network connections (not live; see the Network page notes).
 *   They are written as the value ASO is built toward, not as features. No
 *   availability or rate-card claims.
 * Card taglines are page-specific and condensed from lib/personas.ts; shared
 * persona data is not changed.
 */
const ROLES: ShowcaseRole[] = [
  {
    slug: "freelancers",
    name: "Freelancers & Technicians",
    tagline: "Audio, video, lighting, and crew",
    setting: "FOH mixing position",
    ready: true,
    headline: "More gigs. Less chasing details.",
    recognition:
      "You work with different production companies, crews, and venues. Keep your gigs and the organizations you work with in one place, so you can focus on doing great work and finding your next opportunity.",
    value:
      "Answer crew calls from a link, see your events from every organization you belong to, and build the professional connections that bring you back for the next show.",
    aside: {
      title: "Common specialties",
      groups: [
        { group: "Audio", items: ["A1", "A2", "RF Tech"] },
        { group: "Video", items: ["V1", "Camera Operator", "LED Tech"] },
        { group: "Lighting", items: ["L1", "L2", "Lighting Tech"] },
        { group: "General", items: ["Stagehand", "Rigger", "Utility"] },
      ],
    },
  },
  /*
   * Production Company copy (DESIGN-15A.5, founder direction). The "With
   * AnchorStage Ops" line only names things verified live in
   * anchorstage-intake (read-only; docs/operations and the Platform page
   * notes): crew roles filled from a private roster or a crew call answered
   * from a link; gear and packages assigned from the organization's own
   * inventory; event timing (call, load-in, doors, show end, strike);
   * Production Brief and Pack List from the event. Not claimed: inventory
   * integrations, automatic scheduling, self-service collaboration between
   * organizations (today an ASO admin sets that up).
   * The side panel lists responsibilities production companies manage, as
   * examples; it is titled as such and makes no feature claims.
   */
  {
    slug: "production-companies",
    name: "Production Companies",
    tagline: "Delivering several events at once",
    setting: "an active stage build",
    ready: true,
    headline: "Your crew. Your gear. Your operation.",
    recognition:
      "Every production means coordinating people, equipment, schedules, and last-minute changes. Keep the moving pieces organized so your team can spend less time chasing information and more time delivering the show.",
    value:
      "Fill crew roles from your roster or a crew call, assign gear from your own inventory, set call and load-in times, and pull the production brief and pack list from the same event.",
    aside: {
      title: "Production responsibilities",
      groups: [
        { group: "People", items: ["Crew assignments", "Department leads", "Call times"] },
        { group: "Equipment", items: ["Gear preparation", "Load lists", "Equipment coordination"] },
        { group: "Planning", items: ["Production schedules", "Show requirements", "Revisions"] },
        { group: "Execution", items: ["Load-in", "Show operations", "Strike"] },
      ],
    },
    summary: who("production-companies"),
  },
  /*
   * Venue copy (DESIGN-15A.6, founder direction; scene: a hotel banquet
   * director preparing a ballroom for a corporate event). The "With
   * AnchorStage Ops" line only names things verified live in
   * anchorstage-intake (read-only; docs/operations event-lifecycle,
   * build-your-first-event, the event checklist, and the Production Brief
   * page and PDF): each event is one record linked to its client and venue;
   * venue records carry site access, parking, and load-in notes into the
   * event; event timing (call, load-in, doors, show end, strike); staff
   * assigned from the organization's own roster; the event's checklist; the
   * Production Brief lists the venue, timing, load-in location, parking, and
   * the on-site contact, and can be handed to an outside production team.
   * Not claimed: room booking or reservations, hotel property-management
   * integrations, automatic banquet event orders, self-service collaboration
   * between organizations (today an ASO admin sets that up), event-driven
   * signage, venue-wide resource scheduling.
   * The side panel lists responsibilities venues manage, as examples; it is
   * titled as such and makes no feature claims.
   */
  {
    slug: "venues",
    name: "Venues",
    tagline: "Running a room and its calendar",
    setting: "a hotel ballroom",
    ready: true,
    headline: "Every event is different. Your standards aren't.",
    recognition:
      "Every event brings different clients, production teams, schedules, and room requirements. Keep the details organized so your staff can prepare the space, coordinate with partners, and deliver a consistent experience.",
    value:
      "Keep each event's client, venue notes, and schedule in one record, staff it from your own roster, work through its checklist, and hand outside production teams one brief with load-in, parking, and on-site contact details.",
    aside: {
      title: "Venue responsibilities",
      groups: [
        { group: "Bookings", items: ["Event calendar", "Room requirements", "Client coordination"] },
        { group: "Facilities", items: ["Room readiness", "House equipment", "Maintenance"] },
        { group: "Event Services", items: ["Banquet setup", "Staff coordination", "Guest experience"] },
        { group: "Partners", items: ["Outside production", "Vendor access", "Load-in coordination"] },
      ],
    },
    summary: who("venues"),
  },
  /*
   * Event Organizers & Producers copy (DESIGN-15A.7; scene: an event
   * producer calling doors at guest check-in). The "With AnchorStage Ops"
   * line only names things verified live in anchorstage-intake (read-only;
   * docs/operations event-lifecycle, event-readiness, crew-operations, the
   * Production Brief page and PDF): each event is one record linked to its
   * client and venue; event timing (call, load-in, doors, show end, strike);
   * crew from the organization's roster or a crew call answered from a link;
   * the readiness check (eight checks, a badge, blockers); the Production
   * Brief (venue, timing, load-in, parking, on-site contact) handed to
   * partners as a page or PDF.
   * LAUNCH-DEPENDENT, not claimed: giving independent partner organizations
   * their own access to the event record (today an event's owner can add
   * only organizations it already manages; an ASO admin sets up anything
   * wider; see the Network page notes), attendee registration or ticketing,
   * guest check-in, run-of-show cueing, and attendee messaging. The scene's
   * check-in desk and run-of-show screen are illustration, not features.
   * The side panel lists responsibilities organizers manage, as examples;
   * it is titled as such and makes no feature claims.
   */
  {
    slug: "event-organizers",
    name: "Event Organizers & Producers",
    tagline: "Owning and coordinating events",
    setting: "guest check-in before doors",
    ready: true,
    headline: "A hundred moving parts. One unforgettable event.",
    recognition:
      "Clients, venues, vendors, production teams, and guests all depend on the same event, and the details keep changing. Keep everyone on the latest plan so the day comes together.",
    value:
      "Keep each event's client, venue, and times from load-in to doors in one record, staff it from your roster or a crew call, see what still needs attention, and give every partner the same brief.",
    aside: {
      title: "Organizer responsibilities",
      groups: [
        { group: "Planning", items: ["Run of show", "Event timeline", "Changing requirements"] },
        { group: "Stakeholders", items: ["Clients", "Venues & vendors", "Production partners"] },
        { group: "Guest Experience", items: ["Registration", "Wayfinding", "Attendee updates"] },
        { group: "Event Execution", items: ["Doors & cues", "Staff briefings", "Day-of changes"] },
      ],
    },
    summary: who("event-organizers"),
  },
  /*
   * Musicians & Touring Acts copy (DESIGN-15A.8; scene: a touring guitarist
   * at soundcheck). The "With AnchorStage Ops" line only names things
   * verified live in anchorstage-intake (read-only; docs/operations
   * event-lifecycle and issued-documents, the event Setup notes, the public
   * request page app/(intake)/request/[orgSlug], and the Platform page
   * notes): each show is an event record linked to its venue; event timing
   * (call, load-in, doors, show end, strike); the event's technical notes;
   * requests arriving through the organization's own request page; numbered
   * quotes and invoices drafted from the event.
   * Not claimed (not live): public artist discovery, tour booking or routing,
   * ticketing integrations, music distribution, automatic technical-rider
   * generation, self-service collaboration with independent organizations
   * (today an ASO admin sets that up), guaranteed gigs, payment processing
   * (payments are recorded by hand). "The people you work with again" in
   * the recognition copy is the musician's own goal, not a feature (standing
   * connections between organizations are launch-dependent; see the Network
   * page notes).
   * Headline (DESIGN-15A.10, founder-approved wording): "We'll help with
   * everything around it" is help, not a claim that ASO runs the show or
   * any of it automatically; the With AnchorStage Ops line says exactly
   * what that help is today.
   * The side panel lists responsibilities touring acts manage, as examples;
   * it is titled as such and makes no feature claims.
   */
  {
    slug: "musicians",
    name: "Musicians & Touring Acts",
    tagline: "Running the shows they organize",
    setting: "soundcheck on the stage",
    ready: true,
    headline: "Make the show happen. We'll help with everything around it.",
    recognition:
      "Every show brings a different venue, promoter, and production team. Keep your dates and stage needs straight so you can focus on the performance and the people you work with again.",
    value:
      "Keep each show's venue, load-in and show times, and technical notes in one record, take requests through your own request page, and send numbered quotes and invoices from the same show.",
    aside: {
      title: "Touring responsibilities",
      groups: [
        { group: "Shows", items: ["Schedules", "Set preparation", "Soundcheck"] },
        { group: "Touring", items: ["Travel logistics", "Venue coordination", "Load-in details"] },
        { group: "Technical", items: ["Stage requirements", "Backline", "Monitor needs"] },
        { group: "Business", items: ["Promoters", "Booking contacts", "Payments"] },
      ],
    },
    summary: who("musicians"),
  },
  { slug: "rental-providers", name: "Rental Warehouses & Providers", tagline: "Inventory that supplies partners", setting: "an equipment warehouse and loading area", ready: false, summary: who("rental-providers") },
];

export default function WhoItsForPage() {
  return (
    <main className="bg-white">
      <WhoShowcase roles={ROLES} />

      {/* WHAT EVERYONE SHARES (unchanged) */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            What everyone shares
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Six kinds of work, one thing in common. Everyone here operates through their
            own organization, on their own terms. ASO does not fold you into one larger
            company or ask you to work the way someone else does.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            You get value from the first day, before anyone else you know has joined. As
            more of the industry comes on, independent organizations start working
            together on a shared network without giving up what makes each of them their
            own.
          </p>
        </div>
      </Section>

      {/* CTA (shared, unchanged) */}
      <ClosingCta
        heading="Join free"
        body="Create your organization and start running your work through it. Membership is free, and you can begin on your own today."
        primary={{ label: AUTH_NAV.join.label, href: AUTH_NAV.join.href }}
        secondary={{ label: "See how it works", href: "/platform" }}
      />
    </main>
  );
}
