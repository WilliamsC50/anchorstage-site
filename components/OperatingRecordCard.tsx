import { DEMO_EVENT } from "@/lib/demo-canon";

interface RecordField {
  label: string;
  value: string;
  maintainedIn: string;
}

/** The record fields shown as tiles in the centerpiece card. Values come
 *  only from DEMO_EVENT; each is attributed to the surface maintaining it. */
const RECORD_PRIMARY_FIELDS: RecordField[] = [
  { label: "Client", value: DEMO_EVENT.client, maintainedIn: "Event Workstation" },
  { label: "Venue", value: DEMO_EVENT.venue, maintainedIn: "Event Workstation" },
  { label: "Readiness", value: DEMO_EVENT.readiness, maintainedIn: "Event Workstation" },
  {
    label: "Crew",
    value: `${DEMO_EVENT.crew.filled} / ${DEMO_EVENT.crew.total} Filled`,
    maintainedIn: "Event Workstation",
  },
  {
    label: "Gear",
    value: `${DEMO_EVENT.gear.packages} Packages · ${DEMO_EVENT.gear.items} Items`,
    maintainedIn: "Inventory Workstation",
  },
  { label: "Quote", value: DEMO_EVENT.quoteNumber, maintainedIn: "Financials" },
  { label: "Invoice", value: DEMO_EVENT.invoiceStatus, maintainedIn: "Financials" },
  {
    label: "Media & Assets",
    value: `${DEMO_EVENT.mediaAssetCount} Tagged`,
    maintainedIn: "Media & Assets",
  },
];

/** The rest of the record, shown as a compact footer strip on the card. */
const RECORD_SECONDARY_FIELDS: { label: string; value: string }[] = [
  { label: "Owner", value: DEMO_EVENT.ownerOrg },
  { label: "Primary Collaborator", value: DEMO_EVENT.primaryCollaborator },
  { label: "Planned Power", value: DEMO_EVENT.powerPlannedAmps },
  { label: "Deposit", value: DEMO_EVENT.depositStatus },
  { label: "Production Brief", value: DEMO_EVENT.productionBriefStatus },
  { label: "Pack List", value: DEMO_EVENT.packListStatus },
  { label: "Projected Margin", value: `${DEMO_EVENT.projectedMarginPct}%` },
];

/** The flagship demo event rendered as one operating record, field by field,
 *  with the surface that maintains each field. */
export default function OperatingRecordCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-aso-navy px-6 py-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <p className="truncate font-semibold text-white">{DEMO_EVENT.name}</p>
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-white/70">
            {DEMO_EVENT.code}
          </span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
          Operating Record
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-px bg-slate-100 md:grid-cols-4">
        {RECORD_PRIMARY_FIELDS.map((field) => (
          <div key={field.label} className="bg-white px-4 py-4 sm:px-5">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
              {field.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-aso-navy sm:text-base">
              {field.value}
            </dd>
            <dd className="mt-1 text-[10px] text-gray-400 sm:text-xs">{field.maintainedIn}</dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
        <dl className="flex flex-wrap gap-x-6 gap-y-1.5">
          {RECORD_SECONDARY_FIELDS.map((field) => (
            <div key={field.label} className="flex items-baseline gap-1.5 text-xs">
              <dt className="text-gray-400">{field.label}</dt>
              <dd className="font-semibold text-gray-600">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
