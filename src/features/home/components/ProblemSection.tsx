"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ProblemSection() {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-background px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1 border border-border"
                    >
                        <Image
                            src="/images/problem.jpg"
                            alt="Cluttered desk with papers and notes"
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 order-1 lg:order-2"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-theme">
                            {t.problem.title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted leading-relaxed">
                            {t.problem.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
