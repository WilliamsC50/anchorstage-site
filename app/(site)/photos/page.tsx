import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Production photos from live events handled by AnchorStage Operations LLC — outdoor stages, venue shows, and live music in Central Florida.",
};

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

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { src: "/images/proof-4.jpg",  alt: "Live event production setup" },
            { src: "/images/proof-5.jpg",  alt: "Stage and lighting at a live show" },
            { src: "/images/proof-6.jpg",  alt: "Sound production at a venue event" },
            { src: "/images/proof-7.jpg",  alt: "Outdoor stage production" },
            { src: "/images/proof-9.jpg",  alt: "Live music production" },
            { src: "/images/proof-10.jpg", alt: "Event lighting and stage setup" },
            { src: "/images/proof-11.jpg", alt: "Production crew on site" },
            { src: "/images/proof-12.jpg", alt: "Venue live event" },
            { src: "/images/proof-13.jpg", alt: "AnchorStage event production" },
          ].map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-video rounded-lg overflow-hidden bg-gray-900"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
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
