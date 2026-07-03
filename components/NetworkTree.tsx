import Image from "next/image";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * Base ASO network visual: the anchor mark at the center, six member-type
 * roles around it. Hand-placed, deliberately uneven angles and radii — an
 * organic cluster, not a perfect hexagon or flowchart. Values are percent
 * coordinates in a shared 0-100 square, used by both the connecting-line
 * SVG and the node links themselves.
 *
 * Step 1 only: no example branches, no hover/focus reveal layer yet.
 */
const MEMBER_POSITIONS: Record<PersonaSlug, { x: number; y: number }> = {
  freelancers: { x: 46.7, y: 12.1 },
  "production-companies": { x: 84.4, y: 25.9 },
  musicians: { x: 82.6, y: 65.2 },
  venues: { x: 43.1, y: 89.4 },
  "rental-providers": { x: 15.2, y: 62.7 },
  "event-organizers": { x: 12.8, y: 32.7 },
};

const NODE_LINK_CLASSES =
  "rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white transition-colors hover:border-aso-orange/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy";

function AnchorGlow() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 scale-[2.4] rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.55) 0%, rgba(255,122,26,0.15) 50%, transparent 75%)",
        }}
      />
      <Image
        src="/logos/aso-picture-logo.png"
        alt="AnchorStage Operations anchor mark"
        width={80}
        height={71}
        className="h-16 w-auto object-contain"
      />
    </div>
  );
}

export default function NetworkTree() {
  return (
    <div>
      {/* Desktop / tablet: organic radial layout */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-xl md:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {PERSONAS.map((persona) => {
            const pos = MEMBER_POSITIONS[persona.slug];
            return (
              <line
                key={persona.slug}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="var(--aso-blue-light)"
                strokeWidth="0.4"
                strokeOpacity="0.45"
              />
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <AnchorGlow />
        </div>

        {PERSONAS.map((persona) => {
          const pos = MEMBER_POSITIONS[persona.slug];
          return (
            <Link
              key={persona.slug}
              href={`/for-members/${persona.slug}`}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 ${NODE_LINK_CLASSES}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {persona.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile: simplified stacked version — no radial diagram */}
      <div className="flex flex-col items-center gap-8 md:hidden">
        <AnchorGlow />

        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {PERSONAS.map((persona) => (
            <Link
              key={persona.slug}
              href={`/for-members/${persona.slug}`}
              className={`px-3 py-2 text-center ${NODE_LINK_CLASSES}`}
            >
              {persona.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
