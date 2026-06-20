"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
    const { t, dir } = useLanguage();

    return (
        <section id="about" className="py-24 bg-surface-hover overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border lg:sticky lg:top-28"
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src="/images/solution.jpg"
                                alt="About Mohammad Aldomi"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:pt-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-theme mb-6">
                            {t.about.title}
                        </h2>
                        <div className="space-y-6 text-muted text-lg leading-relaxed">
                            {t.about.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/why-change"
                                className="inline-flex min-h-12 items-center justify-center px-8 py-3 bg-primary-theme text-background font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary-theme/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-surface-hover"
                            >
                                {t.about.cta}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
