"use client";

import { useState, type FormEvent } from "react";
import { partnerships, register } from "@/lib/content";
import { Button } from "./ui";

type Status = "idle" | "sending" | "done" | "error";

const field = "w-full rounded-xl border border-sea-100 bg-white px-4 py-2.5 text-sm text-sea-900 outline-none focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20";
const label = "mb-1 block text-sm font-medium text-sea-900";

async function submit(kind: "register" | "partnership", form: HTMLFormElement): Promise<boolean> {
  const fd = new FormData(form);
  const body: Record<string, string | boolean> = { kind };
  fd.forEach((v, k) => {
    body[k] = typeof v === "string" ? v : "";
  });
  form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((c) => (body[c.name] = c.checked));
  const res = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.ok;
}

/* ---------- Registration (7 tracks) ---------- */

const MINOR_TYPES = new Set(["ولي أمر", "مشارك", "مساعد يافع"]);

export function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState(register.types[0]);
  const isMinor = MINOR_TYPES.has(type);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const ok = await submit("register", e.currentTarget).catch(() => false);
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-teal-700/20 bg-teal-700/5 p-8 text-center">
        <p className="text-lg font-semibold text-sea-900">{register.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-sea-100 bg-white p-6 shadow-sm sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="sm:col-span-2">
        <label className={label}>نوع التسجيل *</label>
        <div className="flex flex-wrap gap-2">
          {register.types.map((t) => (
            <label key={t} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${type === t ? "border-sea-700 bg-sea-700 text-white" : "border-sea-100 bg-white text-sea-800 hover:bg-sea-100"}`}>
              <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div><label className={label}>الاسم *</label><input name="name" required className={field} /></div>
      <div><label className={label}>رقم الجوال *</label><input name="phone" type="tel" required dir="ltr" className={field} /></div>
      <div><label className={label}>البريد الإلكتروني *</label><input name="email" type="email" required dir="ltr" className={field} /></div>
      <div><label className={label}>المدينة *</label><input name="city" required className={field} /></div>
      <div><label className={label}>الصفة</label><input name="role" placeholder="مثال: معلم، ولي أمر، مدير مدرسة" className={field} /></div>
      <div><label className={label}>اسم المدرسة أو الجهة</label><input name="org" className={field} /></div>
      {isMinor && (
        <div><label className={label}>عمر المشارك</label><input name="age" type="number" min={6} max={18} dir="ltr" className={field} /></div>
      )}
      <div className="sm:col-span-2"><label className={label}>رسالة أو ملاحظات</label><textarea name="notes" rows={3} className={field} /></div>

      <div className="space-y-2 sm:col-span-2">
        <label className="flex items-start gap-2 text-sm text-sea-800">
          <input type="checkbox" name="privacy" required className="mt-1" />
          <span>أوافق على <a href="#contact" className="underline">سياسة الخصوصية</a> وعلى التواصل معي بشأن البرامج المقبلة. *</span>
        </label>
        {isMinor && (
          <>
            <label className="flex items-start gap-2 text-sm text-sea-800">
              <input type="checkbox" name="guardianConsent" required className="mt-1" />
              <span>بصفتي ولي الأمر، أوافق على مشاركة ابني/ابنتي في أنشطة المبادرة وفق شروط المشاركة. *</span>
            </label>
            <label className="flex items-start gap-2 text-sm text-sea-800">
              <input type="checkbox" name="photoConsent" className="mt-1" />
              <span>أوافق على التصوير واستخدام الصور في التوثيق والنشر وفق سياسة استخدام الصور. (اختياري)</span>
            </label>
          </>
        )}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "جارٍ الإرسال…" : "إرسال الطلب"}</Button>
        {status === "error" && <p className="mt-2 text-sm text-red-600">تعذر الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر البريد.</p>}
      </div>
    </form>
  );
}

/* ---------- Partnership request (modal) ---------- */

export function PartnershipButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{partnerships.cta}</Button>
      {open && <PartnershipModal onClose={() => setOpen(false)} />}
    </>
  );
}

function PartnershipModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const ok = await submit("partnership", e.currentTarget).catch(() => false);
    setStatus(ok ? "done" : "error");
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-sea-900/60 p-4" onClick={onClose} role="dialog" aria-modal>
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-sea-900">{partnerships.cta}</h3>
          <button onClick={onClose} aria-label="إغلاق" className="grid h-8 w-8 place-items-center rounded-full hover:bg-sea-100">✕</button>
        </div>
        {status === "done" ? (
          <p className="rounded-xl bg-teal-700/5 p-6 text-center font-semibold text-sea-900">شكرًا لاهتمامكم. سيتواصل معكم فريق المبادرة لتحديد موعد الاجتماع.</p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div><label className={label}>الاسم *</label><input name="name" required className={field} /></div>
            <div><label className={label}>الجهة *</label><input name="org" required className={field} /></div>
            <div><label className={label}>المسمى الوظيفي *</label><input name="title" required className={field} /></div>
            <div><label className={label}>نوع الشراكة *</label>
              <select name="type" required className={field} defaultValue="">
                <option value="" disabled>اختر</option>
                {partnerships.types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><label className={label}>البريد الإلكتروني *</label><input name="email" type="email" required dir="ltr" className={field} /></div>
            <div><label className={label}>الجوال *</label><input name="phone" type="tel" required dir="ltr" className={field} /></div>
            <div className="sm:col-span-2"><label className={label}>الرسالة</label><textarea name="message" rows={3} className={field} /></div>
            <label className="flex items-start gap-2 text-sm text-sea-800 sm:col-span-2">
              <input type="checkbox" name="privacy" required className="mt-1" />
              <span>أوافق على سياسة الخصوصية والتواصل معي بشأن الشراكة. *</span>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "جارٍ الإرسال…" : "إرسال الطلب"}</Button>
              {status === "error" && <p className="mt-2 text-sm text-red-600">تعذر الإرسال. يرجى المحاولة مرة أخرى.</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
