import type { ReactNode } from "react";

/**
 * Platform: "Built around your organization".
 *
 * Typography-led. What an organization is, that the work belongs to it, the
 * three ways organizations work on ASO, and a closing statement (why build
 * your operation here) that leads into the Join ASO call to action.
 * No cards, no illustration, no interaction.
 *
 * Verified against the application (DESIGN-13G.1):
 *   - Every new account gets its own organization, with that person in
 *     charge of it. Roles carry no plans, tiers, or size limits.
 *   - Events, clients, venues, gear and packages, the crew roster,
 *     documents, and financial records belong to the organization, not to a
 *     user account; they stay when a person's membership ends.
 *   - People in one organization have roles that decide what they can view
 *     and manage. A person can belong to more than one organization.
 *   - Collaboration is per event, with organizations already on ASO: the
 *     owning organization adds a partner, which starts with view and message
 *     access, and the owner decides what else it can see or do and can remove
 *     it. Each organization keeps its own records.
 * Copy is written for open registration (founder direction, DESIGN-13G.2).
 * Do not describe the pilot's manual onboarding, internal role names, or
 * database terms; do not claim plan or tier parity statements.
 *
 * Styling: app/(site)/platform/platform.css under .platform-orgs.
 */

const ICON = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const OWNED = ["Events", "Clients", "Venues", "Gear", "Crew roster", "Documents", "Financial records"];

const WAYS: { id: string; title: string; body: string; icon: ReactNode }[] = [
  {
    id: "solo",
    title: "On your own",
    body: "Run your whole operation from your own organization. Every account starts with one, so you don't need a team to use ASO.",
    icon: (
      <svg {...ICON}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.9-3.6 3.6-5.5 7-5.5s6.1 1.9 7 5.5" />
      </svg>
    ),
  },
  {
    id: "team",
    title: "With your team",
    body: "Bring people into the same organization to work from the same events and records. Roles and permissions decide what each person can see and manage.",
    icon: (
      <svg {...ICON}>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        <path d="M15.5 6a3 3 0 0 1 0 5.6M17.5 15.3c1.5.6 2.5 2 3 4.2" />
      </svg>
    ),
  },
  {
    id: "partners",
    title: "With other organizations",
    body: "When an event calls for it, add another organization on ASO to that event. You choose what they can see and do there, and your organization's records stay yours.",
    icon: (
      <svg {...ICON}>
        <rect x="2.5" y="7" width="8" height="10" rx="1.5" />
        <rect x="13.5" y="7" width="8" height="10" rx="1.5" />
        <path d="M10.5 12h3" />
      </svg>
    ),
  },
];

export default function PlatformOrganizations() {
  return (
    <section className="platform-orgs relative overflow-hidden bg-aso-bg" aria-labelledby="po-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid-light" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* What an organization is, and why the work belongs to it. */}
        <div className="po-top">
          <div className="po-head">
            <h2 id="po-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight">
              Built around your organization
            </h2>
            <p className="po-intro">
              Whether you&apos;re an independent professional or a company with a full crew, your organization is your
              home on ASO. It&apos;s where your events, people, resources, and records belong, and where you decide who
              can work with them.
            </p>
          </div>

          <div className="po-own">
            <h3 className="po-own-title">The work belongs to your organization</h3>
            <p className="po-own-body">
              Not to any one person&apos;s account. As people come and go and projects start and finish, your
              organization keeps what it has built.
            </p>
            <ul className="po-owned" aria-label="What your organization keeps">
              {OWNED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Three ways organizations work. */}
        <ul className="po-ways" aria-label="How organizations work on ASO">
          {WAYS.map((way) => (
            <li key={way.id} className="po-way">
              <span className="po-way-icon">{way.icon}</span>
              <h3 className="po-way-title">{way.title}</h3>
              <p className="po-way-body">{way.body}</p>
            </li>
          ))}
        </ul>

        {/* The culmination, leading into the call to action. */}
        <div className="po-next">
          <h3 className="po-next-title">Build an operation that&apos;s ready for what&apos;s next.</h3>
          <p className="po-next-body">
            Your organization brings your events, people, resources, and experience together, so every job builds on
            the work you&apos;ve already done. Start new events from what&apos;s already on file, and keep it all
            together as you grow.
          </p>
        </div>
      </div>
    </section>
  );
}
