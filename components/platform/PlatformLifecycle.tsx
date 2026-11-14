"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Platform: "From Intake to Invoice".
 *
 * Five stages of work an organization controls on ASO, shown as a connected
 * run of stations. Every stage is visible at once (number, name, summary);
 * choosing one opens its detail: what you control there, how, and what you
 * can manage. Stages can be chosen in any order and nothing advances on its
 * own: the stages illustrate what is available, not a required sequence.
 *
 * WAI-ARIA tabs: arrow keys, Home, and End move between stages (automatic
 * activation). Inactive panels are hidden and inert. On desktop, Stages 01-04
 * share one height so moving between them never shifts the page; Stage 05,
 * the longest, takes its extra room only while it is chosen.
 *
 * Every claim is verified against the application (DESIGN-13D.1/13D.2). Keep
 * it that way: no real-time updates, no payment processing or payout
 * transfers (ASO records payments; it does not collect or move money), no
 * unrestricted partner access, and campaign tracking stated within its scope
 * (clicks on campaign links; requests and bookings only through the
 * organization's ASO request page). The section describes what organizations
 * can manage today, not future direction.
 *
 * Styling: app/(site)/platform/platform.css under .platform-lifecycle.
 */

interface Stage {
  id: string;
  name: string;
  /** What the visitor controls in this stage: the panel's lead. */
  control: string;
  summary: string;
  body: string[];
  manageLabel: string;
  manage: string[];
  icon: ReactNode;
  link?: { label: string; href: string };
  /** A short clarification under the explanation, set quieter than it. */
  note?: string;
}

const ICON = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const STAGES: Stage[] = [
  {
    id: "intake",
    name: "Intake & Planning",
    control: "Control how new work enters your organization and becomes a planned event.",
    summary: "Take in requests and turn the right ones into quoted events.",
    body: [
      "Every organization gets its own request page with its name and logo, so new work arrives in one consistent format instead of scattered across texts and emails. Review requests, keep client and venue details on file, create single events or recurring series, and prepare numbered quotes.",
    ],
    manageLabel: "What you can manage",
    manage: ["Branded request page", "Reusable client and venue records", "Individual and recurring events", "Numbered quotes and PDFs"],
    icon: (
      <svg {...ICON}>
        <path d="M4 13.5 6.6 6h10.8l2.6 7.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18Z" />
        <path d="M4 13.5h4.4l1.2 2.2h4.8l1.2-2.2H20" />
      </svg>
    ),
  },
  {
    id: "production",
    name: "Build the Production",
    control: "Control staffing, equipment assignments, and production resources.",
    summary: "Staff the show and assign gear from what you already have.",
    body: [
      "Fill the roles an event needs from your private crew roster, or post a crew call that people can answer through a link without an account. Assign individual gear and packages from your inventory and see where each one is committed.",
    ],
    manageLabel: "What you can manage",
    manage: ["Private crew roster", "Crew calls without required accounts", "Gear and package assignments", "Event-specific resource commitments"],
    icon: (
      <svg {...ICON}>
        <rect x="3.5" y="7.5" width="17" height="12" rx="1.6" />
        <path d="M9 7.5V5.2h6v2.3M3.5 12h17M10.5 12v2h3v-2" />
      </svg>
    ),
  },
  {
    id: "prepare",
    name: "Prepare & Share",
    control: "Maintain visibility over event readiness and control who receives operational information.",
    summary: "Catch gaps before show day and share the plan with the right people.",
    body: [
      "Readiness checks flag details that still need attention. Review, print, or save production briefs and packing lists as PDFs. Share a read-only crew sheet through a private link you can revoke, and give authorized participants access suited to their responsibilities.",
    ],
    manageLabel: "What you can manage",
    manage: ["Event readiness checks", "Production briefs and packing lists", "Revocable crew-sheet links", "Permission-controlled access"],
    link: { label: "How organizations work together", href: "/network" },
    icon: (
      <svg {...ICON}>
        <rect x="5.5" y="4.5" width="13" height="16" rx="1.6" />
        <path d="M9.5 4.5V3h5v1.5M9 12.5l2 2 4-4.2" />
      </svg>
    ),
  },
  {
    id: "invoice",
    name: "Invoice & Close Out",
    control: "Maintain control over the financial side of completed and ongoing work.",
    summary: "Invoice the job and track what's paid and what you owe.",
    body: [
      "Issue numbered invoices from the event, record deposits and client payments as they arrive, and track crew and partner payouts until they're marked paid. Financials brings income, expenses, outstanding amounts, and projected profit together across events and reporting periods.",
    ],
    note: "ASO organizes financial records but does not currently collect, process, or transfer payments. Your organization controls which financial information it records.",
    manageLabel: "What you can manage",
    manage: ["Numbered invoices and PDFs", "Manually recorded deposits and payments", "Crew and partner payout tracking", "Financial reporting across events"],
    icon: (
      <svg {...ICON}>
        <path d="M7 3.5h10v17l-2.5-1.4-2.5 1.4-2.5-1.4L7 20.5Z" />
        <path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h2.5" />
      </svg>
    ),
  },
  {
    id: "beyond",
    name: "Build on Every Event",
    control: "Turn completed work into a stronger starting point for the next opportunity.",
    summary: "Use what you've already built to win, quote, and prepare the next job.",
    body: [
      "Every completed event leaves useful information behind. Revisit client and venue details, previous production plans, crew assignments, gear needs, and financial records when preparing new work. Build on those records instead of starting from scratch.",
      "The Marketing Workstation provides tools to create and manage campaigns that can generate new requests and bookings, helping turn past work into future opportunities.",
    ],
    manageLabel: "What you can manage",
    manage: [
      "Event and client history",
      "Previous production and financial records",
      "Marketing campaigns and creative assets",
      "Campaign clicks and ASO request-page conversions",
    ],
    icon: (
      <svg {...ICON}>
        <path d="m12 4 8 4-8 4-8-4Z" />
        <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
      </svg>
    ),
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function PlatformLifecycle() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const next = (i + STAGES.length) % STAGES.length;
    setSelected(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: selected + 1,
      ArrowDown: selected + 1,
      ArrowLeft: selected - 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: STAGES.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  };

  return (
    <section className="platform-lifecycle relative overflow-hidden bg-aso-bg" aria-labelledby="pl-title">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid-light" />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 md:pt-16 lg:pt-14">
        <div className="pl-head">
          <h2 id="pl-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-4">
            From Intake to Invoice
          </h2>
          <p className="pl-intro">
            Keep control of each event from the first request to the final invoice, with its people, gear,
            documents, and finances in one place. Manage the work your way, with the information and tools you need
            at every step.
          </p>
        </div>

        <div className="pl-flow" style={{ ["--sel" as string]: selected }}>
          <div
            role="tablist"
            aria-label="Event lifecycle stages"
            className="pl-track"
            onKeyDown={onKeyDown}
          >
            {STAGES.map((stage, i) => (
              <button
                key={stage.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`pl-tab-${stage.id}`}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-controls={`pl-panel-${stage.id}`}
                aria-labelledby={`pl-name-${stage.id}`}
                aria-describedby={`pl-sum-${stage.id}`}
                tabIndex={i === selected ? 0 : -1}
                className={`pl-tab ${i === selected ? "is-selected" : ""} ${i === STAGES.length - 1 ? "is-beyond" : ""}`}
                onClick={() => select(i)}
              >
                <span className="pl-node">{stage.icon}</span>
                <span className="pl-tab-text">
                  <span className="pl-num">Stage {num(i)}</span>
                  <span className="pl-name" id={`pl-name-${stage.id}`}>
                    {stage.name}
                  </span>
                  <span className="pl-sum" id={`pl-sum-${stage.id}`}>
                    {stage.summary}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="pl-panels">
            {STAGES.map((stage, i) => {
              const active = i === selected;
              return (
                <div
                  key={stage.id}
                  id={`pl-panel-${stage.id}`}
                  role="tabpanel"
                  aria-labelledby={`pl-tab-${stage.id}`}
                  tabIndex={active ? 0 : -1}
                  inert={!active}
                  className={`pl-panel ${active ? "is-active" : ""} ${i === STAGES.length - 1 ? "is-beyond" : ""}`}
                >
                  <div className="pl-panel-main">
                    <div className="pl-panel-copy">
                      <p className="pl-panel-kicker">
                        Stage {num(i)} · {stage.name}
                      </p>
                      <h3 className="pl-control">{stage.control}</h3>
                      <p className="pl-panel-summary">{stage.summary}</p>
                      {stage.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)} className="pl-body">
                          {paragraph}
                        </p>
                      ))}
                      {stage.note && <p className="pl-note">{stage.note}</p>}
                      {stage.link && (
                        <Link href={stage.link.href} className="pl-link">
                          {stage.link.label}
                          <span aria-hidden="true"> →</span>
                        </Link>
                      )}
                    </div>

                    <div className="pl-side">
                      <div className="pl-manage">
                        <p className="pl-manage-label">{stage.manageLabel}</p>
                        <ul>
                          {stage.manage.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Into the Connected Operating Record section below. */}
        <div className="pl-transition">
          <p>Every stage contributes to the same event record.</p>
        </div>
      </div>
    </section>
  );
}
