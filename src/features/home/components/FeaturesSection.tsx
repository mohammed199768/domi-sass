"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Workflow, BarChart3, Zap } from "lucide-react";

export default function FeaturesSection() {
    const { t } = useLanguage();

    const icons = [Workflow, BarChart3, Zap];

    return (
        <section className="py-20 bg-surface-hover px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-theme">
                        Features
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.features.map((feature, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="glass-card p-8 rounded-xl transition-all duration-300 border border-border"
                            >
                                <div className="w-16 h-16 bg-primary-theme/10 border border-primary-theme/15 rounded-lg flex items-center justify-center mb-6">
                                    <Icon className="w-8 h-8 text-primary-theme" />
                                </div>
                                <h3 className="text-2xl font-semibold text-primary-theme mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-muted leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
