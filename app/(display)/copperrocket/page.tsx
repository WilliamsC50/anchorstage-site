import type { Metadata } from "next";
import Image from "next/image";
import SignupDisplay from "./SignupDisplay";

export const metadata: Metadata = {
  title: "Copper Rocket Open Mic — AnchorStage",
  description: "Live open mic signup display.",
};

// ─── Configuration ────────────────────────────────────────────────────────────

// Swap in the real event graphic URL once it is ready.
// While empty the page uses the navy fallback so panel placement can be tuned.
const GRAPHIC_URL = "";

// Percentage-based panel insets.
// Adjust these to align with the graphic's reserved display window.
const PANEL = {
  top: "10%",
  left: "4%",
  width: "38%",
  bottom: "10%",
} as const;

// Static notice shown on the right side of the display.
// Replace with a DB-driven value when the admin page is ready.
const NOTICE = {
  eyebrow: "Tonight",
  headline: "Signups open at 7:00 PM sharp",
  body: "See host to join the list.",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CopperRocketPage() {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: GRAPHIC_URL ? `url(${GRAPHIC_URL})` : undefined,
        backgroundColor: "#0F2F4F",
      }}
    >
      {/* ── Left: live list panel ────────────────────────────────────────────── */}
      <div
        className="absolute overflow-hidden rounded-lg border border-white/[0.15]"
        style={{
          top: PANEL.top,
          left: PANEL.left,
          width: PANEL.width,
          bottom: PANEL.bottom,
          backgroundColor: "rgba(5, 15, 28, 0.82)",
        }}
      >
        <SignupDisplay />
      </div>

      {/* ── Right: display composition ─────────────────────────────────────────
           Three zones: notice (top) → event identity (mid) → branding (bottom)
           NOTICE const above is the only thing to swap when admin wiring is ready.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute flex flex-col justify-between select-none pointer-events-none"
        style={{ top: "8%", bottom: "6%", left: "50%", right: "4%" }}
      >

        {/* 1. Notice panel */}
        <div
          className="relative flex flex-col gap-4"
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255,0.04)",
            padding: "1.5rem 1.5rem 1.75rem",
          }}
        >
          {/* LIVE NOTICE pill — top-right of container */}
          <span
            className="absolute uppercase font-semibold text-white"
            style={{
              top: -11,
              right: 12,
              fontSize: 9,
              letterSpacing: "0.3em",
              padding: "3px 10px",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.20)",
              backgroundColor: "rgba(5, 15, 28, 1)",
              opacity: 0.65,
            }}
          >
            Live Notice
          </span>

          <p
            className="font-semibold uppercase"
            style={{ fontSize: 12, letterSpacing: "0.45em", color: "var(--aso-orange)", opacity: 0.80 }}
          >
            {NOTICE.eyebrow}
          </p>
          <p
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.5rem, 2.3vw, 2.2rem)", letterSpacing: "0.01em", opacity: 0.80, lineHeight: 1.2 }}
          >
            {NOTICE.headline}
          </p>
          <p
            className="text-white"
            style={{ fontSize: "clamp(0.95rem, 1.35vw, 1.2rem)", letterSpacing: "0.03em", opacity: 0.40 }}
          >
            {NOTICE.body}
          </p>
        </div>

        {/* 2. Event identity — text only, centered */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            className="font-bold uppercase text-white"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", letterSpacing: "0.35em", opacity: 0.22 }}
          >
            Open Mic Night
          </p>
          <p
            className="font-medium uppercase text-white"
            style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)", letterSpacing: "0.5em", opacity: 0.13 }}
          >
            Copper Rocket
          </p>
        </div>

        {/* 3. Branding footer — matched two-card sponsor strip */}
        <div className="flex flex-col items-center gap-3">
          <p
            className="uppercase text-white"
            style={{ fontSize: 10, letterSpacing: "0.35em", opacity: 0.22 }}
          >
            Brought to you by
          </p>

          {/* Shared glass card style: 240×120, transparent + orange border */}
          <div className="flex flex-row items-center gap-5">

            {/* CFAV card */}
            <div
              style={{
                width: 240,
                height: 120,
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,122,26,0.45)",
                filter: "drop-shadow(0px 10px 18px rgba(0,0,0,0.40))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span
                className="uppercase font-bold text-white"
                style={{ fontSize: 28, letterSpacing: "0.2em" }}
              >
                CFAV
              </span>
              <span
                className="uppercase text-white"
                style={{ fontSize: 9, letterSpacing: "0.3em", opacity: 0.45 }}
              >
                Logo Pending
              </span>
            </div>

            {/* ASO card */}
            <div
              style={{
                width: 240,
                height: 120,
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,122,26,0.45)",
                filter: "drop-shadow(0px 10px 18px rgba(0,0,0,0.40))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 20px",
              }}
            >
              <Image
                src="/logos/aso-logo-white.png"
                alt="AnchorStage Operations"
                width={200}
                height={92}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
