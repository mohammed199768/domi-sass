"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";

export default function FinalCTA() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-primary-theme px-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background uppercase tracking-tight">
                        {t.finalCTA.title}
                    </h2>
                    <p className="text-lg md:text-xl text-background/80 leading-relaxed font-medium">
                        {t.finalCTA.subtext}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection("#contact")}
                            className="px-8 py-4 bg-secondary-theme text-background font-black rounded-full shadow-2xl hover:shadow-secondary-theme/40 transition-all duration-300"
                        >
                            {t.finalCTA.primaryCTA}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection("#portfolio")}
                            className="px-8 py-4 bg-transparent text-background font-bold border-2 border-background rounded-full hover:bg-background hover:text-primary-theme transition-all duration-300"
                        >
                            {t.finalCTA.secondaryCTA}
                        </motion.button>
                    </div>

                    {/* Reassurance Text */}
                    <p className="text-sm text-background/60 pt-4 font-medium">{t.finalCTA.reassurance}</p>
                </motion.div>
            </div>
        </section>
    );
}
