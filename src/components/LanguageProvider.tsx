"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionary, type Dictionary, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Dictionary; toggle: () => void };

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "eots-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  // Restore the saved language after hydration so server and first client render match.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved === "en") {
      const id = requestAnimationFrame(() => setLang("en"));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  useEffect(() => {
    const t = dictionary[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, t: dictionary[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
