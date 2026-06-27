"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ViewportVideo from "@/components/site/ViewportVideo";

export default function AboutSection() {
    const { t, dir } = useLanguage();
    const about = t.about;
    const cornerLabel = dir === "rtl" ? "طبقة القرار" : "Decision layer";

    return (
        // Transparent outer section: no isolated panel — it inherits the page
        // background so the card reads as floating within the page flow.
        <section id="about" className="relative py-24 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="spatial-card overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10"
                >
                    <div className="spatial-card__glow pointer-events-none absolute inset-0" aria-hidden="true" />

                    <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Video — first on mobile, leading side on desktop */}
                        <div className="relative">
                            <span className="absolute left-4 top-4 z-10 rounded-full border border-border bg-surface/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-theme rtl:left-auto rtl:right-4">
                                {cornerLabel}
                            </span>
                            <div className="video-frame relative overflow-hidden rounded-2xl border border-border shadow-[0_24px_60px_-36px_var(--cool-shadow)]">
                                <ViewportVideo
                                    src="/assest/optimized/videos/marketing.webm"
                                    fallbackSrc="/assest/marketing.mp4"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Copy — compact and scannable */}
                        <div>
                            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-primary-theme">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
                                {about.eyebrow}
                            </p>

                            <h2 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl">
                                {about.title}
                            </h2>

                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                                {about.summary}
                            </p>

                            <ul className="mt-7 space-y-3">
                                {about.points.map((point) => (
                                    <li key={point} className="flex items-center gap-3 text-base font-medium text-foreground/85">
                                        <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-primary-theme/35 text-primary-theme">
                                            <Check className="h-3 w-3" />
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-9">
                                <Link href="/why-change" className="btn-primary min-h-12 px-8 py-3">
                                    {about.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
