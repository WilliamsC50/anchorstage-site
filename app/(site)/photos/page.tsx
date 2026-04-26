import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Production photos from live events handled by AnchorStage Operations LLC — outdoor stages, venue shows, and live music in Central Florida.",
};

const GALLERY = [
  {
    src: "/images/proof-4.jpg",
    alt: "Outdoor stage setup with lighting and audio support",
    caption: "Outdoor stage setup with lighting and audio support.",
  },
  {
    src: "/images/proof-5.jpg",
    alt: "Stage and lighting prepared for a live music event",
    caption: "Stage and lighting prepared for a live music event.",
  },
  {
    src: "/images/proof-6.jpg",
    alt: "Live sound production at a Central Florida venue",
    caption: "Live sound production at a Central Florida venue.",
  },
  {
    src: "/images/proof-7.jpg",
    alt: "Outdoor stage production with full PA and lighting",
    caption: "Outdoor stage production with full PA and lighting.",
  },
  {
    src: "/images/proof-9.jpg",
    alt: "Live event production setup for a local show",
    caption: "Live event production setup for a local show.",
  },
  {
    src: "/images/proof-10.jpg",
    alt: "Stage lighting and performance area configured for a live event",
    caption: "Stage lighting and performance area configured for a live event.",
  },
  {
    src: "/images/proof-11.jpg",
    alt: "On-site production crew setting up for a show",
    caption: "On-site production crew setting up for a show.",
  },
  {
    src: "/images/proof-12.jpg",
    alt: "Venue event production with stage and audio support",
    caption: "Venue event production with stage and audio support.",
  },
  {
    src: "/images/proof-13.jpg",
    alt: "Production support setup with stage, lighting, and PA elements",
    caption: "Production support setup with stage, lighting, and PA elements.",
  },
];

export default function Photos() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          Photos
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Live music, outdoor stages, venue shows, and community events — a look at
          production setups and real events we&apos;ve been a part of.
        </p>
      </section>

      {/* GALLERY INTRO */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          These photos show real event setups and stage/production work from shows
          supported through AnchorStage and CFAV-related production. Setups range
          from compact venue shows to larger outdoor stages across Central Florida.
        </p>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {GALLERY.map(({ src, alt, caption }) => (
            <div key={src} className="flex flex-col gap-2">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: "var(--aso-navy)" }}
          >
            Work with us on your next event
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
            Start with the intake form and we&apos;ll follow up with a plan.
          </p>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Start Your Event
          </a>
        </div>
      </section>

    </main>
  );
}
