"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Eyebrow, Lead, Section, Title } from "./ui";
import { VideoLightbox } from "./VideoLightbox";

export const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * معرض الفيديو: مقطع مميز + بطاقات.
 * الجوال: المميز بعرض الشاشة ثم شريط بطاقات أفقي بالتمرير · سطح المكتب: المميز جانبًا وشبكة بطاقات.
 * لا يُحمَّل أي فيديو قبل فتحه في النافذة (poster فقط).
 */
export function VideoGallery() {
  const { videos, ui } = useLang().t;
  const [open, setOpen] = useState<number | null>(null);
  const [featured, ...rest] = videos.items;

  return (
    <Section id="videos" className="bg-sea-900 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="text-coral-100">{videos.eyebrow}</Eyebrow>
        <Title className="text-white">{videos.title}</Title>
        <Lead>
          <span className="text-sea-100/85">{videos.text}</span>
        </Lead>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* المقطع المميز */}
        <div className="lg:col-span-5">
          <VideoCard video={featured} onOpen={() => setOpen(0)} playLabel={ui.play} featured badge={videos.featuredBadge} />
        </div>

        {/* البطاقات: تمرير أفقي على الجوال، شبكة من sm فأعلى */}
        <div className="-mx-4 lg:col-span-7 lg:mx-0">
          <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
            {rest.map((v, i) => (
              <li key={v.src} className="w-[62%] shrink-0 snap-start sm:w-auto">
                <VideoCard video={v} onOpen={() => setOpen(i + 1)} playLabel={ui.play} />
              </li>
            ))}
            {/* بطاقة الحملة تكمل الشبكة (6 خانات) */}
            <li className="w-[62%] shrink-0 snap-start sm:w-auto">
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white p-5 text-center shadow-lg">
                <Image src="/logos/campaign-eyes-on-sea-6.png" alt="عينك على البحر #6" width={390} height={173} className="w-full max-w-[200px] object-contain" />
                <p className="text-xs leading-relaxed text-sea-800/80">{videos.campaignTile}</p>
                <span className="rounded-full bg-sea-100 px-3 py-1 text-xs font-semibold text-sea-800">{videos.count}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {open !== null && <VideoLightbox items={videos.items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </Section>
  );
}

type Video = { src: string; poster: string; duration: number; title: string; desc: string };

function VideoCard({ video, onOpen, playLabel, featured = false, badge }: { video: Video; onOpen: () => void; playLabel: string; featured?: boolean; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${playLabel}: ${video.title}`}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-sea-800 text-start shadow-lg ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:ring-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${featured ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "aspect-[3/4]"}`}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        sizes={featured ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 20vw, (min-width:640px) 33vw, 62vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/20 to-transparent" />

      {badge && <span className="absolute start-3 top-3 rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-bold text-sea-900">{badge}</span>}
      <span className="absolute end-3 top-3 rounded-md bg-sea-900/60 px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"><span dir="ltr">{fmtDuration(video.duration)}</span></span>

      {/* زر التشغيل */}
      <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-sea-900 shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-white ${featured ? "h-20 w-20" : "h-14 w-14"}`}>
        <PlayIcon size={featured ? 30 : 22} />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className={`block font-bold leading-snug ${featured ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}`}>{video.title}</span>
        <span className={`mt-1 block text-sea-100/80 ${featured ? "text-sm sm:text-base" : "line-clamp-2 text-xs"}`}>{video.desc}</span>
      </span>
    </button>
  );
}

export function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="translate-x-[2px]">
      <path d="M7 5.5v13a1 1 0 0 0 1.53.85l10.3-6.5a1 1 0 0 0 0-1.7L8.53 4.65A1 1 0 0 0 7 5.5z" />
    </svg>
  );
}
