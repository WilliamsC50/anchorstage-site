import type { Metadata } from "next";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Network",
  description: "Page in development.",
});

export default function NetworkPage() {
  return (
    <main className="bg-white text-gray-900">
      <Section>
        <h1 className="text-4xl font-bold text-aso-navy">Network</h1>
        <p className="text-gray-500 mt-4">Page content in development.</p>
      </Section>
    </main>
  );
}
