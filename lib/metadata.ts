import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
}

export function buildMetadata({ title, description }: BuildMetadataInput): Metadata {
  const fullTitle = `${title} | AnchorStage Operations`;
  return {
    title: fullTitle,
    description,
    openGraph: { title: fullTitle, description },
    twitter: { title: fullTitle, description },
  };
}
