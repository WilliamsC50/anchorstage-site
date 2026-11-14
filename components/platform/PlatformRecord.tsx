/**
 * Platform: "The Connected Operating Record".
 *
 * A static before-and-after example: one show's load-in time changes once on
 * the event, and the views that read the event pick up the current time when
 * they are opened. No interaction, no animation, no live data.
 *
 * Every statement is verified against the application (DESIGN-13E.2):
 *   - Load-in time belongs to each show (event_instance.load_in_time).
 *   - Production Brief: the page and its PDF are built from current timing on
 *     every request; a PDF that was already downloaded is a fixed file.
 *   - Crew sheet link: read-only, reads current times when opened, revocable,
 *     and stops working after the show.
 *   - Collaborators: see the event and its pages only when their access
 *     includes event details (least privilege by default).
 *   - Issued quotes and invoices keep the revision that was sent; changes are
 *     made as a new revision.
 * Never claim real-time sync, notifications, self-updating PDFs, or that
 * everyone sees everything. Marketing and Signage are organization-level, so
 * nothing here suggests every Workstation shares one universal record.
 *
 * Styling: app/(site)/platform/platform.css under .platform-record.
 */

const ICON = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const VIEWS = [
  {
    name: "Production Brief",
    when: "Current when opened. Download it again for an updated PDF.",
    icon: (
      <svg {...ICON}>
        <path d="M7 3.5h7l4 4v13H7Z" />
        <path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6" />
      </svg>
    ),
  },
  {
    name: "Crew sheet link",
    when: "Current when opened. Read-only, and you can revoke the link.",
    icon: (
      <svg {...ICON}>
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
    ),
  },
  {
    name: "Collaborator view",
    when: "Current when opened, for partners whose access includes event details.",
    icon: (
      <svg {...ICON}>
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M15.5 6.5a3 3 0 0 1 0 5.5M17.5 14.8c1.5.6 2.5 2 3 4.2" />
      </svg>
    ),
  },
];

const PRINCIPLES = [
  {
    title: "Linked, not re-entered",
    body: "Clients, venues, gear, packages, and your crew roster are kept once by your organization and referenced on each event. Crew assignments keep their own details on the event.",
  },
  {
    title: "The right view for each person",
    body: "Your team, collaborators, and crew see what their role, permissions, or shared link allows.",
  },
  {
    title: "Issued documents stay as sent",
    body: "Issued quotes and invoices keep the revision that was sent. Later changes to the event don't rewrite them.",
  },
];

export default function PlatformRecord() {
  return (
    <section className="platform-record relative overflow-hidden bg-aso-navy" aria-labelledby="pr-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
      <div aria-hidden="true" className="pr-glow" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="pr-head">
          <div className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
            <p className="pr-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">The center of the platform</p>
          </div>
          <h2 id="pr-title" className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Connected Operating Record
          </h2>
          <p className="pr-tagline">One record per event. Linked, not copied.</p>
          <p className="pr-intro">
            Each event brings its operational information together while connecting to the clients, venues, crew, and
            gear your organization already maintains. The right people can access the information relevant to their
            work without everyone needing a separate copy.
          </p>
        </div>

        {/* The example: one change on the show, picked up by the views that read it. */}
        <figure className="pr-demo" aria-labelledby="pr-demo-caption">
          <figcaption id="pr-demo-caption" className="pr-demo-caption">
            Example: a show&apos;s load-in moves one hour earlier
          </figcaption>

          <div className="pr-demo-grid">
            <div className="pr-record">
              <div className="pr-record-head">
                <p className="pr-record-title">Show schedule</p>
                <span className="pr-tag">Illustrative example</span>
              </div>

              <div className="pr-change" role="group" aria-label="Load-in time, before and after the change">
                <div className="pr-cell pr-before">
                  <p className="pr-cell-label">Before</p>
                  <p className="pr-row">
                    <span className="pr-key">Load-in</span>
                    <span className="pr-old">8:00 AM</span>
                  </p>
                </div>
                <span aria-hidden="true" className="pr-arrow">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <div className="pr-cell pr-after">
                  <p className="pr-cell-label">After</p>
                  <p className="pr-row">
                    <span className="pr-key">Load-in</span>
                    <span className="pr-new">7:00 AM</span>
                  </p>
                </div>
              </div>

              <p className="pr-record-note">Changed once, on the show&apos;s schedule.</p>
            </div>

            <ul className="pr-views" aria-label="Views that read the event">
              {VIEWS.map((view) => (
                <li key={view.name} className="pr-view">
                  <span aria-hidden="true" className="pr-view-icon">
                    {view.icon}
                  </span>
                  <div className="pr-view-text">
                    <p className="pr-view-name">{view.name}</p>
                    <p className="pr-view-when">{view.when}</p>
                  </div>
                  <p className="pr-view-time">
                    <span className="pr-key">Load-in</span> 7:00 AM
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </figure>

        <div className="pr-principles">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="pr-principle">
              <p className="pr-principle-title">{p.title}</p>
              <p className="pr-principle-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
