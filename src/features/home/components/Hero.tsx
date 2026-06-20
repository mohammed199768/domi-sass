"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { HeroOrbitalSignatureSvg } from "./visuals";

export default function Hero() {
    const { t } = useLanguage();
    const { componentRef, textRef, headlineRef, imageRef, haloRef, evidenceRef } = useHeroAnimation();
    const headlineWords = t.hero.headline.split(" ");
    const evidenceItems = t.portfolio.items.slice(0, 3);

    return (
        <section ref={componentRef} className="min-h-screen flex items-center justify-center bg-background px-6 pt-40 pb-32 lg:pt-28 lg:pb-36 relative overflow-hidden">
            {/* Cinematic Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface-hover/50 via-transparent to-surface-hover/50 dark:from-primary-theme/5 dark:via-transparent dark:to-secondary-theme/5 -z-10" />

            {/* Ambient Light Orbs */}
            <div ref={haloRef} className="absolute top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary-theme/10 blur-[120px] opacity-70" />
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary-theme/20 rounded-full blur-[100px] opacity-40" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-theme/20 rounded-full blur-[100px] opacity-40" />

            <div className="max-w-7xl mx-auto w-full z-10">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-20 items-center">
                    {/* Text Content with Glass Backdrop optionally, keeping clean for now but impactful */}
                    <div ref={textRef} className="space-y-8 text-center lg:text-start">
                        <div data-hero-support className="inline-block px-4 py-2 rounded-full glass border border-primary-theme/20 text-primary-theme font-bold text-sm tracking-wide uppercase mb-2">
                            {t.hero.title}
                        </div>
                        <h1
                            ref={headlineRef}
                            aria-label={t.hero.headline}
                            className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1.05] tracking-tight"
                        >
                            {headlineWords.map((word, index) => (
                                <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom ltr:mr-[0.22em] rtl:ml-[0.22em]">
                                    <span data-hero-word aria-hidden="true" className="inline-block will-change-transform">
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p data-hero-support className="text-lg md:text-2xl text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t.hero.subheading}
                        </p>

                        {/* CTAs */}
                        <div data-hero-support className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                            <button
                                onClick={() => scrollToSection("#portfolio")}
                                className="px-10 py-5 bg-foreground text-background font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                            >
                                {t.hero.primaryCTA}
                            </button>
                            <button
                                onClick={() => scrollToSection("#contact")}
                                className="px-10 py-5 glass text-foreground font-bold border border-border rounded-full hover:bg-surface-hover transition-all duration-300 text-lg"
                            >
                                {t.hero.secondaryCTA}
                            </button>
                        </div>
                    </div>

                    {/* Hero Image - Adjusted Height & Position */}
                    <div className="relative mt-10 lg:mt-0">
                        {/* Orbital signature — layered behind the portrait, desktop only.
                            Low opacity so it never competes with text or the photo. */}
                        <HeroOrbitalSignatureSvg className="absolute left-1/2 top-1/2 hidden h-[150%] w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60 dark:opacity-45 lg:block" />

                        <div ref={imageRef} className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-foreground/5 dark:ring-white/10 transform translate-y-6 lg:translate-y-12 group">
                            <Image
                                src="/images/mohamed.webp"
                                alt="Mohammad Aldomi"
                                fill
                                sizes="(max-width: 1024px) 90vw, 384px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 text-white text-left z-20">
                                <p className="font-bold text-xl">Mohammad Aldomi</p>
                                <p className="text-gray-300 text-sm">Creative Developer</p>
                            </div>
                        </div>

                        <div ref={evidenceRef} className="pointer-events-none absolute inset-x-0 -bottom-10 z-30 mx-auto hidden max-w-xl grid-cols-3 gap-3 lg:grid">
                            {evidenceItems.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-border bg-surface/85 p-4 text-left shadow-2xl shadow-foreground/10 backdrop-blur-xl">
                                    <p className="line-clamp-1 text-sm font-black text-foreground">{item.title}</p>
                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{item.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
