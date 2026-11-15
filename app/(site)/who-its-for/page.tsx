import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import Section from "@/components/Section";
import WhoShowcase, { type ShowcaseRole } from "@/components/who/WhoShowcase";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";
import "./who.css";

/*
 * Who It's For (DESIGN-15A.2/15A.3: cinematic visual proof of concept, local only).
 *
 * The full-viewport interactive stage (DESIGN-15A.3) replaces the photo hero (whose montage carried
 * invented names printed into the image) and the six persona cards. One
 * scene is finished (Freelancers & Technicians); the other five show an empty
 * stage and their existing approved description, marked "Scene in
 * development". "What everyone shares" and the shared closing are unchanged.
 *
 * Persona descriptions are read from lib/personas.ts and not modified (the
 * homepage also uses them).
 *
 * LAUNCH-DEPENDENT copy: see components/who/WhoShowcase.tsx.
 */

export const metadata: Metadata = buildMetadata({
  title: "Who It's For",
  description:
    "ASO is built for freelancers and technicians, production companies, venues, event organizers, musicians, and rental providers.",
});

const who = (slug: string) => PERSONAS.find((p) => p.slug === slug)?.whoTheyAre ?? "";

const ROLES: ShowcaseRole[] = [
  {
    slug: "freelancers",
    name: "Freelancers & Technicians",
    setting: "FOH mixing position",
    ready: true,
    headline: "You run the show. And everything behind it.",
    recognition:
      "You're the technician, the scheduler, the salesperson, and the one chasing down the details. Your operation deserves more than scattered messages and spreadsheets.",
    value:
      "Build your professional presence, organize your jobs and rates, and develop relationships with the companies that need your skills.",
  },
  { slug: "production-companies", name: "Production Companies", setting: "an active stage build", ready: false, summary: who("production-companies") },
  { slug: "venues", name: "Venues", setting: "a theatrical or live-music venue", ready: false, summary: who("venues") },
  { slug: "event-organizers", name: "Event Organizers & Producers", setting: "an event coordination environment", ready: false, summary: who("event-organizers") },
  { slug: "musicians", name: "Musicians & Touring Acts", setting: "a performance and touring stage", ready: false, summary: who("musicians") },
  { slug: "rental-providers", name: "Rental Warehouses & Providers", setting: "an equipment warehouse and loading area", ready: false, summary: who("rental-providers") },
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
