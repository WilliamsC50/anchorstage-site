import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { PERSONAS } from "@/lib/personas";

type Props = {
  params: Promise<{ persona: string }>;
};

export function generateStaticParams() {
  return PERSONAS.map((persona) => ({ persona: persona.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona: slug } = await params;
  const persona = PERSONAS.find((p) => p.slug === slug);

  return buildMetadata({
    title: persona ? persona.name : "For Members",
    description: "Page in development.",
  });
}

export default async function PersonaPage({ params }: Props) {
  const { persona: slug } = await params;
  const persona = PERSONAS.find((p) => p.slug === slug);

  if (!persona) {
    notFound();
  }

  return (
    <main className="bg-white text-gray-900">
      <Section>
        <h1 className="text-4xl font-bold text-aso-navy">{persona.name}</h1>
        <p className="text-gray-500 mt-4">Page content in development.</p>
      </Section>
    </main>
  );
}
