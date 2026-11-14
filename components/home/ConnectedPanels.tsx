/**
 * Scene 4 ("Bring the moving parts together"): the three staggered HUD panels
 * on continuous signal routes, the resolution of Scene 3's broken links.
 *
 * Signals relay EVENTS -> OPERATIONS -> NETWORK on one shared cycle, entering
 * from the left edge of the frame and leaving NETWORK toward the right edge
 * (toward the people Scene 5 introduces). Return signals run the other way on
 * their own, longer cycles. When a pulse arrives, a short stretch of the
 * receiving panel's border brightens and fades: its "port".
 *
 *   md and up   routes behind the panels (.cs-routes): in from the left edge,
 *               under the panels EVENTS to OPERATIONS, over them OPERATIONS to
 *               NETWORK, out to the right edge
 *   below md    panels stack; each panel carries a rail down the left gutter
 *               to the next one (.cs-rail), and NETWORK's runs out of frame
 *
 * Decorative only: every layer is aria-hidden, empty, and never takes the
 * pointer. Geometry and motion live in home.css (.cs-*): translate and
 * opacity only, timed so each port fires as its pulse arrives; static under
 * reduced motion. Server-rendered, no client JS.
 */

export interface ConnectedPanel {
  label: string;
  title: string;
  body: string;
}

/** Per panel: its border ports, and (below md) the rail it starts. */
const WIRING = [
  { ports: ["e-in", "e-rev"], rail: "a", pulses: ["a", "a-rev"] },
  { ports: ["o-fwd", "o-rev"], rail: "b", pulses: ["b", "b-rev"] },
  { ports: ["n-fwd", "n-out"], rail: "out", pulses: ["out"] },
] as const;

export default function ConnectedPanels({ panels }: { panels: ConnectedPanel[] }) {
  return (
    <div className="cs-grid relative grid gap-6 md:grid-cols-3 md:gap-5">
      <div aria-hidden="true" className="cs-routes">
        <div className="cs-route cs-route-in">
          <i className="cs-pulse cs-p-in" />
        </div>
        <div className="cs-route cs-route-a">
          <i className="cs-pulse cs-p-a" />
          <i className="cs-pulse cs-p-a-rev" />
        </div>
        <div className="cs-route cs-route-b">
          <i className="cs-pulse cs-p-b" />
          <i className="cs-pulse cs-p-b-rev" />
        </div>
        <div className="cs-route cs-route-out">
          <i className="cs-pulse cs-p-out" />
        </div>
      </div>

      {panels.map((item, i) => {
        const wiring = WIRING[i];
        return (
          <div
            key={item.title}
            className={`hud-panel h-full p-7 ${i === 1 ? "md:translate-y-7" : ""} ${
              i === 2 ? "md:translate-y-3" : ""
            }`}
          >
            <p className="hud-tag font-mono text-xs font-semibold tracking-[0.18em] text-aso-orange mb-5">
              {item.label}
            </p>
            <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{item.title}</h3>
            <p className="home-copy leading-relaxed">{item.body}</p>

            {wiring && (
              <>
                <span aria-hidden="true" className="cs-ports">
                  {wiring.ports.map((port) => (
                    <i key={port} className={`cs-port cs-port-${port}`} />
                  ))}
                </span>
                <span aria-hidden="true" className={`cs-rail cs-rail-${wiring.rail}`}>
                  {wiring.pulses.map((pulse) => (
                    <i key={pulse} className={`cs-pulse cs-p-${pulse}`} />
                  ))}
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
