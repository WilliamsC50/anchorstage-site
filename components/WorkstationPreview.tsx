import type { WorkstationSlug } from "@/lib/content-types";
import {
  DEMO_EVENT,
  DEMO_INVENTORY,
  DEMO_MARKETING,
  DEMO_SIGNAGE,
} from "@/lib/demo-canon";

/**
 * Miniature ASO product surfaces for the homepage Workstations Preview.
 *
 * Styling deliberately mirrors the real workstation UI language (see the
 * platform dashboard): slate-50 wells holding white hairline-bordered cards,
 * uppercase tracking-widest slate micro-labels, mono code chips, 50/700/200
 * status-badge triads, and sky text arrows. Record data comes from the demo
 * canon — never invent names inline.
 */

// ── Shared atoms (match platform badge/chip patterns) ─────────────────────────

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
      {children}
    </p>
  );
}

function ReadinessPill({ children }: { children: string }) {
  return (
    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
      {children}
    </span>
  );
}

function SkyBadge({ children }: { children: string }) {
  return (
    <span className="shrink-0 rounded border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
      {children}
    </span>
  );
}

function MonoChip({ children }: { children: string }) {
  return (
    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
      {children}
    </span>
  );
}

function Well({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
      {children}
    </div>
  );
}

function InnerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-white shadow-sm">{children}</div>
  );
}

// ── Event Workstation — identity header + Event Health rows ───────────────────

function EventPreview() {
  return (
    <Well>
      <InnerCard>
        <div className="flex items-center justify-between gap-2 px-2.5 py-2">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-slate-900">
              {DEMO_EVENT.name}
            </p>
            <p className="mt-0.5">
              <MonoChip>{DEMO_EVENT.code}</MonoChip>
            </p>
          </div>
          <ReadinessPill>{DEMO_EVENT.readiness}</ReadinessPill>
        </div>
      </InnerCard>
      <InnerCard>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center gap-2 px-2.5 py-1.5">
            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-600">
              ✓
            </span>
            <span className="text-[11px] font-medium text-slate-700">Ready for Show</span>
          </div>
          <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
            <span className="text-[11px] text-slate-500">Crew</span>
            <span className="text-[11px] font-semibold text-slate-900">
              {DEMO_EVENT.crew.filled} / {DEMO_EVENT.crew.total} Filled
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
            <span className="text-[11px] text-slate-500">Quote</span>
            <MonoChip>{DEMO_EVENT.quoteNumber}</MonoChip>
          </div>
          <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
            <span className="text-[11px] text-slate-500">Production Brief</span>
            <SkyBadge>{DEMO_EVENT.productionBriefStatus}</SkyBadge>
          </div>
        </div>
      </InnerCard>
    </Well>
  );
}

// ── Inventory Workstation — StatCard grid ──────────────────────────────────────

function InventoryPreview() {
  const stats = [
    { label: "Gear Packages", value: String(DEMO_EVENT.gear.packages) },
    { label: "Gear Items", value: String(DEMO_EVENT.gear.items) },
    { label: "Gear Requests", value: String(DEMO_INVENTORY.gearRequestsOpen) },
    { label: "Power Audit", value: DEMO_INVENTORY.powerAuditStatus, positive: true },
  ];

  return (
    <Well>
      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-100 bg-white px-2.5 py-2 shadow-sm"
          >
            <MicroLabel>{stat.label}</MicroLabel>
            <p
              className={`mt-0.5 text-lg font-bold leading-tight tabular-nums ${
                stat.positive ? "text-emerald-600" : "text-slate-900"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Well>
  );
}

// ── Marketing Workstation — KPI tiles + Needs Attention ───────────────────────

function MarketingPreview() {
  return (
    <Well>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-slate-100 bg-white px-2.5 py-2 shadow-sm">
          <MicroLabel>New Leads (30d)</MicroLabel>
          <p className="mt-0.5 text-lg font-bold leading-tight tabular-nums text-slate-900">
            {DEMO_MARKETING.newLeads30d}
          </p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-white px-2.5 py-2 shadow-sm">
          <MicroLabel>Quotes Sent</MicroLabel>
          <p className="mt-0.5 text-lg font-bold leading-tight tabular-nums text-slate-900">
            {DEMO_MARKETING.quotesSent}
          </p>
        </div>
      </div>
      <InnerCard>
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-2.5 py-1.5">
          <MicroLabel>Needs Attention</MicroLabel>
          <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
            {DEMO_MARKETING.needsAttentionCount}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
          <span className="truncate text-[11px] text-slate-700">
            {DEMO_MARKETING.waitingLead.label}
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-amber-700">
            {DEMO_MARKETING.waitingLead.daysWaiting}d waiting
          </span>
        </div>
      </InnerCard>
    </Well>
  );
}

// ── Signage Workstation — Now Playing + queue rows ─────────────────────────────

function SignagePreview() {
  return (
    <Well>
      <InnerCard>
        <div className="px-2.5 pb-2 pt-1.5">
          <MicroLabel>Now Playing</MicroLabel>
          <div className="mt-1 rounded-md border border-sky-200 bg-sky-50 px-2 py-1.5">
            <p className="truncate text-[11px] font-bold text-sky-900">
              {DEMO_SIGNAGE.nowPlaying}
            </p>
          </div>
        </div>
      </InnerCard>
      <InnerCard>
        <div className="px-2.5 pb-2 pt-1.5">
          <MicroLabel>Queue ({DEMO_SIGNAGE.queue.length})</MicroLabel>
          <div className="mt-1 space-y-1">
            {DEMO_SIGNAGE.queue.map((entry, index) => (
              <div
                key={entry}
                className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50 px-2 py-1"
              >
                <span className="w-3 shrink-0 text-right font-mono text-[10px] text-slate-400">
                  {index + 1}
                </span>
                <span className="truncate text-[11px] text-slate-700">{entry}</span>
              </div>
            ))}
          </div>
        </div>
      </InnerCard>
    </Well>
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
