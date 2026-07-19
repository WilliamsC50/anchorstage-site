import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import HeroMedia from "@/components/HeroMedia";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import WorkstationIcon from "@/components/WorkstationIcon";
import { platformHero } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { WORKSTATIONS } from "@/lib/workstations";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "How the ASO connected operations platform works. Organizations own the work, each event is one connected operating record, and purpose-built Workstations operate on the same information.",
});

const ORGANIZATION_POINTS = [
  {
    title: "Every member operates through an organization",
    body: "Your organization is how you and your work are represented on ASO. It might be one professional or a company with a full crew.",
  },
  {
    title: "A one-person organization is complete",
    body: "Working independently gets you the same platform as a large operation. Nothing is held back until you add other people.",
  },
  {
    title: "The organization keeps the work",
    body: "Events start and finish. The events, gear, documents, financial records, media, and history stay with the organization that did the work.",
  },
  {
    title: "Collaboration is optional",
    body: "You can bring in an organization you already work with when a job calls for it. Until then, nothing about the platform waits on anyone else.",
  },
];

export default function PlatformPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Platform"
        title="One operational foundation for your organization"
        lead="AnchorStage Operations is a connected operations platform for live event work. Your organization gets one place where its events, records, and day to day operations live together."
        media={
          // Product shot, not photography. Passed as HeroMedia children so it
          // uses object-contain instead of the default cover: the laptop,
          // tablet, and phone stay whole at any hero height, and object-right
          // seats the tablet against the hero's right edge so the devices read
          // as floating in the navy. No fade — the image already sits on navy,
          // and a fade would dim the screens.
          <HeroMedia className="hidden lg:block absolute inset-y-0 right-0 z-[1] w-[52%] xl:w-[56%] 2xl:w-[58%]">
            <Image
              src={platformHero.src}
              alt={platformHero.alt}
              fill
              priority
              sizes="(min-width: 1536px) 58vw, (min-width: 1280px) 56vw, (min-width: 1024px) 52vw, 100vw"
              className="object-contain object-right"
            />
          </HeroMedia>
        }
      />

      {/* ORGANIZATIONS — heading left, points right, orange tick per point */}
      <Section background="white">
        <div className="grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-5">
              Organizations
            </h2>
            <p className="text-gray-500 leading-relaxed">
              The organization is the root of the platform. It is what owns the work, and
              it is what keeps the work after each event is over.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {ORGANIZATION_POINTS.map((point) => (
              <div key={point.title}>
                <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-4" />
                <h3 className="text-base font-semibold text-aso-navy mb-2.5 leading-snug">
                  {point.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl border-l-2 border-aso-orange pl-6">
          <p className="text-xl text-aso-navy leading-relaxed">
            Events are what an organization does. The organization is what remains.
          </p>
        </div>
      </Section>

      {/* CONNECTED OPERATING RECORD */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">
              The center of the platform
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            The Connected Operating Record
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-5">
            Each event on ASO is one connected operating record. The client, the venue,
            the crew, the gear, the documents, and the money are all part of the same
            record rather than separate files that have to be kept in step by hand.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            That is what makes the rest of the platform work. When something changes on
            an event, it changes for everyone working on it, because they are all
            looking at the same record instead of their own copy of it.
          </p>
        </div>
      </Section>

      {/* WORKSTATIONS */}
      <Section background="bg">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Purpose-built Workstations
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Different work needs different tools, but it does not need different
            information. ASO uses purpose-built Workstations for the different parts of
            running live events. As the platform grows, new Workstations work from the
            same Connected Operating Record.
          </p>
        </div>

        {/* Offset pairs so the set reads as placed panels, not a grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {WORKSTATIONS.map((workstation, i) => (
            <div
              key={workstation.slug}
              className={`group relative aso-panel aso-panel-lift overflow-hidden rounded-xl border border-aso-blue/12 bg-white p-7 ${
                i % 2 === 1 ? "sm:translate-y-6" : ""
              }`}
            >
              {/* Road-case edge: hairline that lights up on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 bg-aso-blue/20 transition-colors group-hover:bg-aso-orange"
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue transition-colors group-hover:text-aso-orange">
                  <WorkstationIcon slug={workstation.slug} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-aso-navy">
                  {workstation.name}
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">{workstation.tagline}</p>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="hidden sm:block h-6" />
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Set up your organization
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Creating an account is free. Start with your own events and records, and add
            collaboration when the work calls for it.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
