"use client";

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { StageBackground, StageEmptyMark, STAGE_VB } from "./ConcertStage";
import FohForeground from "./FohForeground";
import MusicianScene from "./MusicianScene";
import OrganizerScene from "./OrganizerScene";
import RentalScene from "./RentalScene";
import ProductionScene from "./ProductionScene";
import TechnicianFigure from "./TechnicianFigure";
import VenueScene from "./VenueScene";

/** The Freelancers & Technicians scene: the technician and the FOH set. */
function FreelancerScene() {
  return (
    <>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-char" aria-hidden="true" focusable="false">
        <TechnicianFigure x={420} y={141.4} scale={1.3} />
      </svg>
      <FohForeground />
    </>
  );
}

/** Finished scenes by profession slug; anything else shows the empty mark. */
const SCENES: Record<string, ComponentType> = {
  freelancers: FreelancerScene,
  "production-companies": ProductionScene,
  venues: VenueScene,
  "event-organizers": OrganizerScene,
  musicians: MusicianScene,
  "rental-providers": RentalScene,
};

/** How long the outgoing scene stays for its exit (matches who.css). */
const EXIT_MS = 420;

/**
 * Who It's For: full-viewport cinematic stage (DESIGN-15A.3, refined in
 * DESIGN-15A.4; Production Companies added in DESIGN-15A.5, Venues in
 * DESIGN-15A.6, Event Organizers & Producers in DESIGN-15A.7, Musicians &
 * Touring Acts in DESIGN-15A.8, Rental Warehouses & Providers in
 * DESIGN-15A.12; proof of concept). One concert stage, six professional
 * perspectives.
 *
 * Layers, front to back:
 *   overlays    page title, the selected profession's copy, its side panel
 *               (finished scenes only: specialties, responsibilities), and
 *               the profession cards along the bottom edge of the stage
 *               (HTML over the stage on wide screens; stacked around it on
 *               narrower ones)
 *   light       CSS scrims and key light (.wv-light)
 *   foreground  profession-specific equipment (Freelancer: the FOH console
 *               with its MASTER fader, a flight case; Production: a rolling
 *               rack and a cable coil; Venues: a welcome sign; Organizers:
 *               a freestanding wayfinding sign; Musicians: the pedalboard
 *               (its one control), a monitor wedge, the set list; Rental:
 *               a cable trunk)
 *   character   the selected professional(s) (Production: the lead with
 *               the checklist tablet, and two crew members on the stage;
 *               Venues: the banquet director with the event-prep status
 *               tablet, the ballroom on a hotel carpet, and the server who
 *               serves dinner; Organizers: the producer on the radio, guest
 *               registration, and guests at the rope line; Musicians: the
 *               guitarist at soundcheck, the amp, the vocal mic, and the
 *               guitar tech with the spare guitars; Rental: the prep
 *               technician with the asset scanner, LED panels, moving heads,
 *               and the case being inspected)
 *   background  the permanent concert stage, never remounted
 * Character and foreground remount per profession: the outgoing scene fades
 * and sinks while the next enters with staggered timing; the background
 * stays put. Reduced motion: instant, no idle motion.
 *
 * Selector: WAI-ARIA tabs adapted from the homepage cast select (selection
 * follows focus; arrow keys, Home, End), without changing it. Nothing cycles
 * on its own. All six professions have scenes (SCENES below). A role marked
 * not ready would show an empty lit FOH mark and its existing approved
 * description, marked "In development" / "Scene in development".
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
  /** Side panel beside a finished scene (e.g. specialties, responsibilities). */
  aside?: { title: string; groups: SpecialtyGroup[] };
  /** For roles still in development: their existing approved description. */
  summary?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function WhoShowcase({ roles }: { roles: ShowcaseRole[] }) {
  const [selected, setSelected] = useState(0);
  // The outgoing profession, kept briefly so its layers can fade out while
  // the next ones come in (the stage background never changes).
  const [leaving, setLeaving] = useState<number | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    [],
  );

  const select = (i: number, focus = false) => {
    const next = (i + roles.length) % roles.length;
    if (next !== selected) {
      setLeaving(selected);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      exitTimer.current = setTimeout(() => setLeaving(null), EXIT_MS);
    }
    setSelected(next);
    if (focus) tabs.current[next]?.focus();
  };

  const renderScene = (role: ShowcaseRole) => {
    const Scene = role.ready ? SCENES[role.slug] : undefined;
    return Scene ? <Scene /> : <StageEmptyMark />;
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
  const aside = active.ready ? active.aside : undefined;
  const outgoing = leaving !== null && leaving !== selected ? roles[leaving] : null;

  // DOM order is the keyboard order: title, profession cards, the selected
  // profession's copy and side panel, then the stage and its one control. CSS
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
                {/* Each sentence wraps as a unit, so lines break between
                    sentences rather than mid-phrase (DESIGN-15A.10). */}
                <h2 className="wv-headline">
                  {(role.headline ?? "").split(/(?<=[.!?])\s+/).map((sentence, k) => (
                    <span key={k}>
                      {k > 0 && " "}
                      <span className="wv-headline-part">{sentence}</span>
                    </span>
                  ))}
                </h2>
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

      {/* Side panel for a finished scene (not interactive). */}
      {aside && (
        <aside key={active.slug} className="wv-skills" aria-labelledby="wv-skills-title">
          <p id="wv-skills-title" className="wv-skills-title">
            {aside.title}
          </p>
          <dl className="wv-skills-list">
            {aside.groups.map((g) => (
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
        {outgoing && (
          <div key={`out-${outgoing.slug}`} className="wv-scene is-leaving" aria-hidden="true" inert>
            {renderScene(outgoing)}
          </div>
        )}
        <div key={active.slug} className="wv-scene">
          {renderScene(active)}
        </div>
        <div aria-hidden="true" className="wv-light" />
      </div>
    </section>
  );
}
