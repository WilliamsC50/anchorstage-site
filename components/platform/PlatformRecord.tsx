/**
 * Platform: "The Connected Operating Record".
 *
 * A static example of change visibility: one show's load-in moves from
 * 8:00 AM to 7:00 AM. The change card carries the Event Activity entry that
 * records it, and a blue line joins it to the three views that show the
 * current time when opened. Below, the supporting message, the intended next
 * step (worded as intent, not as a feature), and the verified distinctions.
 * No interaction, no animation, no live data.
 *
 * Verified against the application (DESIGN-13E.2, 13E.3, 13E.4):
 *   Today
 *   - Load-in time belongs to each show (event_instance.load_in_time).
 *   - Editing show timing on the event (updateInstanceTiming) records an
 *     Event Activity entry titled "Event timing changed", category "Event",
 *     with the previous and current values (expanded: Previous -> Current).
 *     It is shown in the Activity timeline on the event page (latest 50) to
 *     those who can open the event; "Event" entries are not finance-gated.
 *     Recording is best-effort and covers supported changes only: it is not a
 *     complete audit trail. It sends nothing to anyone.
 *   - Production Brief page and PDF are built from current timing on every
 *     request; a PDF already downloaded or printed is a fixed copy.
 *   - Crew sheet link: read-only, current when reopened, revocable.
 *   - Collaborators see the event only when their access includes event
 *     details (least privilege by default).
 *   - Issued quotes and invoices keep the revision that was sent.
 *   Not built (stated only as the intended next step)
 *   - Identifying affected documents or people, preparing revised documents
 *     for a change, coordinating or scheduling communications.
 * Never claim real-time sync, notifications, automatic delivery, self-updating
 * PDFs, universal access, a complete audit trail, or a release date.
 *
 * Styling: app/(site)/platform/platform.css under .platform-record.
 */

import type { ReactNode } from "react";

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

const FACTS = [
  "Organization records are referenced on each event, not recreated. Crew assignments keep event-specific details.",
  "Permissions decide who can see what.",
  "Issued quotes and invoices keep the revision that was sent. PDFs already downloaded or printed don't update themselves.",
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

interface View {
  name: string;
  kind: "doc" | "phone" | "screen";
  when: string;
  icon: ReactNode;
  chip?: string;
  lead?: number[];
  tail: number[];
}

const VIEWS: View[] = [
  {
    name: "Production Brief",
    kind: "doc",
    when: "Opened or downloaded again",
    lead: [70, 52],
    tail: [60],
    icon: (
      <svg {...ICON}>
        <path d="M7 3.5h7l4 4v13H7Z" />
        <path d="M14 3.5v4h4" />
      </svg>
    ),
  },
  {
    name: "Crew Sheet",
    kind: "phone",
    when: "Read-only link you can revoke",
    chip: "Read-only link",
    tail: [66],
    icon: (
      <svg {...ICON}>
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
    ),
  },
  {
    name: "Collaborator View",
    kind: "screen",
    when: "Where their access allows",
    chip: "Partner access: event details",
    tail: [48],
    icon: (
      <svg {...ICON}>
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M15.5 6.5a3 3 0 0 1 0 5.5M17.5 14.8c1.5.6 2.5 2 3 4.2" />
      </svg>
    ),
  },
];

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

          {/* The change, and the Event Activity entry that records it. */}
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

            <div className="pr-activity">
              <p className="pr-activity-label">
                <svg {...ICON} width={13} height={13}>
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7.5V12l3 2" />
                </svg>
                Event Activity
              </p>
              <p className="pr-activity-row">
                <span className="pr-activity-title">Event timing changed</span>
                <span className="pr-activity-pill">Event</span>
              </p>
              <p className="pr-activity-diff">
                Load-in: <s>8:00 AM</s>
                <span aria-hidden="true"> → </span>
                <span className="sr-only"> to </span>
                <b>7:00 AM</b>
              </p>
            </div>
          </div>

          {/* Where the current time is available, joined to the change by a blue line. */}
          <ul className="pr-views" aria-label="Where the updated load-in appears">
            {VIEWS.map((view) => (
              <li key={view.name} className="pr-view">
                <div className={`pr-mock pr-mock-${view.kind}`}>
                  {view.kind === "phone" && <span aria-hidden="true" className="pr-notch" />}
                  {view.kind === "screen" && <span aria-hidden="true" className="pr-winbar" />}
                  <span className="pr-mock-head">
                    {view.icon}
                    {view.name}
                  </span>
                  {view.chip && <span className="pr-chip">{view.chip}</span>}
                  {view.lead && <Bars widths={view.lead} />}
                  <LoadIn />
                  <Bars widths={view.tail} tail />
                </div>
                <p className="pr-view-when">{view.when}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pr-bottom">
          <div className="pr-message">
            <h3 className="pr-message-title">Keep the right people working from the right information</h3>
            <p>
              When plans change, ASO helps keep the details connected. Event activity records supported changes, while
              production briefs, crew sheets, and authorized views reflect the current plan when opened.
            </p>
            <p className="pr-next">
              <span className="pr-next-tag">Planned</span>
              The next step is making those changes easier to act on: identifying affected information, preparing
              revised documents, and coordinating communications with the people who need them.
            </p>
          </div>

          <div className="pr-facts">
            <p className="pr-label">How it works</p>
            <ul>
              {FACTS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
