"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";
import { PERSONA_NETWORK_BENEFITS, ASO_NETWORK_VALUE } from "@/lib/network-benefits";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * ASO network map. The whole ecosystem is always visibly connected — every
 * member type links to every other member type, subtly, all the time. The
 * ASO anchor sits at the center as the hub of the network.
 *
 * Interaction: hovering/focusing a role (or the hub) previews it in the
 * benefit panel; clicking locks that selection so the panel stays put when
 * the pointer leaves. Clicking another role moves the lock; clicking the
 * locked role again clears it. The diagram nodes are buttons — navigation
 * to the persona pages lives in the panel link — so a tap on mobile selects
 * without accidentally navigating.
 *
 * Client component: one role can be hovered/selected while several *other*
 * nodes, lines between *other* pairs, and the hub glow all react together.
 * That's a cross-cutting effect CSS :hover/group-hover can't express
 * cleanly — two small useState values instead. No external library.
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

// Hub spokes start at this radius (viewBox units) instead of the exact
// center so no line runs over the anchor logo. The visible anchor artwork
// reaches ~8 units from center at the smallest SVG container, so 10 leaves
// clean breathing room around the logo at every breakpoint.
const SPOKE_START_RADIUS = 10;

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

/**
 * The hub: just the ASO anchor, cleanly centered. Calm by default — the
 * orange glow exists only while the hub itself is previewed or selected,
 * so it reads as deliberate interaction feedback rather than ambience.
 */
function AnchorVisual({ glowing }: { glowing: boolean }) {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          glowing ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.6) 0%, rgba(255,122,26,0.22) 55%, transparent 78%)",
        }}
      />
      <Image
        src="/logos/ASO_Anchor.png"
        alt=""
        width={200}
        height={200}
        className={`relative h-28 w-auto object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-[filter] duration-300 ease-out motion-reduce:transition-none ${
          glowing ? "brightness-110" : "brightness-100"
        }`}
      />
    </div>
  );
}

function BenefitPanel({ active }: { active: ActiveTarget }) {
  if (active === null) {
    return (
      <p className="text-sm text-white/60">
        Select a role to see how ASO connects it to the rest of the network.
      </p>
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
  "cursor-pointer rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy";

export default function NetworkTree() {
  // Locked selection (click/tap) wins over transient hover/focus preview;
  // with neither, the panel shows its default prompt. Locking is what lets
  // the panel survive the pointer leaving the diagram.
  const [locked, setLocked] = useState<ActiveTarget>(null);
  const [hovered, setHovered] = useState<ActiveTarget>(null);
  const active = locked ?? hovered;

  const toggleLock = (target: PersonaSlug | "aso") =>
    setLocked((current) => (current === target ? null : target));

  return (
    <div>
      {/* Desktop / tablet: network map beside its benefit panel */}
      <div className="hidden md:flex md:flex-col lg:flex-row lg:items-stretch lg:gap-10">
        <div className="relative mx-auto aspect-square w-full max-w-lg lg:mx-0 lg:max-w-md lg:shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {PERSONAS.map((persona) => {
              const { angle, radius } = MEMBER_LAYOUT[persona.slug];
              const start = polar(angle, SPOKE_START_RADIUS);
              const pos = polar(angle, radius);
              const lit = isSpokeLit(persona.slug, active);
              return (
                <line
                  key={`hub-${persona.slug}`}
                  x1={start.x}
                  y1={start.y}
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
              aria-pressed={locked === "aso"}
              onMouseEnter={() => setHovered("aso")}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered("aso")}
              onBlur={() => setHovered(null)}
              onClick={() => toggleLock("aso")}
              className={HUB_BUTTON_CLASSES}
            >
              <AnchorVisual glowing={active === "aso"} />
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
              <button
                key={persona.slug}
                type="button"
                aria-pressed={locked === persona.slug}
                onMouseEnter={() => setHovered(persona.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(persona.slug)}
                onBlur={() => setHovered(null)}
                onClick={() => toggleLock(persona.slug)}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide transition-[background-color,border-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy lg:text-[10px] ${stateClasses}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {persona.name}
              </button>
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
          aria-pressed={locked === "aso"}
          onClick={() => toggleLock("aso")}
          className={HUB_BUTTON_CLASSES}
        >
          <AnchorVisual glowing={active === "aso"} />
        </button>

        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {PERSONAS.map((persona) => {
            const selected = active === persona.slug;
            return (
              <button
                key={persona.slug}
                type="button"
                aria-pressed={locked === persona.slug}
                onClick={() => toggleLock(persona.slug)}
                className={`cursor-pointer whitespace-nowrap rounded-full border px-3 py-2 text-center text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy ${
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
