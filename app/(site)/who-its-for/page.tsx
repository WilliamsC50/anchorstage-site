import type { Metadata } from "next";
import ClosingCta from "@/components/ClosingCta";
import HeroMedia from "@/components/HeroMedia";
import PageHeader from "@/components/PageHeader";
import PersonaIcon from "@/components/PersonaIcon";
import Section from "@/components/Section";
import { whoItsForHero } from "@/lib/images";
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
        media={
          // Same treatment as the Home hero: a photographic montage covering
          // the band, flush-right, blended into the navy by the shared fade.
          // The montage is a uniform grid with no single subject, so the crop
          // is centred.
          <HeroMedia
            className="absolute inset-0 z-[1] lg:left-auto lg:w-[56%] xl:w-[62%] 2xl:w-[66%]"
            fadeLeft
            image={whoItsForHero}
            objectPosition="50% 50%"
            sizes="(min-width: 1536px) 66vw, (min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
          />
        }
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

      {/* WHAT EVERYONE SHARES — navy narrative bridge into the CTA */}
      <Section background="navy" plot>
        <div className="max-w-3xl">
          <span aria-hidden="true" className="block h-px w-8 bg-aso-orange mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            What everyone shares
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Six kinds of work, one thing in common. Everyone here operates through their
            own organization, on their own terms. ASO does not fold you into one larger
            company or ask you to work the way someone else does.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            You get value from the first day, before anyone else you know has joined. As
            more of the industry comes on, independent organizations start working
            together on a shared network without giving up what makes each of them their
            own.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <ClosingCta
        heading="Join free"
        body="Create your organization and start running your work through it. Membership is free, and you can begin on your own today."
        primary={{ label: AUTH_NAV.join.label, href: AUTH_NAV.join.href }}
        secondary={{ label: "See how it works", href: "/platform" }}
      />
    </main>
  );
}
