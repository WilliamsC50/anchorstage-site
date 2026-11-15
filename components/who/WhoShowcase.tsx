"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { StageBackground, StageEmptyMark, STAGE_VB } from "./ConcertStage";
import FohForeground from "./FohForeground";
import TechnicianFigure from "./TechnicianFigure";

/**
 * Who It's For: full-viewport cinematic stage (DESIGN-15A.3, refined in
 * DESIGN-15A.4; proof of concept). One concert stage, six professional
 * perspectives.
 *
 * Layers, front to back:
 *   overlays    page title, the selected profession's copy, its specialties
 *               (Freelancers & Technicians only), and the profession cards
 *               along the bottom edge of the stage (HTML over the stage on
 *               wide screens; stacked around it on narrower ones)
 *   light       CSS scrims and key light (.wv-light)
 *   foreground  profession-specific equipment (Freelancer: the FOH console,
 *               with one interactive MASTER fader; a flight case, radio, tools)
 *   character   the selected professional
 *   background  the permanent concert stage, never remounted
 * Character and foreground remount per profession and enter with staggered
 * timing; the background stays put. Reduced motion: instant, no idle motion.
 *
 * Selector: WAI-ARIA tabs adapted from the homepage cast select (selection
 * follows focus; arrow keys, Home, End), without changing it. Nothing cycles
 * on its own. Only Freelancers & Technicians has a finished scene; the other
 * five show an empty lit FOH mark and their existing approved description,
 * marked "In development" / "Scene in development".
 *
 * LAUNCH-DEPENDENT copy lives with the role data in
 * app/(site)/who-its-for/page.tsx.
 *
 * Styling: app/(site)/who-its-for/who.css (.who-stage, .wv-*).
 */

export interface SpecialtyGroup {
  group: string;
  items: string[];
}

export interface ShowcaseRole {
  slug: string;
  name: string;
  /** One short line for the profession card. */
  tagline: string;
  /** Future scene setting, e.g. "FOH mixing position". */
  setting: string;
  ready: boolean;
  headline?: string;
  recognition?: string;
  value?: string;
  /** Example specialties, shown beside a finished scene only. */
  specialties?: SpecialtyGroup[];
  /** For roles still in development: their existing approved description. */
  summary?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function WhoShowcase({ roles }: { roles: ShowcaseRole[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const next = (i + roles.length) % roles.length;
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
      End: roles.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  };

  const active = roles[selected];
  const specialties = active.ready ? active.specialties : undefined;

  // DOM order is the keyboard order: title, profession cards, the selected
  // profession's copy and specialties, then the stage and its fader. CSS
  // places them visually (who.css).
  return (
    <section className="who-stage" aria-labelledby="who-title">
      {/* Title. */}
      <div className="wv-head">
        <div className="flex items-center gap-3 mb-4">
          <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
          <p className="wv-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">Who It&apos;s For</p>
        </div>
        <h1 id="who-title" className="wv-title">
          Built for the people who make live events happen
        </h1>
      </div>

      {/* Profession cards. */}
      <div role="tablist" aria-label="Choose a profession" aria-orientation="horizontal" className="wv-roster" onKeyDown={onKeyDown}>
        {roles.map((role, i) => (
          <button
            key={role.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`wv-tab-${role.slug}`}
            aria-selected={i === selected}
            aria-controls="wv-panel"
            tabIndex={i === selected ? 0 : -1}
            className={`wv-tab ${role.ready ? "is-ready" : ""}`}
            onClick={() => select(i)}
          >
            <span aria-hidden="true" className="wv-tab-num">
              {pad(i + 1)}
            </span>
            <span className="wv-tab-name">{role.name}</span>
            <span className="wv-tab-desc">{role.tagline}</span>
            <span className="wv-tab-status">{role.ready ? "Scene ready" : "In development"}</span>
          </button>
        ))}
      </div>

      {/* The selected profession's copy. */}
      <div role="tabpanel" id="wv-panel" aria-labelledby={`wv-tab-${active.slug}`} tabIndex={0} className="wv-panel">
        {roles.map((role, i) => (
          <div key={role.slug} className={`wv-panel-body ${i === selected ? "is-active" : ""}`} aria-hidden={i !== selected}>
            <p className="wv-kicker">
              <span aria-hidden="true">
                {pad(i + 1)} / {pad(roles.length)}
              </span>
              {role.name}
            </p>
            {role.ready ? (
              <>
                <h2 className="wv-headline">{role.headline}</h2>
                <p className="wv-recognition">{role.recognition}</p>
                <p className="wv-value">
                  <span className="wv-value-label">With AnchorStage Ops</span>
                  {role.value}
                </p>
              </>
            ) : (
              <>
                <p className="wv-summary">{role.summary}</p>
                <p className="wv-dev">
                  <span className="wv-dev-dot" aria-hidden="true" />
                  Scene in development: {role.setting}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Example specialties for the finished scene (not interactive). */}
      {specialties && (
        <aside key={active.slug} className="wv-skills" aria-labelledby="wv-skills-title">
          <p id="wv-skills-title" className="wv-skills-title">
            Common specialties
          </p>
          <dl className="wv-skills-list">
            {specialties.map((g) => (
              <div key={g.group} className="wv-skills-group">
                <dt>{g.group}</dt>
                <dd>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      )}

      {/* The stage: permanent background, then the profession's layers. */}
      <div className="wv-viewport">
        <StageBackground />
        <div key={active.slug} className="wv-scene">
          {active.ready ? (
            <>
              <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-char" aria-hidden="true" focusable="false">
                <TechnicianFigure x={420} y={141.4} scale={1.3} />
              </svg>
              <FohForeground />
            </>
          ) : (
            <StageEmptyMark />
          )}
        </div>
        <div aria-hidden="true" className="wv-light" />
      </div>
    </section>
  );
}
