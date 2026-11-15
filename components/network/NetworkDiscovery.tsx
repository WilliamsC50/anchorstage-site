import OrgCard from "./OrgCard";

/**
 * Network: discovery. "Find the right people to work with."
 *
 * A directory-like panel of illustrative published profiles: monogram,
 * category, general region, a few services, and a "Published profile" line.
 * Unnamed examples show a placeholder bar for the name. No search box,
 * filters, or buttons: nothing here pretends to be a working control.
 *
 * LAUNCH-DEPENDENT (DESIGN-14A.2): public organization profiles and
 * organization-controlled discoverability are not live in the application
 * yet. See app/(site)/network/page.tsx.
 *
 * Styling: app/(site)/network/network.css under .network-discovery.
 */

const PROFILES = [
  { name: "Northstar Production", category: "Production company", region: "Pacific Northwest", services: ["Staging", "Lighting"], tone: "slate" as const },
  { category: "Venue", region: "Great Lakes", services: ["Live music", "Private events"], tone: "blue" as const },
  { category: "Audio company", region: "Gulf Coast", services: ["Live sound", "Backline"], tone: "navy" as const },
  { category: "Rental house", region: "Southwest", services: ["Lighting", "Rigging"], tone: "slate" as const },
  { category: "Event organizer", region: "Mid-Atlantic", services: ["Festivals", "Corporate"], tone: "orange" as const },
  { category: "Freelance technician", region: "Mountain West", services: ["Stage management", "A2"], tone: "blue" as const },
];

export default function NetworkDiscovery() {
  return (
    <section className="network-discovery relative overflow-hidden bg-aso-bg" aria-labelledby="nd-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid-light" />

      <div className="nd-inner relative max-w-6xl mx-auto px-6">
        <div className="nd-head">
          <h2 id="nd-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
            Find the right people to work with.
          </h2>
          <p className="nd-lead">
            Explore organizations that choose to be discoverable. See what they do, where they work, and how they
            might fit your next project.
          </p>
          <p className="nd-note">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
            </svg>
            Profiles are private by default. Each organization decides whether to publish its own.
          </p>
        </div>

        <figure className="nd-directory" aria-labelledby="nd-directory-label">
          <div className="nd-directory-head">
            <p id="nd-directory-label" className="nd-directory-title">
              Published profiles
            </p>
            <span className="nd-tag">Illustrative example</span>
          </div>
          <ul className="nd-grid">
            {PROFILES.map((p, i) => (
              <li key={i} className={i >= 4 ? "nd-extra" : undefined}>
                <OrgCard
                  name={p.name}
                  category={p.category}
                  region={p.region}
                  services={p.services}
                  status="Published profile"
                  tone={p.tone}
                />
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
