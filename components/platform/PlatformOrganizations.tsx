/**
 * Platform: Organizations. Who owns the work, and how people and
 * organizations take part.
 *
 * One navy section: four numbered points beside one picture of two
 * organization workspaces, using clearly fictional example names (founder
 * supplied, DESIGN-13G.6): "Your Organization", the freelancer "Alex Rivera",
 * and "Northstar Production". The picture shows:
 *   - each organization with its own records and members;
 *   - Alex in both organizations with the same identity but different access
 *     (blue, marked 3: membership);
 *   - "Event A", owned by Your Organization, with Northstar on it as a
 *     partner with event-only access (orange, marked 4: collaboration).
 * No lines between the panels, no legend, no network, no dashboard, no
 * animation.
 *
 * Verified against the application (DESIGN-13G.1, 13G.5, 13G.6):
 *   - Every account starts with its own organization; roles carry no plans
 *     or tiers.
 *   - Events, clients, venues, gear, the crew roster, documents, and
 *     financial records belong to the organization, not a user account, and
 *     stay when a membership ends.
 *   - Roles are scoped to one organization: full control (owner), managing
 *     day-to-day work (admin), viewing the work (member).
 *   - One person can belong to several organizations, with a separate role
 *     in each; pages that act for an organization ask which one, so records
 *     are not merged and one membership grants nothing in the other.
 *   - Collaboration is per event, with organizations already on ASO: the
 *     event's organization adds the partner (default: view event details and
 *     message) and decides what else it can see or do. The partner sees the
 *     event among the events it takes part in; each keeps its own records.
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
    body: "Freelancers and production professionals, like Alex in the example, can belong to several organizations. In each, they work with the access that organization gives them, and each organization's records stay its own.",
  },
  {
    n: 4,
    title: "Partners on a specific event",
    body: "An organization can bring another organization on ASO onto one of its events, like Northstar on Event A. The event's organization decides what the partner can see and do there. Neither gets the other's records.",
  },
];

const Marker = ({ n }: { n: number }) => (
  <span aria-hidden="true" className={`po-num po-num-${n}`}>
    {n}
  </span>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5.5 20c.8-3.4 3.3-5.2 6.5-5.2s5.7 1.8 6.5 5.2" />
  </svg>
);

/** A member row. Alex keeps the same avatar and treatment in both panels. */
const Member = ({ name, access, alex = false }: { name: string; access: string; alex?: boolean }) => (
  <li className={alex ? "po-member is-alex" : "po-member"}>
    <span aria-hidden="true" className="po-avatar">
      {alex ? "AR" : <PersonIcon />}
    </span>
    <span className="po-member-name">{name}</span>
    <span className="po-access">{access}</span>
    {alex && <Marker n={3} />}
  </li>
);

const Records = ({ label }: { label: string }) => (
  <p className="po-records">
    <span aria-hidden="true" className="po-files">
      <span />
      <span />
      <span />
    </span>
    {label}
  </p>
);

/** Event A as each organization sees it. */
const EventA = ({ role, access }: { role: string; access?: string }) => (
  <div className="po-event">
    <p className="po-event-line">
      <span className="po-event-name">Event A</span>
      <span className="po-event-role">{role}</span>
      <Marker n={4} />
    </p>
    {access && <p className="po-event-access">{access}</p>}
  </div>
);

export default function PlatformOrganizations() {
  return (
    <section className="platform-orgs relative overflow-hidden bg-aso-navy" aria-labelledby="po-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
      <div aria-hidden="true" className="po-glow" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="po-head">
          <h2 id="po-title" className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Your organization owns its work
          </h2>
          <p className="po-intro">
            Your organization is your workspace on ASO. It&apos;s where your events, resources, and records belong,
            whether you&apos;re working independently or running a team.
          </p>
        </div>

        <div className="po-body">
          {/* The example: two organizations, one shared person, one shared event. */}
          <figure
            className="po-model"
            role="img"
            aria-label="Example with fictional names. Your Organization has its own events and records; its members are you with full control, a team member who views the work, and Alex Rivera, who manages day-to-day work. Northstar Production has its own events and records; Alex Rivera is also a member there, with access to view the work only. Event A is owned by Your Organization; Northstar Production takes part in it as a partner, with access to the event details and messages only."
          >
            <div className="po-ws">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono">
                  Y
                </span>
                <span className="po-ws-name">Your Organization</span>
              </div>
              <Records label="Your events and records" />
              <ul className="po-members">
                <Member name="You" access="Full control" />
                <Member name="Team member" access="Views the work" />
                <Member name="Alex Rivera" access="Manages day-to-day work" alex />
              </ul>
              <EventA role="Owned by your organization" />
            </div>

            <div className="po-ws po-ws-other">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono po-mono-other">
                  N
                </span>
                <span className="po-ws-name">Northstar Production</span>
              </div>
              <Records label="Northstar's own events and records" />
              <ul className="po-members">
                <Member name="Alex Rivera" access="Views the work" alex />
              </ul>
              <EventA role="Partner access" access="Event details · Messages" />
            </div>
          </figure>

          {/* The four points. */}
          <ol className="po-points">
            {POINTS.map((point) => (
              <li key={point.n} className="po-point">
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
