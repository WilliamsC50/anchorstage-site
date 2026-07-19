import WorkstationIcon from "@/components/WorkstationIcon";
import type { WorkstationSlug } from "@/lib/content-types";

/** Short display name for constellation nodes ("Event Workstation" → "Event"). */
function shortName(name: string): string {
  return name.replace(" Workstation", "");
}

/** One Workstation in the operating-record constellation. `line` draws the
 *  connector toward the record on the given side; omit it for a bare card. */
export default function WorkstationNode({
  slug,
  name,
  line,
}: {
  slug: WorkstationSlug;
  name: string;
  line?: "left" | "right";
}) {
  const card = (
    <a
      href={`#${slug}`}
      className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-aso-blue"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-aso-bg text-aso-blue">
        <WorkstationIcon slug={slug} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-aso-navy">
          {shortName(name)}
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Workstation
        </span>
      </span>
    </a>
  );

  if (!line) return card;

  return (
    <div className="flex items-center">
      {line === "right" && <span aria-hidden className="h-px flex-1 bg-slate-300" />}
      <div className="w-44 xl:w-48 shrink-0">{card}</div>
      {line === "left" && <span aria-hidden className="h-px flex-1 bg-slate-300" />}
    </div>
  );
}
