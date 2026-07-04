"use client";

import { useState } from "react";
import {
  DEFAULT_WORKFLOW_ROLE,
  EVENT_WORKFLOW_STAGES,
  STAGE_PERSPECTIVES,
  WORKFLOW_ROLES,
} from "@/lib/event-workflow";
import { PERSONAS } from "@/lib/personas";
import type {
  PersonaSlug,
  StagePerspective,
  StageRelevance,
  WorkflowStage,
} from "@/lib/content-types";

/**
 * Event Lifecycle Explorer (Phase 2). The same ten-stage timeline and detail
 * panel as Phase 1, now viewed through a selected role ("View As"). The
 * workflow never reorders or hides stages — the role only changes how stages
 * are emphasized (relevance-driven color) and what the panel says about them.
 *
 * Interaction stays selection-only: exactly one role and one stage are
 * selected at all times. Role chips are toggle buttons (aria-pressed);
 * stage buttons keep aria-current="step". Transitions are color/opacity
 * only — no layout animation.
 */

const FOCUS_RING_CLASSES =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2";

const TRANSITION_CLASSES =
  "transition-colors duration-200 motion-reduce:transition-none";

/** Timeline dot fill per relevance level. */
const DOT_CLASSES: Record<StageRelevance, string> = {
  primary: "bg-aso-orange",
  secondary: "bg-aso-blue",
  occasional: "bg-gray-400",
  "not-used": "bg-gray-200",
};

/** Timeline label emphasis per relevance level. */
const LABEL_CLASSES: Record<StageRelevance, string> = {
  primary: "font-semibold text-aso-navy",
  secondary: "font-medium text-aso-navy/80",
  occasional: "font-medium text-gray-400",
  "not-used": "font-normal text-gray-300",
};

/** Mobile stage-chip styling per relevance level (unselected state). */
const CHIP_CLASSES: Record<StageRelevance, string> = {
  primary: "border-aso-orange/50 bg-white text-aso-navy font-semibold",
  secondary: "border-aso-blue/40 bg-white text-aso-navy",
  occasional: "border-gray-200 bg-white text-gray-500",
  "not-used": "border-gray-200 bg-white text-gray-300",
};

function personaName(slug: PersonaSlug) {
  return PERSONAS.find((p) => p.slug === slug)?.name ?? slug;
}

function personaSingularName(slug: PersonaSlug) {
  return PERSONAS.find((p) => p.slug === slug)?.singularName ?? slug;
}

function RoleSelector({
  role,
  onSelect,
}: {
  role: PersonaSlug;
  onSelect: (slug: PersonaSlug) => void;
}) {
  return (
    <div className="mb-10">
      <p
        id="workflow-view-as-label"
        className="text-center text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3"
      >
        View As
      </p>
      <div
        role="group"
        aria-labelledby="workflow-view-as-label"
        className="flex flex-wrap justify-center gap-2"
      >
        {WORKFLOW_ROLES.map((slug) => {
          const selected = slug === role;
          return (
            <button
              key={slug}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(slug)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium ${TRANSITION_CLASSES} ${FOCUS_RING_CLASSES} ${
                selected
                  ? "border-aso-navy bg-aso-navy text-white"
                  : "border-aso-blue/25 bg-white text-aso-navy hover:border-aso-blue/50"
              }`}
            >
              {personaSingularName(slug)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StagePanel({
  stage,
  perspective,
  role,
}: {
  stage: WorkflowStage;
  perspective: StagePerspective;
  role: PersonaSlug;
}) {
  // Show the viewing role first among Common Users when it participates.
  const commonUsers = [...stage.usedBy].sort(
    (a, b) => Number(b === role) - Number(a === role)
  );

  return (
    <div className="rounded-xl border border-aso-blue/15 bg-white p-6 md:p-8">
      {/* Keyed on role + stage so content fades in on either change. */}
      <div
        key={`${role}-${stage.id}`}
        className="animate-panel-fade motion-reduce:animate-none"
      >
        <h3 className="text-2xl font-bold text-aso-navy mb-2">{stage.title}</h3>
        <p className="text-sm leading-relaxed text-gray-500 mb-7">
          {perspective.description}
        </p>

        {perspective.tasks.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
              Typical Tasks
            </p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 mb-7">
              {perspective.tasks.map((task) => (
                <li key={task} className="flex items-baseline gap-2.5 text-sm text-aso-navy">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-aso-blue/50" />
                  {task}
                </li>
              ))}
            </ul>
          </>
        )}

        {perspective.workstations.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
              ASO Workstations Used
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {perspective.workstations.map((workstation) => (
                <span
                  key={workstation}
                  className="inline-block rounded-md border border-aso-blue/25 bg-aso-bg px-2.5 py-1 text-xs font-medium text-aso-navy"
                >
                  {workstation}
                </span>
              ))}
            </div>
          </>
        )}

        <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
          Common Users
        </p>
        <div className="flex flex-wrap gap-2">
          {commonUsers.map((slug) => {
            const isViewer = slug === role;
            return (
              <span
                key={slug}
                className={`inline-block rounded-md border px-2.5 py-1 text-xs font-medium ${
                  isViewer
                    ? "border-aso-orange/40 bg-aso-orange/10 text-aso-navy"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                {personaName(slug)}
                {isViewer && " (you)"}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EventWorkflowExplorer() {
  const [role, setRole] = useState<PersonaSlug>(DEFAULT_WORKFLOW_ROLE);
  const [activeId, setActiveId] = useState(EVENT_WORKFLOW_STAGES[0].id);
  const activeStage =
    EVENT_WORKFLOW_STAGES.find((stage) => stage.id === activeId) ?? EVENT_WORKFLOW_STAGES[0];
  const perspectives = STAGE_PERSPECTIVES[role];
  const activePerspective = perspectives[activeStage.id];

  return (
    <div>
      <RoleSelector role={role} onSelect={setRole} />

      {/* Desktop / tablet: vertical timeline beside the stage panel */}
      <div className="hidden md:grid md:grid-cols-[7fr_13fr] md:gap-10 lg:gap-14 md:items-start">
        <ol aria-label="Event lifecycle stages">
          {EVENT_WORKFLOW_STAGES.map((stage, index) => {
            const selected = stage.id === activeId;
            const relevance = perspectives[stage.id].relevance;
            // Orange connector marks contiguous primary stages for this role.
            const connectsPrimary =
              index > 0 &&
              relevance === "primary" &&
              perspectives[EVENT_WORKFLOW_STAGES[index - 1].id].relevance === "primary";
            return (
              <li key={stage.id} className="flex flex-col">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`ml-[9px] h-5 w-0.5 ${TRANSITION_CLASSES} ${
                      connectsPrimary ? "bg-aso-orange" : "bg-aso-blue/20"
                    }`}
                  />
                )}
                <button
                  type="button"
                  aria-current={selected ? "step" : undefined}
                  onClick={() => setActiveId(stage.id)}
                  className={`flex cursor-pointer items-center gap-3.5 rounded-md py-1 text-left ${FOCUS_RING_CLASSES}`}
                >
                  <span
                    aria-hidden="true"
                    className={`ml-1 h-3 w-3 shrink-0 rounded-full ${TRANSITION_CLASSES} ${
                      DOT_CLASSES[relevance]
                    } ${selected ? "ring-2 ring-aso-navy/30" : ""}`}
                  />
                  <span
                    className={`text-sm ${TRANSITION_CLASSES} ${LABEL_CLASSES[relevance]} ${
                      selected ? "text-aso-navy" : ""
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div aria-live="polite">
          <StagePanel stage={activeStage} perspective={activePerspective} role={role} />
        </div>
      </div>

      {/* Mobile: wrapping stage chips, panel underneath */}
      <div className="md:hidden">
        <div
          role="group"
          aria-label="Event lifecycle stages"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {EVENT_WORKFLOW_STAGES.map((stage) => {
            const selected = stage.id === activeId;
            const relevance = perspectives[stage.id].relevance;
            return (
              <button
                key={stage.id}
                type="button"
                aria-current={selected ? "step" : undefined}
                onClick={() => setActiveId(stage.id)}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs ${TRANSITION_CLASSES} ${FOCUS_RING_CLASSES} ${
                  selected
                    ? "border-aso-orange bg-aso-orange font-medium text-white"
                    : CHIP_CLASSES[relevance]
                }`}
              >
                {stage.title}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          <StagePanel stage={activeStage} perspective={activePerspective} role={role} />
        </div>
      </div>
    </div>
  );
}
