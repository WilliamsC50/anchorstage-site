"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";
import { PERSONA_NETWORK_BENEFITS, ASO_NETWORK_VALUE } from "@/lib/network-benefits";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * ASO network map. The whole ecosystem is always visibly connected — every
 * member type links to every other member type, subtly, all the time.
 * Hovering or focusing a member type (or the ASO hub itself) highlights it,
 * brightens the rest of the network, and drives a benefit panel below the
 * diagram explaining what that role gains from the others. No permanent
 * per-role example branches — this is a living map, not a taxonomy.
 *
 * Client component: one role can be hovered while several *other* nodes,
 * lines between *other* pairs, and the hub glow all need to react together.
 * That's a cross-cutting effect CSS :hover/group-hover can't express
 * cleanly without :has() gymnastics — one small useState instead. No
 * external library.
 */

type ActiveTarget = PersonaSlug | "aso" | null;

const CENTER = { x: 50, y: 50 };

// Balanced hexagon (Freelancers top, then clockwise: Production Companies
// upper-right, Musicians lower-right, Venues bottom, Rental Providers
// lower-left, Event Organizers upper-left) with only a few degrees/units
// of jitter per node — close to symmetric, not perfectly uniform.
const MEMBER_LAYOUT: Record<PersonaSlug, { angle: number; radius: number }> = {
  freelancers: { angle: -92, radius: 35 },
  "production-companies": { angle: -28, radius: 38 },
  musicians: { angle: 33, radius: 34 },
  venues: { angle: 88, radius: 36 },
  "rental-providers": { angle: 152, radius: 35 },
  "event-organizers": { angle: -148, radius: 38 },
};

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(rad), y: CENTER.y + radius * Math.sin(rad) };
}

function personaName(slug: PersonaSlug) {
  return PERSONAS.find((p) => p.slug === slug)?.name ?? slug;
}

// Every unique member-to-member pair — the ecosystem is fully connected,
// not a partial graph.
const ALL_PAIRS: [PersonaSlug, PersonaSlug][] = PERSONAS.flatMap((persona, i) =>
  PERSONAS.slice(i + 1).map((other): [PersonaSlug, PersonaSlug] => [persona.slug, other.slug])
);

function isPairLit(a: PersonaSlug, b: PersonaSlug, active: ActiveTarget) {
  if (active === "aso") return true;
  if (active === null) return false;
  return active === a || active === b;
}

function isSpokeLit(slug: PersonaSlug, active: ActiveTarget) {
  return active === "aso" || active === slug;
}

const LINE_TRANSITION_CLASSES =
  "transition-[stroke,stroke-opacity,stroke-width] duration-300 ease-out motion-reduce:transition-none";

function AnchorVisual({ engaged, targeted }: { engaged: boolean; targeted: boolean }) {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 rounded-full blur-2xl transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          engaged ? "scale-[1.7] opacity-100" : "scale-150 opacity-75"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.55) 0%, rgba(255,122,26,0.18) 50%, transparent 75%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[154px] w-[154px]">
          <Image
            src="/images/cogwheel.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="154px"
            className={`pointer-events-none select-none object-contain animate-[network-tree-spin_50s_linear_infinite] transition-opacity duration-300 ease-out motion-reduce:animate-none motion-reduce:transition-none ${
              engaged ? "opacity-90" : "opacity-55"
            }`}
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 bg-white/5 shadow-lg transition-colors duration-200 ease-out motion-reduce:transition-none ${
          targeted ? "border-aso-orange" : "border-white/20"
        }`}
      >
        <Image
          src="/logos/aso-picture-logo.png"
          alt=""
          width={200}
          height={176}
          // The source PNG's opaque anchor artwork isn't centered in its own
          // canvas (measured ~4% right, ~4% up of the image's true center),
          // so this offsets the horizontal drift, plus a small intentional
          // upward bias for optical balance at the larger display size.
          style={{ transform: "translate(-3px, -1px)" }}
          className={`h-[75px] w-auto object-contain transition-[filter] duration-300 ease-out motion-reduce:transition-none ${
            engaged ? "brightness-110" : "brightness-100"
          }`}
        />
      </div>
    </div>
  );
}

function BenefitPanel({ active }: { active: ActiveTarget }) {
  if (active === null) {
    return (
      <p className="text-sm text-white/60">Hover a role to see how ASO connects it to the rest of the network.</p>
    );
  }

  if (active === "aso") {
    return (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-aso-orange">ASO</p>
        <p className="text-sm leading-relaxed text-white/80">{ASO_NETWORK_VALUE}</p>
      </div>
    );
  }

  const persona = PERSONAS.find((p) => p.slug === active);
  if (!persona) return null;

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-white">ASO connects {persona.name} with:</p>
      <dl className="space-y-2">
        {PERSONA_NETWORK_BENEFITS[active].map((entry) => (
          <div key={entry.from} className="flex flex-wrap items-baseline gap-x-1.5">
            <dt className="shrink-0 text-xs font-semibold text-aso-orange">{personaName(entry.from)}:</dt>
            <dd className="text-xs leading-snug text-white/70">{entry.benefit}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">
        <Link
          href={`/for-members/${persona.slug}`}
          className="text-xs font-medium text-aso-orange transition-colors hover:text-white"
        >
          See how ASO helps {persona.singularName} →
        </Link>
      </div>
    </div>
  );
}

const HUB_BUTTON_CLASSES =
  "rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy";

export default function NetworkTree() {
  const [active, setActive] = useState<ActiveTarget>(null);

  return (
    <div>
      {/* Desktop / tablet: network map beside its benefit panel */}
      <div className="hidden md:flex md:flex-col lg:flex-row lg:items-stretch lg:gap-10">
        <div className="relative mx-auto aspect-square w-full max-w-lg lg:mx-0 lg:max-w-md lg:shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {PERSONAS.map((persona) => {
              const pos = polar(MEMBER_LAYOUT[persona.slug].angle, MEMBER_LAYOUT[persona.slug].radius);
              const lit = isSpokeLit(persona.slug, active);
              return (
                <line
                  key={`hub-${persona.slug}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={pos.x}
                  y2={pos.y}
                  className={LINE_TRANSITION_CLASSES}
                  stroke={lit ? "var(--aso-orange)" : "var(--aso-blue-light)"}
                  strokeWidth={lit ? 0.5 : 0.18}
                  strokeOpacity={lit ? 0.6 : 0.1}
                />
              );
            })}
            {ALL_PAIRS.map(([a, b]) => {
              const posA = polar(MEMBER_LAYOUT[a].angle, MEMBER_LAYOUT[a].radius);
              const posB = polar(MEMBER_LAYOUT[b].angle, MEMBER_LAYOUT[b].radius);
              const lit = isPairLit(a, b, active);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={posA.x}
                  y1={posA.y}
                  x2={posB.x}
                  y2={posB.y}
                  className={LINE_TRANSITION_CLASSES}
                  stroke={lit ? "var(--aso-orange)" : "var(--aso-blue-light)"}
                  strokeWidth={lit ? 0.3 : 0.07}
                  strokeOpacity={lit ? 0.5 : 0.05}
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              aria-label="About the ASO network"
              onMouseEnter={() => setActive("aso")}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive("aso")}
              onBlur={() => setActive(null)}
              className={HUB_BUTTON_CLASSES}
            >
              <AnchorVisual engaged={active !== null} targeted={active === "aso"} />
            </button>
          </div>

          {PERSONAS.map((persona) => {
            const pos = polar(MEMBER_LAYOUT[persona.slug].angle, MEMBER_LAYOUT[persona.slug].radius);
            const isSelf = active === persona.slug;
            const isBrightened = active !== null && !isSelf;

            let stateClasses = "border-white/15 bg-black/25 text-white/90";
            if (isSelf) {
              stateClasses = "border-aso-orange bg-aso-orange text-white shadow-[0_0_14px_rgba(255,122,26,0.5)]";
            } else if (isBrightened) {
              stateClasses = "border-white/35 bg-white/10 text-white";
            }

            return (
              <Link
                key={persona.slug}
                href={`/for-members/${persona.slug}`}
                onMouseEnter={() => setActive(persona.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(persona.slug)}
                onBlur={() => setActive(null)}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide transition-[background-color,border-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy lg:text-[10px] ${stateClasses}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {persona.name}
              </Link>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 lg:mt-0 lg:flex lg:h-full lg:flex-1 lg:flex-col lg:justify-center"
        >
          <BenefitPanel active={active} />
        </div>
      </div>

      {/* Mobile: tap-to-select roles, same benefit panel, no hover */}
      <div className="flex flex-col items-center gap-6 md:hidden">
        <button
          type="button"
          aria-label="About the ASO network"
          aria-pressed={active === "aso"}
          onClick={() => setActive((current) => (current === "aso" ? null : "aso"))}
          className={HUB_BUTTON_CLASSES}
        >
          <AnchorVisual engaged={active !== null} targeted={active === "aso"} />
        </button>

        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {PERSONAS.map((persona) => {
            const selected = active === persona.slug;
            return (
              <button
                key={persona.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive((current) => (current === persona.slug ? null : persona.slug))}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-center text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy ${
                  selected ? "border-aso-orange bg-aso-orange text-white" : "border-white/25 bg-white/10 text-white"
                }`}
              >
                {persona.name}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="min-h-[140px] w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <BenefitPanel active={active} />
        </div>
      </div>
    </div>
  );
}
