import type { WorkstationSlug } from "@/lib/content-types";
import { DEMO_EVENT } from "@/lib/demo-canon";
import { WORKSTATIONS } from "@/lib/workstations";

// Display-only preview figures not yet part of DEMO_EVENT. Keep believable
// and consistent with the demo universe (see lib/demo-canon.ts rules) —
// promote into demo-canon if any other surface starts needing them.
const PREVIEW_STATS = {
  gearRequestsOpen: 2,
  powerAuditStatus: "Clean",
  signageScreens: 4,
} as const;

const MARKETING_CAPABILITIES =
  WORKSTATIONS.find((workstation) => workstation.slug === "marketing")?.capabilities ?? [];

function StatusBadge({ children }: { children: string }) {
  return (
    <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
      {children}
    </span>
  );
}

function CodeBadge({ children }: { children: string }) {
  return (
    <span className="rounded border border-aso-blue/25 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-aso-navy">
      {children}
    </span>
  );
}

function PreviewPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-aso-bg/70 p-3">{children}</div>
  );
}

function EventPreview() {
  return (
    <PreviewPanel>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-aso-navy">{DEMO_EVENT.name}</p>
          <p className="font-mono text-[10px] text-gray-500">{DEMO_EVENT.code}</p>
        </div>
        <StatusBadge>{DEMO_EVENT.readiness}</StatusBadge>
      </div>
      <dl className="mt-2.5 space-y-1.5 border-t border-gray-200/70 pt-2.5">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-[11px] text-gray-500">Crew</dt>
          <dd className="text-[11px] font-semibold text-aso-navy">
            {DEMO_EVENT.crew.filled} / {DEMO_EVENT.crew.total} Filled
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-[11px] text-gray-500">Quote</dt>
          <dd>
            <CodeBadge>{DEMO_EVENT.quoteNumber}</CodeBadge>
          </dd>
        </div>
      </dl>
    </PreviewPanel>
  );
}

function InventoryPreview() {
  const stats = [
    { label: "Gear Packages", value: String(DEMO_EVENT.gear.packages) },
    { label: "Gear Items", value: String(DEMO_EVENT.gear.items) },
    { label: "Gear Requests", value: String(PREVIEW_STATS.gearRequestsOpen) },
    { label: "Power Audit", value: PREVIEW_STATS.powerAuditStatus, positive: true },
  ];

  return (
    <PreviewPanel>
      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-gray-100 bg-white px-2 py-1.5">
            <p
              className={`text-sm font-bold leading-tight ${
                stat.positive ? "text-emerald-700" : "text-aso-navy"
              }`}
            >
              {stat.value}
            </p>
            <p className="text-[10px] leading-tight text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </PreviewPanel>
  );
}

function MarketingPreview() {
  return (
    <div className="space-y-1 rounded-lg border border-gray-100 bg-aso-bg/70 p-2">
      {MARKETING_CAPABILITIES.map((capability, index) => (
        <div
          key={capability}
          className={
            index === 0
              ? "flex items-center gap-2 rounded-md border border-gray-100 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-aso-navy shadow-sm"
              : "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-gray-500"
          }
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              index === 0 ? "bg-aso-blue" : "bg-gray-300"
            }`}
            aria-hidden="true"
          />
          {capability}
        </div>
      ))}
    </div>
  );
}

function SignagePreview() {
  return (
    <PreviewPanel>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-aso-navy">
          {PREVIEW_STATS.signageScreens} Screens
        </p>
        <StatusBadge>Active Layout</StatusBadge>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {Array.from({ length: PREVIEW_STATS.signageScreens }, (_, index) => (
          <div
            key={index}
            className={`aspect-[16/10] rounded border bg-white p-1.5 ${
              index === 0 ? "border-aso-blue/50" : "border-gray-200"
            }`}
          >
            <div className="h-1 w-3/4 rounded bg-aso-blue/30" />
            <div className="mt-1 h-1 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">
          Venue Signage
        </span>
        <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">
          Event Displays
        </span>
      </div>
    </PreviewPanel>
  );
}

/**
 * Compact product-UI vignette for one workstation card on the homepage
 * Workstations Preview. Purely presentational; all record data comes from
 * the demo canon so every section depicts the same fictional universe.
 */
export default function WorkstationPreview({ slug }: { slug: WorkstationSlug }) {
  switch (slug) {
    case "event":
      return <EventPreview />;
    case "inventory":
      return <InventoryPreview />;
    case "marketing":
      return <MarketingPreview />;
    case "signage":
      return <SignagePreview />;
  }
}
