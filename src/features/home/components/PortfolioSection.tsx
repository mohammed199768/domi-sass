"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolioAnimation } from "../hooks/usePortfolioAnimation";
import { PortfolioItem } from "../types";
import ProjectShowcaseModal from "./ProjectShowcaseModal";
import { TransformationConstellationSvg } from "./visuals";

export default function PortfolioSection() {
    const { t, language } = useLanguage();
    const { sectionRef, titleRef, cardsRef, orbRef, handleMouseEnter, handleMouseLeave } =
        usePortfolioAnimation();
    const [selectedProjectSlug, setSelectedProjectSlug] = React.useState<string | null>(null);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="py-24 relative overflow-hidden bg-background transition-colors duration-300"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-surface-hover/50 -z-10" />
            <div
                ref={orbRef}
                className="pointer-events-none absolute left-1/2 top-20 h-48 w-48 -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl dark:bg-primary-theme/10"
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section heading */}
                <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        {t.portfolio.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted">
                        {t.portfolio.subtitle}
                    </p>
                </div>

                {/* Gallery grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                    {t.portfolio.items.map((item: PortfolioItem, index: number) => {
                        const hasProjectModal = Boolean(item.slug);
                        const hasExternalLink =
                            !hasProjectModal && item.link && item.link !== "#";

                        const card = (
                            <div
                                className={`group relative glass-card rounded-2xl overflow-hidden border border-border flex flex-col ${hasProjectModal || hasExternalLink ? "cursor-pointer" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Image tile */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-surface-hover">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 portfolio-overlay" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="object-cover portfolio-img transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Hover overlay text */}
                                    <div className="absolute bottom-0 inset-x-0 z-20 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1">
                                            {item.category}
                                        </p>
                                        <p className="text-sm font-bold text-white leading-snug">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="px-5 py-4 flex items-center justify-between gap-3 bg-transparent">
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/50 mb-0.5">
                                            {String(index + 1).padStart(2, "0")} · {item.category}
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary-theme transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <span className="flex-none text-primary-theme font-bold text-sm group-hover:translate-x-0.5 transition-transform">
                                        →
                                    </span>
                                </div>
                            </div>
                        );

                        if (hasProjectModal) {
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => setSelectedProjectSlug(item.slug ?? null)}
                                    className="block text-left"
                                    aria-label={`Open ${item.title} case study`}
                                >
                                    {card}
                                </button>
                            );
                        }

                        if (hasExternalLink) {
                            return (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={index}
                                    className="block"
                                >
                                    {card}
                                </a>
                            );
                        }

                        return (
                            <div key={index} className="block">
                                {card}
                            </div>
                        );
                    })}
                </div>

                {/* Transformation network — echoes the /work tree as a bridge into
                    the "view all case studies" CTA. Decorative, behind the buttons. */}
                <div className="relative mt-16 flex justify-center">
                    <TransformationConstellationSvg className="h-40 w-40 opacity-70 dark:opacity-60 sm:h-48 sm:w-48" />
                </div>

                {/* CTA */}
                <div className="text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => window.open("https://github.com/mohammed199768", "_blank")}
                        className="px-10 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-foreground/10"
                    >
                        {t.portfolio.cta}
                    </button>
                    <Link
                        href="/work"
                        className="px-10 py-4 bg-transparent text-foreground border border-border font-bold rounded-full hover:bg-surface-hover hover:scale-105 transition-all duration-300"
                    >
                        {language === "ar" ? "عرض جميع دراسات الحالة" : "View all case studies"}
                    </Link>
                </div>
            </div>

            {/* Project showcase modal */}
            <ProjectShowcaseModal
                open={Boolean(selectedProjectSlug)}
                slug={selectedProjectSlug}
                onClose={() => setSelectedProjectSlug(null)}
            />
        </section>
    );
}
