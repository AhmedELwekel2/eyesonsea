"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useUser } from "@/lib/auth";
import { Check, Eyebrow, Lead, Section, Title } from "./ui";
import { DashboardDemo } from "./DashboardDemo";
import { WorkshopProgram } from "./WorkshopProgram";
import { HeroCarousel } from "./HeroCarousel";

/* ---------- 1. Hero ---------- */

export function Hero() {
  const { hero, site } = useLang().t;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-sea-900 text-white lg:min-h-[88vh]">
      {/* الجوال: السلايدر في صندوق 4:3 فوق النص · سطح المكتب: خلفية ممتدة خلف النص */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <HeroCarousel />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sea-900 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-sea-900/95 via-sea-900/50 to-sea-900/20 lg:block" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-14 lg:pointer-events-none lg:min-h-[88vh] lg:justify-end lg:pb-16 lg:pt-24 [&>*]:lg:pointer-events-auto">
        {/* 1. العنوان الرئيسي */}
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{hero.headline}</h1>

        {/* 2. العلامة + الشعار */}
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xl font-bold text-coral-100 sm:text-2xl">{hero.workshopName}</span>
          <span className="hidden text-coral-100/60 sm:inline" aria-hidden>|</span>
          <span className="text-base font-medium text-sea-100 sm:text-lg">{hero.slogan}</span>
        </p>

        {/* 3. الأزرار */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* TODO: اربطه بنظام التعلم المستقل عند جاهزيته (hero.learn.href) */}
          <button type="button" title={hero.learn.soon} className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-base font-bold text-sea-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {hero.learn.label}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <a href={hero.primary.href} className="inline-flex items-center justify-center rounded-full border-2 border-white/70 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition hover:bg-white hover:text-sea-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {hero.primary.label}
          </a>
        </div>

        {/* 4. المظلة + النص التعريفي */}
        <p className="mt-8 inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur sm:text-sm">{site.umbrella}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sea-100 sm:text-base">{hero.text}</p>
      </div>
    </section>
  );
}

/* ---------- 2. Partners (by role) ---------- */

export function Partners() {
  const { partners } = useLang().t;
  return (
    <Section className="bg-gradient-to-b from-sea-800 to-sea-900 py-16 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="text-coral-100">{partners.eyebrow}</Eyebrow>
        <h2 className="text-2xl font-bold sm:text-3xl">{partners.title}</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.groups.map((g) => (
          <div key={g.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-coral-100">
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
              {g.title}
            </h3>
            <ul className="space-y-3">
              {g.items.map((e) => (
                <li key={e.name} className="flex items-center gap-3">
                  <div className="grid h-16 w-24 shrink-0 place-items-center rounded-xl bg-white p-2">
                    <Image src={e.logo} alt={e.name} width={160} height={160} className="max-h-12 w-auto object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-snug" dir="auto">{e.name}</div>
                    <div className="text-xs text-sea-100/75">{e.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm font-semibold text-coral-100">{partners.implementedBy}</p>
    </Section>
  );
}

/* ---------- 3. About ---------- */

export function About() {
  const { about, ui } = useLang().t;
  return (
    <Section id="about" className="bg-sand-100 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{ui.aboutEyebrow}</Eyebrow>
        <Title>{about.title}</Title>
        <Lead>{about.text}</Lead>
      </div>

      <div className="mt-14 grid gap-8 rounded-3xl bg-sea-900 p-8 text-white lg:grid-cols-2 lg:p-12">
        <div>
          <p className="mb-2 text-sm font-semibold text-coral-100">{about.umbrellaTitle}</p>
          <h3 className="text-2xl font-bold">{ui.umbrellaHeading}</h3>
          <p className="mt-4 leading-relaxed text-sea-100">{about.umbrellaText}</p>
        </div>
        <ul className="space-y-3 self-center">
          {about.umbrellaGoals.map((g) => (
            <li key={g} className="flex items-start gap-3 text-sm text-sea-100"><Check />{g}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-sea-100 bg-white p-6">
          <h3 className="font-bold text-sea-900">{ui.vision}</h3>
          <p className="mt-2 text-sm leading-relaxed text-sea-800/85">{about.vision}</p>
        </div>
        <div className="rounded-2xl border border-sea-100 bg-white p-6">
          <h3 className="font-bold text-sea-900">{ui.mission}</h3>
          <p className="mt-2 text-sm leading-relaxed text-sea-800/85">{about.mission}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 3b. Learning system ---------- */

export function Learning() {
  const { learning } = useLang().t;
  const user = useUser();
  const done = user ? learning.steps.filter((_, i) => user.progress[`stage-${i + 1}`]).length : 0;
  const pct = Math.round((done / learning.steps.length) * 100);
  return (
    <Section id="learn" className="bg-sea-900 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="text-coral-100">{learning.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">{learning.title}</h2>
        <p className="mt-4 leading-relaxed text-sea-100/85">{learning.text}</p>
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {learning.steps.map((st, i) => {
          const isDone = !!user?.progress[`stage-${i + 1}`];
          return (
            <li key={st.name} className={`relative rounded-2xl border p-5 transition ${isDone ? "border-coral-500/60 bg-white/10" : "border-white/10 bg-white/5"}`}>
              <span className={`mb-3 grid h-10 w-10 place-items-center rounded-full font-bold ${isDone ? "bg-coral-500 text-sea-900" : "bg-white/15 text-white"}`}>{isDone ? "✓" : i + 1}</span>
              <h3 className="text-lg font-bold">{st.name}</h3>
              <p className="mt-1 text-sm text-sea-100/80">{st.desc}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        {user && (
          <div className="w-full max-w-md">
            <div className="mb-2 flex justify-between text-sm text-sea-100">
              <span>{learning.progress}</span>
              <span dir="ltr">{pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-coral-500 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
        <Link href={user ? "/dashboard" : "#register"} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-base font-bold text-sea-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
          {user ? learning.ctaLogged : learning.cta}
        </Link>
      </div>
    </Section>
  );
}

/* ---------- 4. Vision 2030 ---------- */

export function Vision2030() {
  const { vision2030, ui } = useLang().t;
  return (
    <Section className="bg-sand-100 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{ui.vision2030Eyebrow}</Eyebrow>
        <Title>{vision2030.title}</Title>
        <p className="mt-3 text-lg font-semibold text-sea-800">{vision2030.lead}</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {vision2030.cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-sea-900">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sea-800/80">{c.desc}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-sea-800/60">{vision2030.disclaimer}</p>
    </Section>
  );
}

/* ---------- 5. Workshop success ---------- */

export function Workshop() {
  const { workshop } = useLang().t;
  return (
    <Section id="workshop" className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{workshop.eyebrow}</Eyebrow>
        <Title>{workshop.title}</Title>
        <Lead>{workshop.text}</Lead>
        <p className="mt-3 text-sm text-sea-800/70">{workshop.date}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {workshop.stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-sea-900 p-5 text-center text-white">
            <div className="text-4xl font-extrabold text-coral-500" dir="ltr">{s.value}</div>
            <div className="mt-1 text-sm text-sea-100">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {workshop.gallery.map((g) => (
          <figure key={g.src} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image src={g.src} alt={g.caption} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <figcaption className="p-3 text-xs text-sea-800/80">{g.caption}</figcaption>
          </figure>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-sea-800/85">{workshop.text2}</p>

      <WorkshopProgram />
    </Section>
  );
}

/* ---------- 6. Guardians ---------- */

export function Guardians() {
  const { guardians, ui } = useLang().t;
  return (
    <Section className="bg-sea-100/50 py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-lg">
          <Image src={guardians.photo} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <Eyebrow>{guardians.eyebrow}</Eyebrow>
          <Title>{guardians.title}</Title>
          <Lead>{guardians.text}</Lead>
          <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            {guardians.path.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 font-medium text-sea-900 shadow-sm">{p}</span>
                {i < guardians.path.length - 1 && <span className="text-sea-500">{ui.pathArrow}</span>}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-sea-800/80">{guardians.text2}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 7. Programs ---------- */

export function Programs() {
  const { programs, ui } = useLang().t;
  return (
    <Section id="programs" className="bg-sea-100/60 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{ui.programsEyebrow}</Eyebrow>
        <Title>{programs.title}</Title>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.items.map((p, i) => (
          <div key={p.title} className="rounded-2xl border border-sea-100 bg-white p-6 shadow-sm">
            <span className="mb-3 inline-block rounded-full bg-sea-100 px-2.5 py-0.5 text-xs font-semibold text-sea-800">0{i + 1}</span>
            <h3 className="text-lg font-bold text-sea-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sea-800/80">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 8. Dashboard ---------- */

export function Impact() {
  const { dashboard } = useLang().t;
  return (
    <Section id="impact" className="bg-sea-900 py-16 text-white lg:py-20">
      {/* اللوحة أولًا ثم نصها أسفلها */}
      <div className="mx-auto max-w-4xl">
        <DashboardDemo />
      </div>
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">{dashboard.title}</h2>
        <p className="mt-2 text-lg text-sea-100">{dashboard.subtitle}</p>
        <p className="mt-5 leading-relaxed text-sea-100/90">{dashboard.text}</p>
        <p className="mt-4 text-sm leading-relaxed text-sea-100/70">{dashboard.note}</p>
        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-sea-100/80">{dashboard.privacy}</p>
      </div>
    </Section>
  );
}

/* ---------- 9. Transformix ---------- */

export function Transformix() {
  const { transformix } = useLang().t;
  return (
    <Section className="py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>{transformix.eyebrow}</Eyebrow>
          <Title>{transformix.title}</Title>
          <Lead>{transformix.text}</Lead>
          <p className="mt-4 leading-relaxed text-sea-800/85">{transformix.text2}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {transformix.capabilities.map((c) => (
            <li key={c} className="rounded-2xl border border-sea-100 bg-white p-4 text-center text-sm font-semibold text-sea-900 shadow-sm">{c}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- 10. Partnerships ---------- */

export function Partnerships() {
  const { partnerships, ui } = useLang().t;
  return (
    <Section id="partnerships" className="bg-sand-100 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{ui.partnershipsEyebrow}</Eyebrow>
        <Title>{partnerships.title}</Title>
        <Lead>{partnerships.text}</Lead>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {partnerships.areas.map((a) => (
          <li key={a} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-sea-900 shadow-sm">{a}</li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-sea-800/80">{partnerships.text2}</p>
    </Section>
  );
}

/* ---------- 12. Final CTA + Footer ---------- */

export function FinalCta() {
  const { finalCta } = useLang().t;
  return (
    <Section className="pb-20">
      <div className="rounded-3xl bg-gradient-to-br from-sea-800 to-sea-900 p-8 text-center text-white sm:p-12">
        <h2 className="text-3xl font-bold sm:text-4xl">{finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-sea-100">{finalCta.text}</p>
        <p className="mt-6 text-lg font-semibold text-coral-100">{finalCta.tagline}</p>
      </div>
    </Section>
  );
}

export function Footer() {
  const { site, partners, footerLinks, ui } = useLang().t;
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-sea-100 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-sea-900">{site.name}</p>
          <p className="mt-1 text-sm text-sea-800/80">{site.umbrella}</p>
          <p className="mt-4 text-sm text-sea-800/70">{site.slogan}</p>
        </div>
        <div>
          <h3 className="font-bold text-sea-900">{ui.contact}</h3>
          <p className="mt-2 text-sm text-sea-800/80">{ui.contactText}</p>
          <ul className="mt-3 space-y-1 text-sm text-sea-900">
            <li>{ui.emailLabel}: <a href={`mailto:${site.email}`} className="underline" dir="ltr">{site.email}</a></li>
            <li>{ui.phoneLabel}: <span dir="ltr">{site.phone}</span></li>
            <li>{ui.locationLabel}: {site.location}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sea-900">{ui.entities}</h3>
          <ul className="mt-2 space-y-1 text-sm text-sea-800/80">
            {partners.groups.flatMap((g) => g.items).map((e) => (
              <li key={e.name}><span dir="auto">{e.name}</span> <span className="text-teal-700">· {e.role}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-sea-100 px-4 pt-6 text-xs text-sea-800/60 sm:px-6">
        <ul className="flex flex-wrap gap-4">
          {footerLinks.map((l) => (
            <li key={l}><a href="#contact" className="hover:text-sea-900">{l}</a></li>
          ))}
        </ul>
        <p>© 2026 {site.name} · {ui.rights}</p>
      </div>
    </footer>
  );
}
