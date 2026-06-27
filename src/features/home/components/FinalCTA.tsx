"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";

export default function FinalCTA() {
    const { t } = useLanguage();

    return (
        <section className="bg-[#102033] px-6 py-24 transition-colors duration-300 dark:bg-[#07131e]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f6f8fb] uppercase tracking-tight">
                        {t.finalCTA.title}
                    </h2>
                    <p className="text-lg md:text-xl text-[#d8e6ee] leading-relaxed font-medium dark:text-[#cbd5e1]">
                        {t.finalCTA.subtext}
                    </p>

                    {/* CTAs — CSS scale instead of per-button Framer Motion wrappers */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => scrollToSection("#contact")}
                            className="btn-primary px-8 py-4 font-black transition-transform duration-200 hover:scale-105 active:scale-95"
                        >
                            {t.finalCTA.primaryCTA}
                        </button>
                        <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => scrollToSection("#portfolio")}
                            className="px-8 py-4 bg-transparent text-[#f6f8fb] font-bold border-2 border-[#f6f8fb] rounded-full hover:bg-[#f6f8fb] hover:text-[#102033] transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            {t.finalCTA.secondaryCTA}
                        </button>
                    </div>

                    {/* Reassurance Text */}
                    <p className="pt-4 text-sm font-medium text-[#d8e6ee]/75 dark:text-[#cbd5e1]/75">{t.finalCTA.reassurance}</p>
                </motion.div>
            </div>
        </section>
    );
}
