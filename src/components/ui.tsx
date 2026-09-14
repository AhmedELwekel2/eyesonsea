import type { ReactNode } from "react";

export function Section({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-sm font-semibold text-teal-700">{children}</p>;
}

export function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-bold text-sea-900 sm:text-4xl ${className}`}>{children}</h2>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-sea-800/85">{children}</p>;
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:opacity-60";
  const styles = {
    primary: "bg-coral-500 text-white shadow hover:opacity-90",
    secondary: "bg-sea-700 text-white hover:bg-sea-800",
    ghost: "border border-sea-700/40 text-sea-800 hover:bg-sea-100",
  }[variant];
  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
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
