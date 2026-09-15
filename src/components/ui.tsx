import type { ReactNode } from "react";

export function Section({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "text-teal-700" }: { children: ReactNode; className?: string }) {
  return <p className={`mb-2 text-sm font-semibold ${className}`}>{children}</p>;
}

export function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-bold text-sea-900 sm:text-4xl ${className}`}>{children}</h2>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-sea-800/85">{children}</p>;
}

export function Check() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-700/10 text-teal-700">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}
