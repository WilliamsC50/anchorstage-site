import type { Metadata } from "next";
import Button from "@/components/Button";
import HeroMedia from "@/components/HeroMedia";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { networkHero } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Network",
  description:
    "What the ASO network means today: persistent relationships between organizations, permissioned collaboration, and shared event participation with scoped access.",
});

const TODAY = [
  {
    title: "Events are a group effort",
    body: "Production companies, venues, freelancers, rental providers, musicians, and organizers already build events together. The network is those working relationships, on the platform where the work actually happens.",
  },
  {
    title: "You bring the people you already trust",
    body: "The organizations you call when a week gets busy are the ones you connect to, and the connection holds after the event is over.",
  },
  {
    title: "The work travels with the relationship",
    body: "The next job with the same organization does not start from an empty inbox. What you did together last time is already there.",
  },
  {
    title: "One version of the event",
    body: "Everyone working the job sees the same event, instead of each company keeping its own copy and reconciling the differences later.",
  },
];

export default function NetworkPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Network"
        title="The people you work with, connected to the work itself"
        lead="ASO is a professional network for live events. What makes it useful today is not a list of strangers. It is that the organizations you already work with are connected to the same operational information you are."
        media={
          <HeroMedia
            className="absolute inset-0 z-[1] lg:left-auto lg:w-[56%] xl:w-[62%] 2xl:w-[66%]"
            fadeLeft
            image={networkHero}
            // The subjects sit centre-left of the frame. Biasing the crop
            // left keeps the key speaker and the right-hand figure in the
            // clear zone while the left figure softens toward the copy, so
            // the conversation reads as leading into the text. The stage
            // stays in frame behind them, recognizable but secondary.
            objectPosition="42% 50%"
            sizes="(min-width: 1536px) 66vw, (min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
          />
        }
      />

      {/* WHAT THE NETWORK MEANS TODAY */}
      <Section background="white">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            What the network means today
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            A live event is almost never built by one company. A venue books the night,
            a production company runs the room, freelancers fill out the crew, and a
            rental house covers the gear. Those working relationships already exist.
            ASO keeps them connected to the work instead of scattered across email
            threads, spreadsheets, and messages.
          </p>
        </div>

        {/* Ledger rows: a connected list rather than four floating cards */}
        <div className="border-t border-aso-blue/15">
          {TODAY.map((item) => (
            <div
              key={item.title}
              className="group grid gap-2 border-b border-aso-blue/15 py-7 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aso-orange"
                />
                <h3 className="text-lg font-semibold text-aso-navy leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed md:pt-0.5">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW ORGANIZATIONS WORK TOGETHER */}
      <Section background="navy" plot>
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            How organizations work together
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            One organization owns an event. When another organization takes part, it is
            added to that event with the access the owner sets.
          </p>
        </div>

        <div className="max-w-3xl space-y-8">
          <div className="border-l-2 border-aso-orange/60 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Primary Collaborator</h3>
            <p className="text-white/70 leading-relaxed">
              The organization doing the operational work alongside the owner. On a job
              you run alone, this is simply your own organization.
            </p>
          </div>
          <div className="border-l-2 border-aso-orange/60 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Participating organizations
            </h3>
            <p className="text-white/70 leading-relaxed">
              Other organizations taking part in the same event, each with their own
              scoped access to the parts of the record they need.
            </p>
          </div>
          <div className="border-l-2 border-aso-orange/60 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Requests between organizations</h3>
            <p className="text-white/70 leading-relaxed">
              Connected organizations can send and receive structured gear requests tied
              to a real event, and an organization can give an approved partner
              visibility into what is available.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mt-14 rounded-xl border border-white/15 bg-white/5 p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange mb-3">
            Long-term direction
          </p>
          <p className="text-white/70 leading-relaxed">
            Live events run on relationships, and the work runs better when those
            relationships stay connected to it. ASO is being built to keep strengthening
            that connection: stronger tools for the operations organizations run every
            week, less friction between the people working the same event, and more of
            the day spent producing events rather than managing the systems around them.
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
            Create your organization, run your own work, and connect the people you
            already work with to it.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
