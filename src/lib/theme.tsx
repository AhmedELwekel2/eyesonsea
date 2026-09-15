"use client";

import { useEffect, useSyncExternalStore } from "react";

export const themes = ["ocean", "coral", "marine", "light"] as const;
export type Theme = (typeof themes)[number];

/** عيّنات ألوان لعرضها في قائمة الاختيار (متوافقة مع globals.css) */
export const themeSwatches: Record<Theme, [string, string, string]> = {
  ocean: ["#062f45", "#1c9ccf", "#38bdf8"],
  coral: ["#4a2620", "#ef7a5d", "#ffb199"],
  marine: ["#063d3a", "#1fb2a6", "#5eead4"],
  light: ["#1f2933", "#2563eb", "#60a5fa"],
};

const STORAGE_KEY = "eos-theme";
const DEFAULT: Theme = "ocean";
const listeners = new Set<() => void>();

function readTheme(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if ((themes as readonly string[]).includes(v ?? "")) return v as Theme;
  } catch {}
  return DEFAULT;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function setTheme(t: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {}
  listeners.forEach((cb) => cb());
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return { theme, setTheme };
}

/**
 * يُحقن في <head> قبل الرسم الأول حتى لا يومض الثيم الافتراضي
 * عند إعادة التحميل لمن اختار ثيمًا آخر.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t)document.documentElement.dataset.theme=t;}catch(e){}`;
