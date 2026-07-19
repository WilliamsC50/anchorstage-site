/**
 * Reserved frame for a real product capture. Swapping in a screenshot later
 * means replacing the inner placeholder <div> with an <Image> at the same
 * 16:9 ratio (1600 × 900) — the figure, border, and layout stay untouched.
 */
export default function ScreenshotFrame({ name }: { name: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex aspect-video flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="mb-1 h-8 w-8 text-slate-300"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10.5" r="1.5" />
          <path d="m5.5 16.5 4-4 3 3 3-3 3 3" />
        </svg>
        <figcaption className="text-sm font-semibold text-slate-500">
          {name} Screenshot
        </figcaption>
        <p className="font-mono text-xs text-slate-400">1600 × 900</p>
        <p className="text-xs text-slate-400">Replace with real product capture</p>
      </div>
    </figure>
  );
}
