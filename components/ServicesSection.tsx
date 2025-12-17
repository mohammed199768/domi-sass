"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Briefcase, Megaphone, TrendingUp, Code } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    consulting: <TrendingUp className="w-10 h-10 text-secondary" />,
    marketing: <Megaphone className="w-10 h-10 text-secondary" />,
    development: <Code className="w-10 h-10 text-secondary" />,
};

export default function ServicesSection() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t.services.title}
                    </h2>
                    <p className="text-lg text-gray-600">
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
                            className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
                                {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Briefcase className="w-10 h-10 text-secondary" />}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors">
                        {t.services.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
