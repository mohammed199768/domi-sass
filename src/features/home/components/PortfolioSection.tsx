"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolioAnimation } from "../hooks/usePortfolioAnimation";
import { PortfolioItem } from "../types";

export default function PortfolioSection() {
    const { t } = useLanguage();
    const { sectionRef, titleRef, cardsRef, handleMouseEnter, handleMouseLeave } = usePortfolioAnimation();

    return (
        <section ref={sectionRef} id="portfolio" className="py-24 relative overflow-hidden bg-background transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-surface-hover/50 -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        {t.portfolio.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted">
                        {t.portfolio.subtitle}
                    </p>
                </div>

                <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
                    {t.portfolio.items.map((item: PortfolioItem, index: number) => (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="block"
                        >
                            <div
                                className="group relative glass-card rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer border border-border"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="p-4 bg-transparent">
                                    <div className="relative h-64 overflow-hidden rounded-xl bg-surface-hover border border-border group-hover:border-primary-theme/30 transition-all duration-300">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 portfolio-overlay" />
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover portfolio-img transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-surface/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-foreground shadow-sm portfolio-cat border border-border">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between relative z-20 bg-transparent">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary-theme transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed mb-6">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-primary-theme font-bold group-hover:gap-2 transition-all">
                                        View Project <span className="ml-2">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={() => window.open('https://github.com/mohammed199768', '_blank')}
                        className="px-10 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-foreground/10"
                    >
                        {t.portfolio.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
