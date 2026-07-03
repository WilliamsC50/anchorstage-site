/**
 * Static, non-interactive visualization of the ASO ecosystem: a central
 * "The Network" hub, six member types above it, and six capabilities/
 * outcomes the network powers below it. Positions are plotted on a fixed
 * 0-100 coordinate space and rendered with percentage-based absolute
 * positioning, so the diagram scales with its container via CSS alone —
 * no measurement, no JS, no library.
 *
 * Node cards have a fixed pixel width tuned for a 12-across layout, so
 * the wrapper enforces a minimum diagram width and scrolls horizontally
 * below that rather than letting labels overlap on narrow viewports.
 */

interface DiagramNode {
  id: string;
  label: string;
  x: number;
}

const HUB = { x: 50, y: 50 };
const MEMBER_Y = 12;
const CAPABILITY_Y = 88;

// Six evenly spaced x positions shared by both the member and capability rows.
const X_SLOTS = [8, 24.8, 41.6, 58.4, 75.2, 92];

const MEMBER_NODES: DiagramNode[] = [
  { id: "production-companies", label: "Production Companies", x: X_SLOTS[0] },
  { id: "freelancers", label: "Freelancers", x: X_SLOTS[1] },
  { id: "venues", label: "Venues", x: X_SLOTS[2] },
  { id: "musicians", label: "Musicians", x: X_SLOTS[3] },
  { id: "rental-providers", label: "Rental Providers", x: X_SLOTS[4] },
  { id: "event-organizers", label: "Event Organizers", x: X_SLOTS[5] },
];

const CAPABILITY_NODES: DiagramNode[] = [
  { id: "events", label: "Events", x: X_SLOTS[0] },
  { id: "workstations", label: "Workstations", x: X_SLOTS[1] },
  { id: "media", label: "Media", x: X_SLOTS[2] },
  { id: "marketing", label: "Marketing", x: X_SLOTS[3] },
  { id: "documents", label: "Documents", x: X_SLOTS[4] },
  { id: "automation", label: "Automation", x: X_SLOTS[5] },
];

interface NetworkDiagramProps {
  className?: string;
}

export default function NetworkDiagram({ className = "" }: NetworkDiagramProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="relative mx-auto aspect-[16/9] min-w-[600px] max-w-4xl">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {MEMBER_NODES.map((node) => (
            <line
              key={node.id}
              x1={HUB.x}
              y1={HUB.y}
              x2={node.x}
              y2={MEMBER_Y}
              stroke="var(--aso-blue-light)"
              strokeWidth="0.35"
              strokeOpacity="0.55"
            />
          ))}
          {CAPABILITY_NODES.map((node) => (
            <line
              key={node.id}
              x1={HUB.x}
              y1={HUB.y}
              x2={node.x}
              y2={CAPABILITY_Y}
              stroke="var(--aso-blue-light)"
              strokeWidth="0.35"
              strokeOpacity="0.55"
            />
          ))}
        </svg>

        {MEMBER_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-20 rounded-lg border border-aso-blue/30 bg-white px-1.5 py-1.5 text-center text-[9px] font-medium leading-tight text-aso-navy shadow-sm"
            style={{ left: `${node.x}%`, top: `${MEMBER_Y}%` }}
          >
            {node.label}
          </div>
        ))}

        {CAPABILITY_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-20 rounded-lg border border-aso-blue/20 bg-aso-bg px-1.5 py-1.5 text-center text-[9px] font-medium leading-tight text-aso-blue"
            style={{ left: `${node.x}%`, top: `${CAPABILITY_Y}%` }}
          >
            {node.label}
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-24 h-24 rounded-full bg-aso-navy text-center text-[10px] font-bold uppercase tracking-wide text-white shadow-md px-2"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          The Network
        </div>

        <span className="sr-only">
          Diagram showing The Network at the center, connecting{" "}
          {MEMBER_NODES.map((n) => n.label).join(", ")}, and powering{" "}
          {CAPABILITY_NODES.map((n) => n.label).join(", ")}.
        </span>
      </div>
    </div>
  );
}
