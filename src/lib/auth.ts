"use client";

import { useSyncExternalStore } from "react";

/**
 * حسابات المتعلمين — تخزين محلي في المتصفح (localStorage) لعدم وجود خادم/قاعدة بيانات بعد.
 * عند ربط خلفية حقيقية: استبدل register/login/saveProgress بنداءات API وأبقِ الواجهة كما هي.
 */

export type AgeGroup = "child" | "teen" | "adult" | "";
export type Role = "student" | "professional" | "";

export type User = {
  name: string;
  email: string;
  ageGroup: AgeGroup;
  role: Role;
  createdAt: string;
  /** معرّف الوحدة → تاريخ الإكمال */
  progress: Record<string, string>;
};

type Stored = User & { passHash: string };

const USERS_KEY = "eos-users";
const SESSION_KEY = "eos-session";
const listeners = new Set<() => void>();

const readUsers = (): Record<string, Stored> => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
};
const writeUsers = (u: Record<string, Stored>) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const notify = () => listeners.forEach((cb) => cb());

async function hash(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

const strip = (u: Stored): User => {
  const { passHash, ...rest } = u;
  void passHash;
  return rest;
};

/** يعيد المستخدم الحالي أو null */
let cache: { key: string; user: User | null } = { key: "", user: null };
function readSession(): User | null {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    const raw = email ? (localStorage.getItem(USERS_KEY) ?? "") : "";
    const key = `${email}|${raw}`;
    if (cache.key !== key) {
      const u = email ? readUsers()[email] : undefined;
      cache = { key, user: u ? strip(u) : null };
    }
    return cache.user;
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export type AuthError = "exists" | "invalid" | "notfound";

export async function register(input: { name: string; email: string; password: string; ageGroup: AgeGroup; role: Role }): Promise<{ ok: true } | { ok: false; error: AuthError }> {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();
  if (users[email]) return { ok: false, error: "exists" };
  users[email] = {
    name: input.name.trim(),
    email,
    ageGroup: input.ageGroup,
    role: input.role,
    createdAt: new Date().toISOString(),
    progress: {},
    passHash: await hash(`${email}:${input.password}`),
  };
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  notify();
  return { ok: true };
}

export async function login(emailRaw: string, password: string): Promise<{ ok: true } | { ok: false; error: AuthError }> {
  const email = emailRaw.trim().toLowerCase();
  const u = readUsers()[email];
  if (!u) return { ok: false, error: "notfound" };
  if (u.passHash !== (await hash(`${email}:${password}`))) return { ok: false, error: "invalid" };
  localStorage.setItem(SESSION_KEY, email);
  notify();
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  notify();
}

/** يبدّل حالة إكمال وحدة تعليمية ويحفظها في حساب المستخدم الحالي */
export function toggleProgress(moduleId: string) {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return;
  const users = readUsers();
  const u = users[email];
  if (!u) return;
  if (u.progress[moduleId]) delete u.progress[moduleId];
  else u.progress[moduleId] = new Date().toISOString();
  writeUsers(users);
  notify();
}

export function useUser() {
  return useSyncExternalStore(subscribe, readSession, () => null);
}
