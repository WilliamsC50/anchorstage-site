import type { Metadata } from "next";
import AboutContact from "@/components/about/AboutContact";
import AboutFounder from "@/components/about/AboutFounder";
import AboutStory from "@/components/about/AboutStory";
import { buildMetadata } from "@/lib/metadata";
import "./about.css";

/*
 * About (DESIGN-16A.2 and 16A.3: photographic storytelling, local only).
 *
 * Three scenes:
 *   1. The work behind the show (components/about/AboutStory.tsx): the
 *      black-and-white working photograph, the problem, and the work around
 *      the work that became ASO.
 *   2. The person and the purpose (components/about/AboutFounder.tsx): the
 *      colour portrait, the founder, what drives ASO, and where it is going.
 *   3. Let's talk (components/about/AboutContact.tsx): the contact details,
 *      shown directly; the footer's Contact Us links here (#contact). About
 *      does not end with a registration action.
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
      <AboutContact />
    </main>
  );
}
