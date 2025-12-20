"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
    const { t, dir } = useLanguage();

    return (
        <section id="about" className="py-20 bg-surface-hover overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border"
                    >
                        <Image
                            src="/images/solution.jpg"
                            alt="About Mohammad Aldomi"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-theme mb-6">
                            {t.about.title}
                        </h2>
                        <div className="space-y-6 text-muted text-lg leading-relaxed">
                            <p>{t.about.description}</p>
                            <p>{t.about.story}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-primary-theme text-background font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-primary-theme/10"
                            >
                                {t.about.cta}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
