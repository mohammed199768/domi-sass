"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import gsap from "gsap";

export default function Hero() {
    const { t, dir } = useLanguage();
    const componentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Image Reveal with Parallax Scale
            tl.from(imageRef.current, {
                opacity: 0,
                scale: 1.2,
                y: 100,
                duration: 1.5,
                ease: "expo.out"
            })
                // Text Stagger
                .from(textRef.current?.children || [], {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                }, "-=1.2");

        }, componentRef);

        return () => ctx.revert();
    }, [dir]);

    return (
        <section ref={componentRef} className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] px-6 pt-32 lg:pt-20 relative overflow-hidden">
            {/* Cinematic Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/50 dark:from-primary-dark/5 dark:via-transparent dark:to-secondary-dark/5 -z-10" />

            {/* Ambient Light Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 dark:bg-primary-dark/20 rounded-full blur-[100px] opacity-40 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 dark:bg-secondary-dark/20 rounded-full blur-[100px] opacity-40" />

            <div className="max-w-7xl mx-auto w-full z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content with Glass Backdrop optionally, keeping clean for now but impactful */}
                    <div ref={textRef} className="space-y-8 text-center lg:text-start">
                        <div className="inline-block px-4 py-2 rounded-full glass border border-primary/20 dark:border-primary-dark/20 text-primary dark:text-primary-dark font-bold text-sm tracking-wide uppercase mb-2">
                            Frontend Developer
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                            {t.hero.headline}
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t.hero.subheading}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                            >
                                {t.hero.primaryCTA}
                            </button>
                            <button
                                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 glass text-gray-900 dark:text-white font-bold border border-gray-200 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-lg"
                            >
                                {t.hero.secondaryCTA}
                            </button>
                        </div>
                    </div>

                    {/* Hero Image - Adjusted Height & Position */}
                    <div ref={imageRef} className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10 transform translate-y-6 lg:translate-y-12 group mt-10 lg:mt-0">
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
