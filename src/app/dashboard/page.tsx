"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { logout, toggleProgress, useUser } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

/** لوحة التعلم: تقدم المستخدم في مسار «حماة مرجان الوطن» (مراحل learning.steps) */
export default function DashboardPage() {
  const { lang, t } = useLang();
  const { dashboardPage: d, learning, ui } = t;
  const user = useUser();
  const modules = learning.steps.map((s, i) => ({ id: `stage-${i + 1}`, ...s }));

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-sand-100 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {!user ? (
            <div className="mx-auto max-w-md rounded-3xl border border-sea-100 bg-white p-8 text-center shadow-sm">
              <h1 className="text-2xl font-bold text-sea-900">{d.notLoggedTitle}</h1>
              <p className="mt-3 text-sm leading-relaxed text-sea-800/80">{d.notLoggedText}</p>
              <Link href="/#register" className="mt-6 inline-flex rounded-full bg-sea-700 px-6 py-3 text-sm font-bold text-white hover:bg-sea-800">{d.notLoggedCta}</Link>
            </div>
          ) : (
            <Dashboard user={user} modules={modules} lang={lang} d={d} logoutLabel={ui.logout} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

type Module = { id: string; name: string; desc: string };
type D = ReturnType<typeof useLang>["t"]["dashboardPage"];

function Dashboard({ user, modules, lang, d, logoutLabel }: { user: NonNullable<ReturnType<typeof useUser>>; modules: Module[]; lang: string; d: D; logoutLabel: string }) {
  const doneCount = modules.filter((m) => user.progress[m.id]).length;
  const pct = Math.round((doneCount / modules.length) * 100);
  const joined = new Date(user.createdAt).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-sm font-semibold text-teal-700">{d.title}</p>
        <h1 className="text-3xl font-bold text-sea-900">
          {d.welcome} {user.name.split(" ")[0]} 👋
        </h1>

        {/* شريط التقدم */}
        <div className="mt-6 rounded-3xl bg-sea-900 p-6 text-white shadow-lg">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-sea-100">{d.progressLabel}</span>
            <span className="text-3xl font-extrabold text-coral-500" dir="ltr">{pct}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-coral-500 transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          {pct === 100 && <p className="mt-4 text-sm font-semibold text-coral-100">{d.complete}</p>}
        </div>

        {/* المراحل */}
        <h2 className="mt-10 text-xl font-bold text-sea-900">{d.modulesTitle}</h2>
        <ol className="mt-4 space-y-3">
          {modules.map((m, i) => {
            const done = !!user.progress[m.id];
            return (
              <li key={m.id} className={`flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm transition sm:flex-row sm:items-center ${done ? "border-teal-700/30" : "border-sea-100"}`}>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${done ? "bg-teal-700 text-white" : "bg-sea-100 text-sea-900"}`}>
                  {done ? "✓" : i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold text-sea-900">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-sea-800/80">{m.desc}</p>
                  <p className="mt-1 text-[11px] text-sea-800/50">{d.quizSoon}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleProgress(m.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${done ? "bg-sea-100 text-sea-800 hover:bg-sea-100/70" : "bg-sea-700 text-white hover:bg-sea-800"}`}
                >
                  {done ? d.undo : d.markDone}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="space-y-4 self-start lg:sticky lg:top-24">
        <div className="rounded-3xl border border-sea-100 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-sea-900">{d.accountTitle}</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-sea-800/60">{user.name}</dt>
              <dd className="text-sea-900" dir="ltr">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sea-800/60">{d.joined}</dt>
              <dd className="text-sea-900">{joined}</dd>
            </div>
          </dl>
          <button type="button" onClick={logout} className="mt-5 w-full rounded-full border border-sea-100 px-4 py-2 text-sm font-semibold text-sea-800 hover:bg-sea-100">{logoutLabel}</button>
        </div>
        <Link href="/" className="block text-center text-sm font-semibold text-teal-700 hover:underline">{d.backHome}</Link>
      </aside>
    </div>
  );
}
