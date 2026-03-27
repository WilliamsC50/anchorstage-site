import type { Metadata } from "next";
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

      {/* ── Right: venue branding — mid-right, non-interactive ──────────────── */}
      <div
        className="absolute flex flex-col items-center gap-2 text-center select-none pointer-events-none"
        style={{ top: "32%", left: "52%", right: "5%" }}
      >
        <p
          className="text-xs font-semibold uppercase text-white/20"
          style={{ letterSpacing: "0.4em" }}
        >
          Open Mic Night
        </p>
        <p
          className="text-4xl font-bold uppercase text-white/[0.13]"
          style={{ letterSpacing: "0.15em" }}
        >
          Copper Rocket
        </p>
      </div>

      {/* ── Right: QR placeholder — lower-right, reserved for future use ─────── */}
      <div
        className="absolute flex flex-col items-center gap-3 select-none pointer-events-none"
        style={{ bottom: "10%", right: "7%" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 112,
            height: 112,
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 6,
          }}
        >
          <p
            className="text-white/[0.10] font-semibold"
            style={{ fontSize: 10, letterSpacing: "0.25em" }}
          >
            QR
          </p>
        </div>
        <p
          className="text-white/[0.10] uppercase"
          style={{ fontSize: 9, letterSpacing: "0.3em" }}
        >
          Scan to sign up
        </p>
      </div>
    </div>
  );
}
