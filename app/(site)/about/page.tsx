import type { Metadata } from "next";
import AboutFounder from "@/components/about/AboutFounder";
import AboutStory from "@/components/about/AboutStory";
import ClosingCta from "@/components/ClosingCta";
import ContactCta from "@/components/ContactCta";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import "./about.css";

/*
 * About (DESIGN-16A.2: photographic storytelling, local only).
 *
 * Two scenes replace the old page header and its seven alternating sections:
 *   1. The work behind the show (components/about/AboutStory.tsx): the
 *      black-and-white working photograph, the problem, and the work around
 *      the work that became ASO.
 *   2. The person and the purpose (components/about/AboutFounder.tsx): the
 *      colour portrait, the founder's introduction, mission, philosophy, and
 *      direction.
 * Scene 3, a contact section, comes in DESIGN-16A.3. Until then the existing
 * shared closing (ClosingCta with the Contact Us dialog) stays unchanged, so
 * the page keeps a working contact route.
 *
 * Content is the approved About story, consolidated. Founder confirmed: more
 * than 10 years of hands-on live event production. Removed as repetitive or
 * misleading: "Not from a pitch deck, and not from a software roadmap", "It
 * was not planned as a product", and "ASO was not designed around a business
 * plan" (they read as a lack of planning), and "the site will keep saying so
 * until it ships". The network is stated as still in development.
 */

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Why AnchorStage Ops exists, who is building it, and where it is going. Built from more than 10 years of hands-on live event production.",
});

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStory />
      <AboutFounder />

      {/* CONTACT (shared, unchanged until DESIGN-16A.3) */}
      <ClosingCta
        heading="Join free"
        body="Create your organization and see whether it fits the way you already work."
        primary={{ label: AUTH_NAV.join.label, href: AUTH_NAV.join.href }}
        secondary={<ContactCta />}
      />
    </main>
  );
}
