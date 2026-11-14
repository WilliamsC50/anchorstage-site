"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Platform: "From Intake to Invoice — and Beyond".
 *
 * Five stages of work an organization controls on ASO, shown as a connected
 * run of stations. Every stage is visible at once (number, name, summary);
 * choosing one opens its detail: what you control there, how, and what you
 * can manage. Stages can be chosen in any order and nothing advances on its
 * own: the stages illustrate what is available, not a required sequence.
 *
 * WAI-ARIA tabs: arrow keys, Home, and End move between stages (automatic
 * activation). Inactive panels are hidden and inert. On desktop, Stages 01-04
 * keep one shared height so moving between them never shifts the page; Stage
 * 05 adds its Looking ahead content only while it is chosen.
 *
 * Every claim is verified against the application (DESIGN-13D.1/13D.2). Keep
 * it that way: no real-time updates, no payment processing or payout
 * transfers, no unrestricted partner access, and the Stage 05 "Looking ahead"
 * text is future direction, kept visibly secondary.
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
  ahead?: string[];
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
    summary: "Collect requests on your own request page and turn the right ones into planned, quoted events.",
    body: [
      "Every organization gets its own request page carrying its name and logo, so new work arrives in a consistent format instead of scattered across texts and emails. Review requests, maintain client and venue information, and create events when work is confirmed. Start individual events or recurring series, and prepare numbered quotes.",
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
    summary: "Staff the show and assign the gear, starting from the people and inventory you already have.",
    body: [
      "Define the roles an event needs and assign people from your private crew roster. Create crew calls that people can respond to through a link without needing an account. Track confirmed assignments, allocate individual equipment and inventory packages, and identify where resources are committed.",
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
    summary: "Catch what's missing before show day, then share the plan with the people who need it.",
    body: [
      "Use readiness checks to identify details that need attention. Generate production briefs and packing lists for review, printing, or PDF export. Share a read-only crew sheet through a revocable private link, and give authorized participants access to the information appropriate to their responsibilities.",
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
    summary: "Invoice the job, record what's been paid, and keep track of what you owe crew and partners.",
    body: [
      "Issue numbered invoices from the event and record deposits and client payments as they arrive. Track crew and partner payouts until they're marked paid. Financials brings together income, expenses, outstanding amounts, and projected profit across events and reporting periods.",
    ],
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
    control: "Retain organized records that support future work and better business decisions.",
    summary: "Keep the operational history you've built and put it to work on future events, campaigns, and opportunities.",
    body: [
      "Completed events remain part of your organization's history, including clients, venues, crew, documents, and financial information. Reference previous work when preparing future jobs.",
      "The Marketing Workstation supports campaign planning, creative production, approval, distribution, and tracking. Campaign clicks can be recorded, while requests and bookings are tracked for links leading to the organization's ASO request page.",
    ],
    manageLabel: "Available today",
    manage: [
      "Event, client, and venue history",
      "Retained production and financial records",
      "Marketing campaigns and creative assets",
      "Campaign click, request, and booking tracking, within their supported scope",
    ],
    ahead: [
      "We're building toward business intelligence that connects operational, financial, marketing, audience, and sponsorship information where reliable data is available.",
      "The goal is to help organizations distinguish verified records, user-provided figures, and estimates so they can make more informed business decisions and develop stronger client pitches, marketing strategies, and sponsorship proposals.",
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

      <div className="relative max-w-6xl mx-auto px-6 pt-20 md:pt-28">
        <div className="max-w-3xl">
          <h2 id="pl-title" className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
            From Intake to Invoice — and Beyond
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Keep control of your operations from the first request through the final invoice. Bring the people,
            gear, documents, and financial details of each event together, using the tools your work actually
            needs. And when the job is done, the records remain yours to build on.
          </p>
          <p className="pl-note">
            ASO supports the way your organization works. These stages show what&apos;s available, not a sequence
            you have to follow.
          </p>
        </div>

        <div className="pl-flow" style={{ ["--sel" as string]: selected }}>
          <p className="pl-hint" id="pl-hint">
            Choose a stage to see what you control there.
          </p>

          <div
            role="tablist"
            aria-label="Event lifecycle stages"
            aria-describedby="pl-hint"
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
                  className={`pl-panel ${active ? "is-active" : ""} ${stage.ahead ? "has-ahead" : ""}`}
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

                      {/* Future direction: below what exists, and quieter. */}
                      {stage.ahead && (
                        <aside className="pl-ahead" aria-label="Looking ahead: future direction">
                          <p className="pl-ahead-label">
                            Looking ahead <span className="pl-ahead-tag">Future direction</span>
                          </p>
                          {stage.ahead.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                          ))}
                        </aside>
                      )}
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
