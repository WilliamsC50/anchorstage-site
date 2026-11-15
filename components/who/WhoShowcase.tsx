"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { SceneBackground, SceneCharacter, SceneEmpty, SceneForeground, SceneMidstage } from "./FreelancerScene";

/**
 * Who It's For: interactive cinematic showcase (DESIGN-15A.2, proof of
 * concept). A front-facing stage diorama per profession, a role selector, and
 * a copy panel.
 *
 * Interaction follows the homepage's Scene 5 selector (components/home/
 * CastSelect.tsx), adapted here without changing it: WAI-ARIA tabs, selection
 * follows focus, arrow keys, Home, and End; every role's text is rendered in
 * the same grid cell so selecting never reflows the page; nothing cycles on
 * its own.
 *
 * Only Freelancers & Technicians has a finished scene. The other five roles
 * show an empty lit stage and their existing, approved one-line description,
 * marked "Scene in development", so nothing unfinished reads as complete.
 *
 * Transitions: the stage remounts per role; its layers (background,
 * midstage, character, foreground, light) enter with staggered timing, the
 * basis for future coordinated scene changes. Reduced motion: instant.
 *
 * Copy for the finished scene is a founder draft (DESIGN-15A.2).
 * LAUNCH-DEPENDENT: "Build your professional presence" (public profiles) and
 * "develop relationships with the companies that need your skills" (Network
 * connections) are not live in the application. "Organize your jobs and
 * rates" is partly supported: events plus per-event quote line items and
 * payout terms; there is no standing personal rate card.
 *
 * Styling: app/(site)/who-its-for/who.css under .who-showcase.
 */

export interface ShowcaseRole {
  slug: string;
  /** Selector label. */
  name: string;
  /** Future scene setting, e.g. "FOH mixing position". */
  setting: string;
  ready: boolean;
  headline?: string;
  recognition?: string;
  value?: string;
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

  return (
    <div className="ws">
      {/* The stage diorama: remounts per role so its layers enter in sequence. */}
      <div className="ws-stage-frame">
        <div key={active.slug} className={`ws-stage ${active.ready ? "is-ready" : "is-empty"}`} aria-hidden="true">
          {active.ready ? (
            <>
              <SceneBackground />
              <SceneMidstage />
              <SceneCharacter />
              <SceneForeground />
            </>
          ) : (
            <SceneEmpty />
          )}
          <div className="ws-light" />
        </div>
      </div>

      {/* Role selector. */}
      <div role="tablist" aria-label="Who it's for" aria-orientation="horizontal" className="ws-roster" onKeyDown={onKeyDown}>
        {roles.map((role, i) => (
          <button
            key={role.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`ws-tab-${role.slug}`}
            aria-selected={i === selected}
            aria-controls="ws-panel"
            tabIndex={i === selected ? 0 : -1}
            className="ws-tab"
            onClick={() => select(i)}
          >
            <span aria-hidden="true" className="ws-tab-num">
              {pad(i + 1)}
            </span>
            <span className="ws-tab-name">{role.name}</span>
            <span className="ws-tab-status">{role.ready ? "Scene ready" : "In development"}</span>
          </button>
        ))}
      </div>

      {/* Copy panel: every role rendered in one cell; only the active one shows. */}
      <div role="tabpanel" id="ws-panel" aria-labelledby={`ws-tab-${active.slug}`} tabIndex={0} className="ws-panel">
        {roles.map((role, i) => (
          <div key={role.slug} className={`ws-panel-body ${i === selected ? "is-active" : ""}`} aria-hidden={i !== selected}>
            <p className="ws-kicker">
              <span aria-hidden="true">{pad(i + 1)} / {pad(roles.length)}</span>
              {role.name}
            </p>
            {role.ready ? (
              <>
                <h3 className="ws-headline">{role.headline}</h3>
                <p className="ws-recognition">{role.recognition}</p>
                <p className="ws-value">
                  <span className="ws-value-label">With AnchorStage Ops</span>
                  {role.value}
                </p>
              </>
            ) : (
              <>
                <p className="ws-summary">{role.summary}</p>
                <p className="ws-dev">
                  <span className="ws-dev-dot" aria-hidden="true" />
                  Scene in development: {role.setting}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
