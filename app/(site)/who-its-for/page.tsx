import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import PersonaIcon from "@/components/PersonaIcon";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/metadata";
import { AUTH_NAV } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";

export const metadata: Metadata = buildMetadata({
  title: "Who It's For",
  description:
    "ASO is built for freelancers, production companies, venues, event organizers, musicians, and rental providers. See the operational problem it solves for each of them.",
});

export default function WhoItsForPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Who It's For"
        title="Built for the people who make live events happen"
        lead="Everyone on ASO operates through their own organization, whether that is one person or a company with a full crew. Here is what that looks like depending on the work you do."
      />

      <Section background="bg" plot>
        {/* Right column sits low so the pairs read as placed panels */}
        <div className="grid gap-5 lg:grid-cols-2">
          {PERSONAS.map((persona, i) => (
            <article
              key={persona.slug}
              className={`group aso-panel aso-panel-lift relative overflow-hidden rounded-xl border border-aso-blue/12 bg-white p-7 md:p-8 ${
                i % 2 === 1 ? "lg:translate-y-10" : ""
              }`}
            >
              {/* Credential-tag edge */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 bg-aso-blue/20 transition-colors group-hover:bg-aso-orange"
              />

              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue transition-colors group-hover:text-aso-orange">
                  <PersonaIcon slug={persona.slug} className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold text-aso-navy tracking-tight">
                  {persona.name}
                </h2>
              </div>

              <p className="font-mono text-[11px] leading-relaxed text-gray-400 mb-5">
                {persona.examples}
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">{persona.whoTheyAre}</p>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2">
                  The problem
                </p>
                <p className="text-gray-500 leading-relaxed">{persona.problem}</p>
              </div>

              <div className="border-l-2 border-aso-orange pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange-ink mb-2">
                  How ASO helps
                </p>
                <p className="text-gray-600 leading-relaxed">{persona.support}</p>
              </div>
            </article>
          ))}
        </div>
        <div aria-hidden="true" className="hidden lg:block h-10" />
      </Section>

      {/* CTA */}
      <Section background="navy">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Whichever one you are, you start the same way
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            Create your organization and run your work through it. Membership is free,
            and you do not need anyone else on the platform to get value from it.
          </p>
          <Button href={AUTH_NAV.join.href}>{AUTH_NAV.join.label}</Button>
        </div>
      </Section>
    </main>
  );
}
