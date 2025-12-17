"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const portfolioImages = [
    "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
];

export default function PortfolioSection() {
    const { t } = useLanguage();

    return (
        <section id="portfolio" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t.portfolio.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t.portfolio.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.portfolio.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={portfolioImages[index % portfolioImages.length]}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-primary">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {item.desc}
                                </p>
                                <a href="#" className="text-secondary font-semibold hover:underline">
                                    View Details &rarr;
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                        {t.portfolio.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
