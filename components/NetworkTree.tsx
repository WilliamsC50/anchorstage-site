import Image from "next/image";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * ASO network visual: anchor hub at the center, six member-type roles
 * branching out from it, and each role's real-world examples branching
 * further out from there. Positions are computed from hand-placed
 * angle/radius pairs (organic, deliberately uneven — not a symmetric
 * hexagon) rather than hand-typed x/y coordinates, so the example fan-out
 * math stays consistent across all six branches.
 *
 * Step 2: full static tree, no hover/focus reveal yet — everything here is
 * always visible. Example nodes are plain text, not links.
 */

const CENTER = { x: 50, y: 50 };

const MEMBER_LAYOUT: Record<PersonaSlug, { angle: number; radius: number }> = {
  freelancers: { angle: -95, radius: 22 },
  "production-companies": { angle: -35, radius: 25 },
  musicians: { angle: 25, radius: 21 },
  venues: { angle: 100, radius: 24 },
  "rental-providers": { angle: 160, radius: 22 },
  "event-organizers": { angle: 205, radius: 25 },
};

// Deterministic per-index radius stagger for the example fan — organic
// irregularity without random values (which would break SSR/client parity).
const RADIUS_JITTER = [0, 3, -2, 4, -1, 2];

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(rad), y: CENTER.y + radius * Math.sin(rad) };
}

function examplePosition(member: { angle: number; radius: number }, count: number, index: number) {
  const spread = Math.min(70, count * 13);
  const angle = count > 1 ? member.angle - spread / 2 + (spread * index) / (count - 1) : member.angle;
  const radius = member.radius + 15 + RADIUS_JITTER[index % RADIUS_JITTER.length];
  return polar(angle, radius);
}

const MEMBER_LINK_CLASSES =
  "whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:border-aso-orange/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy";

const EXAMPLE_CHIP_CLASSES =
  "whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70";

function CogRing() {
  const TICKS = 24;
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 h-full w-full animate-[network-tree-spin_50s_linear_infinite] motion-reduce:animate-none"
      aria-hidden="true"
    >
      {Array.from({ length: TICKS }).map((_, i) => {
        const angle = (360 / TICKS) * i;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 40 * Math.cos(rad);
        const y1 = 50 + 40 * Math.sin(rad);
        const x2 = 50 + 46 * Math.cos(rad);
        const y2 = 50 + 46 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--aso-blue-light)"
            strokeWidth="1.4"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function AnchorHub() {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 scale-150 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.5) 0%, rgba(255,122,26,0.15) 50%, transparent 75%)",
        }}
      />

      <CogRing />

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
  return (
    <div>
      {/* Desktop / tablet: full organic network tree */}
      <div className="hidden w-full overflow-x-auto md:block">
        <div className="relative mx-auto aspect-square min-w-[900px] max-w-5xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {PERSONAS.map((persona) => {
              const member = MEMBER_LAYOUT[persona.slug];
              const memberPos = polar(member.angle, member.radius);
              return (
                <line
                  key={`hub-${persona.slug}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={memberPos.x}
                  y2={memberPos.y}
                  stroke="var(--aso-blue-light)"
                  strokeWidth="0.4"
                  strokeOpacity="0.45"
                />
              );
            })}
            {PERSONAS.flatMap((persona) => {
              const member = MEMBER_LAYOUT[persona.slug];
              const memberPos = polar(member.angle, member.radius);
              return persona.examples.map((example, i) => {
                const pos = examplePosition(member, persona.examples.length, i);
                return (
                  <line
                    key={`branch-${persona.slug}-${example}`}
                    x1={memberPos.x}
                    y1={memberPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="var(--aso-blue-light)"
                    strokeWidth="0.2"
                    strokeOpacity="0.3"
                  />
                );
              });
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <AnchorHub />
          </div>

          {PERSONAS.flatMap((persona) => {
            const member = MEMBER_LAYOUT[persona.slug];
            const memberPos = polar(member.angle, member.radius);
            return [
              <Link
                key={persona.slug}
                href={`/for-members/${persona.slug}`}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${MEMBER_LINK_CLASSES}`}
                style={{ left: `${memberPos.x}%`, top: `${memberPos.y}%` }}
              >
                {persona.name}
              </Link>,
              ...persona.examples.map((example, i) => {
                const pos = examplePosition(member, persona.examples.length, i);
                return (
                  <span
                    key={`${persona.slug}-${example}`}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${EXAMPLE_CHIP_CLASSES}`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    {example}
                  </span>
                );
              }),
            ];
          })}
        </div>
      </div>

      {/* Mobile: simplified stacked branches — no radial diagram */}
      <div className="flex flex-col items-center gap-8 md:hidden">
        <AnchorHub />

        <div className="flex w-full max-w-md flex-col gap-4">
          {PERSONAS.map((persona) => (
            <div key={persona.slug} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <Link href={`/for-members/${persona.slug}`} className={`inline-block ${MEMBER_LINK_CLASSES}`}>
                {persona.name}
              </Link>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {persona.examples.map((example) => (
                  <span key={example} className={EXAMPLE_CHIP_CLASSES}>
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
