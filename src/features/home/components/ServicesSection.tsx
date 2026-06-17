"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase, LayoutDashboard, MonitorPlay, Route } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    consulting: <LayoutDashboard className="w-10 h-10 text-secondary-theme" />,
    marketing: <Route className="w-10 h-10 text-secondary-theme" />,
    development: <MonitorPlay className="w-10 h-10 text-secondary-theme" />,
};

export default function ServicesSection() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-20 relative bg-background transition-colors duration-300">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-theme/5 blur-[100px] -z-10" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-theme mb-4">
                        {t.services.title}
                    </h2>
                    <p className="text-lg text-muted">
                        {t.services.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.services.items.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 rounded-2xl group border border-border"
                        >
                            <div className="w-16 h-16 bg-surface rounded-xl flex items-center justify-center shadow-sm mb-6 border border-border group-hover:border-primary-theme/30 transition-colors">
                                {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Briefcase className="w-10 h-10 text-secondary-theme" />}
                            </div>
                            <h3 className="text-xl font-bold text-primary-theme mb-3">
                                {service.title}
                            </h3>
                            <p className="text-muted leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 bg-secondary-theme text-background font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-secondary-theme/10"
                    >
                        {t.services.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
