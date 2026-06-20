"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { projectCaseStudies } from "@/constants/projectCaseStudies";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type Props = {
    open: boolean;
    slug: string | null;
    onClose: () => void;
};

const fullCaseStudyRoutes: Record<string, string> = {
    "manal-alhihi": "manal-alhihi",
    "qasr-al-farah": "qasr-alfarah",
    "curevie": "curevie",
    "horvath-survey": "horvath-survey",
};

export default function ProjectShowcaseModal({ open, slug, onClose }: Props) {
    const { language } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const project = slug ? projectCaseStudies[slug] : null;
    const fullCaseStudySlug = slug ? fullCaseStudyRoutes[slug] : null;
    const isArabic = language === "ar";

    const [activeIndex, setActiveIndex] = useState(0);
    const [imageKey, setImageKey] = useState(0); // triggers fade on image change

    const pages = project?.pages ?? [];
    const total = pages.length;
    const activePage = pages[activeIndex] ?? null;

    // Reset active index when project changes
    useEffect(() => {
        setActiveIndex(0);
        setImageKey((k) => k + 1);
    }, [slug]);

    // Scroll lock
    useEffect(() => {
        if (!open) return;
        const scrollY = window.scrollY;
        const orig = {
            htmlOverflow: document.documentElement.style.overflow,
            bodyOverflow: document.body.style.overflow,
            bodyPosition: document.body.style.position,
            bodyTop: document.body.style.top,
            bodyWidth: document.body.style.width,
        };

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            document.documentElement.style.overflow = orig.htmlOverflow;
            document.body.style.overflow = orig.bodyOverflow;
            document.body.style.position = orig.bodyPosition;
            document.body.style.top = orig.bodyTop;
            document.body.style.width = orig.bodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [open]);

    // Keyboard
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, activeIndex, total]);

    // GSAP entrance
    useEffect(() => {
        if (!open || !project) return;
        registerMotionPlugins();

        const ctx = gsap.context(() => {
            gsap.fromTo(backdropRef.current, { opacity: 0 }, {
                opacity: 1,
                duration: prefersReducedMotion ? 0.01 : 0.28,
                ease: "power2.out",
            });
            gsap.fromTo(panelRef.current, {
                opacity: 0,
                y: prefersReducedMotion ? 0 : 20,
                scale: prefersReducedMotion ? 1 : 0.97,
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: prefersReducedMotion ? 0.01 : 0.44,
                ease: "expo.out",
            });
        }, backdropRef);

        return () => ctx.revert();
    }, [open, project, prefersReducedMotion]);

    const goNext = useCallback(() => {
        setActiveIndex((i) => (i + 1) % total);
        setImageKey((k) => k + 1);
    }, [total]);

    const goPrev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + total) % total);
        setImageKey((k) => k + 1);
    }, [total]);

    const goTo = useCallback((i: number) => {
        setActiveIndex(i);
        setImageKey((k) => k + 1);
    }, []);

    if (!open || !project) return null;

    const eyebrow = activePage?.eyebrow[language] ?? activePage?.eyebrow.en ?? "";
    const pageTitle = activePage?.title[language] ?? activePage?.title.en ?? "";
    const pageBody = activePage?.body[language] ?? activePage?.body.en ?? "";

    return (
        <div
            ref={backdropRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="showcase-modal-title"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/60 backdrop-blur-sm overflow-hidden"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={panelRef}
                className={`relative flex w-full max-w-5xl max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] lg:max-h-[calc(100dvh-3rem)] rounded-2xl overflow-hidden bg-surface shadow-[0_32px_80px_rgba(0,0,0,0.4)] border border-border flex-col ${isArabic ? "lg:flex-row-reverse" : "lg:flex-row"}`}
            >
                {/* ── Close button ── */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close project showcase"
                    className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground shadow-sm hover:bg-surface-hover transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* ══════════════════════════════════════════
                    LEFT — Image pane
                ══════════════════════════════════════════ */}
                <div className="relative flex-none w-full lg:w-[55%] bg-[#0a0a0a] flex flex-col min-h-[35vh] lg:min-h-0">
                    {/* Main image */}
                    <div className="relative flex-1 min-h-[260px] overflow-hidden">
                        {activePage && (
                            <>
                                <div className="absolute inset-0 bg-surface/5 animate-pulse transition-opacity duration-300 pointer-events-none" style={{ opacity: imageKey > 0 ? 1 : 0 }} />
                                <Image
                                    key={imageKey}
                                    src={activePage.image}
                                    alt={pageTitle || project.title[language]}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 55vw"
                                    className="object-contain showcase-img-fade"
                                    priority={activeIndex === 0}
                                    onLoad={(e) => {
                                        const target = e.target as HTMLElement;
                                        target.style.opacity = '1';
                                        target.previousElementSibling?.setAttribute('style', 'opacity: 0');
                                    }}
                                    style={{ opacity: 0 }}
                                />
                            </>
                        )}

                        {/* Prev / Next overlays */}
                        {total > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    aria-label="Previous screenshot"
                                    className={`absolute top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/75 transition-colors ${isArabic ? "right-3" : "left-3"}`}
                                >
                                    {isArabic ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    aria-label="Next screenshot"
                                    className={`absolute top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/75 transition-colors ${isArabic ? "left-3" : "right-3"}`}
                                >
                                    {isArabic ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                            </>
                        )}

                        {/* Dot indicator */}
                        {total > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {pages.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to screenshot ${i + 1}`}
                                        className={`h-1.5 rounded-full transition-all duration-200 ${
                                            i === activeIndex
                                                ? "w-5 bg-white"
                                                : "w-1.5 bg-white/40 hover:bg-white/60"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {total > 1 && (
                        <div className="flex-none flex gap-1.5 overflow-x-auto no-scrollbar px-3 py-2 bg-black/80">
                            {pages.map((page, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`View screenshot ${i + 1}`}
                                    className={`relative flex-none w-14 h-10 rounded overflow-hidden border-2 transition-all duration-150 ${
                                        i === activeIndex
                                            ? "border-primary-theme"
                                            : "border-transparent opacity-50 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={page.image}
                                        alt={`Thumbnail ${i + 1}`}
                                        fill
                                        loading="lazy"
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ══════════════════════════════════════════
                    RIGHT — Info pane
                ══════════════════════════════════════════ */}
                <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex flex-col min-h-0 flex-1 overflow-y-auto no-scrollbar bg-surface"
                >
                    {/* Project header */}
                    <div className="flex-none px-6 pt-8 pb-5 border-b border-border">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-theme mb-2">
                            {project.category[language]}
                        </p>
                        <h2
                            id="showcase-modal-title"
                            className="text-2xl font-black text-foreground leading-tight"
                        >
                            {project.title[language]}
                        </h2>
                        <p className="mt-3 text-sm text-muted leading-relaxed">
                            {project.summary[language]}
                        </p>
                    </div>

                    {/* Current page detail */}
                    {activePage && (
                        <div className="flex-none px-6 py-5 border-b border-border">
                            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted mb-1.5">
                                {eyebrow}
                            </p>
                            <h3 className="text-base font-black text-foreground leading-snug mb-2">
                                {pageTitle}
                            </h3>
                            <p className="text-sm text-muted leading-relaxed">
                                {pageBody}
                            </p>
                        </div>
                    )}

                    {/* Counter */}
                    <div className="flex-none px-6 py-3 flex items-center justify-between text-xs text-muted/60 font-semibold tracking-wide border-b border-border">
                        <span>{language === "ar" ? "لقطة" : "Screen"} {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                        {total > 1 && (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    aria-label="Previous"
                                    disabled={activeIndex === 0}
                                    className="px-3 py-1 rounded-full border border-border text-foreground hover:bg-surface-hover disabled:opacity-30 transition-colors text-xs font-bold"
                                >
                                    {isArabic ? "→" : "←"}
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    aria-label="Next"
                                    disabled={activeIndex === total - 1}
                                    className="px-3 py-1 rounded-full border border-border text-foreground hover:bg-surface-hover disabled:opacity-30 transition-colors text-xs font-bold"
                                >
                                    {isArabic ? "←" : "→"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Spacer push-down */}
                    <div className="flex-1" />

                    {/* Footer CTA */}
                    <div className="flex-none px-6 py-5">
                        {fullCaseStudySlug && (
                            <Link
                                href={`/work/${fullCaseStudySlug}`}
                                className="mb-4 flex w-full items-center justify-center rounded-full bg-primary-theme px-5 py-3 text-sm font-black text-background transition hover:opacity-90"
                            >
                                {language === "ar" ? "عرض دراسة الحالة الكاملة" : "View full case study"}
                            </Link>
                        )}
                        <div className="text-xs text-muted/50 text-center font-medium">
                            {language === "ar"
                                ? "مشروع من أعمال Mohammed Aldomi"
                                : "A project by Mohammed Aldomi"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
