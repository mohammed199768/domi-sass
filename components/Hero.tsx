"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
    const { t, dir } = useLanguage();

    return (
        <section className="min-h-screen flex items-center justify-center bg-white px-6 py-20 lg:py-0 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white -z-10" />

            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                            {t.hero.headline}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
                            {t.hero.subheading}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-secondary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {t.hero.primaryCTA}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent text-primary font-bold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                {t.hero.secondaryCTA}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Placeholder image from Unsplash as suggest in prompt */}
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                            alt="Team collaborating"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
