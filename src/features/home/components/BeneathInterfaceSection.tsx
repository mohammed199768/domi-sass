"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import BeneathInterfaceSvg, { type BeneathSvgRefs } from "./BeneathInterfaceSvg";

/*
 * BeneathInterfaceSection V3
 *
 * Three rendering modes:
 *  1. Desktop (>= 1024px): sticky + GSAP scrub — unchanged from V2.
 *  2. Tablet (768–1023px): full-height scene panels, side-by-side text + SVG,
 *     viewport-reveal via IntersectionObserver.
 *  3. Mobile (< 768px): cinematic scene cards, stacked text-above + SVG-below,
 *     viewport-reveal via IntersectionObserver.
 *
 * SVG strategy on mobile/tablet:
 *  Each scene card renders its own <BeneathInterfaceSvg sceneIndex={i} /> so
 *  only the correct scene group is visible. No GSAP pinning. No scroll listeners.
 */

const SCENE_COUNT = 6;
const SCENE_DUR   = 1.0;
const FADE_DUR    = 0.35;

// ── Cinematic scene card used on mobile and tablet ────────────────────────────

interface SceneCardProps {
  scene: {
    id: string;
    index: string;
    label: string;
    headline: string;
    body: string;
  };
  sceneIndex: number;
  isLast: boolean;
  isTablet: boolean;
  isRtl: boolean;
  prefersReducedMotion: boolean;
  onCta: () => void;
  ctaLabel: string;
}

function SceneCard({
  scene,
  sceneIndex,
  isLast,
  isTablet,
  isRtl,
  prefersReducedMotion,
  onCta,
  ctaLabel,
}: SceneCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const accentColor = sceneIndex % 2 === 0 ? "var(--primary)" : "var(--secondary)";

  useEffect(() => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    // Start hidden — IntersectionObserver reveals
    inner.style.opacity = "0";
    inner.style.transform = "translateY(24px) scale(0.98)";
    inner.style.transition = "none";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger CSS transition after a single rAF so the initial state is painted
          requestAnimationFrame(() => {
            inner.style.transition =
              "opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
            inner.style.opacity = "1";
            inner.style.transform = "translateY(0) scale(1)";
          });
          observer.unobserve(card);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const textBlock = (
    <div
      className={`flex flex-col gap-4 ${isTablet ? "flex-1 min-w-0" : "w-full"}`}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Scene number + label pill */}
      <div className={`flex items-center gap-2.5 ${isRtl ? "flex-row-reverse" : ""}`}>
        <span
          className="font-black tabular-nums"
          style={{
            fontSize: "11px",
            letterSpacing: "0.24em",
            color: "var(--muted)",
          }}
        >
          {scene.index}
        </span>
        <div
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1"
          style={{
            borderColor: `color-mix(in srgb, ${accentColor} 38%, var(--border))`,
            background: `color-mix(in srgb, ${accentColor} 7%, var(--surface-hover))`,
          }}
        >
          <span
            className="inline-block rounded-full"
            style={{ width: "5px", height: "5px", background: accentColor }}
          />
          <span
            className="font-black uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: accentColor,
            }}
          >
            {scene.label}
          </span>
        </div>
      </div>

      {/* Scene headline */}
      <p
        className="font-bold text-foreground leading-snug"
        style={{
          fontSize: isTablet ? "1.25rem" : "1.1rem",
          textAlign: isRtl ? "right" : "left",
        }}
      >
        {scene.headline}
      </p>

      {/* Scene body */}
      <p
        className="leading-relaxed"
        style={{
          fontSize: "0.85rem",
          color: "var(--muted)",
          textAlign: isRtl ? "right" : "left",
          maxWidth: "36ch",
        }}
      >
        {scene.body}
      </p>

      {/* CTA on final scene */}
      {isLast && (
        <div className="pt-2">
          <button
            type="button"
            suppressHydrationWarning
            onClick={onCta}
            className="min-h-11 rounded-xl px-7 py-3 text-sm font-black transition duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2"
            style={{ background: "var(--primary)", color: "var(--bg)" }}
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  );

  const svgBlock = (
    <div
      className={`relative ${isTablet ? "w-[46%] shrink-0" : "w-full"}`}
      aria-hidden="true"
    >
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--fg) 1px, transparent 1px),
            linear-gradient(to bottom, var(--fg) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* SVG wrapper — fixed aspect ratio */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "600 / 420",
          background: `color-mix(in srgb, var(--surface-hover) 40%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accentColor} 20%, var(--border))`,
        }}
      >
        {/* Ambient glow behind SVG */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, ${accentColor} 10%, transparent), transparent 70%)`,
          }}
        />
        <div className="relative w-full h-full p-3">
          <BeneathInterfaceSvg sceneIndex={sceneIndex} aria-hidden />
        </div>
      </div>
    </div>
  );

  // Tablet: text left + SVG right (flipped in RTL)
  // Mobile: text top + SVG bottom
  const isRtlTablet = isTablet && isRtl;

  return (
    <div ref={cardRef} className="w-full">
      <div
        ref={innerRef}
        className={`
          relative rounded-2xl overflow-hidden
          ${isTablet ? "flex items-center gap-8 p-8" : "flex flex-col gap-6 p-6"}
        `}
        style={{
          minHeight: isTablet ? "80vh" : "88svh",
          background: "var(--surface)",
          border: `1px solid color-mix(in srgb, ${accentColor} 18%, var(--border))`,
          boxShadow: `0 2px 32px color-mix(in srgb, var(--cool-shadow) 35%, transparent),
                      0 0 0 1px color-mix(in srgb, ${accentColor} 8%, transparent)`,
        }}
      >
        {/* Accent top edge */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-[2px] rounded-b-none"
          style={{
            background: `linear-gradient(to right, ${accentColor}, color-mix(in srgb, ${accentColor} 50%, var(--secondary)))`,
            opacity: 0.7,
          }}
        />

        {/* Ambient corner glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-48 w-48 opacity-30"
          style={{
            background: `radial-gradient(circle at 80% 20%, color-mix(in srgb, ${accentColor} 30%, transparent), transparent 65%)`,
          }}
        />

        {/* Content — text + SVG in correct order for LTR/RTL */}
        {isRtlTablet ? (
          <>
            {svgBlock}
            {textBlock}
          </>
        ) : isTablet ? (
          <>
            {textBlock}
            {svgBlock}
          </>
        ) : (
          <>
            {textBlock}
            {svgBlock}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main section component ─────────────────────────────────────────────────────

export default function BeneathInterfaceSection() {
  const { t, dir } = useLanguage();
  const c = t.beneathInterface;
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet  = useMediaQuery("(min-width: 768px)");

  const sectionRef = useRef<HTMLElement>(null);
  const stickRef   = useRef<HTMLDivElement>(null);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef   = useRef<HTMLDivElement>(null);

  const svgRefs = useRef<BeneathSvgRefs | null>(null);

  const handleSvgRefs = useCallback((refs: BeneathSvgRefs) => {
    svgRefs.current = refs;
  }, []);

  // ── Desktop GSAP scrub ──────────────────────────────────────────────────────
  useEffect(() => {
    registerMotionPlugins();

    const section = sectionRef.current;
    if (!section) return;

    const scenes = svgRefs.current?.scenes ?? [];

    if (prefersReducedMotion || !isDesktop) {
      // Show everything for reduced-motion desktop fall-through
      textRefs.current.forEach((el) => el && gsap.set(el, { autoAlpha: 1, y: 0 }));
      dotRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }));
      scenes.forEach((el) => el && gsap.set(el, { autoAlpha: 1, visibility: "visible", scale: 1, y: 0 }));
      if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
    });
    dotRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0.25, scale: i === 0 ? 1.3 : 1 });
    });
    scenes.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
        visibility: i === 0 ? "visible" : "hidden",
        scale: i === 0 ? 1 : 0.97,
        y: i === 0 ? 0 : 14,
      });
    });
    if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 0, y: 16 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < SCENE_COUNT; i++) {
        const sceneStart = i * SCENE_DUR;
        const fadeOutAt  = sceneStart + SCENE_DUR - FADE_DUR;
        const nextFadeIn = sceneStart + SCENE_DUR - FADE_DUR * 0.5;
        const isLast     = i === SCENE_COUNT - 1;

        if (!isLast) {
          const nextI = i + 1;

          if (textRefs.current[i]) {
            tl.to(textRefs.current[i]!, {
              autoAlpha: 0, y: -12, duration: FADE_DUR, ease: "power2.in",
            }, fadeOutAt);
          }
          if (textRefs.current[nextI]) {
            tl.fromTo(textRefs.current[nextI]!,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: FADE_DUR, ease: "power2.out" },
              nextFadeIn
            );
          }
          if (scenes[i]) {
            tl.to(scenes[i], {
              autoAlpha: 0, scale: 0.96, y: -10, duration: FADE_DUR, ease: "power2.in",
            }, fadeOutAt);
          }
          if (scenes[nextI]) {
            tl.fromTo(scenes[nextI],
              { autoAlpha: 0, visibility: "visible", scale: 0.97, y: 14 },
              { autoAlpha: 1, scale: 1, y: 0, duration: FADE_DUR, ease: "power2.out" },
              nextFadeIn
            );
          }
          if (dotRefs.current[i]) {
            tl.to(dotRefs.current[i]!, {
              opacity: 0.25, scale: 1, duration: FADE_DUR,
            }, fadeOutAt);
          }
          if (dotRefs.current[nextI]) {
            tl.to(dotRefs.current[nextI]!, {
              opacity: 1, scale: 1.3, duration: FADE_DUR,
            }, nextFadeIn);
          }
        }

        if (isLast && ctaRef.current) {
          tl.to(ctaRef.current, {
            autoAlpha: 1, y: 0, duration: FADE_DUR, ease: "power2.out",
          }, sceneStart + FADE_DUR);
        }
      }
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop]);

  const isRtl = dir === "rtl";

  // ── Mobile & Tablet: cinematic vertical story ───────────────────────────────
  if (!isDesktop) {
    return (
      <section
        id="services"
        ref={sectionRef}
        className="relative bg-background transition-colors duration-300"
        aria-label={c.title}
      >
        {/* Section header */}
        <div
          className="mx-auto px-5 pt-20 pb-12"
          style={{
            maxWidth: isTablet ? "800px" : "480px",
            direction: isRtl ? "rtl" : "ltr",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          <p
            className="mb-2 font-black uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.36em",
              color: "var(--primary)",
            }}
          >
            {c.eyebrow}
          </p>
          <h2
            className="font-black text-foreground leading-tight"
            style={{ fontSize: isTablet ? "2.25rem" : "1.75rem" }}
          >
            {c.title}
          </h2>
          <p
            className="mt-3 leading-7"
            style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              maxWidth: "44ch",
            }}
          >
            {c.intro}
          </p>

          {/* Progress dots row */}
          <div
            className="mt-6 flex items-center gap-2 flex-wrap"
            style={{ justifyContent: isRtl ? "flex-end" : "flex-start" }}
          >
            {c.scenes.map((scene, i) => (
              <div key={scene.id} className="flex items-center gap-1.5">
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
                    opacity: 0.5,
                  }}
                />
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    color: "var(--muted)",
                    opacity: 0.65,
                  }}
                >
                  {scene.index}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scene cards */}
        <div
          className="mx-auto flex flex-col"
          style={{
            maxWidth: isTablet ? "800px" : "480px",
            padding: isTablet ? "0 20px 80px" : "0 16px 80px",
            gap: isTablet ? "24px" : "16px",
          }}
        >
          {c.scenes.map((scene, i) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              sceneIndex={i}
              isLast={i === SCENE_COUNT - 1}
              isTablet={isTablet}
              isRtl={isRtl}
              prefersReducedMotion={prefersReducedMotion}
              onCta={() => scrollToSection("#contact")}
              ctaLabel={c.cta}
            />
          ))}
        </div>

        {/* SR-only full content */}
        <div className="sr-only">
          <ul>
            {c.scenes.map((scene) => (
              <li key={scene.id}>
                <strong>{scene.label}:</strong> {scene.headline} — {scene.body}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ── Desktop: sticky + scroll-driven scene sequence — UNCHANGED ──────────────
  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-background transition-colors duration-300"
      style={{ minHeight: `${SCENE_COUNT * 100 + 60}vh` }}
      aria-label={c.title}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: "40%", height: "40%",
          background: "radial-gradient(60% 60% at 70% 30%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 70%)",
          opacity: 0.5,
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "5%",
          width: "35%", height: "35%",
          background: "radial-gradient(50% 50% at 30% 70%, color-mix(in srgb, var(--secondary) 14%, transparent), transparent 70%)",
          opacity: 0.35,
        }} />
      </div>

      {/* STICKY VIEWPORT */}
      <div ref={stickRef} className="sticky top-0 flex min-h-screen items-stretch overflow-hidden" style={{ contain: "layout paint" }}>
        <div className="mx-auto flex w-full max-w-7xl items-center gap-10 px-6 py-16">

          {/* LEFT: compact header + scene story + progress */}
          <div className={`flex w-[380px] shrink-0 flex-col gap-6 ${isRtl ? "items-end text-end" : "items-start text-start"}`}>

            <div className="border-b pb-5 w-full" style={{ borderColor: "var(--border)" }}>
              <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.36em]"
                style={{ color: "var(--primary)" }}>
                {c.eyebrow}
              </p>
              <h2 className="text-3xl font-black text-foreground leading-tight">
                {c.title}
              </h2>
              <p className="mt-2 text-xs leading-6 text-muted max-w-xs">
                {c.intro}
              </p>
            </div>

            {/* Scene story area — absolute-stacked, GSAP cross-fades */}
            <div className="relative w-full" style={{ minHeight: "160px" }}>
              {c.scenes.map((scene, i) => (
                <div
                  key={scene.id}
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col gap-3"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-black tracking-[0.2em]"
                      style={{ color: "var(--muted)" }}>
                      {scene.index}
                    </span>
                    <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
                      style={{
                        borderColor: i % 2 === 0
                          ? "color-mix(in srgb, var(--primary) 40%, var(--border))"
                          : "color-mix(in srgb, var(--secondary) 36%, var(--border))",
                        background: i % 2 === 0
                          ? "color-mix(in srgb, var(--primary) 8%, var(--surface-hover))"
                          : "color-mix(in srgb, var(--secondary) 7%, var(--surface-hover))",
                      }}>
                      <span className="h-1.5 w-1.5 rounded-full"
                        style={{ background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)" }} />
                      <span className="text-[10px] font-black uppercase tracking-[0.22em]"
                        style={{ color: i % 2 === 0 ? "var(--primary)" : "var(--secondary)" }}>
                        {scene.label}
                      </span>
                    </div>
                  </div>

                  <p className="text-xl font-bold text-foreground leading-snug max-w-xs">
                    {scene.headline}
                  </p>

                  <p className="text-sm leading-6 text-muted max-w-xs">
                    {scene.body}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA — fades in at scene 06 */}
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => scrollToSection("#contact")}
                className="min-h-11 rounded-xl px-7 py-3 text-sm font-black transition duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2"
                style={{ background: "var(--primary)", color: "var(--bg)" }}
              >
                {c.cta}
              </button>
            </div>

            {/* Progress rail */}
            <div className="mt-auto pt-4 w-full">
              <div className={`flex items-center gap-3 flex-wrap ${isRtl ? "justify-end" : "justify-start"}`}>
                {c.scenes.map((scene, i) => (
                  <div key={scene.id} className="flex items-center gap-1.5">
                    <span
                      ref={(el) => { dotRefs.current[i] = el; }}
                      className="inline-block rounded-full transition-all duration-300"
                      style={{
                        width: "6px", height: "6px",
                        background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
                        opacity: 0.25,
                      }}
                    />
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: "var(--muted)", opacity: 0.7 }}>
                      {scene.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SVG scene */}
          <div
            className="relative flex-1 flex items-center justify-center"
            style={{ minHeight: "420px" }}
            aria-hidden="true"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--fg) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--fg) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative w-full" style={{ maxWidth: "560px" }}>
              <BeneathInterfaceSvg
                refCallback={handleSvgRefs}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/* Screen-reader accessible story */}
      <div className="sr-only">
        <h2>{c.title}</h2>
        <p>{c.intro}</p>
        <ul>
          {c.scenes.map((scene) => (
            <li key={scene.id}>
              <strong>{scene.label}:</strong> {scene.headline} — {scene.body}
            </li>
          ))}
        </ul>
        <button type="button" suppressHydrationWarning onClick={() => scrollToSection("#contact")}>
          {c.cta}
        </button>
      </div>
    </section>
  );
}
