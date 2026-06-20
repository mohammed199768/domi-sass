"use client";

import React from "react";
import { Home, Mail, Layers, Library, CircleHelp, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MobileNav() {
    const { t } = useLanguage();
    const pathname = usePathname();

    const isHome = pathname === "/";

    const navItems = [
        { icon: Home, label: t.nav.home, href: "#home" },
        { icon: Layers, label: t.nav.services, href: "#services" },
        { icon: CircleHelp, label: t.nav.whyChange, href: "/why-change", isRoute: true },
        { icon: Sparkles, label: t.nav.whyUs, href: "/why-us", isRoute: true },
        { icon: Library, label: t.nav.caseStudies, href: "/work", isRoute: true },
        { icon: Mail, label: t.nav.contact, href: "#contact" },
    ];

    // Hide only on specific case study pages, not the /work index
    if (pathname.startsWith("/work/")) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe transition-colors duration-300">
            <nav className="glass bg-surface/80 backdrop-blur-xl border-t border-border px-6 py-4 flex justify-between items-center pb-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                {navItems.map((item) => {
                    const isActive = item.isRoute && pathname === item.href;

                    if (item.isRoute) {
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-label={item.label}
                                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-primary-theme font-bold" : "text-muted hover:text-primary-theme"}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-[9px] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center px-0.5">{item.label}</span>
                            </Link>
                        );
                    }

                    if (!isHome) {
                        return (
                            <Link
                                key={item.label}
                                href={`/${item.href}`}
                                aria-label={item.label}
                                className="flex flex-col items-center gap-1 text-muted hover:text-primary-theme transition-colors"
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-[9px] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center px-0.5">{item.label}</span>
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.href)}
                            aria-label={item.label}
                            className="flex flex-col items-center gap-1 text-muted hover:text-primary-theme transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-[9px] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center px-0.5">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
