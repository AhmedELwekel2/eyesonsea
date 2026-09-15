"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { login, register, useUser, type AgeGroup, type AuthError, type Role } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { Check, Eyebrow, Lead, Section, Title } from "./ui";

type Mode = "register" | "login";
type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms" | "form", string>>;

/** قسم «انضم إلينا»: بطاقة بصرية (صور المشتل المرجاني) + نموذج تسجيل/دخول */
export function Register() {
  const { register: r } = useLang().t;
  return (
    <Section id="register" className="relative overflow-hidden py-20">
      {/* موجات خلفية خفيفة */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sea-100/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -end-24 top-10 -z-10 h-64 w-64 rounded-full bg-coral-100/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -start-24 bottom-10 -z-10 h-64 w-64 rounded-full bg-sea-100 blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <Title>{r.title}</Title>
        <Lead>{r.text}</Lead>
      </div>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        <VisualCard />
        <div className="lg:col-span-7">
          <AuthCard />
        </div>
      </div>
    </Section>
  );
}

function VisualCard() {
  const { register: r } = useLang().t;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-sea-900 text-white shadow-lg lg:col-span-5">
      <div className="relative grid h-44 grid-cols-2 gap-1 sm:h-56 lg:h-72">
        {r.photos.map((p, i) => (
          <div key={p.src} className={`relative ${i === 1 ? "hidden sm:block" : "col-span-2 sm:col-span-1"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea-900 via-sea-900/30 to-transparent" />
      </div>
      <ul className="space-y-3 p-6 sm:p-8">
        {r.perks.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm text-sea-100">
            <Check />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthCard() {
  const { register: r } = useLang().t;
  const f = r.form;
  const user = useUser();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("register");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (user && !success) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-sea-100 bg-white p-8 text-center shadow-lg">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-sea-100 text-2xl">👋</span>
        <p className="text-lg font-bold text-sea-900">
          {f.loggedInAs} {user.name}
        </p>
        <Link href="/dashboard" className={primaryBtn}>{f.goDashboard}</Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "");
    const next: Errors = {};
    const email = v("email").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.errors.email;
    if (v("password").length < 8) next.password = f.errors.password;
    if (mode === "register") {
      if (v("name").trim().length < 2) next.name = f.errors.name;
      if (v("password") !== v("confirm")) next.confirm = f.errors.confirm;
      if (!fd.get("terms")) next.terms = f.errors.terms;
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    const res =
      mode === "register"
        ? await register({ name: v("name"), email, password: v("password"), ageGroup: v("ageGroup") as AgeGroup, role: v("role") as Role })
        : await login(email, v("password"));
    setBusy(false);
    if (!res.ok) {
      const key: AuthError = res.error;
      setErrors({ form: f.errors[key] });
      return;
    }
    setSuccess(mode === "register" ? f.success : f.loginSuccess);
    setTimeout(() => router.push("/dashboard"), 1400);
  }

  return (
    <div className="rounded-3xl border border-sea-100 bg-white p-6 shadow-lg sm:p-8">
      {/* تبديل إنشاء/دخول */}
      <div className="mb-6 flex rounded-full bg-sea-100 p-1" role="tablist">
        {(["register", "login"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setErrors({});
            }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === m ? "bg-sea-700 text-white shadow" : "text-sea-800 hover:bg-white/60"}`}
          >
            {m === "register" ? f.createTitle : f.loginTitle}
          </button>
        ))}
      </div>

      {success ? (
        <div role="status" className="flex flex-col items-center gap-3 py-10 text-center animate-[fadeIn_.3s_ease-out]">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-700/10 text-teal-700">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
          </span>
          <p className="font-bold text-sea-900">{success}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          {mode === "register" && <Field name="name" label={f.name} autoComplete="name" error={errors.name} className="sm:col-span-2" />}
          <Field name="email" type="email" label={f.email} autoComplete="email" inputMode="email" error={errors.email} className="sm:col-span-2" />
          <Field name="password" type="password" label={f.password} autoComplete={mode === "register" ? "new-password" : "current-password"} error={errors.password} className={mode === "login" ? "sm:col-span-2" : ""} />
          {mode === "register" && (
            <>
              <Field name="confirm" type="password" label={f.confirm} autoComplete="new-password" error={errors.confirm} />
              <SelectField name="ageGroup" label={f.ageGroup} options={f.ageGroups} />
              <SelectField name="role" label={f.role} options={f.roles} />
              <label className="flex items-start gap-3 text-sm text-sea-800 sm:col-span-2">
                <input type="checkbox" name="terms" className="mt-1 h-4 w-4 shrink-0 accent-sea-700" />
                <span>
                  {f.terms}
                  {errors.terms && <span className="block text-xs text-red-600">{errors.terms}</span>}
                </span>
              </label>
            </>
          )}

          {errors.form && <p role="alert" className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700 sm:col-span-2">{errors.form}</p>}

          <button type="submit" disabled={busy} className={`${primaryBtn} sm:col-span-2 ${busy ? "opacity-60" : ""}`}>
            {mode === "register" ? f.submit : f.loginSubmit}
          </button>

          <p className="text-center text-sm text-sea-800/80 sm:col-span-2">
            {mode === "register" ? f.haveAccount : f.noAccount}{" "}
            <button type="button" onClick={() => setMode(mode === "register" ? "login" : "register")} className="font-bold text-teal-700 underline-offset-2 hover:underline">
              {mode === "register" ? f.loginLink : f.registerLink}
            </button>
          </p>
          <p className="text-center text-[11px] text-sea-800/50 sm:col-span-2">{f.privacy}</p>
        </form>
      )}
    </div>
  );
}

const primaryBtn =
  "inline-flex w-full items-center justify-center rounded-full bg-sea-700 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-sea-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea-700";

const inputCls =
  "w-full rounded-xl border border-sea-100 bg-background px-4 py-3 text-sm text-sea-900 outline-none transition placeholder:text-sea-800/40 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/25";

function Field({ label, error, className = "", ...props }: { label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-sea-900">{label}</span>
      <input {...props} aria-invalid={!!error} className={`${inputCls} ${error ? "border-red-400" : ""}`} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function SelectField({ name, label, options }: { name: string; label: string; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-sea-900">{label}</span>
      <select name={name} defaultValue="" className={inputCls}>
        <option value="">—</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );
}
