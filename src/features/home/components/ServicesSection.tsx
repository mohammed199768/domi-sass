"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase, LayoutDashboard, MonitorPlay, Route } from "lucide-react";
import { scrollToSection } from "@/lib/motion/scrollToSection";

const iconMap: Record<string, React.ReactNode> = {
    consulting: <LayoutDashboard className="w-10 h-10 text-secondary-theme" />,
    marketing: <Route className="w-10 h-10 text-secondary-theme" />,
    development: <MonitorPlay className="w-10 h-10 text-secondary-theme" />,
};

export default function ServicesSection() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-24 relative bg-background transition-colors duration-300">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-theme/5 blur-[100px] -z-10" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                    <div className="text-center max-w-3xl mx-auto lg:sticky lg:top-28 lg:text-start">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-theme mb-4">
                            {t.services.title}
                        </h2>
                        <p className="text-lg text-muted leading-8">
                            {t.services.subtitle}
                        </p>

                        <div className="mt-10">
                            <button
                                onClick={() => scrollToSection("#contact")}
                                className="px-8 py-3 bg-secondary-theme text-background font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-secondary-theme/10"
                            >
                                {t.services.cta}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {t.services.items.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 rounded-2xl group border border-border md:p-10"
                            >
                                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                    <div className="w-16 h-16 bg-surface rounded-xl flex shrink-0 items-center justify-center shadow-sm border border-border group-hover:border-primary-theme/30 transition-colors">
                                        {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Briefcase className="w-10 h-10 text-secondary-theme" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-primary-theme mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
