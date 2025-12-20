"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Users, Minimize2 } from "lucide-react";

export default function SolutionSection() {
    const { t } = useLanguage();

    const icons = [Sparkles, Users, Minimize2];

    return (
        <section className="py-20 bg-background px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-theme mb-6">
                        {t.solution.title}
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Benefits List */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {t.solution.benefits.map((benefit, index) => {
                            const Icon = icons[index];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-theme/20 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary-theme" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-theme mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-muted">{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Solution Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border"
                    >
                        <Image
                            src="/images/solution.jpg"
                            alt="Clean organized workspace"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
