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
  headline: "Signups open at 7:00 PM",
  body: "See the host to join the list.",
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
           Four zones: notice (top) → mic + event label (mid) → branding (bottom)
           NOTICE const above is the only thing to swap when admin wiring is ready.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute flex flex-col justify-between select-none pointer-events-none"
        style={{ top: "8%", bottom: "6%", left: "50%", right: "4%" }}
      >

        {/* 1. Notice area — left-aligned, reads like a bulletin */}
        <div
          className="flex flex-col gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "1.25rem" }}
        >
          <p
            className="font-semibold uppercase text-white"
            style={{ fontSize: 10, letterSpacing: "0.45em", opacity: 0.45, color: "var(--aso-orange)" }}
          >
            {NOTICE.eyebrow}
          </p>
          <p
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.6rem)", letterSpacing: "0.01em", opacity: 0.72, lineHeight: 1.25 }}
          >
            {NOTICE.headline}
          </p>
          <p
            className="text-white"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", letterSpacing: "0.03em", opacity: 0.35 }}
          >
            {NOTICE.body}
          </p>
        </div>

        {/* 2. Event identity — mic icon + label, centered */}
        <div className="flex flex-col items-center gap-5">
          <div style={{ opacity: 0.16 }}>
            <svg
              viewBox="0 0 60 140"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 88, height: "auto", display: "block" }}
              aria-hidden="true"
            >
              <rect x="10" y="0" width="40" height="72" rx="20" fill="white" />
              <line x1="14" y1="22" x2="46" y2="22" stroke="#0F2F4F" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="12" y1="36" x2="48" y2="36" stroke="#0F2F4F" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="50" x2="46" y2="50" stroke="#0F2F4F" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="27" y="72" width="6" height="44" fill="white" />
              <rect x="8" y="116" width="44" height="5" rx="2.5" fill="white" />
              <rect x="27" y="120" width="6" height="16" rx="3" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p
              className="font-bold uppercase text-white"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", letterSpacing: "0.35em", opacity: 0.25 }}
            >
              Open Mic Night
            </p>
            <p
              className="font-medium uppercase text-white"
              style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)", letterSpacing: "0.5em", opacity: 0.14 }}
            >
              Copper Rocket
            </p>
          </div>
        </div>

        {/* 3. Branding footer — sponsor + ASO, centered */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="uppercase text-white"
            style={{ fontSize: 10, letterSpacing: "0.35em", opacity: 0.22 }}
          >
            Brought to you by
          </p>
          {/* CFAV placeholder — swap with <Image> when logo is available */}
          <div
            style={{
              width: 100,
              height: 34,
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="uppercase text-white"
              style={{ fontSize: 9, letterSpacing: "0.3em", opacity: 0.20 }}
            >
              CFAV
            </span>
          </div>
          <Image
            src="/logos/aso-logo-white.png"
            alt="AnchorStage Operations"
            width={220}
            height={80}
            style={{
              opacity: 0.8,
              filter: "drop-shadow(0px 6px 18px rgba(0,0,0,0.35))",
              objectFit: "contain",
            }}
          />
        </div>

      </div>
    </div>
  );
}
