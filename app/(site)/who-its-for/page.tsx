import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import WhoBridge from "@/components/who/WhoBridge";
import WhoShowcase, { type ShowcaseRole } from "@/components/who/WhoShowcase";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import "./who.css";

/*
 * Who It's For (DESIGN-15A.2 to 15A.12: cinematic visual proof of concept, local only).
 *
 * The full-viewport interactive stage (DESIGN-15A.3) replaces the photo hero (whose montage carried
 * invented names printed into the image) and the six persona cards. All six
 * scenes are built (the Rental scene in DESIGN-15A.12). A short bridge
 * (components/who/WhoBridge.tsx, DESIGN-15B.2) replaces "What everyone
 * shares"; the shared closing is unchanged until DESIGN-15B.3.
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
   * DESIGN-15A.12 business line, each part verified live (read-only): show
   * details and technical notes on the event; crew reached through crew
   * calls and revocable crew-sheet links; quotes and invoices numbered and
   * issued under the organization's own name and logo (issued documents
   * carry org_name and org_logo_url); the Marketing Workstation's campaign
   * tracking links count clicks and attribute the requests that follow
   * (CampaignResponses, CampaignTrackingLinksSection); payments recorded
   * against each show in the event's Financials.
   * Tips, NOT claimed: a Phase 1 tip checkout exists (app/pay, Stripe
   * Checkout, recorded as a TIP allocation on the event), but it charges
   * through ASO's own Stripe account rather than the act's (no connected
   * accounts), and docs/operations/financial-operations marks it
   * UNCERTAIN; a Signage screen can show a tip link the organization
   * enters (an outside link). Neither is accepting tips through ASO, so the
   * copy does not mention tips. "Sales tracking" is not claimed either
   * (there is no ticketing); the line says payments.
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
      "Keep each show's details and technical notes in one place, share them with your crew by link, send branded, numbered quotes and invoices, see which promotions bring in requests, and track payments for each show.",
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
  /*
   * Rental Warehouses & Providers copy (DESIGN-15A.12; scene: a rental prep
   * technician checking out an order on the stage at load-in). The "With
   * AnchorStage Ops" line only names things verified live in
   * anchorstage-intake (read-only; the Inventory Workstation, the event's
   * gear page, the Pack List PDF, quote drafting, and the Platform page
   * notes): gear items with quantities owned and gear packages in one
   * inventory; gear and packages assigned to each event; "Inventory Short"
   * when overlapping events promise more than is owned (a visibility
   * warning, not a reservation system); the Pack List from the event; quote
   * drafts that take their lines from the event's packages.
   * Not claimed (not live): barcode or asset-tag scanning (there is no
   * scanning, barcode, serial-number, or per-unit asset tracking; gear status
   * is only active or retired), check-out and check-in, condition or
   * maintenance tracking, live inventory sync, integrations with rental
   * management platforms, and self-service gear requests between independent
   * organizations (gear requests run inside a collaboration an ASO admin sets
   * up). THE SCANNER IN THE SCENE IS ILLUSTRATION ONLY; its accessible name
   * says it is not connected to any inventory.
   * The side panel lists responsibilities rental providers manage, as
   * examples; it is titled as such and makes no feature claims.
   */
  {
    slug: "rental-providers",
    name: "Rental Warehouses & Providers",
    tagline: "Inventory that supplies partners",
    setting: "an order checked out at load-in",
    ready: true,
    headline: "Every case accounted for. Every show ready.",
    recognition:
      "Your gear is out on several jobs at once, and every order has to be pulled, prepped, and checked before load-in. Keep equipment, people, and job details organized so the right gear goes out on time.",
    value:
      "Keep your gear and packages in one inventory, assign them to each job, see when overlapping jobs need more than you own, and pull the pack list and quote from the same event.",
    aside: {
      title: "Rental responsibilities",
      groups: [
        { group: "Inventory", items: ["Equipment counts", "Packages & kits", "Maintenance"] },
        { group: "Preparation", items: ["Pulling orders", "Testing & inspection", "Pack lists"] },
        { group: "Logistics", items: ["Delivery & pickup", "Load-in support", "Returns"] },
        { group: "Business", items: ["Quotes & invoices", "Client accounts", "Loss & damage"] },
      ],
    },
    summary: who("rental-providers"),
  },
];

export default function WhoItsForPage() {
  return (
    <main className="bg-white">
      <WhoShowcase roles={ROLES} />

      {/* BRIDGE: brings the six stories together (DESIGN-15B.2; replaces
          "What everyone shares"). */}
      <WhoBridge />

      {/* CTA (shared, unchanged; redesigned separately in DESIGN-15B.3) */}
      <ClosingCta
        heading="Join free"
        body="Create your organization and start running your work through it. Membership is free, and you can begin on your own today."
        primary={{ label: AUTH_NAV.join.label, href: AUTH_NAV.join.href }}
        secondary={{ label: "See how it works", href: "/platform" }}
      />
    </main>
  );
}
