import Link from "next/link";
import PersonaIcon from "./PersonaIcon";
import type { Persona } from "@/lib/content-types";

interface PersonaCardProps {
  persona: Persona;
}

// Four satellite positions around the hub (percent coordinates within the
// navy header band), matching the hub-and-spoke language already used by
// NetworkDiagram elsewhere on the homepage. Kept clear of both the header's
// edges and the center icon so pills never clip or overlap it.
const NODE_POSITIONS = [
  { x: 18, y: 15 },
  { x: 82, y: 15 },
  { x: 18, y: 85 },
  { x: 82, y: 85 },
] as const;

function CheckMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 text-aso-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 8.2l1.8 1.8 3.2-3.6" />
    </svg>
  );
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Link
      href={`/for-members/${persona.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-center shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none"
    >
      {/* Branded header: role icon + hover/focus network reveal, on navy */}
      <div className="relative flex h-36 shrink-0 items-center justify-center bg-aso-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {NODE_POSITIONS.map((pos, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="var(--aso-orange)"
                strokeWidth="0.9"
                strokeOpacity="0.7"
              />
            ))}
          </svg>
          {NODE_POSITIONS.map((pos, i) => (
            <span
              key={i}
              className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-aso-orange/50 bg-white px-2 py-1 text-[10px] font-semibold text-aso-navy shadow-sm"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-aso-orange" />
              {persona.networkNodes[i]}
            </span>
          ))}
        </div>

        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/25 bg-white/10 text-white transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-aso-orange/70 group-hover:shadow-[0_0_18px_rgba(255,122,26,0.45)] group-focus-visible:border-aso-orange/70 group-focus-visible:shadow-[0_0_18px_rgba(255,122,26,0.45)] motion-reduce:transition-none">
          <PersonaIcon slug={persona.slug} />
        </div>
      </div>

      {/* Body: title, tagline, checklist, footer link — stays light */}
      <div className="flex flex-1 flex-col items-center gap-4 p-7">
        <div>
          <h3 className="text-base font-semibold text-aso-navy">{persona.singularName}</h3>
          <p className="mt-1 text-sm font-medium text-aso-orange">{persona.tagline}</p>
        </div>

        <ul className="flex-1 space-y-2">
          {persona.checklist.map((item) => (
            <li key={item} className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckMark />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <span className="text-xs font-medium text-aso-orange">See how ASO helps →</span>
      </div>

      <span className="sr-only">Connects with {persona.networkNodes.join(", ")}.</span>
    </Link>
  );
}
