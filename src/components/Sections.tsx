"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "./LanguageProvider";

/* ---------- shared bits ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sea-500">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold text-sea-900 sm:text-4xl">{children}</h2>;
}

function Container({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative isolate min-h-[88vh] overflow-hidden text-white">
      <Image
        src="/photos/hero-beach-group.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/35 to-sea-900/20" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6">
        <p className="mb-4 inline-block w-fit rounded-full bg-coral-500/90 px-3 py-1 text-xs font-semibold sm:text-sm">
          {t.hero.eyebrow}
        </p>
        <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold text-sea-100 sm:text-2xl">
          <span className="font-extrabold text-white">{t.hero.tagline}</span>
          <span aria-hidden className="text-coral-500">|</span>
          <span>{t.hero.taglineSub}</span>
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">{t.hero.title}</h1>
        <p className="mt-4 max-w-2xl text-base text-sea-100 sm:text-lg">{t.hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((b) => (
            <span key={b} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

export function Stats() {
  const { t } = useLang();
  return (
    <Container className="bg-sea-900 py-12 text-white">
      <p className="mb-8 text-center text-lg font-semibold text-sea-100">{t.stats.title}</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {t.stats.items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-extrabold text-coral-500 sm:text-5xl">{s.value}</div>
            <div className="mt-1 text-sm text-sea-100">{s.label}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ---------- Journey ---------- */

export function Journey() {
  const { t } = useLang();
  return (
    <Container id="journey" className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.journey.eyebrow}</Eyebrow>
        <SectionTitle>{t.journey.title}</SectionTitle>
        <p className="mt-3 text-sea-800/80">{t.journey.subtitle}</p>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {t.journey.steps.map((s, i) => (
          <li key={s.name} className="relative rounded-2xl border border-sea-100 bg-white p-5 shadow-sm">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-sea-700 font-bold text-white">{i + 1}</span>
            <h3 className="text-lg font-bold text-sea-900">{s.name}</h3>
            <p className="mt-1 text-sm text-sea-800/80">{s.desc}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}

/* ---------- Teams ---------- */

const teamColors = ["bg-sky-500", "bg-emerald-500", "bg-orange-500", "bg-slate-300"];

export function Teams() {
  const { t } = useLang();
  return (
    <Container id="teams" className="bg-sand-100 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.teams.eyebrow}</Eyebrow>
        <SectionTitle>{t.teams.title}</SectionTitle>
        <p className="mt-3 text-sea-800/80">{t.teams.subtitle}</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.teams.items.map((team, i) => (
          <div key={team.name} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className={`h-2 ${teamColors[i]}`} />
            <div className="p-5">
              <h3 className="font-bold text-sea-900">{team.name}</h3>
              <p className="mt-1 text-sm font-semibold text-sea-500">{team.task}</p>
              <p className="mt-2 text-sm text-sea-800/80">{team.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ---------- Program (two-day schedule) ---------- */

export function Program() {
  const { t } = useLang();
  const [day, setDay] = useState(0);
  const active = t.program.days[day];

  return (
    <Container id="program" className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.program.eyebrow}</Eyebrow>
        <SectionTitle>{t.program.title}</SectionTitle>
        <p className="mt-3 text-sea-800/80">{t.program.subtitle}</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-md rounded-full bg-sea-100 p-1" role="tablist">
        {t.program.days.map((d, i) => (
          <button
            key={d.label}
            role="tab"
            aria-selected={day === i}
            onClick={() => setDay(i)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              day === i ? "bg-sea-700 text-white shadow" : "text-sea-800 hover:bg-white/60"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="font-semibold text-sea-900">{active.date}</p>
        <p className="text-sm text-sea-500">{active.focus}</p>
      </div>

      <ol className="relative mx-auto mt-8 max-w-3xl border-s-2 border-sea-100 ps-6">
        {active.items.map((item) => (
          <li key={item.time} className="relative pb-6 last:pb-0">
            <span className="absolute -start-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-coral-500 shadow" />
            <div className="rounded-2xl border border-sea-100 bg-white p-4 shadow-sm sm:flex sm:gap-5">
              <time className="block shrink-0 font-mono text-sm font-semibold text-sea-500 sm:w-28" dir="ltr">
                {item.time}
              </time>
              <div>
                <h3 className="font-bold text-sea-900">{item.title}</h3>
                <p className="mt-1 text-sm text-sea-800/80">{item.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-8 max-w-3xl rounded-2xl bg-coral-100 px-5 py-3 text-center text-sm text-sea-900">
        {t.program.note}
      </p>
    </Container>
  );
}

/* ---------- Threats ---------- */

export function Threats() {
  const { t } = useLang();
  return (
    <Container className="py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
          <Image src="/photos/threats-ghost-nets.jpg" alt={t.threats.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <Eyebrow>{t.threats.eyebrow}</Eyebrow>
          <SectionTitle>{t.threats.title}</SectionTitle>
          <p className="mt-4 text-sea-800/80">{t.threats.body}</p>
          <ul className="mt-6 space-y-3">
            {t.threats.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coral-100 text-coral-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <span className="font-medium text-sea-900">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

/* ---------- Gallery ---------- */

const galleryPhotos = ["/photos/mangrove-talk.jpg", "/photos/turtle-slide-3.jpg", "/photos/turtle-slide-2.jpg", "/photos/room-wide.jpg"];

export function Gallery() {
  const { t } = useLang();
  return (
    <Container id="gallery" className="bg-sea-100/50 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.gallery.eyebrow}</Eyebrow>
        <SectionTitle>{t.gallery.title}</SectionTitle>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {galleryPhotos.map((src, i) => (
          <figure key={src} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative aspect-video">
              <Image src={src} alt={t.gallery.captions[i]} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <figcaption className="p-3 text-sm text-sea-800/80">{t.gallery.captions[i]}</figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}

/* ---------- Safety ---------- */

export function Safety() {
  const { t } = useLang();
  return (
    <Container id="safety" className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.safety.eyebrow}</Eyebrow>
        <SectionTitle>{t.safety.title}</SectionTitle>
        <p className="mt-3 text-sea-800/80">{t.safety.subtitle}</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.safety.items.map((s) => (
          <div key={s.title} className="rounded-2xl border border-sea-100 bg-white p-5">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-teal-700/10 text-teal-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            <h3 className="font-bold text-sea-900">{s.title}</h3>
            <p className="mt-1 text-sm text-sea-800/80">{s.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ---------- Partners ---------- */

// Order matches t.partners.items.
const partnerLogos = [
  "/logos/jeddah-governorate.png",
  "/logos/amanat-jeddah.png",
  "/logos/shams.png",
  "/logos/future-experts.png",
];

export function Partners() {
  const { t } = useLang();
  return (
    <Container id="partners" className="bg-white py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.partners.eyebrow}</Eyebrow>
        <SectionTitle>{t.partners.title}</SectionTitle>
        <p className="mt-3 text-sea-800/80">{t.partners.subtitle}</p>
      </div>
      <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
        {t.partners.items.map((p, i) => {
          const logo = partnerLogos[i];
          return (
            <li key={p.name} className="flex flex-col items-center gap-3 text-center">
              <div className="grid h-32 w-full place-items-center rounded-2xl border border-sea-100 bg-white p-4 shadow-sm">
                <Image src={logo} alt={p.name} width={200} height={200} className="max-h-24 w-auto object-contain" />
              </div>
              <div>
                <div className="font-bold text-sea-900">{p.name}</div>
                <div className="text-xs text-sea-800/70">{p.role}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

/* ---------- Register CTA ---------- */

export function RegisterCta() {
  const { t } = useLang();
  const rows = [
    [t.cta.dateLabel, t.cta.date],
    [t.cta.timeLabel, t.cta.time],
    [t.cta.placeLabel, t.cta.place],
    [t.cta.ageLabel, t.cta.age],
  ];
  return (
    <Container id="next" className="py-20">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sea-800 to-sea-900 text-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-coral-500">{t.cta.eyebrow}</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t.cta.title}</h2>
            <dl className="mt-8 space-y-3">
              {rows.map(([k, v]) => (
                <div key={k} className="flex gap-4 border-b border-white/10 pb-3">
                  <dt className="w-24 shrink-0 text-sm text-sea-100/80">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-sea-100/80">{t.cta.note}</p>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Image src="/photos/turtle-slide-1.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-sea-100 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-sea-800/70 sm:px-6">
        <p className="text-base font-bold text-sea-900">{t.nav.brand}</p>
        <p>{t.footer.tagline}</p>
        <p>{t.footer.org}</p>
        <p className="mt-2 text-xs">© 2026 · {t.footer.rights}</p>
      </div>
    </footer>
  );
}
