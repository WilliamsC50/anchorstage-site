import type { Metadata } from "next";
import MotionPause from "@/components/MotionPause";
import NetworkClosingCta from "@/components/network/NetworkClosingCta";
import NetworkCollaboration from "@/components/network/NetworkCollaboration";
import NetworkDiscovery from "@/components/network/NetworkDiscovery";
import NetworkHero from "@/components/network/NetworkHero";
import NetworkRelationships from "@/components/network/NetworkRelationships";
import { buildMetadata } from "@/lib/metadata";
import "./network.css";

/*
 * Network page (DESIGN-14A.2).
 *
 * Platform = manage your operation. Network = build and maintain
 * professional relationships.
 *
 * ── LAUNCH-DEPENDENT ─────────────────────────────────────────────────────
 * This page describes the founder-approved public-launch experience. The
 * following are NOT verified live in the application (audit DESIGN-14A.1,
 * anchorstage-intake at 26fe499) and must be confirmed before this page ships:
 *   1. Public organization profiles and discovery of organizations that
 *      choose to be discoverable (today: no public profiles, no search).
 *   2. Organization-controlled discoverability, private by default.
 *   3. Self-service invitations between independent organizations, with
 *      acceptance required before any access (today: an ASO admin sets up
 *      collaboration between organizations, and there is no acceptance step).
 *   4. Standing Network connections, voluntary and separate from event
 *      participation (today: none; only ASO-set partner defaults).
 *   5. Invitation onboarding for organizations not yet on ASO.
 * Verified today: per-event collaboration between organizations with access
 * the owner controls (default: event details and messages), and each
 * organization keeping its own records.
 * All visuals are illustrative. Example names are founder supplied and
 * fictional, not real businesses or customers: Your Organization, Northstar
 * Production, Harborlight Venues, Signal Ridge Audio, Summit Event Rentals,
 * Meridian Live Events, Backline Collective, and Event A (DESIGN-14A.3).
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Styling: ./network.css (loaded only on this page).
 */

export const metadata: Metadata = buildMetadata({
  title: "Network",
  path: "/network",
  description:
    "The ASO Network brings the organizations behind your events together: discover collaborators, work together on events without giving up control, and keep professional relationships beyond a single event.",
});

export default function NetworkPage() {
  return (
    <main className="bg-white">
      {/* The hero cards' drift pauses while it is out of view. */}
      <MotionPause target=".network-hero" />
      <NetworkHero />
      <NetworkDiscovery />
      <NetworkCollaboration />
      <NetworkRelationships />
      <NetworkClosingCta />
    </main>
  );
}
