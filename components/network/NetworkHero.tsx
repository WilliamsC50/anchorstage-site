/**
 * Network: hero. "Good work builds connections. Keep them."
 *
 * Copy on the left; on the right, a fanned stack of organization identity
 * cards with depth: Your Organization in front, and behind it two
 * organizations it already works with, each marked with a small relationship
 * indicator ("Worked together", "Connected"). No connecting lines. The two
 * rear cards drift very slightly; reduced motion holds them still.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): the ASO Network as described here
 * (discovery, standing relationships) is the intended public-launch
 * experience, not verified live functionality. See app/(site)/network/page.tsx.
 *
 * Example names are founder supplied and fictional (DESIGN-14A.3).
 *
 * Styling: app/(site)/network/network.css under .network-hero.
 */

const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);

const Card = ({
  name,
  mono,
  tone,
  role,
  region,
  badge,
  className,
}: {
  name: string;
  mono: string;
  tone: string;
  role: string;
  region?: string;
  badge?: string;
  className: string;
}) => (
  <div className={`nh-card ${className}`}>
    <div className="nh-card-head">
      <span aria-hidden="true" className={`nw-mono nw-mono-${tone}`}>
        {mono}
      </span>
      <div className="nh-card-id">
        <p className="nh-card-name">{name}</p>
        <p className="nh-card-role">
          {role}
          {region && (
            <>
              <span aria-hidden="true" className="nw-card-dot">
                {" "}
                ·{" "}
              </span>
              {region}
            </>
          )}
        </p>
      </div>
    </div>
    {badge && (
      <p className="nh-badge">
        <Check />
        {badge}
      </p>
    )}
  </div>
);

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
          aria-label="Illustration: Your Organization in front, with two organizations it works with behind it: Northstar Production, marked Worked together, and Harborlight Venues, marked Connected."
        >
          <div aria-hidden="true" className="nh-spot" />
          <Card
            className="nh-card-back nh-card-left"
            name="Northstar Production"
            mono="N"
            tone="slate"
            role="Production company"
            region="Pacific Northwest"
            badge="Worked together"
          />
          <Card
            className="nh-card-back nh-card-right"
            name="Harborlight Venues"
            mono="H"
            tone="blue"
            role="Venue"
            region="Great Lakes"
            badge="Connected"
          />
          <div className="nh-card nh-card-front">
            <div className="nh-card-head">
              <span aria-hidden="true" className="nw-mono nw-mono-orange">
                Y
              </span>
              <div className="nh-card-id">
                <p className="nh-card-name">Your Organization</p>
                <p className="nh-card-role">Your operation</p>
              </div>
            </div>
            <p className="nh-conns">
              <span className="nh-conns-label">Your connections</span>
              <span aria-hidden="true" className="nh-mini nw-mono-slate">
                N
              </span>
              <span aria-hidden="true" className="nh-mini nw-mono-blue">
                H
              </span>
            </p>
          </div>
          <figcaption className="nh-tag">Illustrative example</figcaption>
        </figure>
      </div>
    </section>
  );
}
