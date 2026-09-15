"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/i18n";
import { fmtDuration } from "./VideoGallery";

type Video = { src: string; poster: string; duration: number; title: string; desc: string };

/**
 * نافذة عرض الفيديو: يُركَّب مقطع واحد فقط في كل مرة (تحميل كسول)،
 * تنقّل بالأسهم/لوحة المفاتيح/السحب، وإغلاق بـ Esc أو النقر خارج المقطع.
 */
export function VideoLightbox({ items, index, onIndex, onClose }: { items: Video[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { ui, videos } = useLang().t;
  const { dir } = useLang();
  const video = items[index];
  const touchX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  // لوحة المفاتيح + قفل تمرير الصفحة
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(dir === "rtl" ? -1 : 1);
      else if (e.key === "ArrowLeft") go(dir === "rtl" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose, dir]);

  // تشغيل تلقائي عند الفتح/التبديل (المستخدم نقر بنفسه فالمتصفح يسمح بالصوت)
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [index]);

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // السحب لليسار = التالي (اتجاه بصري ثابت)
  };

  const leftLabel = dir === "rtl" ? ui.nextVideo : ui.prevVideo;
  const rightLabel = dir === "rtl" ? ui.prevVideo : ui.nextVideo;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] flex flex-col bg-sea-900/95 text-white backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* الشريط العلوي */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm text-sea-100/80" dir="ltr">
          {index + 1} <span className="opacity-60">/</span> {items.length}
        </span>
        <button type="button" onClick={onClose} aria-label={ui.close} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6" /></svg>
        </button>
      </div>

      {/* المقطع */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-20 sm:pb-4">
        <video
          key={video.src}
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          onClick={(e) => e.stopPropagation()}
          className="h-full w-auto max-w-full rounded-2xl bg-black object-contain shadow-2xl ring-1 ring-white/10"
        />

        <button type="button" onClick={(e) => { e.stopPropagation(); go(dir === "rtl" ? 1 : -1); }} aria-label={leftLabel} className={navCls + " left-2 sm:left-4"}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); go(dir === "rtl" ? -1 : 1); }} aria-label={rightLabel} className={navCls + " right-2 sm:right-4"}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      {/* العنوان + شريط المصغرات للتنقل السريع */}
      <div className="px-4 pb-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-lg font-bold sm:text-xl">{video.title}</h3>
          <p className="mt-1 text-sm text-sea-100/80">
            {video.desc} <span className="text-sea-100/50" dir="ltr">· {fmtDuration(video.duration)}</span>
          </p>
        </div>
        <ul className="mx-auto mt-4 flex max-w-full justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden" aria-label={videos.eyebrow}>
          {items.map((v, i) => (
            <li key={v.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-label={v.title}
                aria-current={i === index}
                className={`block h-14 w-10 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-12 ${i === index ? "ring-coral-500" : "ring-transparent opacity-60 hover:opacity-100"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- مصغرات صغيرة داخل نافذة، الملف مضغوط مسبقًا */}
                <img src={v.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}

const navCls =
  "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";
