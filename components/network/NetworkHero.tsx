import OrgCard from "./OrgCard";

/**
 * Network: hero. "Good work builds connections. Keep them."
 *
 * Copy on the left; on the right, a staged composition of three
 * illustrative organization cards at different depths, with your
 * organization in front and two lines of light joining it to the others.
 * The lines carry a slow moving dash; reduced motion shows them still.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): the ASO Network as described here
 * (discovery, standing relationships) is the intended public-launch
 * experience, not verified live functionality. See app/(site)/network/page.tsx.
 *
 * Styling: app/(site)/network/network.css under .network-hero.
 */
export default function NetworkHero() {
  return (
    <section className="network-hero relative overflow-hidden" aria-labelledby="nh-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />
      <div aria-hidden="true" className="nh-light" />

      <div className="nh-inner relative max-w-6xl mx-auto px-6">
        <div className="nh-copy">
          <div className="flex items-center gap-3 mb-5">
            <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
            <p className="nh-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">Network</p>
          </div>
          <h1 id="nh-title" className="nh-title">
            Good work builds connections. <span className="nh-title-accent">Keep them.</span>
          </h1>
          <p className="nh-lead">
            The ASO Network brings the organizations behind your events together, making it easier to discover
            collaborators, work together, and maintain professional relationships beyond a single event.
          </p>
        </div>

        <figure
          className="nh-stage"
          role="img"
          aria-label="Illustration: your organization in front, connected to two other organizations behind it."
        >
          {/* Lines sit behind the cards; each runs from your organization to another. */}
          <svg aria-hidden="true" className="nh-lines nh-lines-wide" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className="nh-line-base" x1="50" y1="68" x2="22" y2="22" />
            <line className="nh-line-flow" x1="50" y1="68" x2="22" y2="22" pathLength={100} />
            <line className="nh-line-base" x1="50" y1="68" x2="78" y2="16" />
            <line className="nh-line-flow nh-line-flow-late" x1="50" y1="68" x2="78" y2="16" pathLength={100} />
          </svg>
          <svg aria-hidden="true" className="nh-lines nh-lines-narrow" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className="nh-line-base" x1="48" y1="74" x2="30" y2="12" />
            <line className="nh-line-flow" x1="48" y1="74" x2="30" y2="12" pathLength={100} />
            <line className="nh-line-base" x1="48" y1="74" x2="70" y2="40" />
            <line className="nh-line-flow nh-line-flow-late" x1="48" y1="74" x2="70" y2="40" pathLength={100} />
          </svg>

          <OrgCard
            className="nh-card nh-card-a"
            name="Northstar Production"
            category="Production company"
            region="Pacific Northwest"
            tone="slate"
          />
          <OrgCard className="nh-card nh-card-b" category="Venue" region="Great Lakes" tone="blue" />
          <OrgCard
            className="nh-card nh-card-you"
            name="Your Organization"
            mono="Y"
            category="Your operation"
            status="Connected with 2 organizations"
            tone="orange"
          />

          <figcaption className="nh-tag">Illustrative example</figcaption>
        </figure>
      </div>
    </section>
  );
}
