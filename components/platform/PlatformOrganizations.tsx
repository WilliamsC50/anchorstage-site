/**
 * Platform: Organizations. Who owns the work, and how people and
 * organizations take part.
 *
 * One navy section: four numbered points beside one picture of two
 * organization workspaces, using clearly fictional example names (founder
 * supplied, DESIGN-13G.6): "Your Organization", the freelancer "Alex Rivera",
 * and "Northstar Production". Each point's number appears in the picture
 * beside what it describes (3 and 4 in both panels):
 *   1  Your Organization's events and records,
 *   2  its members (you as owner, a team member, Alex),
 *   3  Alex, a member of both organizations with different access (blue),
 *   4  Event A, owned by Your Organization, with Northstar as an event
 *      partner (orange); Northstar sees it as shared, separate from its own.
 * No legend, lines, dashboard, or animation.
 *
 * Verified against the application (DESIGN-13G.1, 13G.5, 13G.6):
 *   - Events, clients, venues, gear, the crew roster, documents, and
 *     financial records belong to the organization, not a user account, and
 *     stay when a membership ends.
 *   - Roles are scoped to one organization: full control (owner), managing
 *     the work (admin: every operational area), viewing the work (member).
 *   - One person can belong to several organizations, with a separate role
 *     in each; one membership grants nothing in another.
 *   - Collaboration is per event, with organizations already on ASO: the
 *     event's organization adds the partner directly ("Add Collaborator"; no
 *     invitation or acceptance step, so the copy says "added", not
 *     "invited"), with default access to view event details and message, and
 *     decides what else it can see or do. Partner organizations
 *     are not members of the owner's organization; each keeps its own
 *     records, and the partner sees the event among the events it takes part
 *     in.
 * Do not describe pilot onboarding or how members are added, self-service
 * member management, internal role names, database terms, or tiers.
 *
 * Styling: app/(site)/platform/platform.css under .platform-orgs.
 */

import type { ReactNode } from "react";

const POINTS = [
  {
    n: 1,
    title: "Your records stay together",
    body: "Your events, clients, venues, gear, documents, and financial records remain with your organization as projects finish and people come and go.",
  },
  {
    n: 2,
    title: "Build your own team",
    body: "Work independently or add members to your organization. Each member works within your organization's workspace, with access based on their role.",
  },
  {
    n: 3,
    title: "One person, more than one organization",
    body: "Freelancers and production professionals, like Alex in the example, can belong to several organizations independently. Each organization sets their access, and access in one doesn't carry over to another.",
  },
  {
    n: 4,
    title: "Collaborate with another organization",
    body: "Bring another ASO organization into a specific event without adding its people to your team. You control what the partner can access, and each organization keeps its own records.",
  },
];

const Marker = ({ n }: { n: number }) => (
  <span aria-hidden="true" className={`po-num po-num-${n}`}>
    {n}
  </span>
);

/** One block of a workspace panel: an optional marker in the left gutter. */
const Row = ({ n, children }: { n?: number; children: ReactNode }) => (
  <div className="po-row">
    {n ? <Marker n={n} /> : <span aria-hidden="true" className="po-gutter" />}
    <div className="po-row-body">{children}</div>
  </div>
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
    <svg
      aria-hidden="true"
      className="po-folder"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4.2l1.8 2H19a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5Z" />
      <path d="M3.5 11h17" />
    </svg>
    {label}
  </p>
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
            aria-label="Example with fictional names, showing two separate organizations. Your Organization keeps its own events and records. Its members are you, the owner, with full control; a team member who views the work; and Alex Rivera, who manages the work. Your Organization owns Event A and has Northstar Production as its event partner, with access to the event details and messages only. Northstar Production keeps its own events and records. Alex Rivera is also a member there, with access to view the work only. Event A is shared with Northstar as a partner; it is not one of Northstar's own events."
          >
            <div className="po-ws">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono">
                  Y
                </span>
                <span className="po-ws-title">
                  <span className="po-ws-name">Your Organization</span>
                  <span className="po-ws-sub">Your workspace</span>
                </span>
              </div>

              <Row n={1}>
                <Records label="Your events and records" />
              </Row>

              <Row n={2}>
                <p className="po-label">Members</p>
                <ul className="po-members">
                  <Member name="You" access="Owner · Full control" />
                  <Member name="Team member" access="Views the work" />
                  <Member name="Alex Rivera" access="Manages the work" alex />
                </ul>
              </Row>

              <Row n={4}>
                <div className="po-event">
                  <p className="po-event-line">
                    <span className="po-event-name">Event A</span>
                    <span className="po-badge po-badge-owner">Event owner</span>
                  </p>
                  <p className="po-event-partner">
                    You added <strong>Northstar Production</strong> as a partner.
                  </p>
                  <p className="po-event-access">You control their access: Event details · Messages</p>
                </div>
              </Row>
            </div>

            <div className="po-ws po-ws-other">
              <div className="po-ws-head">
                <span aria-hidden="true" className="po-mono po-mono-other">
                  N
                </span>
                <span className="po-ws-title">
                  <span className="po-ws-name">Northstar Production</span>
                  <span className="po-ws-sub">Collaborating organization</span>
                </span>
              </div>

              <Row>
                <Records label="Northstar's own events and records" />
              </Row>

              <Row>
                <p className="po-label">Members</p>
                <ul className="po-members">
                  <Member name="Alex Rivera" access="Views the work" alex />
                </ul>
              </Row>

              <Row n={4}>
                <div className="po-event">
                  <p className="po-event-line">
                    <span className="po-event-name">Event A</span>
                    <span className="po-badge po-badge-partner">Event partner</span>
                  </p>
                  <p className="po-event-partner">Shared with Northstar. Event details and messages.</p>
                </div>
              </Row>
            </div>
          </figure>

          {/* The four points. */}
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
