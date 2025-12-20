"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialProof() {
    const { t } = useLanguage();

    // Dummy company logos
    const companies = [
        "AlphaCorp",
        "Beta Inc.",
        "Gamma LLC",
        "Delta Co.",
        "Epsilon Group",
        "Zeta Solutions",
    ];

    return (
        <section className="py-20 bg-background px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-lg text-muted mb-12">{t.socialProof.trustedBy}</p>

                    {/* Company Logos Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                        {companies.map((company, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center p-4 bg-surface-hover rounded-lg border border-border"
                            >
                                <span className="text-muted/60 font-semibold text-sm">
                                    {company}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto bg-surface p-8 rounded-2xl shadow-lg border border-border"
                    >
                        <p className="text-xl md:text-2xl text-primary-theme italic mb-4">
                            {t.socialProof.testimonial}
                        </p>
                        <p className="text-muted font-medium">{t.socialProof.attribution}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
