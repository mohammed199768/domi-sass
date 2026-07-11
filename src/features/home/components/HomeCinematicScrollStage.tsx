"use client";

/**
 * HomeCinematicScrollStage — "Cinematic Scroll Reel"
 *
 * A pinned, scrubbed 4-scene sequence (Diagnose → Design → Build → Convert)
 * that plays immediately after the Hero. Motion language: ghost scroll
 * container + sticky viewport, clip-path reveal from the bottom, image
 * scale-settle, line-by-line text reveal, side-entering preview panels.
 *
 * Rules honored here:
 *  - Homepage-only. Uses /assest/our-work/* images ONLY (never the
 *    /work/[slug] detail images, which live in projectCaseStudies.ts).
 *  - No WebGL / canvas / video / blur-heavy effects. Transform, opacity and
 *    clip-path only.
 *  - Reduced motion  → static stacked version, no pinning, no scrub.
 *  - Mobile (<768px) → static stacked version with a light one-shot fade,
 *    no pinned scroll trap, no horizontal movement.
 *  - Theme-aware technical-canvas styling. Scene motion and media stay stable
 *    while semantic surface tokens adapt to the active theme.
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/* ── Scene data (homepage-only preview images) ───────────────────────────── */
type SceneCopy = {
    label: string;
    headline: string;
    support: string;
    metric: string;
    project: string;
};

type CinematicScene = {
    key: string;
    image: string; // homepage preview ONLY — never used on /work/[slug]
    accent: string;
    en: SceneCopy;
    ar: SceneCopy;
};

const scenes: CinematicScene[] = [
    {
        key: "diagnose",
        image: "/assest/our-work/curevie.webp",
        accent: "var(--primary)",
        en: {
            label: "01 / DIAGNOSE",
            headline: "We find where growth breaks.",
            support: "Clarity, trust, conversion, and the hidden friction between them.",
            metric: "Friction found is revenue recovered.",
            project: "CUREVIE — HEALTH PLATFORM",
        },
        ar: {
            label: "٠١ / التشخيص",
            headline: "نجد أين يتعطّل النمو.",
            support: "الوضوح والثقة والتحويل، والاحتكاك الخفي بينها.",
            metric: "كل احتكاك نكتشفه هو إيراد نستعيده.",
            project: "كيورفي — منصة صحية",
        },
    },
    {
        key: "design",
        image: "/assest/our-work/T.Manal.webp",
        accent: "var(--secondary)",
        en: {
            label: "02 / DESIGN",
            headline: "We shape the digital path.",
            support: "From first impression to booking, inquiry, or purchase.",
            metric: "Every screen earns the next step.",
            project: "MANAL ALHIHI — PERSONAL BRAND",
        },
        ar: {
            label: "٠٢ / التصميم",
            headline: "نرسم المسار الرقمي.",
            support: "من الانطباع الأول إلى الحجز أو الاستفسار أو الشراء.",
            metric: "كل شاشة تستحق الخطوة التالية.",
            project: "منال الحيحي — علامة شخصية",
        },
    },
    {
        key: "build",
        image: "/assest/our-work/horvath.webp",
        accent: "var(--primary)",
        en: {
            label: "03 / BUILD",
            headline: "We turn strategy into systems.",
            support: "Fast interfaces, clean flows, and business-ready execution.",
            metric: "Engineered to ship. Built to last.",
            project: "HORVATH — SURVEY ENGINEERING",
        },
        ar: {
            label: "٠٣ / البناء",
            headline: "نحوّل الاستراتيجية إلى أنظمة.",
            support: "واجهات سريعة، ومسارات نظيفة، وتنفيذ جاهز للأعمال.",
            metric: "مهندَس ليُطلق. مبني ليدوم.",
            project: "هورفاث — هندسة المساحة",
        },
    },
    {
        key: "convert",
        image: "/assest/our-work/qaser-alfarah.webp",
        accent: "var(--secondary)",
        en: {
            label: "04 / CONVERT",
            headline: "We make the next step obvious.",
            support: "Less confusion. More confidence. Better action.",
            metric: "Clarity converts.",
            project: "QASR AL-FARAH — EVENT VENUE",
        },
        ar: {
            label: "٠٤ / التحويل",
            headline: "نجعل الخطوة التالية بديهية.",
            support: "ارتباك أقل. ثقة أكبر. قرار أفضل.",
            metric: "الوضوح يحوّل.",
            project: "قصر الفرح — قاعة مناسبات",
        },
    },
];

/* ── Shared scene content block ──────────────────────────────────────────── */
function SceneContent({
    scene,
    copy,
    imageFirst,
}: {
    scene: CinematicScene;
    copy: SceneCopy;
    imageFirst: boolean;
}) {
    return (
        <div
            className={`mx-auto flex h-full w-full max-w-7xl flex-col justify-center gap-8 px-6 py-16 md:gap-12 md:px-10 lg:flex-row lg:items-center lg:gap-16 ${
                imageFirst ? "lg:flex-row-reverse" : ""
            }`}
        >
            {/* Text column */}
            <div className="flex w-full flex-col gap-4 lg:w-1/2" data-cine-text>
                <div className="overflow-hidden">
                    <span
                        data-cine-line
                        className="block font-mono text-[11px] font-semibold uppercase tracking-[0.34em]"
                        style={{ color: scene.accent }}
                    >
                        {copy.label}
                    </span>
                </div>

                <div className="overflow-hidden">
                    <h3
                        data-cine-line
                        className="block text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
                        style={{ color: "var(--cine-foreground)" }}
                    >
                        {copy.headline}
                    </h3>
                </div>

                <div className="overflow-hidden">
                    <p
                        data-cine-line
                        className="block max-w-xl text-base leading-relaxed md:text-lg"
                        style={{ color: "var(--cine-muted)" }}
                    >
                        {copy.support}
                    </p>
                </div>

                <div className="overflow-hidden pt-2">
                    <span
                        data-cine-line
                        className="inline-flex items-center gap-3 border-t pt-4 text-xs font-medium uppercase tracking-[0.22em]"
                        style={{ color: "var(--cine-muted-soft)", borderColor: "var(--cine-border)" }}
                    >
                        <span
                            aria-hidden
                            className="inline-block h-1 w-1 rounded-full"
                            style={{ backgroundColor: scene.accent }}
                        />
                        {copy.metric}
                    </span>
                </div>
            </div>

            {/* Visual preview panel */}
            <div className="w-full lg:w-1/2" data-cine-panel>
                <figure
                    className="relative overflow-hidden rounded-2xl border"
                    style={{ borderColor: "var(--cine-border-strong)", backgroundColor: "var(--cine-surface)" }}
                >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                            data-cine-image
                            src={scene.image}
                            alt={copy.project}
                            fill
                            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 48vw, 620px"
                            className="object-cover"
                        />
                        {/* Filmic vignette — static, CSS-light */}
                        <div
                            aria-hidden
                            className="cine-media-vignette pointer-events-none absolute inset-0"
                        />
                    </div>
                    <figcaption
                        className="flex items-center justify-between gap-4 border-t px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.26em]"
                        style={{ borderColor: "var(--cine-border)", color: "var(--cine-muted-soft)" }}
                    >
                        <span>{copy.project}</span>
                        <span aria-hidden style={{ color: scene.accent }}>
                            ●
                        </span>
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function HomeCinematicScrollStage() {
    const { language, dir } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const cinematic = isDesktop && !prefersReducedMotion;

    const sectionRef = useRef<HTMLElement>(null);

    /* Pinned scrub timeline — desktop, motion allowed only. */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !cinematic) return;

        registerMotionPlugins();

        const panels = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-home-scene]")
        );
        if (panels.length === 0) return;

        const ctx = gsap.context(() => {
            panels.forEach((panel, i) => {
                gsap.set(panel, {
                    autoAlpha: i === 0 ? 1 : 0,
                    yPercent: i === 0 ? 0 : 4,
                    zIndex: i === 0 ? 2 : 1,
                    pointerEvents: i === 0 ? "auto" : "none",
                    attr: { "data-scene-active": i === 0 ? "true" : "false" },
                });
            });

            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            /* Each transition occupies one unit of timeline time. */
            for (let i = 1; i < panels.length; i++) {
                const panel = panels[i];
                const prev = panels[i - 1];
                const at = i - 1;

                /* Next scene rises from the bottom (clip-path reveal). */
                tl.to(prev, {
                    autoAlpha: 0,
                    yPercent: -3,
                    pointerEvents: "none",
                    attr: { "data-scene-active": "false" },
                    duration: 0.24,
                }, at);
                tl.set(panel, {
                    zIndex: 3,
                    pointerEvents: "auto",
                    attr: { "data-scene-active": "true" },
                }, at + 0.28);
                tl.to(panel, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.32,
                    immediateRender: false,
                }, at + 0.3);

                /* Outgoing scene settles back — subtle parallax exit. */

                /* Image starts oversized and settles down. */

                /* Line-by-line reveal from below. */

                /* Preview panel slides in from alternating sides. */
            }

            /* Final beat: hold the last scene, then release naturally. */
            tl.to({}, { duration: 0.35 });
        }, section);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [cinematic, language, dir]);

    /* Light one-shot fade for stacked (mobile) cards — motion allowed only. */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section || cinematic || prefersReducedMotion) return;

        registerMotionPlugins();

        const cards = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-cine-card]")
        );
        if (cards.length === 0) return;

        const ctx = gsap.context(() => {
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, [cinematic, prefersReducedMotion, language, dir]);

    /* ── Static stacked version (mobile and/or reduced motion) ─────────────── */
    if (!cinematic) {
        return (
            <section
                ref={sectionRef}
                aria-label={language === "ar" ? "كيف تعمل دوميناس" : "How DOMINASE works"}
                className="home-cinematic-stage relative"
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-20 md:gap-20 md:px-10 md:py-28">
                    {scenes.map((scene) => {
                        const copy = language === "ar" ? scene.ar : scene.en;
                        return (
                            <article key={scene.key} data-cine-card className="flex flex-col gap-6">
                                <span
                                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.34em]"
                                    style={{ color: scene.accent }}
                                >
                                    {copy.label}
                                </span>
                                <h3
                                    className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl"
                                    style={{ color: "var(--cine-foreground)" }}
                                >
                                    {copy.headline}
                                </h3>
                                <p className="max-w-xl text-base leading-relaxed" style={{ color: "var(--cine-muted)" }}>
                                    {copy.support}
                                </p>
                                <figure
                                    className="relative overflow-hidden rounded-2xl border"
                                    style={{ borderColor: "var(--cine-border-strong)", backgroundColor: "var(--cine-surface)" }}
                                >
                                    <div className="relative aspect-[16/10] w-full">
                                        <Image
                                            src={scene.image}
                                            alt={copy.project}
                                            fill
                                            sizes="92vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <figcaption
                                        className="flex items-center justify-between gap-4 border-t px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.26em]"
                                        style={{ borderColor: "var(--cine-border)", color: "var(--cine-muted-soft)" }}
                                    >
                                        <span>{copy.project}</span>
                                        <span aria-hidden style={{ color: scene.accent }}>
                                            ●
                                        </span>
                                    </figcaption>
                                </figure>
                                <span
                                    className="text-xs font-medium uppercase tracking-[0.22em]"
                                    style={{ color: "var(--cine-muted-soft)" }}
                                >
                                    {copy.metric}
                                </span>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }

    /* ── Pinned cinematic version (desktop, motion allowed) ────────────────── */
    return (
        <section
            ref={sectionRef}
            aria-label={language === "ar" ? "كيف تعمل دوميناس" : "How DOMINASE works"}
            className="home-cinematic-stage relative"
            style={{
                /* Ghost scroll container: sticky viewport + one extra viewport
                   of scroll distance per scene transition, plus a short hold. */
                height: `${100 + (scenes.length - 1) * 100 + 40}vh`,
            }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {scenes.map((scene, i) => {
                    const copy = language === "ar" ? scene.ar : scene.en;
                    return (
                        <div
                            key={scene.key}
                            data-home-scene
                            data-scene-index={i + 1}
                            className="absolute inset-0 h-full w-full"
                            style={{
                                willChange: "clip-path",
                            }}
                        >
                            <div data-cine-inner className="h-full w-full">
                                <SceneContent scene={scene} copy={copy} imageFirst={i % 2 === 1} />
                            </div>
                        </div>
                    );
                })}

                {/* Scene progress rail */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "var(--cine-muted-soft)" }}
                >
                    <span style={{ color: "var(--primary)" }}>—</span>
                    <span>{language === "ar" ? "دوميناس / التسلسل" : "DOMINASE / SEQUENCE"}</span>
                    <span style={{ color: "var(--primary)" }}>—</span>
                </div>
            </div>
        </section>
    );
}
