"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { content, defaultLang, type Content, type Lang } from "./content";

const STORAGE_KEY = "eos-lang";
const listeners = new Set<() => void>();

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {}
  return defaultLang;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function setLang(l: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
  listeners.forEach((cb) => cb());
}

type Ctx = { lang: Lang; dir: "rtl" | "ltr"; t: Content; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // الخادم يعرض العربية دائمًا؛ المتصفح يسترجع اللغة المحفوظة بعد الـ hydration
  const lang = useSyncExternalStore(subscribe, readLang, () => defaultLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    document.title = `${content[lang].site.name} | ${content[lang].site.slogan}`;
  }, [lang, dir]);

  return <LangContext.Provider value={{ lang, dir, t: content[lang], setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
