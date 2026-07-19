import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Why AnchorStage Operations exists, who is building it, and where it is going. Built from real live event production work in Central Florida.",
});

export default function AboutPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="About"
        title="Why ASO exists"
        lead="AnchorStage Operations was built by someone running live events, in response to problems that show up on every job and never get solved by another spreadsheet."
      />

      {/* ORIGIN */}
      <Section background="white">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">Origin</h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            ASO started inside a working production operation in Central Florida, running
            sound, staging, and lighting for venues, festivals, and private events. The
            recurring problem was never the show itself. It was that the information
            needed to run the show was scattered across tools that did not know about
            each other, and it got worse every time another company joined the job.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Working alongside other production companies made the gap obvious. Two
            organizations on the same event had no shared source of truth, only their own
            versions of it. ASO was built to close that gap.
          </p>
        </div>
      </Section>

      {/* MISSION */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Mission</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Give live event professionals one place to run their operations, and connect
            that work to the organizations they do it with. Every organization should own
            its own record of what it has done, and should be able to work with others
            without losing it.
          </p>
        </div>
      </Section>

      {/* BUILT FROM REAL WORK */}
      <Section background="white">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Built from real live event work
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            Every part of ASO comes from a job where something went wrong for a reason
            that could have been prevented. Gear committed to two events on the same
            night. A quote that did not match the crew that actually worked. A venue
            running last week&apos;s schedule on the screen by the door.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            That is also why the platform is honest about what it does not do yet. It is
            built in the order the work demands, not in the order that makes for a longer
            feature list.
          </p>
        </div>
      </Section>

      {/* LONG-TERM DIRECTION */}
      <Section background="bg" plot>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Where it is going
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">
            The near-term work is depth: making the operations an organization runs every
            week faster and more reliable than the tools it is replacing.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Longer term, ASO is being structured so organizations and professionals can
            find the right industry relationships through the network itself. That is a
            direction rather than a promise, and the site will say so until it ships.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            Join free
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Create your organization and see whether it fits the way you already work.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
