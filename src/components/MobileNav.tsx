"use client";

import React from "react";
import { Home, User, Briefcase, Mail, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const { t } = useLanguage();
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: t.nav.home, href: "#home" },
        { icon: User, label: t.nav.about, href: "#about" },
        { icon: Layers, label: t.nav.services, href: "#services" },
        { icon: Briefcase, label: t.nav.portfolio, href: "#portfolio" },
        { icon: Mail, label: t.nav.contact, href: "#contact" },
    ];

    if (pathname.startsWith("/work/")) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe transition-colors duration-300">
            <nav className="glass bg-surface/80 backdrop-blur-xl border-t border-border px-6 py-4 flex justify-between items-center pb-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        aria-label={item.label}
                        className="flex flex-col items-center gap-1 text-muted hover:text-primary-theme transition-colors"
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
