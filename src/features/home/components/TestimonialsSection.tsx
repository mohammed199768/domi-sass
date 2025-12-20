"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
    const { t } = useLanguage();

    return (
        <section id="testimonials" className="py-20 bg-background relative overflow-hidden transition-colors duration-300">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-theme/5 rounded-full blur-3xl -z-10 opacity-50" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-theme mb-4">
                            {t.testimonials.title}
                        </h2>
                        <p className="text-lg text-muted mb-8">
                            {t.testimonials.subtitle}
                        </p>
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                            alt="Happy Clients"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-xl object-cover border border-border"
                        />
                    </motion.div>

                    <div className="space-y-6">
                        {t.testimonials.items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-surface p-6 rounded-xl shadow-lg border-l-4 border-secondary-theme border-y border-r border-border"
                            >
                                <Quote className="w-8 h-8 text-primary-theme/20 mb-3" />
                                <p className="text-muted italic mb-4">&quot;{item.quote}&quot;</p>
                                <div>
                                    <h4 className="font-bold text-primary-theme">{item.author}</h4>
                                    <span className="text-sm text-muted/60">{item.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button className="px-8 py-3 bg-secondary-theme text-background font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-secondary-theme/10">
                        {t.testimonials.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
