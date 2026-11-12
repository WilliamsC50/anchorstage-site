import type { CSSProperties } from "react";

/**
 * Scene 3 ("The work is not the hard part") backdrop: a fragmented
 * workspace of miniature operational windows that never quite agree.
 *
 * Five translucent windows (crew list, show schedule, gear list, event
 * details, a superseded revision) sit around the edges of the scene, out of
 * the copy column. Fine connection lines run between some of them and stop
 * short, with an occasional signal pulse that fades before it arrives. Muted
 * amber status lights mark what is out of date or in conflict.
 *
 * Decorative only:
 *   - every visible string is CSS generated content from data-t, with empty
 *     alt text, so there is no DOM text: nothing for screen readers, search,
 *     or find-in-page, and no tab stops
 *   - the field is aria-hidden and never takes the pointer
 *   - placement, depth, and all motion live in home.css (.home-problem-field):
 *     transforms and opacity only, off under reduced motion
 *
 * Server-rendered and static: no client JS, no re-renders.
 */

interface Row {
  label: string;
  /** Current value. */
  value?: string;
  /** A superseded value, shown struck through before the current one. */
  was?: string;
  /** Value in conflict or awaiting update: muted amber. */
  warn?: boolean;
  /** Placeholder data bar instead of a value, as a share of the cell. */
  bar?: number;
}

interface Fragment {
  id: string;
  title: string;
  status: string;
  rows: Row[];
}

const FRAGMENTS: Fragment[] = [
  {
    id: "sched",
    title: "SHOW SCHEDULE",
    status: "REV 2 DAYS OLD",
    rows: [
      { label: "LOAD-IN", was: "14:00", value: "15:30", warn: true },
      { label: "SOUNDCHECK", value: "17:00" },
      { label: "DOORS", value: "19:00" },
      { label: "CURFEW", value: "23:00?", warn: true },
    ],
  },
  {
    id: "rev",
    title: "REVISION",
    status: "SUPERSEDED",
    rows: [
      { label: "PRODUCTION SPEC", value: "REV C" },
      { label: "REPLACED BY", value: "REV D", warn: true },
      { label: "CHANGES", bar: 0.62 },
    ],
  },
  {
    id: "crew",
    title: "CREW LIST",
    status: "2 VERSIONS",
    rows: [
      { label: "A1 AUDIO", value: "CONFIRMED" },
      { label: "LX OPERATOR", was: "v2", value: "v3", warn: true },
      { label: "STAGE MANAGER", value: "TBC" },
      { label: "RIGGERS", bar: 0.48 },
    ],
  },
  {
    id: "gear",
    title: "GEAR LIST",
    status: "AWAITING UPDATE",
    rows: [
      { label: "MONITOR WEDGES", value: "x8" },
      { label: "DI BOXES", value: "x12?", warn: true },
      { label: "CONSOLE", value: "PENDING", warn: true },
      { label: "CABLE RUN", bar: 0.7 },
    ],
  },
  {
    id: "event",
    title: "EVENT DETAILS",
    status: "MISMATCH",
    rows: [
      { label: "CAPACITY", was: "1,200", value: "1,500", warn: true },
      { label: "LOAD DOCK", value: "B" },
      { label: "VENUE CONTACT", bar: 0.55 },
    ],
  },
];

/** Decorative text: generated content only (see home.css .pf-t). */
const T = ({ t, className = "" }: { t: string; className?: string }) => (
  <span className={`pf-t ${className}`} data-t={t} />
);

/** A connection line, with an optional traveling pulse and break marker. */
const Link = ({ id, pulse = true, broken = true }: { id: string; pulse?: boolean; broken?: boolean }) => (
  <div className={`pf-link pf-link-${id}`}>
    {pulse && (
      <span className="pf-pulse">
        <i className="pf-dot" />
      </span>
    )}
    {broken && <i className="pf-break" />}
  </div>
);

export default function ProblemField() {
  return (
    <div aria-hidden="true" className="home-problem-field">
      {/* Keeps the ground directly behind the copy dark and quiet. */}
      <div className="pf-quiet" />

      {/* Schedule toward crew: runs out before it arrives. */}
      <Link id="a" />
      {/* Crew to gear: connected, but interrupted midway. */}
      <Link id="b" pulse={false} />
      {/* Event details toward gear, under the copy: stops short. */}
      <Link id="c" />
      {/* Schedule down to event details along the left edge: fades out. */}
      <Link id="d" />

      {FRAGMENTS.map((f) => (
        <div key={f.id} className={`pf-frag pf-${f.id}`}>
          <div className="pf-win">
            <div className="pf-head">
              <T t={f.title} className="pf-title" />
              <span className="pf-status">
                <i className="pf-led" />
                <T t={f.status} />
              </span>
            </div>
            {f.rows.map((row) => (
              <div key={row.label} className="pf-row">
                <T t={row.label} className="pf-k" />
                {row.bar !== undefined ? (
                  <i className="pf-bar" style={{ "--fill": row.bar } as CSSProperties} />
                ) : (
                  <span className="pf-v">
                    {row.was && <T t={row.was} className="pf-was" />}
                    {row.value && <T t={row.value} className={row.warn ? "pf-warn" : ""} />}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
