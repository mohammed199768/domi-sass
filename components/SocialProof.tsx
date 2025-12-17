"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

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
        <section className="py-20 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-lg text-gray-600 mb-12">{t.socialProof.trustedBy}</p>

                    {/* Company Logos Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                        {companies.map((company, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center p-4 bg-gray-100 rounded-lg"
                            >
                                <span className="text-gray-400 font-semibold text-sm">
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
                        className="max-w-3xl mx-auto bg-background-light p-8 rounded-2xl shadow-lg"
                    >
                        <p className="text-xl md:text-2xl text-primary italic mb-4">
                            {t.socialProof.testimonial}
                        </p>
                        <p className="text-gray-600 font-medium">{t.socialProof.attribution}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
