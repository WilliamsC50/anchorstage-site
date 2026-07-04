"use client";

import { useState } from "react";
import { EVENT_WORKFLOW_STAGES } from "@/lib/event-workflow";
import { PERSONAS } from "@/lib/personas";
import type { PersonaSlug, WorkflowStage } from "@/lib/content-types";

/**
 * Event Lifecycle Explorer (Phase 1). A vertical workflow timeline of the
 * ten stages an event moves through inside ASO, beside a detail panel
 * showing what actually happens at the selected stage: typical tasks, the
 * ASO modules involved, and the member types doing the work.
 *
 * Interaction is selection-only: click/tap (or Tab + Enter) a stage to load
 * it into the panel. Exactly one stage is selected at all times — there is
 * no "empty" state — so the section always shows real product content.
 * No hover-only behavior.
 *
 * Client component for the single selected-stage useState. Desktop renders
 * the timeline vertically at ~35% width; mobile renders the same stages as
 * wrapping chips with the panel below (same pattern NetworkTree uses).
 */

const FOCUS_RING_CLASSES =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2";

function personaName(slug: PersonaSlug) {
  return PERSONAS.find((p) => p.slug === slug)?.name ?? slug;
}

function StagePanel({ stage }: { stage: WorkflowStage }) {
  return (
    <div className="rounded-xl border border-aso-blue/15 bg-white p-6 md:p-8">
      <h3 className="text-2xl font-bold text-aso-navy mb-2">{stage.title}</h3>
      <p className="text-sm leading-relaxed text-gray-500 mb-7">{stage.description}</p>

      <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
        Typical Tasks
      </p>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 mb-7">
        {stage.tasks.map((task) => (
          <li key={task} className="flex items-baseline gap-2.5 text-sm text-aso-navy">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-aso-blue/50" />
            {task}
          </li>
        ))}
      </ul>

      <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
        ASO Modules Used
      </p>
      <div className="flex flex-wrap gap-2 mb-7">
        {stage.modules.map((module) => (
          <span
            key={module}
            className="inline-block rounded-md border border-aso-blue/25 bg-aso-bg px-2.5 py-1 text-xs font-medium text-aso-navy"
          >
            {module}
          </span>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue mb-3">
        Common Users
      </p>
      <div className="flex flex-wrap gap-2">
        {stage.usedBy.map((slug) => (
          <span
            key={slug}
            className="inline-block rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
          >
            {personaName(slug)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function EventWorkflowExplorer() {
  const [activeId, setActiveId] = useState(EVENT_WORKFLOW_STAGES[0].id);
  const activeStage =
    EVENT_WORKFLOW_STAGES.find((stage) => stage.id === activeId) ?? EVENT_WORKFLOW_STAGES[0];

  return (
    <div>
      {/* Desktop / tablet: vertical timeline beside the stage panel */}
      <div className="hidden md:grid md:grid-cols-[7fr_13fr] md:gap-10 lg:gap-14 md:items-start">
        <ol aria-label="Event lifecycle stages">
          {EVENT_WORKFLOW_STAGES.map((stage, index) => {
            const selected = stage.id === activeId;
            return (
              <li key={stage.id} className="flex flex-col">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`ml-[9px] h-5 w-0.5 transition-colors duration-200 motion-reduce:transition-none ${
                      selected ? "bg-aso-orange" : "bg-aso-blue/20"
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
                    className={`ml-1 h-3 w-3 shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none ${
                      selected
                        ? "bg-aso-orange"
                        : "border-2 border-aso-blue/40 bg-white"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-200 motion-reduce:transition-none ${
                      selected ? "font-semibold text-aso-navy" : "font-medium text-gray-400"
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
          <StagePanel stage={activeStage} />
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
            return (
              <button
                key={stage.id}
                type="button"
                aria-current={selected ? "step" : undefined}
                onClick={() => setActiveId(stage.id)}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${FOCUS_RING_CLASSES} ${
                  selected
                    ? "border-aso-orange bg-aso-orange text-white"
                    : "border-aso-blue/25 bg-white text-aso-navy"
                }`}
              >
                {stage.title}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          <StagePanel stage={activeStage} />
        </div>
      </div>
    </div>
  );
}
