import type { WorkstationSlug } from "@/lib/content-types";
import {
  DEMO_EVENT,
  DEMO_INVENTORY,
  DEMO_MARKETING,
  DEMO_ORGS,
  DEMO_SIGNAGE,
} from "@/lib/demo-canon";

/**
 * Miniature ASO workstation screens for the homepage Workstations Preview —
 * each preview is the real page silhouette (identity header, left nav,
 * slate-50 workspace well, white cards) rendered as if at ~35% zoom, using
 * the platform's actual UI language: hairline slate borders, uppercase
 * tracking-widest micro-labels, mono chips, and 50/700/200 status triads.
 * All record data comes from the demo canon — never invent names inline.
 */

// ── Shared miniature atoms ─────────────────────────────────────────────────────

function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm">
      {children}
    </div>
  );
}

function NavColumn({ items }: { items: readonly string[] }) {
  return (
    <div className="w-14 shrink-0 border-r border-slate-100 bg-white py-0.5">
      {items.map((item, index) => (
        <p
          key={item}
          className={`truncate px-1.5 py-1 text-[8px] font-medium ${
            index === 0 ? "bg-slate-100 text-slate-900" : "text-slate-500"
          }`}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[8px] font-semibold uppercase tracking-widest text-slate-400">
      {children}
    </p>
  );
}

function MonoChip({ children }: { children: string }) {
  return (
    <span className="rounded bg-slate-100 px-1 py-px font-mono text-[8px] text-slate-500">
      {children}
    </span>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-100 bg-white px-1.5 py-1 shadow-sm">
      <MicroLabel>{label}</MicroLabel>
      <p className="text-sm font-bold leading-tight tabular-nums text-slate-900">{value}</p>
    </div>
  );
}

// ── Event Workstation — identity header, left nav, Event Status card ──────────

function EventPreview() {
  return (
    <AppFrame>
      <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 px-2 py-1.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-[10px] font-semibold text-slate-900">
            {DEMO_EVENT.name}
          </span>
          <span className="hidden sm:inline-flex">
            <MonoChip>{DEMO_EVENT.code}</MonoChip>
          </span>
        </div>
        <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-px text-[8px] font-semibold text-emerald-700">
          {DEMO_EVENT.readiness}
        </span>
      </div>
      <div className="flex">
        <NavColumn items={["Overview", "Setup", "Operations", "Financials"]} />
        <div className="min-w-0 flex-1 bg-slate-50 p-1.5">
          <div className="rounded border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-1.5 py-1">
              <MicroLabel>Event Status</MicroLabel>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex items-center gap-1.5 px-1.5 py-1">
                <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[8px] font-bold text-emerald-600">
                  ✓
                </span>
                <span className="text-[9px] font-medium text-slate-700">Ready for Show</span>
              </div>
              <div className="flex items-center justify-between gap-1.5 px-1.5 py-1">
                <span className="text-[9px] text-slate-500">Crew</span>
                <span className="text-[9px] font-semibold text-slate-900">
                  {DEMO_EVENT.crew.filled} / {DEMO_EVENT.crew.total} Filled
                </span>
              </div>
              <div className="flex items-center justify-between gap-1.5 px-1.5 py-1">
                <span className="text-[9px] text-slate-500">Quote</span>
                <MonoChip>{DEMO_EVENT.quoteNumber}</MonoChip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

// ── Inventory Workstation — org header, left nav, stat cards, Power Audit ─────

function InventoryPreview() {
  return (
    <AppFrame>
      <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 px-2 py-1.5">
        <span className="truncate text-[10px] font-semibold text-slate-900">
          {DEMO_ORGS[0].name}
        </span>
        <span className="shrink-0 rounded border border-slate-200 bg-slate-100 px-1.5 py-px text-[8px] font-semibold text-slate-500">
          Inventory
        </span>
      </div>
      <div className="flex">
        <NavColumn items={["Overview", "Inventory", "Packages"]} />
        <div className="min-w-0 flex-1 space-y-1.5 bg-slate-50 p-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <StatTile label="Active Items" value={String(DEMO_EVENT.gear.items)} />
            <StatTile label="Packages" value={String(DEMO_EVENT.gear.packages)} />
          </div>
          <div className="flex items-center justify-between gap-1.5 rounded border border-slate-100 bg-white px-1.5 py-1 shadow-sm">
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-900">Power Audit</p>
              <p className="text-[8px] font-medium text-emerald-600">
                {DEMO_INVENTORY.powerAuditStatus}
              </p>
            </div>
            <span className="shrink-0 text-[8px] font-semibold text-sky-600">Review →</span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

// ── Marketing Workstation — left nav, KPI tiles, Needs Attention panel ────────

function MarketingPreview() {
  return (
    <AppFrame>
      <div className="flex">
        <NavColumn items={["Overview", "Content", "Announcements"]} />
        <div className="min-w-0 flex-1 space-y-1.5 bg-slate-50 p-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <StatTile label="New Leads (30d)" value={String(DEMO_MARKETING.newLeads30d)} />
            <StatTile label="Quotes Sent" value={String(DEMO_MARKETING.quotesSent)} />
          </div>
          <div className="rounded border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 px-1.5 py-1">
              <MicroLabel>Needs Attention</MicroLabel>
              <span className="rounded-full bg-amber-100 px-1 py-px text-[8px] font-semibold text-amber-700">
                {DEMO_MARKETING.needsAttentionCount}
              </span>
            </div>
            <div className="flex items-center justify-between gap-1.5 px-1.5 py-1">
              <span className="truncate text-[9px] text-slate-700">
                {DEMO_MARKETING.waitingLead.label}
              </span>
              <span className="shrink-0 text-[8px] font-semibold text-amber-700">
                {DEMO_MARKETING.waitingLead.daysWaiting}d waiting
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

// ── Signage Workstation — screen registry with stacked screen records ─────────

function SignagePreview() {
  return (
    <AppFrame>
      <div className="space-y-1.5 p-1.5">
        <p className="border-l-2 border-l-slate-500 pl-1.5 text-[8px] font-bold uppercase tracking-wider text-slate-500">
          Registered Screens ({DEMO_SIGNAGE.screens.length})
        </p>
        {DEMO_SIGNAGE.screens.map((screen) => (
          <div
            key={screen.slug}
            className="flex items-start justify-between gap-1.5 rounded border border-slate-200 border-l-2 border-l-sky-400 bg-white p-1.5 shadow-sm"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1">
                <span className="truncate text-[9px] font-bold text-slate-900">
                  {screen.name}
                </span>
                <span className="rounded bg-sky-100 px-1 py-px text-[8px] font-semibold text-sky-700">
                  {screen.type}
                </span>
                <span className="rounded bg-green-100 px-1 py-px text-[8px] font-bold text-green-700">
                  ACTIVE
                </span>
              </div>
              <p className="mt-0.5 truncate font-mono text-[8px] text-slate-500">
                slug: {screen.slug}
              </p>
              <p className="mt-0.5 text-[8px] font-medium text-emerald-600">● Configured</p>
            </div>
            <span className="shrink-0 rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-semibold text-white">
              Manage
            </span>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

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
