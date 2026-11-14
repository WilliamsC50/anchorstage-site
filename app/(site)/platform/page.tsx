import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import PlatformHero from "@/components/platform/PlatformHero";
import PlatformLifecycle from "@/components/platform/PlatformLifecycle";
import PlatformOrganizations from "@/components/platform/PlatformOrganizations";
import PlatformRecord from "@/components/platform/PlatformRecord";
import PlatformTools from "@/components/platform/PlatformTools";
import { INTAKE_REGISTER_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import "./platform.css";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "How the ASO connected operations platform works. Organizations own the work, each event is one connected operating record, and purpose-built Workstations operate on the same information.",
});

export default function PlatformPage() {
  return (
    <main className="bg-white">
      <PlatformHero />

      {/* EVENT LIFECYCLE — leads into the Connected Operating Record below */}
      <PlatformLifecycle />

      {/* CONNECTED OPERATING RECORD — a static before-and-after example */}
      <PlatformRecord />

      {/* THE EVENT WORKSTATION AND THE TOOLS AROUND IT */}
      <PlatformTools />

      {/* ORGANIZATIONS: built around your organization, leading into the call to action */}
      <PlatformOrganizations />

      {/* CTA */}
      <ClosingCta
        heading="Set up your organization"
        body="Creating an account is free. Start with your own events and records, and add collaboration when the work calls for it."
        primary={{ label: "Create Your Organization", href: INTAKE_REGISTER_URL }}
        secondary={{ label: "Explore the Network", href: "/network" }}
      />
    </main>
  );
}
