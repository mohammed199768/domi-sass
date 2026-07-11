"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import BeneathInterfaceSvg, { type BeneathSvgRefs } from "./BeneathInterfaceSvg";

const SCENE_COUNT = 6;
const SCENE_DURATION = 1;
const FADE_DURATION = 0.35;

/**
 * One responsive cinematic stage. Every breakpoint uses the desktop rail +
 * SVG composition; only proportions and the available scroll distance change.
 */
export default function BeneathInterfaceSection() {
  const { t, dir, language } = useLanguage();
  const c = t.beneathInterface;
  const prefersReducedMotion = useReducedMotion();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isRtl = dir === "rtl";
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<BeneathSvgRefs | null>(null);

  const setSvgRefs = useCallback((refs: BeneathSvgRefs) => { svgRefs.current = refs; }, []);
  const scrollVh = SCENE_COUNT * (isDesktop ? 100 : isTablet ? 108 : 118) + (isDesktop ? 60 : 38);

  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const texts = textRefs.current;
    const dots = dotRefs.current;
    const scenes = svgRefs.current?.scenes ?? [];
    const showStableComposition = () => {
      texts.forEach((node, index) => node && gsap.set(node, { autoAlpha: index === 0 ? 1 : 0, y: 0 }));
      dots.forEach((node, index) => node && gsap.set(node, { opacity: index === 0 ? 1 : 0.3, scale: index === 0 ? 1.25 : 1 }));
      scenes.forEach((node, index) => node && gsap.set(node, { autoAlpha: index === 0 ? 1 : 0, visibility: index === 0 ? "visible" : "hidden", scale: 1, y: 0 }));
      if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 1, y: 0 });
    };

    if (prefersReducedMotion) {
      showStableComposition();
      return;
    }

    showStableComposition();
    if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 0, y: 14 });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 0; index < SCENE_COUNT - 1; index += 1) {
        const next = index + 1;
        const outAt = index * SCENE_DURATION + SCENE_DURATION - FADE_DURATION;
        const inAt = index * SCENE_DURATION + SCENE_DURATION - FADE_DURATION * 0.5;
        if (texts[index]) timeline.to(texts[index], { autoAlpha: 0, y: -12, duration: FADE_DURATION, ease: "power2.in" }, outAt);
        if (texts[next]) timeline.fromTo(texts[next], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: FADE_DURATION, ease: "power2.out" }, inAt);
        if (scenes[index]) timeline.to(scenes[index], { autoAlpha: 0, scale: 0.96, y: -10, duration: FADE_DURATION, ease: "power2.in" }, outAt);
        if (scenes[next]) timeline.fromTo(scenes[next], { autoAlpha: 0, visibility: "visible", scale: 0.97, y: 14 }, { autoAlpha: 1, scale: 1, y: 0, duration: FADE_DURATION, ease: "power2.out" }, inAt);
        if (dots[index]) timeline.to(dots[index], { opacity: 0.3, scale: 1, duration: FADE_DURATION }, outAt);
        if (dots[next]) timeline.to(dots[next], { opacity: 1, scale: 1.25, duration: FADE_DURATION }, inAt);
      }
      if (ctaRef.current) timeline.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: FADE_DURATION, ease: "power2.out" }, (SCENE_COUNT - 1) * SCENE_DURATION + FADE_DURATION);
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isDesktop, isTablet, language, prefersReducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="home-beneath-stage relative isolate bg-background transition-colors duration-300" style={{ minHeight: prefersReducedMotion ? "100svh" : `${scrollVh}vh` }} aria-label={c.title}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute right-[5%] top-[10%] h-[40%] w-[40%]" style={{ background: "radial-gradient(60% 60% at 70% 30%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 70%)", opacity: 0.5 }} />
        <div className="absolute bottom-[15%] left-[5%] h-[35%] w-[35%]" style={{ background: "radial-gradient(50% 50% at 30% 70%, color-mix(in srgb, var(--secondary) 14%, transparent), transparent 70%)", opacity: 0.35 }} />
      </div>

      <div className="sticky top-0 flex min-h-[100svh] items-stretch overflow-hidden pt-[max(4.75rem,env(safe-area-inset-top))] pb-[max(5.5rem,env(safe-area-inset-bottom))]" style={{ contain: "layout paint" }}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] items-center gap-[clamp(.7rem,3vw,3.5rem)] px-[clamp(1rem,4vw,2.5rem)]">
          <div className={`relative flex min-w-0 flex-col gap-[clamp(.65rem,2vw,1.5rem)] ${isRtl ? "order-2 items-end text-end" : "order-1 items-start text-start"}`}>
            <div className="w-full border-b pb-[clamp(.7rem,1.5vw,1.25rem)]" style={{ borderColor: "var(--border)" }}>
              <p className="mb-1 font-black uppercase tracking-[clamp(.16em,1.1vw,.36em)] text-primary-theme" style={{ fontSize: "clamp(.5rem,1.25vw,.625rem)" }}>{c.eyebrow}</p>
              <h2 className="font-black leading-[1.18] text-foreground" style={{ fontSize: "clamp(1.1rem,3.1vw,1.875rem)" }}>{c.title}</h2>
              <p className="mt-2 max-w-[32ch] text-muted" style={{ fontSize: "clamp(.66rem,1.55vw,.75rem)", lineHeight: 1.65 }}>{c.intro}</p>
            </div>

            <div className="relative w-full" style={{ minHeight: "clamp(14rem,36svh,17rem)" }}>
              {c.scenes.map((scene, index) => {
                const accent = index % 2 === 0 ? "var(--primary)" : "var(--secondary)";
                return (
                  <div key={scene.id} ref={(node) => { textRefs.current[index] = node; }} className="absolute inset-0 flex flex-col gap-[clamp(.5rem,1.5vw,.75rem)]" aria-hidden="true">
                    <div className={`flex items-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <span className="font-black tracking-[.16em] text-muted" style={{ fontSize: "clamp(.48rem,1.2vw,.625rem)" }}>{scene.index}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, var(--border))`, background: `color-mix(in srgb, ${accent} 8%, var(--surface-hover))` }}>
                        <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                        <span className="font-black uppercase tracking-[.14em]" style={{ color: accent, fontSize: "clamp(.45rem,1.1vw,.625rem)" }}>{scene.label}</span>
                      </span>
                    </div>
                    <p className="font-bold leading-snug text-foreground" style={{ fontSize: "clamp(.82rem,2.15vw,1.25rem)" }}>{scene.headline}</p>
                    <p className="max-w-[31ch] text-muted" style={{ fontSize: "clamp(.62rem,1.55vw,.875rem)", lineHeight: 1.75 }}>{scene.body}</p>
                  </div>
                );
              })}
            </div>

            <div ref={ctaRef} className="w-full"><Link href="/contact" className="inline-block min-h-11 rounded-xl px-[clamp(1rem,3vw,1.75rem)] py-3 text-sm font-black transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2" style={{ background: "var(--primary)", color: "var(--primary-contrast)" }}>{c.cta}</Link></div>
            <div className={`flex w-full flex-wrap items-center gap-x-2 gap-y-1 ${isRtl ? "justify-end" : "justify-start"}`}>{c.scenes.map((scene, index) => <span key={scene.id} className="flex items-center gap-1"><span ref={(node) => { dotRefs.current[index] = node; }} className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: index % 2 === 0 ? "var(--primary)" : "var(--secondary)" }} /><span className="font-semibold uppercase tracking-[.1em] text-muted" style={{ fontSize: "clamp(.42rem,1vw,.56rem)" }}>{scene.index}</span></span>)}</div>
          </div>

          <div className={`relative flex min-w-0 items-center justify-center ${isRtl ? "order-1" : "order-2"}`} aria-hidden="true">
            <div className="home-beneath-viewport w-full max-w-[560px]"><BeneathInterfaceSvg refCallback={setSvgRefs} aria-hidden /></div>
          </div>
        </div>
      </div>

      <div className="sr-only"><h2>{c.title}</h2><p>{c.intro}</p><ul>{c.scenes.map((scene) => <li key={scene.id}><strong>{scene.label}:</strong> {scene.headline} — {scene.body}</li>)}</ul><Link href="/contact">{c.cta}</Link></div>
    </section>
  );
}
