"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Workflow, BarChart3, Zap } from "lucide-react";

export default function FeaturesSection() {
    const { t } = useLanguage();

    const icons = [Workflow, BarChart3, Zap];

    return (
        <section className="py-20 bg-background-light px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                        Features
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.features.map((feature, index) => {
                        const Icon = icons[index];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold text-primary mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
