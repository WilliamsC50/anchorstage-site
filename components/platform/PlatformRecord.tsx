/**
 * Platform: "The Connected Operating Record".
 *
 * A static example of operational control when a plan changes: one show's
 * load-in moves from 8:00 AM to 7:00 AM, updated once, and three views that
 * read the event show the current time when they are opened. Below it, what
 * is true today, and a clearly separate, quieter "Future direction" panel.
 * No interaction, no animation, no live data.
 *
 * Verified against the application (DESIGN-13E.2, 13E.3):
 *   Today
 *   - Load-in time belongs to each show (event_instance.load_in_time).
 *   - Production Brief page and PDF are built from current timing on every
 *     request; a PDF already downloaded or printed is a fixed copy.
 *   - Crew sheet link: read-only, current when reopened, revocable.
 *   - Collaborators see the event only when their access includes event
 *     details (least privilege by default).
 *   - Issued quotes and invoices keep the revision that was sent.
 *   Not built (Future direction only)
 *   - Working out which documents or people a change affects; reviewing,
 *     approving, and sending updated communications; redistributing briefs,
 *     links, or packages; scheduled reminders or timed distribution.
 *     (Foundations exist: the event activity log records timing changes with
 *     before and after values; issued documents can be emailed; crew calls
 *     send notices; a Deliverables ZIP bundles documents.)
 * Never claim real-time sync, automatic notifications, self-updating PDFs,
 * universal access, a release date, or that ASO sends anything on its own.
 *
 * Styling: app/(site)/platform/platform.css under .platform-record.
 */

const ICON = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const TODAY = [
  "Clients, venues, gear, packages, and your crew roster are kept once and linked to each event. Crew assignments keep event-specific details.",
  "Each person sees what their role, permissions, or shared link allows.",
  "Issued quotes and invoices keep the revision that was sent.",
];

const FUTURE = [
  "See which documents and people a change may affect",
  "Review and approve updated communications",
  "Reissue or redistribute documents, links, and packages",
  "Schedule reminders and distribution at chosen intervals before a show",
];

/** Skeleton lines: suggest a real view's content without inventing data. */
const Bars = ({ widths, tail = false }: { widths: number[]; tail?: boolean }) => (
  <span aria-hidden="true" className={tail ? "pr-bars pr-bars-tail" : "pr-bars"}>
    {widths.map((w, i) => (
      <span key={i} className="pr-bar" style={{ width: `${w}%` }} />
    ))}
  </span>
);

const LoadIn = () => (
  <span className="pr-loadin">
    <span className="pr-loadin-key">Load-in</span>
    <span className="pr-loadin-time">7:00 AM</span>
  </span>
);

export default function PlatformRecord() {
  return (
    <section className="platform-record relative overflow-hidden bg-aso-navy" aria-labelledby="pr-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
      <div aria-hidden="true" className="pr-glow" />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-14 md:pt-16 md:pb-16">
        <div className="pr-grid">
          <div className="pr-head">
            <div className="flex items-center gap-3 mb-3">
              <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
              <p className="pr-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">The center of the platform</p>
            </div>
            <h2 id="pr-title" className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              The Connected Operating Record
            </h2>
            <p className="pr-tagline">One record per event. Linked, not copied.</p>
            <p className="pr-intro">
              Each event keeps its operational information in one place, linked to the clients, venues, crew, and gear
              your organization already maintains.
            </p>
          </div>

          {/* The one change. */}
          <div className="pr-change" role="group" aria-labelledby="pr-change-title">
            <div className="pr-change-head">
              <p id="pr-change-title" className="pr-change-title">
                Show schedule
              </p>
              <span className="pr-tag">Illustrative example</span>
            </div>
            <p className="pr-change-key">Load-in</p>
            <p className="pr-change-times">
              <span className="pr-old">
                <span className="sr-only">Before: </span>8:00 AM
              </span>
              <span aria-hidden="true" className="pr-arrow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="pr-new">
                <span className="sr-only">After: </span>7:00 AM
              </span>
            </p>
            <p className="pr-change-note">Updated once, on the show&apos;s schedule.</p>
          </div>

          {/* The views that read it, joined to the change by a blue line. */}
          <ul className="pr-views" aria-label="Connected views, available today">
            <li className="pr-view">
              <div className="pr-mock pr-mock-doc">
                <span className="pr-mock-head">
                  <svg {...ICON}>
                    <path d="M7 3.5h7l4 4v13H7Z" />
                    <path d="M14 3.5v4h4" />
                  </svg>
                  Production Brief
                </span>
                <Bars widths={[70, 52]} />
                <LoadIn />
                <Bars widths={[60]} tail />
              </div>
              <p className="pr-view-when">Current when opened or downloaded again.</p>
            </li>

            <li className="pr-view">
              <div className="pr-mock pr-mock-phone">
                <span aria-hidden="true" className="pr-notch" />
                <span className="pr-mock-head">
                  <svg {...ICON}>
                    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                  </svg>
                  Crew Sheet
                </span>
                <span className="pr-chip">Read-only link</span>
                <LoadIn />
                <Bars widths={[66]} tail />
              </div>
              <p className="pr-view-when">Current when the link is reopened. Read-only, and you can revoke it.</p>
            </li>

            <li className="pr-view">
              <div className="pr-mock pr-mock-screen">
                <span aria-hidden="true" className="pr-winbar" />
                <span className="pr-mock-head">
                  <svg {...ICON}>
                    <circle cx="9" cy="9" r="3" />
                    <path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M15.5 6.5a3 3 0 0 1 0 5.5M17.5 14.8c1.5.6 2.5 2 3 4.2" />
                  </svg>
                  Collaborator View
                </span>
                <span className="pr-chip">Partner access: event details</span>
                <LoadIn />
                <Bars widths={[48]} tail />
              </div>
              <p className="pr-view-when">Current when opened, for partners whose access includes event details.</p>
            </li>
          </ul>
        </div>

        <p className="pr-copies">PDFs already downloaded and printed copies don&apos;t update themselves.</p>

        <div className="pr-bottom">
          <div className="pr-today">
            <p className="pr-label">How it works today</p>
            <ul>
              {TODAY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <aside className="pr-future" aria-labelledby="pr-future-title">
            <p className="pr-label pr-label-future">Future direction</p>
            <h3 id="pr-future-title" className="pr-future-title">
              Know what changed. Coordinate what happens next.
            </h3>
            <ul>
              {FUTURE.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="pr-future-note">
              Planned, not yet available. You decide what needs updating, who receives it, what is sent, and when.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
