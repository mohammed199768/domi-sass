"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type Work = { key: string; title: string; image: string; href: string };

// Homepage-only preview media. Detail-page artwork remains in its existing data source.
const works: Work[] = [
  { key: "curevie", title: "Curevie", image: "/assest/our-work/curevie.webp", href: "/work/curevie" },
  { key: "horvath", title: "Horvath", image: "/assest/our-work/horvath.webp", href: "/work/horvath-survey" },
  { key: "manal-alhihi", title: "Manal Alhihi", image: "/assest/our-work/T.Manal.webp", href: "/work/manal-alhihi" },
  { key: "qaser-al-farah", title: "Qasr Al-Farah", image: "/assest/our-work/qaser-alfarah.webp", href: "/work/qasr-alfarah" },
];

function signedOffset(index: number, active: number, count: number) {
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

function pad(value: number) { return String(value).padStart(2, "0"); }

/** DOMINASE content in the Sultan Shadi homepage coverflow interaction model. */
export default function SelectedWorkCarousel() {
  const { language, t, dir } = useLanguage();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchPauseTimer = useRef<number | null>(null);
  const count = works.length;
  const activeWork = works[active % count];
  const isRtl = dir === "rtl";

  const go = useCallback((direction: number) => {
    setActive((current) => (current + direction + count) % count);
  }, [count]);

  const pauseForTouch = useCallback(() => {
    setPaused(true);
    if (touchPauseTimer.current) window.clearTimeout(touchPauseTimer.current);
    touchPauseTimer.current = window.setTimeout(() => {
      touchPauseTimer.current = null;
      setPaused(false);
    }, 1800);
  }, []);

  useEffect(() => () => { if (touchPauseTimer.current) window.clearTimeout(touchPauseTimer.current); }, []);

  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const timer = window.setInterval(() => go(1), 4200);
    return () => window.clearInterval(timer);
  }, [count, go, paused, reducedMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(isRtl ? 1 : -1);
      if (event.key === "ArrowRight") go(isRtl ? -1 : 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, isRtl]);

  const labels = useMemo(() => ({
    previous: language === "ar" ? "المشروع السابق" : "Previous project",
    next: language === "ar" ? "المشروع التالي" : "Next project",
    explore: language === "ar" ? "اسحب للاستكشاف" : "Swipe to explore",
  }), [language]);

  return (
    <section id="portfolio" className="home-work-gallery relative isolate overflow-hidden bg-background py-[clamp(4.5rem,9vw,7rem)] transition-colors duration-300" aria-labelledby="selected-work-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={`mx-auto mb-8 flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-8 lg:px-10 ${isRtl ? "flex-row-reverse text-end" : ""}`}>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-theme">{t.portfolio.title}</p>
          <h2 id="selected-work-title" className="mt-3 max-w-xl text-[clamp(1.85rem,4vw,3.25rem)] font-black leading-tight text-foreground">{t.portfolio.title}</h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-6 text-muted sm:block">{language === "ar" ? "استكشف مشاريعنا المختارة." : "Explore a selection of our work."}</p>
      </div>

      <div className="relative mx-auto flex h-[62svh] min-h-[420px] max-h-[640px] w-full items-center justify-center" style={{ perspective: "1800px" }}>
        {works.map((work, index) => {
          const offset = signedOffset(index, active, count);
          const absoluteOffset = Math.abs(offset);
          const centered = offset === 0;
          const visible = absoluteOffset <= 2;
          const side = Math.sign(offset);
          return (
            <motion.article key={work.key} className="home-work-card absolute h-full w-[84vw] max-w-[1040px] md:w-[70vw]" style={{ transform: `translateX(${offset * 42}%) translateZ(${-absoluteOffset * 240}px) rotateY(${-side * 26}deg) scale(${centered ? 1 : 0.9})`, opacity: visible ? (centered ? 1 : 0.55) : 0, zIndex: 50 - absoluteOffset, pointerEvents: visible ? "auto" : "none", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s cubic-bezier(0.16,1,0.3,1)" }} aria-hidden={!centered}>
              <Link href={work.href} tabIndex={centered ? 0 : -1} aria-label={centered ? `${t.portfolio.projectCTA}: ${work.title}` : undefined} onClick={(event) => { if (!centered) { event.preventDefault(); setActive(index); } }} className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-surface text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme">
                <Image src={work.image} alt={`${work.title} project preview`} fill priority={centered && index === 0} sizes="(max-width: 768px) 84vw, 70vw" className="pointer-events-none select-none object-contain p-2 transition-transform duration-[1200ms] ease-out group-hover:scale-105 md:p-4" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--bg)_92%,transparent)] via-[color-mix(in_srgb,var(--bg)_20%,transparent)] to-transparent" />
                <div className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 transition-opacity duration-500 md:p-9 ${isRtl ? "flex-row-reverse text-end" : ""}`} style={{ opacity: centered ? 1 : 0 }}>
                  <div><p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-primary-theme">{t.portfolio.title}</p><h3 className="mt-2 text-2xl font-black text-foreground md:text-4xl">{work.title}</h3></div>
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary-theme text-[var(--primary-contrast)] transition-transform duration-500 group-hover:scale-110"><ArrowUpRight className="h-5 w-5" aria-hidden /></span>
                </div>
              </Link>
            </motion.article>
          );
        })}

        <motion.div className="absolute inset-0 z-[60] md:hidden" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onPointerDown={pauseForTouch} onTap={() => router.push(activeWork.href)} onDragEnd={(_, info) => { if (info.offset.x < -60) go(isRtl ? -1 : 1); else if (info.offset.x > 60) go(isRtl ? 1 : -1); }} role="button" tabIndex={-1} aria-label={`${labels.explore}: ${activeWork.title}`} style={{ touchAction: "pan-y" }} />
        <button type="button" onClick={() => go(isRtl ? 1 : -1)} aria-label={labels.previous} className="absolute left-2 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-foreground transition-colors hover:border-primary-theme hover:text-primary-theme md:left-6"><ChevronLeft className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} aria-hidden /></button>
        <button type="button" onClick={() => go(isRtl ? -1 : 1)} aria-label={labels.next} className="absolute right-2 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-foreground transition-colors hover:border-primary-theme hover:text-primary-theme md:right-6"><ChevronRight className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} aria-hidden /></button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-1.5">{works.map((work, index) => <button key={work.key} type="button" onClick={() => setActive(index)} aria-label={`${language === "ar" ? "الانتقال إلى" : "Go to"} ${work.title}`} aria-current={index === active ? "true" : undefined} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-8 bg-primary-theme" : "w-1.5 bg-border hover:bg-muted"}`} />)}</div>
        <div className="flex items-center gap-6 text-[0.65rem] font-black uppercase tracking-[0.25em] text-muted"><span><span className="text-foreground">{pad(active + 1)}</span> / {pad(count)}</span><Link href={activeWork.href} className="inline-flex items-center gap-2 text-primary-theme hover:text-secondary-theme">{t.portfolio.projectCTA} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link></div>
      </div>
    </section>
  );
}
