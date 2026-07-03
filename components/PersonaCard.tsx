import Link from "next/link";
import PersonaIcon from "./PersonaIcon";
import type { Persona } from "@/lib/content-types";

interface PersonaCardProps {
  persona: Persona;
}

// Four satellite positions around the hub (percent coordinates within the
// header's own box), matching the hub-and-spoke language already used by
// NetworkDiagram elsewhere on the homepage.
const NODE_POSITIONS = [
  { x: 18, y: 12 },
  { x: 82, y: 12 },
  { x: 18, y: 88 },
  { x: 82, y: 88 },
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
      className="group relative flex h-full flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {/* Credential header: role icon + hover/focus network reveal */}
      <div className="relative flex h-32 w-32 items-center justify-center">
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
                stroke="var(--aso-blue-light)"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            ))}
          </svg>
          {NODE_POSITIONS.map((pos, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-aso-blue/30 bg-white px-2 py-0.5 text-[9px] font-medium text-aso-navy shadow-sm"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {persona.networkNodes[i]}
            </span>
          ))}
        </div>

        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-aso-blue/30 bg-aso-bg text-aso-blue ring-4 ring-white">
          <PersonaIcon slug={persona.slug} />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-aso-navy">{persona.singularName}</h3>
        <p className="mt-1 text-sm font-medium text-aso-blue">{persona.tagline}</p>
      </div>

      <ul className="flex-1 space-y-2">
        {persona.checklist.map((item) => (
          <li key={item} className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckMark />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <span className="text-xs font-medium text-aso-blue">See how ASO helps →</span>

      <span className="sr-only">Connects with {persona.networkNodes.join(", ")}.</span>
    </Link>
  );
}
