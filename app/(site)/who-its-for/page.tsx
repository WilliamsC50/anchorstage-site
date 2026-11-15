import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import Section from "@/components/Section";
import WhoShowcase, { type ShowcaseRole } from "@/components/who/WhoShowcase";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import "./who.css";

/*
 * Who It's For (DESIGN-15A.2 to 15A.5: cinematic visual proof of concept, local only).
 *
 * The full-viewport interactive stage (DESIGN-15A.3) replaces the photo hero (whose montage carried
 * invented names printed into the image) and the six persona cards. Two
 * scenes are finished (Freelancers & Technicians, Production Companies); the
 * other four show an empty stage and their existing approved description,
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
    headline: "Your crew. Your gear. Your shows. One operation.",
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
  { slug: "venues", name: "Venues", tagline: "Running a room and its calendar", setting: "a theatrical or live-music venue", ready: false, summary: who("venues") },
  { slug: "event-organizers", name: "Event Organizers & Producers", tagline: "Owning and coordinating events", setting: "an event coordination environment", ready: false, summary: who("event-organizers") },
  { slug: "musicians", name: "Musicians & Touring Acts", tagline: "Running the shows they organize", setting: "a performance and touring stage", ready: false, summary: who("musicians") },
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
