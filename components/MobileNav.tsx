"use client";

import React from "react";
import { Home, User, Briefcase, Mail, Layers } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function MobileNav() {
    const { t } = useLanguage();

    const scrollTo = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else if (href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const navItems = [
        { icon: Home, label: t.nav.home, href: "#home" },
        { icon: User, label: t.nav.about, href: "#about" },
        { icon: Layers, label: t.nav.services, href: "#services" },
        { icon: Briefcase, label: t.nav.portfolio, href: "#portfolio" },
        { icon: Mail, label: t.nav.contact, href: "#contact" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe">
            <nav className="glass bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-white/20 dark:border-white/10 px-6 py-4 flex justify-between items-center pb-6">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => scrollTo(item.href)}
                        className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors"
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
