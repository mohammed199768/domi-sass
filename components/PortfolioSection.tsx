"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
    title: string;
    category: string;
    desc: string;
    image: string;
    link: string;
}

export default function PortfolioSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current?.children || [], {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            });

            // Cards Animation
            const cards = cardsRef.current?.children || [];
            gsap.from(cards, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 75%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const category = e.currentTarget.querySelector(".portfolio-cat");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");

        gsap.to(image, { scale: 1.1, duration: 0.5, ease: "power2.out" });
        gsap.to(category, { y: -5, opacity: 1, duration: 0.3 });
        gsap.to(overlay, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const category = e.currentTarget.querySelector(".portfolio-cat");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");

        gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(category, { y: 0, opacity: 1, duration: 0.3 });
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
    };

    return (
        <section ref={sectionRef} id="portfolio" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-black/20 -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t.portfolio.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
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
                                className="group relative glass-card rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="relative h-72 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 portfolio-overlay" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover portfolio-img"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-sm portfolio-cat">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between relative z-20 bg-transparent">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-primary dark:text-primary-dark font-bold group-hover:gap-2 transition-all">
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
                        className="px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        {t.portfolio.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
