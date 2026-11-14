import WorkstationIcon from "@/components/WorkstationIcon";
import { WORKSTATIONS } from "@/lib/workstations";
import { MODEL, type Box, type FaceKind } from "./architecture";

/**
 * The Platform hero's architecture model: the organization as the
 * foundation, the Connected Operating Record layered on its core, the
 * Workstations joined along the floor (to the record, or for Signage to the
 * organization itself), and other organizations linked to this one in the
 * distance. Geometry comes from
 * architecture.ts (projected at build time); styling and motion live in
 * app/(site)/platform/platform.css under .platform-hero.
 *
 * The drawing is decorative: one role="img" with a text description, and the
 * labels drawn over it are hidden from assistive technology. Everything it
 * names is already in the page copy.
 */

// Record layers, top to bottom, in the platform's own terms (the Event
// Workstation's parties, Crew, Gear, Documents, and Financials).
const LAYERS = ["Client · Venue", "Crew · Gear", "Documents · Financials"];

const NAMES = Object.fromEntries(WORKSTATIONS.map((w) => [w.slug, w.name]));

const FILL: Record<string, Record<FaceKind, string>> = {
  plinth: { top: "url(#pf-plinth-top)", left: "url(#pf-plinth-l)", right: "url(#pf-plinth-r)" },
  foundation: { top: "url(#pf-found-top)", left: "url(#pf-found-l)", right: "url(#pf-found-r)" },
  plate: { top: "url(#pf-plate-top)", left: "url(#pf-plate-l)", right: "url(#pf-plate-r)" },
  core: { top: "#a9dbff", left: "url(#pf-core-l)", right: "url(#pf-core-r)" },
  module: { top: "url(#pf-mod-top)", left: "url(#pf-mod-l)", right: "url(#pf-mod-r)" },
};

// Other organizations: the same materials, flattened and cooler, with a
// muted core so nothing in them competes with this organization's spine.
const OTHER_FILL: Record<"plinth" | "foundation" | "core" | "plate", Record<FaceKind, string>> = {
  plinth: { top: "#0a1b30", left: "#08172a", right: "#050f1c" },
  foundation: { top: "#12345a", left: "#0f2945", right: "#0a1d34" },
  core: { top: "#8cc6f0", left: "#5a9fd8", right: "#3a7ab8" },
  plate: { top: "rgba(60, 125, 195, 0.4)", left: "rgba(70, 140, 210, 0.45)", right: "rgba(40, 95, 160, 0.5)" },
};

type Other = (typeof MODEL.otherOrganizations)["nine"];
const OTHERS = [
  { id: "eleven", delay: "-14.67s" },
  { id: "ten", delay: "-7.33s" },
  { id: "nine", delay: "0s" },
] as const;

/** Another organization in the distance, with its link to this one. The link
 *  carries a restrained pulse, inbound then outbound, every 11 seconds. */
function OtherOrganization({ o, id, delay }: { o: Other; id: string; delay: string }) {
  return (
    <g className={`pf-other pf-other-${id}`}>
      <polygon points={o.shadow} className="pf-other-shadow" filter="url(#pf-soft)" />
      <path d={o.link} className="pf-other-link" />
      <path d={o.link} pathLength={100} className="pf-other-pulse" style={{ animationDelay: delay }} />
      {o.parts.map((p, i) => (
        <g key={i}>
          {p.box.faces.map((f) => (
            <polygon key={f.kind} points={f.points} fill={OTHER_FILL[p.kind][f.kind]} />
          ))}
          {(p.kind === "foundation" || p.kind === "plate") && <polygon points={p.box.top} className="pf-other-edge" />}
        </g>
      ))}
    </g>
  );
}

function Solid({ box, fill, className }: { box: Box; fill: keyof typeof FILL; className?: string }) {
  return (
    <g className={className}>
      {box.faces.map((f) => (
        <polygon key={f.kind} points={f.points} fill={FILL[fill][f.kind]} className={`pf-face-${f.kind}`} />
      ))}
    </g>
  );
}

function Module({ m }: { m: (typeof MODEL.modules)[number] }) {
  return (
    <g className="pf-module">
      <Solid box={m.box} fill="module" />
      <polygon points={m.box.top} className="pf-module-edge" />
      <polygon points={m.panel} className="pf-module-panel" />
      <line
        x1={m.box.nearEdge[0][0]} y1={m.box.nearEdge[0][1]} x2={m.box.nearEdge[1][0]} y2={m.box.nearEdge[1][1]}
        className="pf-near-edge"
      />
    </g>
  );
}

/** Where a Workstation's conduit meets the record's core: the lit junction
 *  point (the drawing's only orange besides the foundation inlay). */
function Junction({ m }: { m: (typeof MODEL.modules)[number] }) {
  return (
    <circle cx={m.junction[0]} cy={m.junction[1]} r="2.6" className="pf-junction-dot" filter="url(#pf-glow-sm)" />
  );
}

export default function PlatformArchitecture() {
  const { labels } = MODEL;
  return (
    <div
      className="pf-model relative w-full"
      style={{ aspectRatio: MODEL.aspect }}
      role="img"
      aria-label="Diagram: the organization is the foundation. The Connected Operating Record is layered on it. The Event, Inventory, and Marketing Workstations are connected to the record, and the Signage Workstation to the organization. Other organizations connect with the organization."
    >
      <svg viewBox={MODEL.viewBox} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="pf-backlight" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#2a6fc0" stopOpacity="0.12" />
            <stop offset="1" stopColor="#0a1d33" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pf-shaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6cbcff" stopOpacity="0" />
            <stop offset="0.55" stopColor="#6cbcff" stopOpacity="0.2" />
            <stop offset="0.85" stopColor="#9fd6ff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#9fd6ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pf-floor-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="pf-floor-mask" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="4000" height="4000">
            <ellipse cx={MODEL.ground[0]} cy={MODEL.ground[1] + 40} rx="430" ry="170" fill="url(#pf-floor-fade)" />
            {/* The ground the other organizations stand on. */}
            <ellipse
              cx={MODEL.otherOrganizations.ten.ground[0]} cy={MODEL.otherOrganizations.ten.ground[1] + 10}
              rx="330" ry="120" fill="url(#pf-floor-fade)" opacity="0.8"
            />
          </mask>
          {/* Toward the copy column (left of the view box) the scenery fades
              almost away, so nothing detailed or bright sits behind the
              lettering. */}
          <linearGradient id="pf-copy-fade-ramp" gradientUnits="userSpaceOnUse" x1={MODEL.left - 100} y1="0" x2={MODEL.left - 20} y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="pf-copy-fade" maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="8000" height="8000">
            <rect x="-4000" y="-4000" width="8000" height="8000" fill="url(#pf-copy-fade-ramp)" />
          </mask>

          {/* Plinth and foundation: heavy navy masses, top lit from behind. */}
          <linearGradient id="pf-plinth-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b2038" />
            <stop offset="1" stopColor="#081829" />
          </linearGradient>
          <linearGradient id="pf-plinth-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1c31" />
            <stop offset="1" stopColor="#050f1c" />
          </linearGradient>
          <linearGradient id="pf-plinth-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#071526" />
            <stop offset="1" stopColor="#030a14" />
          </linearGradient>
          <linearGradient id="pf-found-top" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#163a62" />
            <stop offset="0.5" stopColor="#0f2c4d" />
            <stop offset="1" stopColor="#0b223c" />
          </linearGradient>
          <linearGradient id="pf-found-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#123153" />
            <stop offset="1" stopColor="#0a1e35" />
          </linearGradient>
          <linearGradient id="pf-found-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b2240" />
            <stop offset="1" stopColor="#061427" />
          </linearGradient>

          {/* Record plates: translucent, edge-lit glass over the core. */}
          <linearGradient id="pf-plate-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3f86c9" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#1b4d84" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0f3462" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="pf-plate-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5aa6e6" stopOpacity="0.75" />
            <stop offset="1" stopColor="#2a6aa8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="pf-plate-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b67a3" stopOpacity="0.75" />
            <stop offset="1" stopColor="#163f70" stopOpacity="0.65" />
          </linearGradient>

          {/* The core: the lit spine of the record. */}
          <linearGradient id="pf-core-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6fb4ea" />
            <stop offset="1" stopColor="#c4e6ff" />
          </linearGradient>
          <linearGradient id="pf-core-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5aa2dc" />
            <stop offset="1" stopColor="#2f73b4" />
          </linearGradient>

          {/* Workstation modules. */}
          <linearGradient id="pf-mod-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d4673" />
            <stop offset="1" stopColor="#11304f" />
          </linearGradient>
          <linearGradient id="pf-mod-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#173d63" />
            <stop offset="1" stopColor="#0c2541" />
          </linearGradient>
          <linearGradient id="pf-mod-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d2846" />
            <stop offset="1" stopColor="#07182c" />
          </linearGradient>

          <filter id="pf-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="pf-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pf-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Environment: floor grid fading out, and the backlight behind the record. */}
        <g mask="url(#pf-copy-fade)">
          <g mask="url(#pf-floor-mask)" className="pf-floor">
            {MODEL.floor.map((l, i) => (
              <line key={i} {...l} />
            ))}
          </g>
        </g>
        <ellipse cx={MODEL.light[0]} cy={MODEL.light[1]} rx="260" ry="210" fill="url(#pf-backlight)" />
        {/* A soft shaft of light rising behind the record. */}
        <ellipse cx={MODEL.light[0]} cy={MODEL.light[1] - 60} rx="44" ry="190" fill="url(#pf-shaft)" filter="url(#pf-soft)" className="pf-shaft" />
        <ellipse cx={MODEL.ground[0]} cy={MODEL.ground[1] + 52} rx="250" ry="58" className="pf-pool" filter="url(#pf-soft)" />

        {/* Other organizations, in an arc around the upper left, furthest first. */}
        <g mask="url(#pf-copy-fade)">
          {OTHERS.map(({ id, delay }) => (
            <OtherOrganization key={id} o={MODEL.otherOrganizations[id]} id={id} delay={delay} />
          ))}
        </g>

        {/* Organization: plinth, foundation, etched plot grid, orange inlay. */}
        <Solid box={MODEL.plinth} fill="plinth" />
        <polygon points={MODEL.plinth.top} className="pf-plinth-edge" />
        <Solid box={MODEL.foundation} fill="foundation" />
        <g className="pf-grid">
          {MODEL.grid.map((l, i) => (
            <line key={i} {...l} />
          ))}
        </g>
        <polygon points={MODEL.foundation.top} className="pf-found-edge" />
        <polygon points={MODEL.inlay} className="pf-inlay" />
        {/* Where the other organizations' links meet this foundation. */}
        {OTHERS.map(({ id }) => {
          const o = MODEL.otherOrganizations[id];
          return <circle key={id} cx={o.point[0]} cy={o.point[1]} r="2" className={`pf-other-point pf-other-${id}`} />;
        })}
        <line
          x1={MODEL.foundation.nearEdge[0][0]} y1={MODEL.foundation.nearEdge[0][1]}
          x2={MODEL.foundation.nearEdge[1][0]} y2={MODEL.foundation.nearEdge[1][1]}
          className="pf-near-edge"
        />

        {/* Shadows cast on the foundation. */}
        <g className="pf-shadow" filter="url(#pf-soft)">
          <polygon points={MODEL.recordShadow} />
          {MODEL.modules.map((m) => (
            <polygon key={m.slug} points={m.shadow} />
          ))}
        </g>

        {/* Conduits along the floor, with signal travelling in to the record. */}
        {MODEL.modules.map((m, i) => (
          <g key={m.slug} className="pf-conduit" style={{ ["--i" as string]: i }}>
            <path d={m.twin} className="pf-conduit-twin" />
            <path d={m.conduit} className="pf-conduit-line" />
            <path d={m.conduit} pathLength={100} className="pf-pulse" filter="url(#pf-glow-sm)" />
          </g>
        ))}

        {MODEL.modulesBehind.map((m) => (
          <Module key={m.slug} m={m} />
        ))}
        {MODEL.modules.filter((m) => !m.front).map((m) => (
          <Junction key={m.slug} m={m} />
        ))}

        {/* Connected Operating Record: core and plates, bottom up. */}
        <g className="pf-record">
          {MODEL.recordParts.map((p, i) =>
            p.kind === "core" ? (
              <Solid key={i} box={p.box} fill="core" className="pf-core" />
            ) : (
              <g key={i} className="pf-plate" style={{ ["--layer" as string]: p.index }}>
                <Solid box={p.box} fill="plate" />
                <g className="pf-strata">
                  {MODEL.strata[p.index].map((l, k) => (
                    <line key={k} {...l} />
                  ))}
                </g>
                <polygon points={p.box.top} className="pf-plate-edge" />
                <line
                  x1={p.box.nearEdge[0][0]} y1={p.box.nearEdge[0][1]} x2={p.box.nearEdge[1][0]} y2={p.box.nearEdge[1][1]}
                  className="pf-near-edge"
                />
              </g>
            ),
          )}
          <ellipse cx={MODEL.light[0]} cy={MODEL.light[1] - 4} rx="16" ry="70" className="pf-core-glow" filter="url(#pf-soft)" />
        </g>

        {MODEL.modules.filter((m) => m.front).map((m) => (
          <Junction key={m.slug} m={m} />
        ))}
        {MODEL.modulesFront.map((m) => (
          <Module key={m.slug} m={m} />
        ))}
      </svg>

      {/* Labels, in HTML so they stay legible at every size. */}
      <div aria-hidden="true" className="pf-labels">
        <span className="pf-label pf-label-record" style={labels.record}>
          Connected Operating Record
        </span>
        {labels.layers
          .slice()
          .reverse()
          .map((pos, i) => (
            <span key={LAYERS[i]} className="pf-label pf-label-layer" style={pos}>
              {LAYERS[i]}
            </span>
          ))}
        <span className="pf-label pf-label-org" style={labels.organization}>
          Organization
        </span>
        {labels.modules.map((m) => (
          <span
            key={m.slug}
            className={`pf-label pf-label-ws pf-label-ws-${m.side} pf-label-ws-${m.slug}`}
            style={{
              ["--x" as string]: m.wide.left,
              ["--y" as string]: m.wide.top,
              ["--x-compact" as string]: m.compact.left,
              ["--y-compact" as string]: m.compact.top,
            }}
          >
            <WorkstationIcon slug={m.slug} className="h-3.5 w-3.5 shrink-0" />
            {NAMES[m.slug]}
          </span>
        ))}
      </div>
    </div>
  );
}
