"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

export default function Hero() {
    const { t } = useLanguage();
    const { componentRef, textRef, imageRef } = useHeroAnimation();

    return (
        <section ref={componentRef} className="min-h-screen flex items-center justify-center bg-background px-6 pt-40 pb-32 lg:pt-20 lg:pb-48 relative overflow-hidden">
            {/* Cinematic Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface-hover/50 via-transparent to-surface-hover/50 dark:from-primary-theme/5 dark:via-transparent dark:to-secondary-theme/5 -z-10" />

            {/* Ambient Light Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary-theme/20 rounded-full blur-[100px] opacity-40 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-theme/20 rounded-full blur-[100px] opacity-40" />

            <div className="max-w-7xl mx-auto w-full z-10">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-20 items-center">
                    {/* Text Content with Glass Backdrop optionally, keeping clean for now but impactful */}
                    <div ref={textRef} className="space-y-8 text-center lg:text-start">
                        <div className="inline-block px-4 py-2 rounded-full glass border border-primary-theme/20 text-primary-theme font-bold text-sm tracking-wide uppercase mb-2">
                            Frontend Developer
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1.1] tracking-tight">
                            {t.hero.headline}
                        </h1>
                        <p className="text-lg md:text-2xl text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t.hero.subheading}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 bg-foreground text-background font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                            >
                                {t.hero.primaryCTA}
                            </button>
                            <button
                                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 glass text-foreground font-bold border border-border rounded-full hover:bg-surface-hover transition-all duration-300 text-lg"
                            >
                                {t.hero.secondaryCTA}
                            </button>
                        </div>
                    </div>

                    {/* Hero Image - Adjusted Height & Position */}
                    <div ref={imageRef} className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-foreground/5 dark:ring-white/10 transform translate-y-6 lg:translate-y-12 group mt-10 lg:mt-0">
                        <Image
                            src="/images/mohamed.webp"
                            alt="Mohammad Aldomi"
                            fill
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
                </div>
            </div>
        </section>
    );
}
