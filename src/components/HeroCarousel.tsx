"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const AUTOPLAY_MS = 5500;

/** سلايدر صور الواجهة: تمرير بالإصبع (scroll-snap) + أسهم + تشغيل تلقائي */
export function HeroCarousel() {
  const { dir, t } = useLang();
  const slides = t.hero.slides;
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = ((i % slides.length) + slides.length) % slides.length;
    el.children[n]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [slides.length]);

  // تتبع الشريحة الظاهرة أثناء التمرير (يعمل مع RTL حيث تكون scrollLeft سالبة)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(Math.abs(el.scrollLeft) / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // تشغيل تلقائي — يتوقف عند اللمس/التمرير بالمؤشر
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) goTo(index + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, goTo]);

  // السهم الأيسر يتقدم في RTL ويرجع في LTR
  const left = () => goTo(dir === "rtl" ? index + 1 : index - 1);
  const right = () => goTo(dir === "rtl" ? index - 1 : index + 1);

  return (
    <div
      className="group relative h-full w-full"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
    >
      <div
        ref={track}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
      >
        {slides.map((s, i) => (
          <div key={s.src} className="relative h-full w-full shrink-0 snap-start" aria-hidden={i !== index} aria-label={`${i + 1} / ${slides.length}`}>
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.position ?? "center" }}
            />
          </div>
        ))}
      </div>

      {/* أسهم التنقل */}
      <button type="button" onClick={left} aria-label={dir === "rtl" ? t.ui.next : t.ui.prev} className={arrowCls + " left-3"}>
        <Chevron flip />
      </button>
      <button type="button" onClick={right} aria-label={dir === "rtl" ? t.ui.prev : t.ui.next} className={arrowCls + " right-3"}>
        <Chevron />
      </button>

      {/* نقاط الشرائح */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5" dir="ltr" role="tablist">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}

const arrowCls =
  "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-sea-900/45 text-white backdrop-blur transition hover:bg-sea-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-11 sm:w-11 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100";

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={flip ? "-scale-x-100" : ""}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
