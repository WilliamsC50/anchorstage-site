/**
 * Network: relationships. "The event ends. The connection doesn't have to."
 *
 * A compact standalone scene on a light blue-gray ground: a completed event
 * recedes behind two organization identities that stay side by side, with
 * one restrained "Connected" indicator between them. Static: no lines or
 * animation.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): standing Network connections, voluntary
 * and separate from event participation, are not live in the application
 * yet. See app/(site)/network/page.tsx.
 *
 * Styling: app/(site)/network/network.css under .network-rel.
 */
export default function NetworkRelationships() {
  return (
    <section className="network-rel relative overflow-hidden" aria-labelledby="nr-title">
      <div className="nr-inner relative max-w-6xl mx-auto px-6">
        <div className="nr-copy">
          <h2 id="nr-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
            The event ends. The connection doesn&apos;t have to.
          </h2>
          <p className="nr-lead">
            Build relationships that extend beyond individual projects. Keep trusted collaborators within reach so
            future opportunities can begin with an existing connection.
          </p>
          <p className="nr-note">Connections are voluntary, and separate from access to any event.</p>
        </div>

        <figure
          className="nr-stage"
          role="img"
          aria-label="Illustration: Event A, completed, recedes into the background. In front, Your Organization and Northstar Production remain connected."
        >
          <div aria-hidden="true" className="nr-event">
            <p className="nr-event-name">Event A</p>
            <p className="nr-event-status">Completed</p>
          </div>

          <div className="nr-pair">
            <div className="nr-org">
              <span aria-hidden="true" className="nw-mono nw-mono-orange">
                Y
              </span>
              <span className="nr-org-name">Your Organization</span>
            </div>
            <span className="nr-link">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 10 17l9-10" />
              </svg>
              Connected
            </span>
            <div className="nr-org">
              <span aria-hidden="true" className="nw-mono nw-mono-slate">
                N
              </span>
              <span className="nr-org-name">Northstar Production</span>
            </div>
          </div>
          <figcaption className="nr-tag">Illustrative example</figcaption>
        </figure>
      </div>
    </section>
  );
}
