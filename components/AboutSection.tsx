"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function AboutSection() {
    const { t, dir } = useLanguage();

    return (
        <section id="about" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
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
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                            {t.about.title}
                        </h2>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p>{t.about.description}</p>
                            <p>{t.about.story}</p>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
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
