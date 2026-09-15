"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function WorkshopProgram() {
  const [day, setDay] = useState(0);
  const { workshop } = useLang().t;
  const active = workshop.days[day];

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="flex rounded-full bg-sea-100 p-1" role="tablist">
        {workshop.days.map((d, i) => (
          <button
            key={d.label}
            role="tab"
            aria-selected={day === i}
            onClick={() => setDay(i)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${day === i ? "bg-sea-700 text-white shadow" : "text-sea-800 hover:bg-white/60"}`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-sea-500">{active.focus}</p>
      <ol className="mt-4 divide-y divide-sea-100 rounded-2xl border border-sea-100 bg-white">
        {active.items.map(([time, title]) => (
          <li key={time} className="flex items-center gap-4 px-4 py-3 text-sm">
            <time className="w-12 shrink-0 font-mono font-semibold text-sea-500" dir="ltr">{time}</time>
            <span className="text-sea-900">{title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
