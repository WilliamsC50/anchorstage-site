/**
 * Platform: Organizations. Who owns the work, and how people and
 * organizations take part.
 *
 * One section, one identity: four plain-language points beside a single
 * explanatory picture of two organization workspaces. Numbered markers tie
 * each point to the part of the picture it describes:
 *   1  the organization's records (ownership),
 *   2  its members and their access (on your own or with a team),
 *   3  one person who belongs to both organizations with different access
 *      in each (blue: membership),
 *   4  a partner organization on one event, with event-only access
 *      (orange, dashed: collaboration).
 * No lines between the panels, no network, no dashboard, no animation.
 *
 * Verified against the application (DESIGN-13G.1, 13G.5):
 *   - Every account starts with its own organization; roles carry no plans
 *     or tiers.
 *   - Events, clients, venues, gear, the crew roster, documents, and
 *     financial records belong to the organization, not a user account, and
 *     stay when a membership ends.
 *   - Roles are scoped to one organization: full control (owner), managing
 *     day-to-day work (admin), viewing the work (member).
 *   - One person can belong to several organizations, with a separate role
 *     in each; pages that act for an organization ask which one, so their
 *     records are not merged.
 *   - Collaboration is per event, with organizations already on ASO: the
 *     event's organization adds the partner (default: view event details and
 *     message) and decides what else it can see or do. Each organization
 *     keeps its own records.
 * Do not describe pilot onboarding, self-service member management, internal
 * role names, database terms, or tiers.
 *
 * Styling: app/(site)/platform/platform.css under .platform-orgs.
 */

const POINTS = [
  {
    n: 1,
    title: "It owns the work",
    body: "Events, clients, venues, gear, documents, and financial records belong to the organization, not to any one member's account. They stay with it as projects and people change.",
  },
  {
    n: 2,
    title: "On your own or with a team",
    body: "Run your organization by yourself, or work in it with others. Each member's role decides what they can view and manage.",
  },
  {
    n: 3,
    title: "One person, more than one organization",
    body: "Freelancers and production professionals can belong to several organizations. In each, they work with the access that organization gives them, and each organization's records stay its own.",
  },
  {
    n: 4,
    title: "Partners on a specific event",
    body: "An organization can bring another organization on ASO onto one of its events. The event's organization decides what the partner can see and do there. Neither gets the other's records.",
  },
];

const Marker = ({ n }: { n: number }) => (
  <span aria-hidden="true" className={`po-num po-num-${n}`}>
    {n}
  </span>
);

const Person = ({ label, access, shared = false }: { label: string; access: string; shared?: boolean }) => (
  <li className={shared ? "po-person is-shared" : "po-person"}>
    <span aria-hidden="true" className="po-avatar">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5.5 20c.8-3.4 3.3-5.2 6.5-5.2s5.7 1.8 6.5 5.2" />
      </svg>
    </span>
    <span className="po-person-name">{label}</span>
    <span className="po-access">{access}</span>
  </li>
);

const Records = ({ label }: { label: string }) => (
  <div className="po-records">
    <span aria-hidden="true" className="po-files">
      <span />
      <span />
      <span />
    </span>
    <span className="po-records-label">{label}</span>
  </div>
);

export default function PlatformOrganizations() {
  return (
    <section className="platform-orgs relative overflow-hidden bg-aso-bg" aria-labelledby="po-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid-light" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="po-head">
          <h2 id="po-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
            Your organization owns its work
          </h2>
          <p className="po-intro">
            Your organization is your workspace on ASO. It&apos;s where your events, resources, and records belong,
            whether you&apos;re working independently or running a team.
          </p>
        </div>

        <div className="po-body">
          {/* The picture: two organization workspaces. */}
          <figure
            className="po-model"
            role="img"
            aria-label="Example: your organization holds its own records and members with different access. One freelancer belongs to your organization and to another organization, with separate access in each. The other organization is a partner on one of your events, with access to that event only."
          >
            <div className="po-ws po-ws-yours">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono">
                  Y
                </span>
                <span className="po-ws-name">Your organization</span>
              </div>

              <div className="po-ws-row">
                <Marker n={1} />
                <Records label="Your events and records" />
              </div>

              <div className="po-ws-row">
                <Marker n={2} />
                <ul className="po-people">
                  <Person label="You" access="Full control" />
                  <Person label="Team member" access="Manages day-to-day work" />
                  <Person label="Freelancer" access="Manages day-to-day work" shared />
                </ul>
              </div>

              <div className="po-ws-row">
                <Marker n={4} />
                <div className="po-event">
                  <p className="po-event-name">One of your events</p>
                  <p className="po-partner">
                    <span className="po-partner-label">Partner on this event</span>
                    <span className="po-partner-org">Another organization</span>
                  </p>
                  <p className="po-scopes">
                    <span>Event details</span>
                    <span>Messages</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="po-ws po-ws-other">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono po-mono-other">
                  A
                </span>
                <span className="po-ws-name">Another organization</span>
              </div>

              <div className="po-ws-row">
                <span aria-hidden="true" className="po-num po-num-blank" />
                <Records label="Its own events and records" />
              </div>

              <div className="po-ws-row">
                <Marker n={3} />
                <ul className="po-people">
                  <Person label="Freelancer" access="Views the work" shared />
                  <Person label="Their team" access="Their own roles" />
                </ul>
              </div>
            </div>

            <figcaption className="po-key">
              <span className="po-key-item po-key-member">Same person, separate access in each organization</span>
              <span className="po-key-item po-key-partner">Access to one event only</span>
            </figcaption>
          </figure>

          {/* The four points, numbered to match the picture. */}
          <ol className="po-points">
            {POINTS.map((point) => (
              <li key={point.n} className={`po-point po-point-${point.n}`}>
                <Marker n={point.n} />
                <div>
                  <h3 className="po-point-title">{point.title}</h3>
                  <p className="po-point-body">{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
