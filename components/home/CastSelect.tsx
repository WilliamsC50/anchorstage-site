"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { PersonaSlug } from "@/lib/content-types";

export interface CastRole {
  slug: PersonaSlug;
  name: string;
  examples: string;
  whoTheyAre: string;
  /** "x y w h" in figure space: the thumbnail portrait. */
  crop: string;
}

interface CastSelectProps {
  roles: CastRole[];
  /** id of the scene heading that names the role list. */
  labelledBy: string;
  /** The scene's existing heading, introduction, and link (server-rendered). */
  intro: ReactNode;
  /** Shared artwork definitions (server-rendered, see castArt). */
  defs: ReactNode;
  /** The persistent stage light under the featured character. */
  light: ReactNode;
}

/**
 * Scene 5 character select. A WAI-ARIA tabs pattern: six role tabs (the
 * roster), one panel with the selected role. Selection follows focus; arrow
 * keys, Home, and End move through the roster.
 *
 * Only the character and the role text change. The environment, stage
 * light, and layout are fixed: every featured figure and every role's text
 * are always rendered in the same cells, and only the selected one is
 * visible, so selecting never moves anything or reflows the scene. The
 * figures crossfade (CSS; instant under reduced motion). No animation runs
 * while nothing is being selected.
 */
export default function CastSelect({ roles, labelledBy, intro, defs, light }: CastSelectProps) {
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
    <div className="cast">
      <div className="cast-intro">{intro}</div>

      <div aria-hidden="true" className="cast-stage">
        {defs}
        {light}
        {roles.map((role, i) => (
          <div key={role.slug} className={`cast-figure ${i === selected ? "is-active" : ""}`}>
            <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMax meet">
              <use href={`#cast-fig-${role.slug}`} />
            </svg>
          </div>
        ))}
      </div>

      <div
        role="tablist"
        aria-labelledby={labelledBy}
        aria-orientation="horizontal"
        className="cast-roster"
        onKeyDown={onKeyDown}
      >
        {roles.map((role, i) => (
          <button
            key={role.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`cast-tab-${role.slug}`}
            aria-selected={i === selected}
            aria-controls="cast-panel"
            tabIndex={i === selected ? 0 : -1}
            className="cast-tab"
            onClick={() => select(i)}
          >
            <span aria-hidden="true" className="cast-thumb">
              <svg viewBox={role.crop} preserveAspectRatio="xMidYMid slice">
                <use href={`#cast-fig-${role.slug}`} />
              </svg>
            </span>
            <span className="cast-name">{role.name}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="cast-panel"
        aria-labelledby={`cast-tab-${active.slug}`}
        tabIndex={0}
        className="cast-plate hud-panel"
      >
        {roles.map((role, i) => (
          <div key={role.slug} className={`cast-plate-body ${i === selected ? "is-active" : ""}`}>
            <p aria-hidden="true" className="hud-tag font-mono text-xs font-semibold tracking-[0.18em] text-aso-orange mb-4">
              {String(i + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">{role.name}</h3>
            <p className="font-mono text-xs leading-relaxed text-aso-blue-light/85 mb-4">{role.examples}</p>
            <p className="home-copy leading-relaxed">{role.whoTheyAre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
