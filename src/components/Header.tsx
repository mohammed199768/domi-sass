"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { getNavItemLabel, isNavItemActive, NAV_ITEMS } from "./navConfig";

export default function Header() {
    const { t, language, toggleLanguage } = useLanguage();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface/92 border-b border-border shadow-[0_14px_34px_var(--cool-shadow)] py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3 text-primary-theme"
                >
                    <span className="font-display text-2xl font-black tracking-wide">DOMINASE</span>
                    <span className="font-display hidden text-[10px] font-black uppercase tracking-[0.22em] text-muted sm:inline">
                        Digital Product Studio
                    </span>
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary-theme" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden min-[1025px]:flex items-center gap-6 glass px-6 py-3 rounded-full">
                    {NAV_ITEMS.map((item) => {
                        const label = getNavItemLabel(t.nav, item);
                        const isActive = isNavItemActive(item, pathname);

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`font-medium transition-colors text-sm ${isActive ? "text-primary-theme font-bold" : "text-muted hover:text-primary-theme"}`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions Desktop */}
                <div className="hidden min-[1025px]:flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        suppressHydrationWarning
                        aria-label="Switch language"
                        className="flex min-h-11 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-primary-theme transition-colors hover:border-primary-theme glass"
                    >
                        <Globe className="w-3 h-3" />
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    <Link href="/contact" className="btn-primary px-6 py-2.5 text-sm">
                        {t.nav.cta}
                    </Link>
                </div>

                {/* Mobile Top Bar (Just Logo + Language) */}
                <div className="flex items-center gap-3 min-[1025px]:hidden">
                    <button
                        onClick={toggleLanguage}
                        suppressHydrationWarning
                        aria-label="Switch language"
                        className="grid h-11 w-11 place-items-center rounded-full border border-border text-primary-theme glass"
                    >
                        <span className="text-xs font-bold">{language === "en" ? "AR" : "EN"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
