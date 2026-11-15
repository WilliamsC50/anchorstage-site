/**
 * Network: relationships. "The event ends. The connection doesn't have to."
 *
 * A completed event recedes into the background while the two organizations
 * that worked it stay joined in front by a line of light, marked
 * "Connected". A slow pulse travels the line; reduced motion holds it still.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): standing Network connections, voluntary
 * and separate from event participation, are not live in the application
 * yet. See app/(site)/network/page.tsx.
 *
 * Styling: app/(site)/network/network.css under .network-rel.
 */
export default function NetworkRelationships() {
  return (
    <section className="network-rel relative overflow-hidden bg-white" aria-labelledby="nr-title">
      <div className="nr-inner relative max-w-6xl mx-auto px-6">
        <div className="nr-copy">
          <h2 id="nr-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
            The event ends. The connection doesn&apos;t have to.
          </h2>
          <p className="nr-lead">
            Build relationships that extend beyond individual projects. Keep trusted collaborators within reach so
            future opportunities can begin with an existing connection.
          </p>
          <p className="nr-note">
            Connections are voluntary, and separate from access to any event.
          </p>
        </div>

        <figure
          className="nr-stage"
          role="img"
          aria-label="Illustration: Event A, completed, fades into the background. In front, Your Organization and Northstar Production remain connected."
        >
          <div aria-hidden="true" className="nr-event">
            <p className="nr-event-name">Event A</p>
            <p className="nr-event-status">Completed</p>
            <span className="nr-event-bars">
              <span style={{ width: "72%" }} />
              <span style={{ width: "54%" }} />
            </span>
          </div>

          <div className="nr-pair">
            <div className="nr-org">
              <span aria-hidden="true" className="nw-mono nw-mono-orange">
                Y
              </span>
              <span className="nr-org-name">Your Organization</span>
            </div>
            <div aria-hidden="true" className="nr-link">
              <span className="nr-pulse" />
              <span className="nr-link-label">Connected</span>
            </div>
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
