"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Briefcase, LayoutDashboard, MonitorPlay, Route } from "lucide-react";
import { ServiceOrbitSvg } from "./visuals";

const iconMap: Record<string, React.ReactNode> = {
    consulting: <LayoutDashboard className="w-10 h-10 text-secondary-theme" />,
    marketing: <Route className="w-10 h-10 text-secondary-theme" />,
    development: <MonitorPlay className="w-10 h-10 text-secondary-theme" />,
};

export default function ServicesSection() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-24 relative bg-background transition-colors duration-300">
            <div
                className="pointer-events-none absolute right-0 top-0 -z-10 h-1/2 w-1/2 opacity-45"
                style={{ background: "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primary) 7%, transparent), transparent 66%)" }}
            />
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
                            <Link href="/contact" className="btn-primary px-8 py-3">
                                {t.services.cta}
                            </Link>
                        </div>

                        {/* Service orbit — supporting instrumentation visual, desktop only. */}
                        <ServiceOrbitSvg className="mx-auto mt-12 hidden h-56 w-56 opacity-80 dark:opacity-65 lg:mx-0 lg:block" />
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
                                    <div className="w-16 h-16 bg-surface-muted rounded-xl flex shrink-0 items-center justify-center shadow-sm border border-border group-hover:border-secondary-theme/35 transition-colors">
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
