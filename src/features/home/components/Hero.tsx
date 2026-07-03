"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import HeroShaderBackground from "./HeroShaderBackground";

export default function Hero() {
    const { t, dir } = useLanguage();
    const { componentRef, wordmarkRef } = useHeroAnimation();

    return (
        <section
            ref={componentRef}
            id="home"
            className="hero-canvas relative flex min-h-dvh items-center justify-center overflow-hidden px-6 pb-24 pt-36 text-foreground lg:pb-28 lg:pt-28"
        >
            {/* WebGL signal field — contained inside the Hero, behind all content.
                Falls back to the static --hero-gradient CSS when WebGL is
                unavailable or reduced motion is preferred. */}
            <HeroShaderBackground />

            <div className="hero-aura pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="hero-base-fade pointer-events-none absolute inset-x-0 bottom-0 h-40" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <div className="space-y-6 md:space-y-8">
                        <div data-hero-eyebrow className="font-display inline-flex min-h-11 items-center rounded-full border border-border bg-surface/86 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-primary-theme shadow-lg shadow-primary-theme/10">
                            {t.hero.title}
                        </div>

                        <h1
                            ref={wordmarkRef}
                            data-hero-wordmark
                            data-preload-critical
                            className="mx-auto max-w-full whitespace-nowrap break-normal text-[clamp(2.85rem,12.2vw,9.5rem)] font-black uppercase leading-[0.86] tracking-[0.035em] text-foreground [direction:ltr] [overflow-wrap:normal] [word-break:normal] sm:tracking-[0.08em]"
                            dir="ltr"
                        >
                            DOMINASE
                        </h1>

                        <h2
                            data-hero-headline
                            aria-label={t.hero.headline}
                            dir={dir}
                            className="mx-auto max-w-3xl text-2xl font-black leading-tight text-foreground sm:text-3xl md:text-4xl"
                        >
                            {t.hero.headline}
                        </h2>

                        <p data-hero-subheadline className="mx-auto max-w-[760px] text-balance text-lg leading-relaxed text-foreground/80 md:text-xl">
                            {t.hero.subheading}
                        </p>

                        <div data-hero-cta className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                            <Link
                                href="/contact"
                                className="btn-primary min-h-12 px-8 py-3.5 text-sm"
                            >
                                {t.hero.primaryCTA}
                            </Link>
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => scrollToSection("#services")}
                                className="btn-secondary min-h-12 px-8 py-3.5 text-sm"
                            >
                                {t.hero.secondaryCTA}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
