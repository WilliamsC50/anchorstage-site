import type { MetadataRoute } from "next";

// Only the five canonical marketing pages plus the two legal pages.
// Retired routes are permanently redirected in next.config.ts and must not
// appear here.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anchorstageops.com";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/platform`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/network`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/who-its-for`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
