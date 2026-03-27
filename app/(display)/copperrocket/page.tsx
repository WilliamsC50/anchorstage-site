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
      {/* ── Glass overlay panel ─────────────────────────────────────────────── */}
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
        {/* SignupDisplay owns everything inside the panel including scrollable area */}
        <SignupDisplay />
      </div>
    </div>
  );
}
