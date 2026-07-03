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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-surface/95 py-3 shadow-[0_14px_34px_-30px_var(--cool-shadow)]" : "bg-transparent py-5"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex min-h-11 items-center gap-3 rounded-full text-primary-theme transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                >
                    <span className="font-display text-2xl font-black tracking-wide transition-colors group-hover:text-secondary-theme">DOMINASE</span>
                    <span className="font-display hidden text-[10px] font-black uppercase tracking-[0.2em] text-muted sm:inline">
                        Digital Product Studio
                    </span>
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary-theme transition-colors group-hover:bg-secondary-theme" />
                </Link>

                {/* Desktop Nav */}
                <nav className="premium-surface hidden items-center gap-1 rounded-full p-1.5 min-[1025px]:flex" aria-label="Primary navigation">
                    {NAV_ITEMS.map((item) => {
                        const label = getNavItemLabel(t.nav, item);
                        const isActive = isNavItemActive(item, pathname);

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme ${
                                    isActive
                                        ? "bg-[color-mix(in_srgb,var(--primary)_13%,var(--surface-hover))] text-primary-theme shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_24%,transparent)]"
                                        : "text-muted hover:bg-surface-hover hover:text-foreground"
                                }`}
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
                        className="premium-surface premium-interactive flex min-h-11 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-black text-primary-theme hover:border-primary-theme"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    <Link href="/contact" className="btn-primary min-h-11 px-6 py-2.5 text-sm">
                        {t.nav.cta}
                    </Link>
                </div>

                {/* Mobile Top Bar (Just Logo + Language) */}
                <div className="flex items-center gap-3 min-[1025px]:hidden">
                    <button
                        onClick={toggleLanguage}
                        suppressHydrationWarning
                        aria-label="Switch language"
                        className="premium-surface grid h-11 w-11 place-items-center rounded-full text-primary-theme transition-colors hover:border-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                    >
                        <span className="text-xs font-bold">{language === "en" ? "AR" : "EN"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
