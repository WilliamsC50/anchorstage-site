"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CHAOS_CONNECTORS,
  CHAOS_SOURCES,
  COMPLETE_STORAGE_KEY,
  RECORD_STEPS,
  TIMELINE,
} from "@/lib/chaos-to-record";

/**
 * Fragmentation → Operating Record. The visitor starts with eight scattered
 * information sources loosely tangled together; "Convert to Event" consumes
 * them into the ASO mark (via a brief Intake Submission beat — canon: Intake
 * converts to Event), then an operating record assembles beside it using
 * real platform terminology.
 *
 * Phases: idle → disconnecting → consuming → intake → absorbing → building
 * → complete. JS owns WHEN (a timeout-chained state machine from TIMELINE);
 * CSS owns HOW (transitions/animations keyed off phase + per-item delays).
 *
 * The complete state is permanent for the session (sessionStorage); Replay
 * is opt-in. Reduced motion collapses everything into a single crossfade to
 * the complete state. Mobile morphs in place: the logo sits inside the chaos
 * field and the record grows in the slot directly below the CTA.
 */

type Phase =
  | "idle"
  | "disconnecting"
  | "consuming"
  | "intake"
  | "absorbing"
  | "building"
  | "complete";

interface Delta {
  dx: number;
  dy: number;
}

const CHIP_ICONS: Record<string, string> = {
  // Simple 16x16 line-icon paths, stroke-based.
  memory: "M8 2.5a4.5 4.5 0 0 1 4.5 4.5c0 1.9-1.2 3.2-2.5 4v1.5h-4V11c-1.3-.8-2.5-2.1-2.5-4A4.5 4.5 0 0 1 8 2.5Z",
  "paper-notes": "M4 2h6l2 2v10H4V2Zm2 4h4M6 8.5h4M6 11h2.5",
  texts: "M2.5 3.5h11v7h-6l-3 2.5V10.5h-2v-7Z",
  messenger: "M8 2.5c-3 0-5.5 2.2-5.5 5 0 2.8 2.5 5 5.5 5 .6 0 1.2-.1 1.7-.2l2.3 1.2-.3-2.1c1.1-.9 1.8-2.3 1.8-3.9 0-2.8-2.5-5-5.5-5Z",
  phone: "M4 2.5c-.8 0-1.5.7-1.5 1.5 0 5.2 4.3 9.5 9.5 9.5.8 0 1.5-.7 1.5-1.5v-1.8l-3-1.2-1.2 1.2c-1.6-.8-2.7-1.9-3.5-3.5l1.2-1.2-1.2-3H4Z",
  email: "M2 4h12v8H2V4Zm0 .5 6 4.5 6-4.5",
  cloud: "M5 12.5h6.5a2.5 2.5 0 0 0 .5-4.95 4 4 0 0 0-7.8-.8A3 3 0 0 0 5 12.5Z",
  spreadsheets: "M3 3h10v10H3V3Zm0 3.3h10M3 9.7h10M6.3 3v10M9.7 3v10",
};

function ChipIcon({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={CHIP_ICONS[id] ?? CHIP_ICONS.email} />
    </svg>
  );
}

export default function ChaosToRecord() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [consumedCount, setConsumedCount] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [deltas, setDeltas] = useState<Record<string, Delta>>({});
  const [liveMessage, setLiveMessage] = useState("");

  const chipRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const logoRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const built = phase === "building" || phase === "complete";

  useEffect(() => {
    // Restore the permanent complete state for this session. Scheduled (not
    // synchronous) so the server-rendered idle scene hydrates cleanly first.
    if (window.sessionStorage.getItem(COMPLETE_STORAGE_KEY) === "1") {
      timers.current.push(
        window.setTimeout(() => {
          setPhase("complete");
          setConsumedCount(CHAOS_SOURCES.length);
        }, 0)
      );
    }
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  function at(ms: number, fn: () => void) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function finish() {
    setPhase("complete");
    setConsumedCount(CHAOS_SOURCES.length);
    setLiveMessage(
      "Eight scattered sources — email, texts, calls, notes, and spreadsheets — organized into one ASO event record, from Intake Submission to Invoice and Financials."
    );
    try {
      window.sessionStorage.setItem(COMPLETE_STORAGE_KEY, "1");
    } catch {
      // Storage unavailable (private mode) — the state simply won't persist.
    }
  }

  function runSequence() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const logoEl = logoRef.current;
    if (reduced || !logoEl) {
      // Reduced-motion path: single crossfade to the complete state.
      finish();
      return;
    }

    // Measure straight-line travel vectors chip → logo center, so travel is
    // pure transform (no layout animation) and correct on every breakpoint.
    const logo = logoEl.getBoundingClientRect();
    const cx = logo.left + logo.width / 2;
    const cy = logo.top + logo.height / 2;
    const measured: Record<string, Delta> = {};
    for (const source of CHAOS_SOURCES) {
      const el = chipRefs.current.get(source.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      measured[source.id] = {
        dx: cx - (r.left + r.width / 2),
        dy: cy - (r.top + r.height / 2),
      };
    }
    setDeltas(measured);
    setPhase("disconnecting");

    const T = TIMELINE;
    T.departOffsetsMs.forEach((offset, i) => {
      at(T.disconnectMs + offset, () => {
        setPhase("consuming");
        setConsumedCount(i + 1);
      });
      at(T.disconnectMs + offset + T.travelMs, () => setPulseCount((c) => c + 1));
    });

    const lastArrival =
      T.disconnectMs + T.departOffsetsMs[T.departOffsetsMs.length - 1] + T.travelMs;
    const absorbStart = lastArrival + T.intakeLeadMs + T.intakeHoldMs;

    at(lastArrival + T.intakeLeadMs, () => setPhase("intake"));
    at(absorbStart, () => setPhase("absorbing"));
    at(absorbStart + T.absorbMs, () => setPhase("building"));
    at(absorbStart + T.absorbMs + T.buildMs, finish);
  }

  function handleConvert() {
    if (phase !== "idle") return;
    runSequence();
  }

  function handleReplay() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setPhase("idle");
    setConsumedCount(0);
    setPulseCount(0);
    setDeltas({});
    setLiveMessage("");
    // Let the idle scene re-render and settle before re-running.
    at(400, runSequence);
  }

  const ctaLabel =
    phase === "idle" ? "Convert to Event" : phase === "complete" ? "Event Created ✓" : "Converting…";

  return (
    <div>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-start md:gap-12">
        {/* ── Chaos stage (logo lives inside it on all breakpoints) ── */}
        <div
          aria-hidden="true"
          className="relative order-1 h-80 md:order-none md:h-[460px]"
        >
          <div className="absolute inset-4 md:inset-8">
            {/* Tangled peer-to-peer connectors */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {CHAOS_CONNECTORS.map(([fromId, toId], i) => {
                const from = CHAOS_SOURCES.find((s) => s.id === fromId);
                const to = CHAOS_SOURCES.find((s) => s.id === toId);
                if (!from || !to) return null;
                return (
                  <line
                    key={`${fromId}-${toId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    vectorEffect="non-scaling-stroke"
                    className="transition-[opacity,stroke-dashoffset] duration-300 ease-in motion-reduce:transition-none"
                    style={{
                      opacity: phase === "idle" ? 1 : 0,
                      strokeDashoffset: phase === "idle" ? 0 : 24,
                      transitionDelay: phase === "idle" ? "0ms" : `${i * 40}ms`,
                    }}
                  />
                );
              })}
            </svg>

            {/* Scattered source chips */}
            {CHAOS_SOURCES.map((source) => {
              const consumed = consumedCount >= source.consumeOrder;
              const delta = deltas[source.id];
              return (
                <div
                  key={source.id}
                  ref={(el) => {
                    if (el) chipRefs.current.set(source.id, el);
                    else chipRefs.current.delete(source.id);
                  }}
                  className="absolute transition-[transform,opacity] duration-[420ms] ease-in motion-reduce:transition-none"
                  style={{
                    left: `${source.x}%`,
                    top: `${source.y}%`,
                    opacity: consumed ? 0 : 1,
                    transform: consumed
                      ? `translate(calc(-50% + ${delta?.dx ?? 0}px), calc(-50% + ${delta?.dy ?? 0}px)) scale(0.55)`
                      : `translate(-50%, -50%) rotate(${source.rotate}deg)`,
                  }}
                >
                  <div
                    className={`flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white/80 ${
                      phase === "idle" ? "chaos-drift" : ""
                    }`}
                    style={{ animationDelay: `${source.driftDelay}ms` }}
                  >
                    <ChipIcon id={source.id} />
                    {source.label}
                  </div>
                </div>
              );
            })}

            {/* ASO core: glow, pulse rings, logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,122,26,0.45) 0%, rgba(255,122,26,0.12) 45%, transparent 70%)",
                  opacity: phase === "absorbing" ? 1 : built ? 0.35 : 0,
                }}
              />
              {pulseCount > 0 && phase !== "complete" && (
                <span
                  key={pulseCount}
                  className="chaos-pulse pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 rounded-full border-2 border-aso-orange"
                />
              )}
              <div
                ref={logoRef}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10"
              >
                <div
                  key={`tick-${pulseCount}`}
                  className={pulseCount > 0 && phase !== "complete" ? "logo-tick" : undefined}
                >
                  <Image
                    src="/logos/ASO_Anchor.png"
                    alt=""
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] object-contain"
                  />
                </div>
              </div>

              {/* Intake Submission beat — chaos condenses into canon before converting */}
              {(phase === "intake" || phase === "absorbing") && (
                <div
                  className={`intake-in absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md border border-aso-blue-light/40 bg-white px-2.5 py-1 text-xs font-semibold text-aso-navy transition-[opacity,translate] duration-500 ease-in motion-reduce:transition-none ${
                    phase === "absorbing" ? "-translate-y-6 opacity-0" : ""
                  }`}
                >
                  Intake Submission
                </div>
              )}
            </div>

            {/* Rebalance line once the chaos is gone */}
            <p
              className="absolute inset-x-0 bottom-0 text-center text-xs text-white/50 transition-opacity delay-500 duration-700"
              style={{ opacity: phase === "complete" ? 1 : 0 }}
            >
              8 scattered sources. Zero of them the source of truth.
            </p>
          </div>
        </div>

        {/* ── Operating record slot ── */}
        <div className="relative order-3 min-h-[440px] md:order-none">
          {/* Faint skeleton — structure is "pending" until the build */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 flex flex-col justify-center gap-3 px-6 transition-opacity duration-300 ${
              built ? "opacity-0" : "opacity-100"
            }`}
          >
            {[52, 78, 64, 71, 58].map((w, i) => (
              <div key={i} className="h-3 rounded-full bg-white/5" style={{ width: `${w}%` }} />
            ))}
          </div>

          {/* The record itself — real DOM list, always present for AT */}
          <div
            className={`relative rounded-xl border border-white/15 bg-white p-5 transition-opacity duration-300 ${
              built ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-aso-blue">
              One Operating Record
            </p>
            <ol aria-label="ASO operating record" className="relative">
              {/* Orange spine, drawn top-to-bottom during the build */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[7px] top-1 w-0.5 origin-top bg-aso-orange/70 transition-transform ease-linear motion-reduce:transition-none"
                style={{
                  transform: phase === "building" || phase === "complete" ? "scaleY(1)" : "scaleY(0)",
                  transitionDuration: phase === "building" ? "2200ms" : "0ms",
                }}
              />
              {RECORD_STEPS.map((step) => {
                const shown = built;
                const delay = phase === "building" ? step.delayMs : 0;
                return (
                  <li
                    key={step.id}
                    className="relative flex items-center gap-2.5 py-[5px] pl-6 transition-[opacity,transform] duration-[240ms] motion-reduce:transition-none"
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "translateY(0)" : "translateY(8px)",
                      transitionDelay: `${delay}ms`,
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 flex h-4 w-4 items-center justify-center rounded-full bg-aso-orange"
                    >
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path
                          d="M2.5 6.2 5 8.7l4.5-5.4"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength={1}
                          strokeDasharray={1}
                          className="transition-[stroke-dashoffset] duration-200 ease-out motion-reduce:transition-none"
                          style={{
                            strokeDashoffset: shown ? 0 : 1,
                            transitionDelay: `${delay + 160}ms`,
                          }}
                        />
                      </svg>
                    </span>
                    <span
                      className={`text-sm ${step.emphasis ? "font-bold text-aso-navy" : "text-aso-navy"}`}
                    >
                      {step.label}
                    </span>
                    {step.badge && (
                      <span
                        className={
                          step.badge.tone === "code"
                            ? "rounded border border-aso-blue/25 bg-aso-bg px-1.5 py-0.5 font-mono text-[10px] font-medium text-aso-navy"
                            : "rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                        }
                      >
                        {step.badge.text}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ── CTA row (between stage and record on mobile) ── */}
        <div className="order-2 flex flex-col items-center gap-3 md:order-none md:col-span-2">
          <button
            type="button"
            onClick={handleConvert}
            disabled={phase !== "idle"}
            className={`rounded-full bg-aso-orange px-8 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy ${
              phase === "idle"
                ? "cta-pulse cursor-pointer hover:bg-aso-orange/90"
                : "cursor-default opacity-90"
            }`}
          >
            {ctaLabel}
          </button>
          <p
            className="text-sm font-medium text-white/80 transition-opacity duration-500"
            style={{ opacity: phase === "complete" ? 1 : 0 }}
          >
            One event. One record.
          </p>
          {phase === "complete" && (
            <button
              type="button"
              onClick={handleReplay}
              className="cursor-pointer text-xs font-medium text-aso-blue-light underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-orange focus-visible:ring-offset-2 focus-visible:ring-offset-aso-navy rounded"
            >
              Replay
            </button>
          )}
        </div>
      </div>

      {/* Single completion announcement for screen readers */}
      <p aria-live="polite" className="sr-only">
        {liveMessage}
      </p>
    </div>
  );
}
