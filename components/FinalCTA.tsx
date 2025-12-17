"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function FinalCTA() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-primary px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {t.finalCTA.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        {t.finalCTA.subtext}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {t.finalCTA.primaryCTA}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent text-white font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
                        >
                            {t.finalCTA.secondaryCTA}
                        </motion.button>
                    </div>

                    {/* Reassurance Text */}
                    <p className="text-sm text-white/80 pt-4">{t.finalCTA.reassurance}</p>
                </motion.div>
            </div>
        </section>
    );
}
