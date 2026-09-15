"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { themes, themeSwatches, useTheme } from "@/lib/theme";

/** قائمة اختيار الثيم — زر صغير في شريط التنقل يفتح قائمة منسدلة بأربعة خيارات */
export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const { ui } = useLang().t;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // إغلاق عند النقر خارج القائمة أو الضغط على Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ui.theme}
        title={ui.theme}
        className="flex h-9 items-center gap-1.5 rounded-full border border-sea-100 px-2.5 text-sea-800 transition hover:bg-sea-100"
      >
        <Swatch colors={themeSwatches[theme]} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div role="menu" className="absolute end-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-sea-100 bg-white p-1.5 shadow-xl animate-[fadeIn_.15s_ease-out]">
          <p className="px-3 pb-1 pt-1.5 text-[11px] font-semibold text-sea-800/60">{ui.theme}</p>
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              role="menuitemradio"
              aria-checked={theme === t}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition hover:bg-sea-100 ${theme === t ? "bg-sea-100 font-bold text-sea-900" : "text-sea-800"}`}
            >
              <span className="text-base leading-none">{ui.themes[t].emoji}</span>
              <span className="flex-1">{ui.themes[t].name}</span>
              <Swatch colors={themeSwatches[t]} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Swatch({ colors }: { colors: readonly [string, string, string] }) {
  return (
    <span className="flex -space-x-1 rtl:space-x-reverse" aria-hidden>
      {colors.map((c) => (
        <span key={c} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />
      ))}
    </span>
  );
}
