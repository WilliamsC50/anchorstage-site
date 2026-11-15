import type { Metadata } from "next";
import { ogDefault } from "./images";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/platform". Resolved against metadataBase in app/layout.tsx. */
  path: string;
}

const SITE_NAME = "AnchorStage Ops";

// Per-page metadata for every page except Home (whose title and social
// preview are the root layout's own).
//
// Next merges metadata shallowly: a page that sets openGraph or twitter
// replaces the layout's object whole. So each page's preview carries the full
// set here (type, site name, URL, and the site's default share image), not
// just a title and description. Canonical and og:url are relative and resolve
// against metadataBase (https://anchorstageops.com).
export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [
        {
          url: ogDefault.src,
          width: ogDefault.width,
          height: ogDefault.height,
          alt: ogDefault.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogDefault.src],
    },
  };
}
