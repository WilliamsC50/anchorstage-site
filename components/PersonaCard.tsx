import Link from "next/link";
import PersonaIcon from "./PersonaIcon";
import type { Persona } from "@/lib/content-types";

interface PersonaCardProps {
  persona: Persona;
}

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
      {/* Branded header: role icon by default, example roles fade in on hover/focus */}
      <div className="relative flex h-40 shrink-0 items-center justify-center overflow-hidden bg-aso-navy px-4">
        {/* Icon — stays visible, recedes slightly once examples take over */}
        <div className="relative z-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/25 bg-white/10 text-white transition-[opacity,transform,border-color,box-shadow] duration-300 ease-out group-hover:scale-90 group-hover:border-aso-orange/60 group-hover:opacity-30 group-hover:shadow-[0_0_16px_rgba(255,122,26,0.35)] group-focus-visible:scale-90 group-focus-visible:border-aso-orange/60 group-focus-visible:opacity-30 group-focus-visible:shadow-[0_0_16px_rgba(255,122,26,0.35)] motion-reduce:transition-none">
          <PersonaIcon slug={persona.slug} />
        </div>

        {/* Example-roles overlay, decorative only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex flex-wrap content-center items-center justify-center gap-1.5 p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          {persona.examples.map((example, i) => (
            <span
              key={example}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="translate-x-2 whitespace-nowrap rounded-full bg-aso-orange px-2.5 py-1 text-[10px] font-medium text-white shadow-sm transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none"
            >
              {example}
            </span>
          ))}
        </div>
      </div>

      {/* Body: title, tagline, checklist, footer link — unchanged */}
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

      <span className="sr-only">Examples: {persona.examples.join(", ")}.</span>
    </Link>
  );
}
