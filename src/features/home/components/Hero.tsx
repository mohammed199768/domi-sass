"use client";

import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import RetroGrid from "@/components/site/RetroGrid";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

export default function Hero() {
    const { t, dir } = useLanguage();
    const { componentRef, wordmarkRef } = useHeroAnimation();

    return (
        <section
            ref={componentRef}
            id="home"
            className="hero-canvas relative flex min-h-dvh items-center justify-center overflow-hidden px-6 pb-24 pt-36 text-foreground lg:pb-28 lg:pt-28"
        >
            <RetroGrid />

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
                            className="mx-auto max-w-full text-[clamp(3.4rem,13vw,9.5rem)] font-black uppercase leading-[0.86] tracking-[0.08em] text-foreground sm:tracking-[0.12em]"
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
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => scrollToSection("#contact")}
                                className="btn-primary min-h-12 px-8 py-3.5 text-sm"
                            >
                                {t.hero.primaryCTA}
                            </button>
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
