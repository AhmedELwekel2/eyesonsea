"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

export function Navbar() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    ["#journey", t.nav.journey],
    ["#teams", t.nav.teams],
    ["#program", t.nav.program],
    ["#gallery", t.nav.gallery],
    ["#safety", t.nav.safety],
    ["#partners", t.nav.partners],
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-sea-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-sea-900">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sea-700 text-white">
            <WaveIcon />
          </span>
          <span>{t.nav.brand}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-sea-800 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-sea-500">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full border border-sea-700 px-3 py-1.5 text-sm font-semibold text-sea-700 hover:bg-sea-100"
            aria-label="Switch language"
          >
            {t.nav.switch}
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-sea-800 hover:bg-sea-100 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-sea-100 bg-white px-4 py-3 md:hidden">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-medium text-sea-800 hover:bg-sea-100">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 2 2 2" />
      <path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 2 2 2" />
    </svg>
  );
}
