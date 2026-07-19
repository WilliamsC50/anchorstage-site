import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";

export const metadata: Metadata = buildMetadata({
  title: "Network",
  description:
    "What the ASO network means today: persistent relationships between organizations, permissioned collaboration, and shared event participation with scoped access.",
});

const TODAY = [
  {
    title: "Relationships that persist",
    body: "A working relationship between two organizations is not rebuilt for every job. Once it exists, the next event starts from it.",
  },
  {
    title: "Permissioned membership",
    body: "Professionals reach an organization's work through membership that is granted, not assumed. Joining an organization is approved by that organization.",
  },
  {
    title: "Scoped access",
    body: "When you bring another organization onto an event, you decide what they can see and change. Access is specific rather than all or nothing.",
  },
  {
    title: "Shared event participation",
    body: "Organizations working the same event work on the same connected operating record, so nobody is acting on a stale copy.",
  },
];

export default function NetworkPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Network"
        title="The people you work with, connected to the work itself"
        lead="ASO is a professional network for live events. What makes it useful today is not a list of strangers. It is that the organizations you already work with are connected to the same operational information you are."
      />

      {/* WHAT THE NETWORK MEANS TODAY */}
      <Section background="white">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            What the network means today
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            In most of this industry, a working relationship lives in someone&apos;s
            contacts and a long email thread. On ASO it is part of how the work runs.
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
