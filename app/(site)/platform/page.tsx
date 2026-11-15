import type { Metadata } from "next";
import PlatformClosingCta from "@/components/platform/PlatformClosingCta";
import PlatformHero from "@/components/platform/PlatformHero";
import PlatformLifecycle from "@/components/platform/PlatformLifecycle";
import PlatformOrganizations from "@/components/platform/PlatformOrganizations";
import PlatformRecord from "@/components/platform/PlatformRecord";
import PlatformTools from "@/components/platform/PlatformTools";
import { buildMetadata } from "@/lib/metadata";
import "./platform.css";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  path: "/platform",
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

      {/* CLOSING CALL TO ACTION: Platform only (the shared ClosingCta closes other pages) */}
      <PlatformClosingCta />
    </main>
  );
}
