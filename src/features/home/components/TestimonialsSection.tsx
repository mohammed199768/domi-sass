"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type TestimonialItem = {
    quote: string;
    author: string;
    role: string;
    image?: string;
    imageAlt?: string;
    accent?: string;
    initials?: string;
    project?: string;
};

const cardAccents: Record<number, { initials: string; project: string; accentA: string; accentB: string }> = {
    0: { initials: "CV", project: "Curevie", accentA: "var(--domi-accent)", accentB: "var(--domi-accent-bright)" },
    1: { initials: "IN", project: "Inkspire", accentA: "var(--domi-accent-bright)", accentB: "var(--domi-accent)" },
    2: { initials: "EC", project: "Engineering Co.", accentA: "var(--domi-accent)", accentB: "var(--domi-accent-soft)" },
};

const STACK_ROTATIONS = [-3, 2, -2];

const easing = [0.22, 1, 0.36, 1] as const;

function VisualCard({
    item,
    index,
    activeIndex,
    total,
    reducedMotion,
}: {
    item: TestimonialItem;
    index: number;
    activeIndex: number;
    total: number;
    reducedMotion: boolean;
}) {
    const accent = cardAccents[index] ?? cardAccents[0];
    const distance = (index - activeIndex + total) % total;
    const isActive = distance === 0;
    const isBehind1 = distance === 1;
    const isBehind2 = distance === 2;
    const isHidden = distance > 2;

    const scale = isActive ? 1 : isBehind1 ? 0.94 : 0.88;
    const yOffset = reducedMotion ? 0 : isActive ? 0 : isBehind1 ? 18 : 34;
    const opacity = isActive ? 1 : isBehind1 ? 0.65 : isBehind2 ? 0.38 : 0;
    const rotate = reducedMotion ? 0 : isActive ? 0 : STACK_ROTATIONS[distance - 1] ?? 0;
    const zIndex = isActive ? 10 : isBehind1 ? 6 : isBehind2 ? 3 : 0;

    if (isHidden) return null;

    return (
        <motion.div
            key={`visual-${index}`}
            layout={!reducedMotion}
            animate={reducedMotion
                ? { opacity: isActive ? 1 : 0, scale: 1, y: 0, rotate: 0, zIndex }
                : { opacity, scale, y: yOffset, rotate, zIndex }
            }
            transition={{ duration: reducedMotion ? 0 : 0.52, ease: easing }}
            className="absolute inset-0"
            aria-hidden={!isActive}
        >
            <div
                className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border bg-surface"
                style={{
                    boxShadow: isActive
                        ? "0 32px 80px -32px var(--cool-shadow)"
                        : "0 8px 24px -12px var(--cool-shadow)",
                }}
            >
                {/* Top accent bar */}
                <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{
                        background: `linear-gradient(to right, ${accent.accentA}, ${accent.accentB}, transparent 78%)`,
                    }}
                    aria-hidden="true"
                />

                {item.image ? (
                    /* Real image when provided */
                    <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.author}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                    />
                ) : (
                    /* Premium DOMINASE placeholder */
                    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-8">
                        <div
                            className="absolute inset-0 opacity-70"
                            style={{
                                background:
                                    "radial-gradient(circle at 20% 18%, color-mix(in srgb, var(--domi-accent) 9%, transparent), transparent 34%), radial-gradient(circle at 82% 78%, color-mix(in srgb, var(--domi-accent-bright) 7%, transparent), transparent 32%)",
                            }}
                            aria-hidden="true"
                        />

                        {/* Diagonal accent line */}
                        <div
                            className="absolute bottom-0 left-0 h-[160%] w-[2px] origin-bottom-left rotate-[-32deg]"
                            style={{
                                background: `linear-gradient(to top, ${accent.accentA}55, ${accent.accentB}22, transparent)`,
                            }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute bottom-0 right-4 h-[120%] w-[1px] origin-bottom-right rotate-[28deg]"
                            style={{
                                background: `linear-gradient(to top, ${accent.accentB}40, transparent)`,
                            }}
                            aria-hidden="true"
                        />

                        {/* Initials badge */}
                        <div
                            className="relative z-10 grid h-20 w-20 place-items-center rounded-2xl border"
                            style={{
                                background: `linear-gradient(135deg, color-mix(in srgb, ${accent.accentA} 18%, var(--surface)), color-mix(in srgb, ${accent.accentB} 12%, var(--surface)))`,
                                borderColor: `color-mix(in srgb, ${accent.accentA} 32%, var(--border))`,
                            }}
                        >
                            <span
                                className="font-mono text-2xl font-black tracking-wider"
                                style={{ color: accent.accentA }}
                            >
                                {accent.initials}
                            </span>
                        </div>

                        {/* Project label */}
                        <span
                            className="relative z-10 rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em]"
                            style={{
                                borderColor: `color-mix(in srgb, ${accent.accentA} 28%, var(--border))`,
                                color: "var(--muted)",
                            }}
                        >
                            {item.project ?? accent.project}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function TestimonialsSection() {
    const { t, language, dir } = useLanguage();
    const isArabic = language === "ar";
    const isRtl = dir === "rtl";
    const reducedMotion = useReducedMotion();

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    const items: TestimonialItem[] = t.testimonials.items;
    const total = items.length;

    const heading = t.testimonials.title;
    const description = t.testimonials.subtitle;
    const sectionLabel = t.testimonials.title;

    const goNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((i) => (i + 1) % total);
    }, [total]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((i) => (i - 1 + total) % total);
    }, [total]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [goNext, goPrev]);

    const active = items[activeIndex];
    const accent = cardAccents[activeIndex] ?? cardAccents[0];

    const textVariants = {
        enter: (d: number) => ({
            opacity: 0,
            y: d > 0 ? 16 : -16,
        }),
        center: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.48, ease: easing },
        },
        exit: (d: number) => ({
            opacity: 0,
            y: d > 0 ? -14 : 14,
            transition: { duration: 0.28, ease: easing },
        }),
    };

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-background py-20 transition-colors duration-300 md:py-28"
            aria-labelledby="proof-signals-title"
        >
            {/* Top hairline */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                    background:
                        "linear-gradient(to right, transparent, color-mix(in srgb, var(--primary) 34%, var(--border)), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className={`mb-12 max-w-3xl ${isRtl ? "ms-auto text-end" : ""}`}>
                    <p className="text-xs font-black uppercase tracking-[0.32em] text-primary-theme">
                        {sectionLabel}
                    </p>
                    <h2
                        id="proof-signals-title"
                        className="mt-4 text-3xl font-black leading-tight text-foreground md:text-5xl"
                    >
                        {heading}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
                        {description}
                    </p>
                </div>

                {/* Main two-column layout */}
                <div
                    dir="ltr"
                    className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16"
                    role="region"
                    aria-label={isArabic ? "تقييمات العملاء" : "Client testimonials carousel"}
                >
                    {/* ── Visual stack column ── */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-[400px] w-full max-w-sm md:h-[480px] md:max-w-md">
                            {items.map((item, i) => (
                                <VisualCard
                                    key={i}
                                    item={item}
                                    index={i}
                                    activeIndex={activeIndex}
                                    total={total}
                                    reducedMotion={reducedMotion}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Text + controls column ── */}
                    <div
                        dir={dir}
                        className={`flex min-w-0 flex-col justify-center ${isRtl ? "items-end text-end" : ""}`}
                    >
                        {/* Active project chip */}
                        <div className={`mb-6 flex items-center gap-2 ${isRtl ? "justify-end" : ""}`}>
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: accent.accentA }}
                                aria-hidden="true"
                            />
                            <span
                                className="font-mono text-[11px] font-bold uppercase tracking-[0.26em]"
                                style={{ color: accent.accentA }}
                            >
                                {accent.project}
                            </span>
                        </div>

                        {/* Quote */}
                        <div
                            className={`relative w-full max-w-xl ${isArabic ? "min-h-[28rem] sm:min-h-[26rem] md:min-h-[24rem] lg:min-h-[30rem] xl:min-h-[26rem]" : "min-h-[26rem] sm:min-h-[24rem] md:min-h-[22rem] lg:min-h-[28rem] xl:min-h-[24rem]"}`}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.blockquote
                                    key={activeIndex}
                                    custom={direction}
                                    variants={reducedMotion ? undefined : textVariants}
                                    initial={reducedMotion ? undefined : "enter"}
                                    animate={reducedMotion ? undefined : "center"}
                                    exit={reducedMotion ? undefined : "exit"}
                                    className="absolute inset-0 overflow-y-auto pr-1"
                                >
                                    <p className={isArabic ? "text-base font-black leading-[1.85] text-foreground md:text-lg lg:text-xl lg:leading-[1.75]" : "text-base font-black leading-relaxed text-foreground md:text-lg lg:text-xl lg:leading-relaxed"}>
                                        &ldquo;{active.quote}&rdquo;
                                    </p>
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        {/* Author */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.footer
                                key={`author-${activeIndex}`}
                                custom={direction}
                                variants={reducedMotion ? undefined : {
                                    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 10 : -10 }),
                                    center: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.08, ease: easing } },
                                    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -8 : 8, transition: { duration: 0.22, ease: easing } }),
                                }}
                                initial={reducedMotion ? undefined : "enter"}
                                animate={reducedMotion ? undefined : "center"}
                                exit={reducedMotion ? undefined : "exit"}
                                className="mt-8 w-full max-w-xl border-t border-border pt-5"
                            >
                                <p className="text-base font-black text-foreground">{active.author}</p>
                                <p className="mt-0.5 text-sm font-semibold text-muted">{active.role}</p>
                            </motion.footer>
                        </AnimatePresence>

                        {/* Pagination dots + controls */}
                        <div
                            className={`mt-7 flex items-center gap-4 ${isRtl ? "justify-end" : ""}`}
                        >
                            {/* Prev */}
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={goPrev}
                                aria-label={isArabic ? "الشهادة السابقة" : "Previous testimonial"}
                                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 hover:border-primary-theme/50 hover:text-primary-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-theme"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Dots */}
                            <div className="flex items-center gap-2" role="tablist" aria-label={isArabic ? "التنقل بين الشهادات" : "Testimonial navigation"}>
                                {items.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        suppressHydrationWarning
                                        role="tab"
                                        aria-selected={i === activeIndex}
                                        aria-label={`${isArabic ? "شهادة" : "Testimonial"} ${i + 1}`}
                                        onClick={() => {
                                            setDirection(i > activeIndex ? 1 : -1);
                                            setActiveIndex(i);
                                        }}
                                        className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-theme"
                                        style={{
                                            width: i === activeIndex ? "1.75rem" : "0.375rem",
                                            background: i === activeIndex ? accent.accentA : "var(--border)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Next */}
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={goNext}
                                aria-label={isArabic ? "الشهادة التالية" : "Next testimonial"}
                                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 hover:border-primary-theme/50 hover:text-primary-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-theme"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* CTA */}
                        <div className={`mt-10 ${isRtl ? "" : ""}`}>
                            <Link href="/contact" className="btn-primary px-8 py-3">
                                {t.testimonials.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
