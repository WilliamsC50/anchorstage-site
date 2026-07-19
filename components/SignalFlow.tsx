/**
 * Decorative signal-flow motif: modules joined by orthogonal patch runs with
 * lit connection points, the way a signal path or rigging plan is drawn.
 * Stands in for "connected information" without imitating product UI.
 *
 * Purely decorative. Never carries meaning that is not also in the copy.
 */
export default function SignalFlow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Patch runs, drawn first so modules sit on top of them */}
      <g stroke="var(--aso-blue-light)" strokeOpacity="0.28" strokeWidth="1.25">
        {/* left module out, down and across to the record */}
        <path d="M74 62 H120 V132 H150" />
        {/* right module out, down and across */}
        <path d="M246 62 H200 V132 H170" />
        {/* record down to lower module */}
        <path d="M160 168 V206" />
        {/* lower cross-tie */}
        <path d="M74 226 H118 V206 H202 V226 H246" />
      </g>

      {/* Lit connection points, the only orange in the motif */}
      <g fill="var(--aso-orange)">
        <circle cx="120" cy="132" r="2.75" />
        <circle cx="200" cy="132" r="2.75" />
        <circle cx="160" cy="206" r="2.75" />
      </g>

      {/* Modules */}
      <g stroke="var(--aso-blue-light)" strokeOpacity="0.45" strokeWidth="1.25">
        <rect x="30" y="38" width="88" height="48" rx="6" fill="var(--aso-navy-deep)" />
        <rect x="202" y="38" width="88" height="48" rx="6" fill="var(--aso-navy-deep)" />
        <rect x="30" y="202" width="88" height="48" rx="6" fill="var(--aso-navy-deep)" />
        <rect x="202" y="202" width="88" height="48" rx="6" fill="var(--aso-navy-deep)" />
      </g>

      {/* Module channel marks, like labelled strips on a case or console */}
      <g stroke="var(--aso-blue-light)" strokeOpacity="0.3" strokeWidth="1.25" strokeLinecap="round">
        <path d="M44 54 H84" />
        <path d="M44 66 H72" />
        <path d="M216 54 H256" />
        <path d="M216 66 H244" />
        <path d="M44 218 H84" />
        <path d="M44 230 H72" />
        <path d="M216 218 H256" />
        <path d="M216 230 H244" />
      </g>

      {/* The record at the centre, held slightly brighter */}
      <rect
        x="126"
        y="112"
        width="68"
        height="56"
        rx="7"
        fill="var(--aso-navy-deep)"
        stroke="var(--aso-orange)"
        strokeOpacity="0.5"
        strokeWidth="1.25"
      />
      <g stroke="var(--aso-blue-light)" strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round">
        <path d="M140 132 H180" />
        <path d="M140 143 H168" />
      </g>
    </svg>
  );
}
