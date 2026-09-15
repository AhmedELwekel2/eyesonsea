"use client";

import { useLang } from "@/lib/i18n";

const PRE = "#0f6b95";
const POST = "#38bdf8";

export function DashboardDemo() {
  const { dashboard } = useLang().t;
  return (
    <div className="rounded-3xl border border-sea-100 bg-white p-4 shadow-lg sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral-500" />
          <span className="text-sm font-semibold text-sea-900">{dashboard.demoTitle}</span>
        </div>
        <span className="rounded-full bg-sea-100 px-2.5 py-1 text-xs text-sea-800">{dashboard.demoBadge}</span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {dashboard.kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-sea-100/60 p-4">
            <div className="text-xs text-sea-800/70">{k.label}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-sea-900" dir="ltr">{k.value}</span>
              <span className="text-xs text-sea-800/70">{k.unit}</span>
            </div>
            {k.hint && <div className="mt-1 text-[11px] text-sea-800/50">{k.hint}</div>}
          </div>
        ))}
      </div>

      {/* Pre/post grouped bars */}
      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-sea-900">{dashboard.prePostTitle}</h4>
          <div className="flex gap-4 text-xs text-sea-800/80">
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: PRE }} />{dashboard.pre}</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: POST }} />{dashboard.post}</span>
          </div>
        </div>
        <ul className="space-y-3">
          {dashboard.prePost.map((r) => (
            <li key={r.topic}>
              <div className="mb-1 text-xs font-medium text-sea-900">{r.topic}</div>
              <Bar value={r.pre} color={PRE} label={dashboard.pre} />
              <div className="h-0.5" />
              <Bar value={r.post} color={POST} label={dashboard.post} />
            </li>
          ))}
        </ul>
      </div>

      {/* Partners + sites */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-sea-100 p-4">
          <h4 className="mb-2 text-sm font-bold text-sea-900">{dashboard.partnersTitle}</h4>
          <ul className="space-y-1.5 text-xs">
            {dashboard.partnersContribution.map((p) => (
              <li key={p.name} className="flex justify-between gap-2 border-b border-sea-100 pb-1.5 last:border-0">
                <span className="font-medium text-sea-900">{p.name}</span>
                <span className="text-sea-800/70">{p.share}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-sea-100 p-4">
          <h4 className="mb-2 text-sm font-bold text-sea-900">{dashboard.sitesTitle}</h4>
          <ul className="space-y-1.5 text-xs">
            {dashboard.sites.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sea-900">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-700/10 text-teal-700">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </span>
                {s}
              </li>
            ))}
            <li className="text-sea-800/50">{dashboard.sitesNote}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Bar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div className="flex items-center gap-2" title={`${label}: ${value}%`}>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-sea-100/70">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="w-9 text-end text-[11px] font-semibold text-sea-900" dir="ltr">{value}%</span>
    </div>
  );
}
