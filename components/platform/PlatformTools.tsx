import type { ReactNode } from "react";
import WorkstationIcon from "@/components/WorkstationIcon";

/**
 * Platform: the Event Workstation and the tools around it.
 *
 * The Event Workstation sits in the centre as an illustrative app window (its
 * real section names, Setup open on the schedule). Around it, the supporting
 * tools grouped by what they do for events, each with one small, real
 * interface detail. Signage has a smaller specialized place with ASO setup
 * help; integrations and role-based access are each said once, at the foot.
 * Static: no interaction, no animation, no connecting lines.
 *
 * Verified against the application (DESIGN-13F.1-13F.3):
 *   - Event Workstation sections: Overview, Setup, Collaborators, Operations,
 *     Financials, Deliverables (EventWorkstationClient navEntries). Load-in is
 *     edited in Setup > Schedule / Timing.
 *   - Intake: requests arrive through the organization's request page
 *     (/request/{slug}); the queue shows "New" requests and a Create Event step.
 *   - Marketing: campaigns and tracking links (/r/{slug}); requests made after
 *     a tracking link are attributed to it through the organization's request
 *     page.
 *   - Inventory: gear items and packages, assigned on the event's gear page,
 *     which shows "Inventory Short - Short by N" when overlapping events
 *     promise more than is owned (visibility only).
 *   - Crew: roster, crew calls answered without an account (Available /
 *     Unavailable), revocable crew-sheet links. Collaborators: partner
 *     organizations with chosen permissions.
 *   - Financials: deposits and payments recorded by hand, payouts tracked to
 *     "marked paid", reporting across events. ASO does not process payments.
 *   - Documents: quote and invoice drafts take their lines from the event's
 *     packages, services, and crew (commercialScope); numbered, revisable,
 *     emailed from ASO when someone sends them. Messages between
 *     organizations.
 *   - Signage: screens are registered by ASO; the organization then runs
 *     sessions, notices, slideshows, and open-mic sign-up lists, live.
 *   - Integrations: a one-time export of an event to Google Calendar (not a
 *     sync); imports of clients, venues, and crew roster from a CSV file or
 *     Google Sheets. Nothing else (Drive, OneDrive, and so on) is live yet.
 * Never claim inventory creates quotes, payment processing, automatic
 * handoffs, calendar sync, or a fixed workflow.
 *
 * Styling: app/(site)/platform/platform.css under .platform-tools.
 */

const ICON = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

interface Tool {
  name: string;
  body: string;
  icon: ReactNode;
  /** One small interface detail from the real tool. */
  detail: ReactNode;
}

interface Group {
  id: string;
  label: string;
  tools: Tool[];
}

const GROUPS: Group[] = [
  {
    id: "in",
    label: "Bring work in",
    tools: [
      {
        name: "Intake",
        body: "Requests arrive through your own request page. Review each one and create the event when it's ready.",
        icon: (
          <svg {...ICON}>
            <path d="M4 13.5 6.6 6h10.8l2.6 7.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18Z" />
            <path d="M4 13.5h4.4l1.2 2.2h4.8l1.2-2.2H20" />
          </svg>
        ),
        detail: (
          <span className="pt-ui pt-ui-steps">
            <span className="pt-pill pt-pill-blue">New request</span>
            <span aria-hidden="true" className="pt-ui-arrow">
              →
            </span>
            <span className="pt-pill pt-pill-solid">Create event</span>
          </span>
        ),
      },
      {
        name: "Marketing",
        body: "Run campaigns and share tracking links. Requests that come in through them are credited to the campaign.",
        icon: <WorkstationIcon slug="marketing" className="h-[18px] w-[18px]" />,
        detail: (
          <span className="pt-ui pt-ui-link">
            <svg {...ICON} width={13} height={13}>
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
              <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
            Tracking link
          </span>
        ),
      },
    ],
  },
  {
    id: "res",
    label: "Ready the resources",
    tools: [
      {
        name: "Inventory",
        body: "Keep one catalog of gear and packages. Assign them to events and see a warning when overlapping events need more than you own.",
        icon: <WorkstationIcon slug="inventory" className="h-[18px] w-[18px]" />,
        detail: (
          <span className="pt-ui pt-ui-warn">
            <span aria-hidden="true" className="pt-dot" />
            Inventory short · Short by 2
          </span>
        ),
      },
      {
        name: "Crew & collaborators",
        body: "Fill roles from your roster, or post a crew call people can answer without an account. Add partners with the access you choose.",
        icon: (
          <svg {...ICON}>
            <circle cx="9" cy="9" r="3" />
            <path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M15.5 6.5a3 3 0 0 1 0 5.5M17.5 14.8c1.5.6 2.5 2 3 4.2" />
          </svg>
        ),
        detail: (
          <span className="pt-ui pt-ui-steps">
            <span className="pt-ui-key">Crew call</span>
            <span className="pt-pill pt-pill-green">Available</span>
          </span>
        ),
      },
    ],
  },
  {
    id: "biz",
    label: "Run the business",
    tools: [
      {
        name: "Financials",
        body: "Record deposits, payments, and payouts, and see what's outstanding across events. ASO organizes your financial records; it doesn't process payments.",
        icon: (
          <svg {...ICON}>
            <path d="M7 3.5h10v17l-2.5-1.4-2.5 1.4-2.5-1.4L7 20.5Z" />
            <path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h2.5" />
          </svg>
        ),
        detail: (
          <span className="pt-ui pt-ui-steps">
            <span className="pt-ui-key">Payout</span>
            <span className="pt-pill pt-pill-green">Marked paid</span>
          </span>
        ),
      },
      {
        name: "Documents & communications",
        body: "Quote and invoice drafts start from the event's packages, services, and crew. Issue, revise, and email them, and message your partners.",
        icon: (
          <svg {...ICON}>
            <path d="M7 3.5h7l4 4v13H7Z" />
            <path d="M14 3.5v4h4M9.5 13h5M9.5 16.5h5" />
          </svg>
        ),
        detail: (
          <span className="pt-ui pt-ui-steps">
            <span className="pt-ui-key">Invoice</span>
            <span className="pt-pill pt-pill-blue">Revision 2</span>
          </span>
        ),
      },
    ],
  },
];

const SECTIONS = ["Overview", "Setup", "Collaborators", "Operations", "Financials", "Deliverables"];

const ToolItem = ({ tool }: { tool: Tool }) => (
  <li className="pt-tool">
    <span className="pt-tool-icon">{tool.icon}</span>
    <div className="pt-tool-text">
      <h4 className="pt-tool-name">{tool.name}</h4>
      <p className="pt-tool-body">{tool.body}</p>
      <div className="pt-tool-detail">{tool.detail}</div>
    </div>
  </li>
);

export default function PlatformTools() {
  return (
    <section className="platform-tools relative overflow-hidden bg-white" aria-labelledby="pt-title">
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="pt-head">
          <h2 id="pt-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
            The Event Workstation and the tools around it
          </h2>
          <p className="pt-intro">
            Manage each event in its Event Workstation. Supporting tools bring work in, keep your crew and gear
            ready, and handle the business around your events. Use the ones you need.
          </p>
        </div>

        <div className="pt-grid">
          {/* The Event Workstation: an illustrative window with Setup open. */}
          <figure className="pt-ws" aria-labelledby="pt-ws-title">
            <div className="pt-ws-bar">
              <span aria-hidden="true" className="pt-ws-dots" />
              <span id="pt-ws-title" className="pt-ws-title">
                <WorkstationIcon slug="event" className="h-4 w-4" />
                Event Workstation
              </span>
              <span className="pt-ws-tag">Illustrative example</span>
            </div>
            <div className="pt-ws-body">
              <ul className="pt-ws-nav" aria-label="Event Workstation sections">
                {SECTIONS.map((name) => (
                  <li key={name} className={name === "Setup" ? "is-open" : undefined}>
                    {name}
                  </li>
                ))}
              </ul>
              <div className="pt-ws-pane">
                <p className="pt-ws-pane-title">Schedule</p>
                <dl className="pt-ws-rows">
                  <div>
                    <dt>Event date</dt>
                    <dd aria-hidden="true">
                      <span className="pt-bar" style={{ width: "62%" }} />
                    </dd>
                  </div>
                  <div className="is-changed">
                    <dt>Load-in</dt>
                    <dd>7:00 AM</dd>
                  </div>
                  <div>
                    <dt>Show starts</dt>
                    <dd aria-hidden="true">
                      <span className="pt-bar" style={{ width: "48%" }} />
                    </dd>
                  </div>
                </dl>
                <p className="pt-ws-pane-title pt-ws-parties">Parties</p>
                <dl className="pt-ws-rows pt-ws-parties">
                  <div>
                    <dt>Client</dt>
                    <dd aria-hidden="true">
                      <span className="pt-bar" style={{ width: "70%" }} />
                    </dd>
                  </div>
                  <div>
                    <dt>Venue</dt>
                    <dd aria-hidden="true">
                      <span className="pt-bar" style={{ width: "56%" }} />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <figcaption className="pt-ws-caption">
              Setup, collaborators, crew and gear, financials, and documents for one event, in one place.
            </figcaption>
          </figure>

          {GROUPS.map((group) => (
            <div key={group.id} className={`pt-group pt-group-${group.id}`}>
              <h3 className="pt-group-label">{group.label}</h3>
              <ul className="pt-tools">
                {group.tools.map((tool) => (
                  <ToolItem key={tool.name} tool={tool} />
                ))}
              </ul>
            </div>
          ))}

          {/* Specialized: smaller, with setup help. */}
          <div className="pt-group pt-group-spec">
            <h3 className="pt-group-label">Specialized</h3>
            <div className="pt-spec">
              <span className="pt-tool-icon">
                <WorkstationIcon slug="signage" className="h-[18px] w-[18px]" />
              </span>
              <div className="pt-tool-text">
                <h4 className="pt-tool-name">
                  Signage <span className="pt-setup">Set up with ASO</span>
                </h4>
                <p className="pt-tool-body">
                  Keep venue screens current with session details, notices, slideshows, and open-mic sign-up lists.
                  We set up your screens with you; then your team runs them.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-foot">
          {/* Integrations: what works today, and why it helps. */}
          <div className="pt-int">
            <span aria-hidden="true" className="pt-int-icon">
              <svg {...ICON}>
                <path d="M9 3.5v4M15 3.5v4" />
                <path d="M6.5 7.5h11V11a5.5 5.5 0 0 1-11 0Z" />
                <path d="M12 16.5v4" />
              </svg>
            </span>
            <div className="pt-int-text">
              <h3 className="pt-int-title">Works with tools you already use</h3>
              <p className="pt-int-body">
                Bring the client, venue, and crew information you already keep into ASO from a CSV file or Google
                Sheets instead of retyping it, and export an event to Google Calendar when you need it there.
              </p>
              <ul className="pt-int-list" aria-label="Integrations available today">
                <li>
                  <span className="pt-int-dir">Import</span>
                  CSV files · Google Sheets
                </li>
                <li>
                  <span className="pt-int-dir">Export</span>
                  Google Calendar
                </li>
              </ul>
            </div>
          </div>
          <p className="pt-access">
            <span className="pt-foot-label">Access</span>
            Your organization decides who uses each tool. Each person sees what their role allows.
          </p>
        </div>
      </div>
    </section>
  );
}
