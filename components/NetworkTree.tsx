"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * ASO network map: the anchor hub at the center, six member-type roles
 * around it. Default state is a clean map — hub, six nodes, quiet spokes,
 * no permanent clutter. Hovering or focusing a member type highlights it,
 * brightens the *other* member types it actually connects with (per
 * relatedPersonas), illuminates the connecting lines between them, and
 * surfaces a few of that role's real-world examples as small supporting
 * labels — never as a permanent branch structure.
 *
 * This needs client-side state rather than pure CSS: hovering one member
 * node has to affect *other* sibling nodes, the lines between *other*
 * pairs, and a hub glow that lives elsewhere in the tree — relationships
 * CSS :hover/group-hover can't express without matching some of Tailwind's
 * newer :has()-based tricks that are far more fragile than one small
 * useState. No external library — just React's own state.
 */

const CENTER = { x: 50, y: 50 };

// Organic, deliberately uneven angles/radii — not a symmetric hexagon.
const MEMBER_LAYOUT: Record<PersonaSlug, { angle: number; radius: number }> = {
  freelancers: { angle: -95, radius: 32 },
  "production-companies": { angle: -35, radius: 35 },
  musicians: { angle: 25, radius: 30 },
  venues: { angle: 100, radius: 34 },
  "rental-providers": { angle: 160, radius: 31 },
  "event-organizers": { angle: 205, radius: 35 },
};

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(rad), y: CENTER.y + radius * Math.sin(rad) };
}

function personaName(slug: PersonaSlug) {
  return PERSONAS.find((p) => p.slug === slug)?.name ?? slug;
}

// Each unordered member-to-member pair drawn exactly once, derived from
// relatedPersonas rather than hand-listed (the data is symmetric).
const CONNECTION_PAIRS: [PersonaSlug, PersonaSlug][] = (() => {
  const seen = new Set<string>();
  const pairs: [PersonaSlug, PersonaSlug][] = [];
  for (const persona of PERSONAS) {
    for (const related of persona.relatedPersonas) {
      const key = [persona.slug, related].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push([persona.slug, related]);
      }
    }
  }
  return pairs;
})();

function CogRing({ active }: { active: boolean }) {
  const TICKS = 20;
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute inset-0 h-full w-full animate-[network-tree-spin_50s_linear_infinite] transition-opacity duration-300 ease-out motion-reduce:animate-none motion-reduce:transition-none ${
        active ? "opacity-90" : "opacity-55"
      }`}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--aso-blue-light)" strokeWidth="0.6" strokeOpacity="0.3" />
      {Array.from({ length: TICKS }).map((_, i) => {
        const angle = (360 / TICKS) * i;
        const rad = (angle * Math.PI) / 180;
        const outer = i % 2 === 0 ? 47 : 44;
        return (
          <line
            key={i}
            x1={50 + 40 * Math.cos(rad)}
            y1={50 + 40 * Math.sin(rad)}
            x2={50 + outer * Math.cos(rad)}
            y2={50 + outer * Math.sin(rad)}
            stroke="var(--aso-blue-light)"
            strokeWidth="1.6"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function AnchorHub({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 rounded-full blur-2xl transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          active ? "scale-[1.7] opacity-100" : "scale-150 opacity-75"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.55) 0%, rgba(255,122,26,0.18) 50%, transparent 75%)",
        }}
      />

      <CogRing active={active} />

      <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 shadow-lg">
        <Image
          src="/logos/aso-picture-logo.png"
          alt="AnchorStage Operations anchor mark"
          width={200}
          height={176}
          className="h-20 w-auto object-contain"
        />
      </div>
    </div>
  );
}

export default function NetworkTree() {
  const [activeSlug, setActiveSlug] = useState<PersonaSlug | null>(null);
  const activePersona = activeSlug ? PERSONAS.find((p) => p.slug === activeSlug) ?? null : null;
  const activeRelated = activePersona ? new Set(activePersona.relatedPersonas) : null;

  return (
    <div>
      {/* Desktop / tablet: interactive network map */}
      <div className="hidden w-full overflow-x-auto md:block">
        <div className="relative mx-auto aspect-square min-w-[700px] max-w-3xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {PERSONAS.map((persona) => {
              const layout = MEMBER_LAYOUT[persona.slug];
              const pos = polar(layout.angle, layout.radius);
              const isActive = activeSlug === persona.slug;
              return (
                <line
                  key={`hub-${persona.slug}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={pos.x}
                  y2={pos.y}
                  className="transition-[stroke,stroke-opacity,stroke-width] duration-300 ease-out motion-reduce:transition-none"
                  stroke={isActive ? "var(--aso-orange)" : "var(--aso-blue-light)"}
                  strokeWidth={isActive ? 0.7 : 0.4}
                  strokeOpacity={isActive ? 0.9 : 0.4}
                />
              );
            })}

            {CONNECTION_PAIRS.map(([a, b]) => {
              const posA = polar(MEMBER_LAYOUT[a].angle, MEMBER_LAYOUT[a].radius);
              const posB = polar(MEMBER_LAYOUT[b].angle, MEMBER_LAYOUT[b].radius);
              const lit = activeSlug === a || activeSlug === b;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={posA.x}
                  y1={posA.y}
                  x2={posB.x}
                  y2={posB.y}
                  className="transition-[stroke,stroke-opacity,stroke-width] duration-300 ease-out motion-reduce:transition-none"
                  stroke={lit ? "var(--aso-orange)" : "var(--aso-blue-light)"}
                  strokeWidth={lit ? 0.5 : 0.2}
                  strokeOpacity={lit ? 0.75 : 0.12}
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <AnchorHub active={activeSlug !== null} />
          </div>

          {PERSONAS.map((persona) => {
            const layout = MEMBER_LAYOUT[persona.slug];
            const pos = polar(layout.angle, layout.radius);
            const isSelf = activeSlug === persona.slug;
            const isRelated = activeRelated?.has(persona.slug) ?? false;
            const labelsBelow = pos.y < 50;

            let stateClasses = "border-white/25 bg-white/10 text-white";
            if (isSelf) {
              stateClasses = "border-aso-orange bg-aso-orange text-white shadow-[0_0_14px_rgba(255,122,26,0.5)]";
            } else if (isRelated) {
              stateClasses = "border-white/60 bg-white/25 text-white";
            }

            return (
              <div
                key={persona.slug}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <Link
                  href={`/for-members/${persona.slug}`}
                  onMouseEnter={() => setActiveSlug(persona.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(persona.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className={`block whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy sm:text-sm ${stateClasses}`}
                >
                  {persona.name}
                  <span className="sr-only">
                    {" "}
                    Connects with {persona.relatedPersonas.map(personaName).join(", ")}.
                  </span>
                </Link>

                {isSelf && (
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 ${
                      labelsBelow ? "top-full mt-2" : "bottom-full mb-2"
                    }`}
                  >
                    {persona.examples.slice(0, 3).map((example) => (
                      <span key={example} className="flex items-center gap-1.5 whitespace-nowrap text-[9px] font-medium text-white/60">
                        <span className="h-1 w-1 rounded-full bg-aso-orange" />
                        {example}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: simplified static layout — no hover network */}
      <div className="flex flex-col items-center gap-6 md:hidden">
        <AnchorHub active={false} />

        <p className="max-w-xs text-center text-sm text-white/60">
          Every role connects to the others through ASO.
        </p>

        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {PERSONAS.map((persona) => (
            <Link
              key={persona.slug}
              href={`/for-members/${persona.slug}`}
              className="whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:border-aso-orange/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy"
            >
              {persona.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
