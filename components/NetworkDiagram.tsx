/**
 * Static, non-interactive visualization of the ASO ecosystem: six member
 * types connected through the three shared layers (Events, Media,
 * Marketing) that run through every collaboration. Positions are plotted
 * on a fixed 0-100 coordinate space and rendered with percentage-based
 * absolute positioning, so the whole diagram scales with its container
 * width via CSS alone — no measurement, no JS, no library.
 */

interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

// Six member types, evenly spaced around the center at (50, 50).
const MEMBER_NODES: DiagramNode[] = [
  { id: "event-organizers", label: "Event Organizers", x: 50, y: 10 },
  { id: "production-companies", label: "Production Companies", x: 84, y: 30 },
  { id: "freelancers", label: "Freelancers", x: 84, y: 70 },
  { id: "venues", label: "Venues", x: 50, y: 90 },
  { id: "musicians", label: "Musicians", x: 16, y: 70 },
  { id: "rental-providers", label: "Rental Providers", x: 16, y: 30 },
];

// The shared layers every member connects through, clustered at the center.
const CORE_NODES: DiagramNode[] = [
  { id: "events", label: "Events", x: 50, y: 41 },
  { id: "media", label: "Media", x: 41, y: 58 },
  { id: "marketing", label: "Marketing", x: 59, y: 58 },
];

const CENTER = { x: 50, y: 50 };

interface NetworkDiagramProps {
  className?: string;
}

export default function NetworkDiagram({ className = "" }: NetworkDiagramProps) {
  return (
    <div className={`relative w-full max-w-xl mx-auto aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {MEMBER_NODES.map((node) => (
          <line
            key={node.id}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--aso-blue-light)"
            strokeWidth="0.4"
            strokeOpacity="0.55"
          />
        ))}
      </svg>

      {MEMBER_NODES.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 rounded-lg border border-aso-blue/30 bg-white px-2 py-1.5 text-center text-[10px] sm:text-[11px] font-medium leading-tight text-aso-navy shadow-sm"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}

      {CORE_NODES.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-aso-navy px-2.5 py-1 text-center text-[9px] sm:text-[10px] font-semibold whitespace-nowrap text-white"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}

      <span className="sr-only">
        Diagram showing how {MEMBER_NODES.map((n) => n.label).join(", ")} connect through the
        shared {CORE_NODES.map((n) => n.label).join(", ")} layers of the ASO network.
      </span>
    </div>
  );
}
