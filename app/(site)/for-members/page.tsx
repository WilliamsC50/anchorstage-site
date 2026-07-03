import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { PERSONAS } from "@/lib/personas";

export const metadata: Metadata = buildMetadata({
  title: "For Members",
  description: "Page in development.",
});

export default function ForMembersPage() {
  return (
    <main className="bg-white text-gray-900">
      <Section>
        <h1 className="text-4xl font-bold text-aso-navy">For Members</h1>
        <p className="text-gray-500 mt-4 mb-8">Page content in development.</p>

        <ul className="grid sm:grid-cols-2 gap-4">
          {PERSONAS.map((persona) => (
            <li key={persona.slug}>
              <Link
                href={`/for-members/${persona.slug}`}
                className="block rounded-xl border border-gray-100 p-5 text-sm font-medium text-aso-navy hover:shadow-md transition-shadow"
              >
                {persona.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
