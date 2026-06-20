"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { caseStudies } from "@/constants/caseStudies";
import type { CaseStudyLocale } from "@/features/case-studies/contracts";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Deterministic tree layout — one branch per case study.
// Coordinate model uses a 100×100 viewBox.
// Root node sits at center (50, 50).
// Four branches: top-left, top-right, bottom-left, bottom-right.
const TREE_NODES = [
    {
        slug: "manal-alhihi",
        // top-left
        accent: "#2DD4BF", // teal
        branchId: "branch-manal",
        // SVG end node in the 100×100 viewBox
        nodeX: 18, nodeY: 22,
        // CSS grid area: col 1, row 1
        gridArea: "manal",
        beforeEn: "Scattered courses",
        beforeAr: "دورات مبعثرة",
        afterEn: "Training platform",
        afterAr: "منصة تدريب",
    },
    {
        slug: "qasr-alfarah",
        // top-right
        accent: "#F472B6", // pink
        branchId: "branch-qasr",
        nodeX: 82, nodeY: 22,
        gridArea: "qasr",
        beforeEn: "Paper booking",
        beforeAr: "حجوزات ورقية",
        afterEn: "Digital wedding system",
        afterAr: "نظام أفراح رقمي",
    },
    {
        slug: "curevie",
        // bottom-left
        accent: "#60A5FA", // blue
        branchId: "branch-curevie",
        nodeX: 18, nodeY: 78,
        gridArea: "curevie",
        beforeEn: "Unclear care requests",
        beforeAr: "طلبات رعاية غير واضحة",
        afterEn: "Healthcare coordination",
        afterAr: "تنسيق الرعاية الصحية",
    },
    {
        slug: "horvath-survey",
        // bottom-right
        accent: "#A78BFA", // violet
        branchId: "branch-horvath",
        nodeX: 82, nodeY: 78,
        gridArea: "horvath",
        beforeEn: "Broad AI question",
        beforeAr: "سؤال عام عن الذكاء الاصطناعي",
        afterEn: "Readiness index",
        afterAr: "مؤشر الجاهزية",
    },
];

// Smooth cubic-bezier from root (50,50) to each branch endpoint.
// Control points curve gently outward from the trunk.
function branchPath(x: number, y: number): string {
    const mx = 50;
    const my = 50;

    // Pull control points toward edges — horizontal bow
    const cpx1 = mx + (x - mx) * 0.3;
    const cpy1 = my + (y - my) * 0.1;
    const cpx2 = mx + (x - mx) * 0.7;
    const cpy2 = my + (y - my) * 0.9;

    return `M ${mx} ${my} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x} ${y}`;
}

export default function TransformationTreeClient() {
    const { language, toggleLanguage } = useLanguage();
    const isAr = language === "ar";
    const svgRef = useRef<SVGSVGElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            gsap.set("[data-branch-path]", { strokeDashoffset: 0, opacity: 1 });
            gsap.set("[data-branch-node]", { scale: 1, opacity: 1 });
            gsap.set("[data-tree-card]", { y: 0, opacity: 1 });
            return;
        }

        // Prepare paths for stroke drawing
        const allPaths = svgRef.current?.querySelectorAll<SVGPathElement>("[data-branch-path]");
        allPaths?.forEach((p) => {
            const len = p.getTotalLength();
            p.style.strokeDasharray = String(len);
            p.style.strokeDashoffset = String(len);
        });

        gsap.set("[data-branch-node]", { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set("[data-tree-card]", { y: 24, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: svgRef.current,
                start: "top 70%",
                once: true,
            },
        });

        // 1 — Draw all four branches simultaneously (staggered slightly)
        tl.to("[data-branch-path]", {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.inOut",
        });

        // 2 — Pop endpoint nodes
        tl.to(
            "[data-branch-node]",
            { scale: 1, opacity: 1, duration: 0.45, stagger: 0.1, ease: "back.out(2.5)" },
            "-=0.4"
        );

        // 3 — Raise cards
        tl.to(
            "[data-tree-card]",
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.3"
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const headline = isAr
        ? "دراسات حالة تُظهر التحول، لا مجرد الشكل"
        : "Case studies showing transformation, not just form";

    const subtitle = isAr
        ? "كل مشروع يوثّق انتقالًا واضحًا: من تجربة مبعثرة إلى نظام رقمي منظم."
        : "Every project documents a clear transition: from scattered chaos to an organized digital system.";

    return (
        <main
            className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans"
            lang={language}
            dir={isAr ? "rtl" : "ltr"}
        >
            {/* ── Header ─────────────────────────────────────────────── */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-black text-primary-theme"
                        aria-label="Back to Home"
                    >
                        Domi
                        <span className="mt-1 h-2 w-2 rounded-full bg-secondary-theme" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            aria-label="Switch language"
                            className="glass flex h-9 items-center gap-2 rounded-full border border-border px-3 text-xs font-black text-primary-theme hover:border-primary-theme transition-colors"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            {isAr ? "EN" : "AR"}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Page content ────────────────────────────────────────── */}
            <div className="pt-16">
                {/* Hero strip */}
                <section className="max-w-5xl mx-auto px-6 pt-20 pb-10">
                    <p className="text-xs font-bold tracking-widest uppercase text-muted mb-4">
                        {isAr ? "معرض الأعمال" : "Portfolio"}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-6">
                        {headline}
                    </h1>
                    <p className="text-lg text-muted max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                </section>

                {/* ── Desktop Tree ─── hidden on mobile ──────────────── */}
                <section className="hidden lg:block relative max-w-5xl mx-auto px-6 pb-24" aria-label={isAr ? "شجرة التحول" : "Transformation tree"}>

                    {/* Faint background orb */}
                    <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        aria-hidden="true"
                    >
                        <div className="h-[520px] w-[520px] rounded-full opacity-[0.07] dark:opacity-[0.12] bg-primary-theme blur-[120px]" />
                    </div>

                    {/*
                     * Layout: CSS Grid with 5 columns and 5 rows.
                     * Centre cell (col 3, row 3) holds the SVG tree overlay.
                     * Four corner cells hold the project cards.
                     * The SVG viewBox matches the grid perfectly via percentages.
                     */}
                    <div
                        className="relative grid"
                        style={{
                            gridTemplateColumns: "1fr 32px 1fr 32px 1fr",
                            gridTemplateRows: "auto 32px auto 32px auto",
                            gridTemplateAreas: `
                                "manal   .  .    .  qasr   "
                                ".       .  .    .  .      "
                                ".       .  tree .  .      "
                                ".       .  .    .  .      "
                                "curevie .  .    .  horvath"
                            `,
                        }}
                    >
                        {/* SVG drawn over the whole grid as an overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            aria-hidden="true"
                            style={{ zIndex: 0 }}
                        >
                            <svg
                                ref={svgRef}
                                className="w-full h-full overflow-visible"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                style={{ display: "block" }}
                            >
                                <defs>
                                    {TREE_NODES.map((n) => (
                                        <filter key={n.branchId + "-glow"} id={n.branchId + "-glow"}>
                                            <feGaussianBlur stdDeviation="0.6" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    ))}
                                </defs>

                                {/* Central root dot */}
                                <circle
                                    cx="50" cy="50" r="1.8"
                                    className="fill-primary-theme"
                                    opacity="0.9"
                                />
                                <circle
                                    cx="50" cy="50" r="3.5"
                                    className="fill-primary-theme"
                                    opacity="0.15"
                                />

                                {/* Four branches */}
                                {TREE_NODES.map((n) => (
                                    <g key={n.branchId}>
                                        {/* Branch stroke */}
                                        <path
                                            data-branch-path="true"
                                            d={branchPath(n.nodeX, n.nodeY)}
                                            fill="none"
                                            stroke={n.accent}
                                            strokeWidth="0.55"
                                            strokeLinecap="round"
                                            opacity="0.7"
                                            filter={`url(#${n.branchId}-glow)`}
                                        />
                                        {/* Endpoint node — outer ring */}
                                        <circle
                                            data-branch-node="true"
                                            cx={n.nodeX} cy={n.nodeY} r="2.2"
                                            fill={n.accent}
                                            opacity="0.18"
                                        />
                                        {/* Endpoint node — inner dot */}
                                        <circle
                                            data-branch-node="true"
                                            cx={n.nodeX} cy={n.nodeY} r="1.1"
                                            fill={n.accent}
                                            opacity="0.95"
                                        />
                                    </g>
                                ))}
                            </svg>
                        </div>

                        {/* ── Four project cards ── */}
                        <div ref={cardsRef} className="contents">
                            {TREE_NODES.map((node) => {
                                const study = caseStudies[node.slug];
                                if (!study) return null;
                                const loc = language as CaseStudyLocale;
                                const c = study.content[loc];

                                return (
                                    <div
                                        key={node.slug}
                                        data-tree-card="true"
                                        style={{ gridArea: node.gridArea, position: "relative", zIndex: 1 }}
                                        className="group"
                                    >
                                        <Link
                                            href={`/work/${node.slug}`}
                                            className="glass-card block rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                                            dir={isAr ? "rtl" : "ltr"}
                                            style={{
                                                boxShadow: `0 0 0 1px ${node.accent}22`,
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 4px ${node.accent}33, 0 0 0 1px ${node.accent}55`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${node.accent}22`;
                                            }}
                                        >
                                            {/* Accent top bar */}
                                            <div className="h-1 w-full" style={{ background: node.accent }} />

                                            <div className="p-6">
                                                {/* Theme label */}
                                                <div className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: node.accent }}>
                                                    {study.visualTheme.replace(/-/g, " ")}
                                                </div>

                                                {/* Title */}
                                                <h2 className="text-lg font-black text-foreground mb-1 leading-snug group-hover:text-primary-theme transition-colors">
                                                    {c.eyebrow}
                                                </h2>

                                                {/* Before → After */}
                                                <div className="flex items-center gap-2 text-xs text-muted mb-4 flex-wrap">
                                                    <span className="line-through opacity-60">
                                                        {isAr ? node.beforeAr : node.beforeEn}
                                                    </span>
                                                    <span style={{ color: node.accent }}>→</span>
                                                    <span className="font-semibold text-foreground">
                                                        {isAr ? node.afterAr : node.afterEn}
                                                    </span>
                                                </div>

                                                {/* Positioning */}
                                                <p className="text-sm text-muted line-clamp-2 mb-5 leading-relaxed">
                                                    {c.positioning}
                                                </p>

                                                {/* Feature tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {c.features.slice(0, 3).map((f: { title: string }, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="text-[11px] px-2 py-0.5 rounded-full border font-medium"
                                                            style={{ borderColor: node.accent + "44", color: node.accent, background: node.accent + "11" }}
                                                        >
                                                            {f.title}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: node.accent }}>
                                                    {isAr ? "عرض دراسة الحالة" : "View case study"}
                                                    <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform inline-block">→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty centre cell — tree lives here via absolute overlay */}
                        <div style={{ gridArea: "tree" }} className="min-h-[220px]" aria-hidden="true" />
                    </div>
                </section>

                {/* ── Mobile vertical timeline ── shown only on mobile ── */}
                <section className="lg:hidden max-w-xl mx-auto px-6 pb-24" aria-label={isAr ? "مشاريع التحول" : "Transformation projects"}>
                    {/* Trunk line */}
                    <div className="relative" dir={isAr ? "rtl" : "ltr"}>
                        <div
                            className="absolute top-0 bottom-0 border-border"
                            style={{ [isAr ? "right" : "left"]: "16px", borderLeftWidth: isAr ? 0 : "1px", borderRightWidth: isAr ? "1px" : 0, opacity: 0.35 }}
                            aria-hidden="true"
                        />

                        <div className="space-y-10 py-2">
                            {TREE_NODES.map((node) => {
                                const study = caseStudies[node.slug];
                                if (!study) return null;
                                const loc = language as CaseStudyLocale;
                                const c = study.content[loc];

                                return (
                                    <div
                                        key={node.slug}
                                        data-tree-card="true"
                                        className={`relative flex gap-4 ${isAr ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        {/* Branch node dot */}
                                        <div className="flex-shrink-0 flex flex-col items-center mt-1">
                                            <div
                                                className="h-8 w-8 rounded-full border-2 flex items-center justify-center z-10 bg-surface"
                                                style={{ borderColor: node.accent }}
                                                aria-hidden="true"
                                            >
                                                <div className="h-2.5 w-2.5 rounded-full" style={{ background: node.accent }} />
                                            </div>
                                        </div>

                                        {/* Card */}
                                        <Link
                                            href={`/work/${node.slug}`}
                                            className="glass-card flex-1 block rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                                            dir={isAr ? "rtl" : "ltr"}
                                            style={{ boxShadow: `0 0 0 1px ${node.accent}22` }}
                                        >
                                            <div className="h-1 w-full" style={{ background: node.accent }} />
                                            <div className="p-5">
                                                <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: node.accent }}>
                                                    {study.visualTheme.replace(/-/g, " ")}
                                                </div>
                                                <h2 className="text-base font-black text-foreground mb-1 leading-snug">
                                                    {c.eyebrow}
                                                </h2>
                                                <div className="flex items-center gap-2 text-xs text-muted mb-3 flex-wrap">
                                                    <span className="line-through opacity-60">{isAr ? node.beforeAr : node.beforeEn}</span>
                                                    <span style={{ color: node.accent }}>→</span>
                                                    <span className="font-semibold text-foreground">{isAr ? node.afterAr : node.afterEn}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {c.features.slice(0, 3).map((f: { title: string }, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="text-[11px] px-2 py-0.5 rounded-full border font-medium"
                                                            style={{ borderColor: node.accent + "44", color: node.accent, background: node.accent + "11" }}
                                                        >
                                                            {f.title}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: node.accent }}>
                                                    {isAr ? "عرض دراسة الحالة" : "View case study"}
                                                    <span className={`transition-transform inline-block ${isAr ? "rotate-180" : ""}`}>→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
