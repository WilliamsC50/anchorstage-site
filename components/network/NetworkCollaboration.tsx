/**
 * Network: collaboration. "Work together without giving up control."
 *
 * Two independent organizations, each keeping private records, and between
 * them one shared event: an invitation from Your Organization that Northstar
 * Production accepts. Only after acceptance is anything shared, and only what
 * the event needs. No buttons: the steps are shown, not operable.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): self-service invitations between
 * independent organizations, with acceptance, are not live in the
 * application yet (today an ASO admin sets up collaboration between
 * organizations). See app/(site)/network/page.tsx.
 *
 * Styling: app/(site)/network/network.css under .network-collab.
 */

const Lock = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);

const Org = ({ name, mono, tone }: { name: string; mono: string; tone: string }) => (
  <div className="nc-org">
    <div className="nc-org-head">
      <span aria-hidden="true" className={`nw-mono nw-mono-${tone}`}>
        {mono}
      </span>
      <span className="nc-org-name">{name}</span>
    </div>
    <div className="nc-private">
      <p className="nc-private-label">
        <Lock />
        Private records
      </p>
      <span aria-hidden="true" className="nc-bars">
        <span style={{ width: "78%" }} />
        <span style={{ width: "62%" }} />
        <span style={{ width: "70%" }} />
      </span>
      <p className="nc-private-note">Visible only to {name === "Your Organization" ? "Your Organization" : "Northstar"}</p>
    </div>
  </div>
);

export default function NetworkCollaboration() {
  return (
    <section className="network-collab relative overflow-hidden bg-aso-navy" aria-labelledby="nc-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
      <div aria-hidden="true" className="nc-light" />

      <div className="nc-inner relative max-w-6xl mx-auto px-6">
        <div className="nc-head">
          <h2 id="nc-title" className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Work together without giving up control.
          </h2>
          <p className="nc-lead">
            Invite another organization into an event without handing over your entire operation. Participation
            requires acceptance, and access stays limited to what the collaboration needs.
          </p>
        </div>

        <figure
          className="nc-stage"
          role="img"
          aria-label="Illustration: Your Organization invites Northstar Production to Event A, and Northstar accepts. By default only Event A's details and messages are shared; any additional event access is granted by the inviting organization. Each organization's own records stay private to it."
        >
          <Org name="Your Organization" mono="Y" tone="orange" />

          <div className="nc-flow">
            <span aria-hidden="true" className="nc-arrow nc-arrow-in">
              Invites
            </span>
            <div className="nc-event">
              <p className="nc-event-kicker">Shared event</p>
              <p className="nc-event-name">Event A</p>
              <ol className="nc-steps">
                <li className="is-done">
                  <span aria-hidden="true" className="nc-step-dot" />
                  Invitation sent
                </li>
                <li className="is-done">
                  <span aria-hidden="true" className="nc-step-dot" />
                  Invitation accepted
                </li>
              </ol>
              <p className="nc-shared">
                <span className="nc-shared-label">Default shared access</span>
                <span className="nc-shared-items">Event details · Messages</span>
              </p>
              <p className="nc-grant">Additional event access is granted by the inviting organization.</p>
            </div>
            <span aria-hidden="true" className="nc-arrow nc-arrow-out">
              Accepts
            </span>
          </div>

          <Org name="Northstar Production" mono="N" tone="slate" />
          <figcaption className="nc-tag">Illustrative example</figcaption>
        </figure>

        <p className="nc-note">
          Network connections are optional. Organizations can work together on an event without keeping a standing
          connection.
        </p>
      </div>
    </section>
  );
}
