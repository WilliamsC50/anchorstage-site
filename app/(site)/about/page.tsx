import type { Metadata } from "next";
import Image from "next/image";
import ClosingCta from "@/components/ClosingCta";
import ContactCta from "@/components/ContactCta";
import HeroMedia from "@/components/HeroMedia";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { aboutHero, founderHeadshot } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Why AnchorStage Operations exists, who is building it, and where it is going. Built from years of real live event work in Central Florida, not from a pitch deck.",
});

const PRINCIPLES = [
  {
    title: "Multiply professionals",
    body: "Help experienced people spend more time making decisions and less time managing the administration around them.",
  },
  {
    title: "One source of truth",
    body: "Critical event information should be there when it is needed, whether someone is building marketing graphics, checking a schedule, sharing a stage plot, or requesting more equipment.",
  },
  {
    title: "Built alongside the industry",
    body: "Every feature starts as a real operational problem before it becomes part of the platform.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="About"
        title="Why ASO exists"
        lead="AnchorStage Operations was built from years of solving real operational problems in live events. Not from a pitch deck, and not from a software roadmap. Every part of it begins with the way professionals actually work."
        media={
          // Same treatment as the Home and Network heroes: photograph covering
          // the band, flush-right, blended into the navy by the shared fade.
          // The single subject sits centre-right, so the crop is biased that
          // way (52% horizontal) and lifted a little (45% vertical) to keep
          // his head and working posture in frame while the gear on the left
          // dissolves under the copy.
          <HeroMedia
            className="absolute inset-0 z-[1] lg:left-auto lg:w-[56%] xl:w-[62%] 2xl:w-[66%]"
            fadeLeft
            image={aboutHero}
            objectPosition="52% 45%"
            sizes="(min-width: 1536px) 66vw, (min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
          />
        }
        footer={
          <div className="mt-8 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-white/25" />
            <div>
              <p className="text-sm font-semibold text-white">Cody Williams</p>
              <p className="text-sm text-white/60">Founder &amp; Live Event Operator</p>
            </div>
          </div>
        }
      />

      {/* WHY ASO EXISTS: the opening story */}
      <Section background="bg" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            The problem was time, not talent
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            ASO was built because talented people were turning down work. Not because they
            lacked the experience to do it, but because they had run out of time to take it
            on.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            The professionals making the biggest decisions on an event were also the ones
            buried in phone calls, paperwork, document requests, graphics, coordination,
            and administrative work. The parts of the job that only they could do were
            competing with the parts almost anyone could.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            ASO exists to give that time back, so experienced people spend more of it on
            the work that actually needs them.
          </p>
        </div>
      </Section>

      {/* BUILT FROM THE INDUSTRY: the Origin concept, refocused */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Built from the industry
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            ASO started inside a working production operation in Central Florida, running
            sound, staging, and lighting for venues, festivals, and private events. It was
            not planned as a product. It grew out of the job.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Every event exposed another operational problem. Organizing equipment. Sharing
            stage plots. Keeping event information current as it changed. Handling
            last-minute support requests. Producing marketing assets. Coordinating between
            organizations working the same show.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            None of these were show problems. They were the work around the work, and they
            added up. One by one, those solutions became the foundation of ASO.
          </p>
        </div>
      </Section>

      {/* PHILOSOPHY: three principles */}
      <Section background="bg" plot>
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Philosophy
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            A few ideas shape how the platform is built. They are simple on purpose, and
            they are what every decision gets checked against.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title}>
              <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-4" />
              <h3 className="text-base font-semibold text-aso-navy mb-2.5 leading-snug">
                {principle.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MISSION */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Mission</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Help live event professionals spend less time managing information and more
            time producing exceptional events. Everything on the platform is measured
            against that.
          </p>
        </div>
      </Section>

      {/* VISION: Current vs Future, kept honest */}
      <Section background="bg" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Where it is going
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            The near-term work is depth. Making the operations an organization runs every
            week faster and more reliable than the tools it is replacing.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Longer term, ASO is being built so organizations and professionals can find
            the right industry relationships through the network itself. That is a
            direction, not a promise, and the site will keep saying so until it ships.
          </p>
        </div>
      </Section>

      {/* FOUNDER: modest, not the focus */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Image
              src={founderHeadshot.src}
              width={founderHeadshot.width}
              height={founderHeadshot.height}
              alt={founderHeadshot.alt}
              sizes="160px"
              className="h-40 w-40 shrink-0 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Cody Williams
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">
                Founder &amp; Live Event Operator
              </p>
            </div>
          </div>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Cody still works live events while building ASO, and that is the point. The
            platform grows alongside real production work, so the major workflows are
            shaped by practical experience before they become product features.
          </p>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            What ships reflects how the job actually runs.
          </p>
        </div>
      </Section>

      {/* CLOSING */}
      <Section background="bg" plot>
        <div className="max-w-3xl border-l-2 border-aso-orange pl-6">
          <p className="text-xl md:text-2xl text-aso-navy leading-relaxed">
            ASO was not designed around a business plan. It was shaped by what live event
            work actually requires, and it will keep changing alongside the professionals
            who run it.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <ClosingCta
        heading="Join free"
        body="Create your organization and see whether it fits the way you already work."
        primary={{ label: AUTH_NAV.join.label, href: AUTH_NAV.join.href }}
        secondary={<ContactCta />}
      />
    </main>
  );
}
