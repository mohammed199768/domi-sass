"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { usePathname } from "next/navigation";

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
    const isHome = pathname === "/";

    const navItems = [
        { label: t.nav.services, href: "#services" },
        { label: t.nav.portfolio, href: "#portfolio" },
        { label: t.nav.whyChange, href: "/why-change", isRoute: true },
        { label: t.nav.whyUs, href: "/why-us", isRoute: true },
        { label: t.nav.caseStudies, href: "/work", isRoute: true },
        { label: t.nav.testimonials, href: "#testimonials" },
        { label: t.nav.contact, href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface/92 border-b border-border shadow-[0_14px_34px_rgba(15,35,55,0.07)] dark:shadow-black/20 py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={isHome ? "#home" : "/"}
                    onClick={(event) => {
                        if (isHome) {
                            event.preventDefault();
                            scrollToSection("#home");
                        }
                    }}
                    className="flex items-center gap-3 text-primary-theme"
                >
                    <span className="text-2xl font-black tracking-wide">DOMINASE</span>
                    <span className="hidden text-[10px] font-black uppercase tracking-[0.22em] text-muted sm:inline">
                        Digital Product Studio
                    </span>
                    <div className="mt-1 h-2 w-2 rounded-full bg-secondary-theme" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6 glass px-6 py-3 rounded-full">
                    {navItems.map((link) => {
                        const isActive = link.isRoute && pathname.startsWith(link.href);

                        if (link.isRoute) {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`font-medium transition-colors text-sm ${isActive ? "text-primary-theme font-bold" : "text-muted hover:text-primary-theme"}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        }

                        if (!isHome) {
                            return (
                                <Link
                                    key={link.label}
                                    href={`/${link.href}`}
                                    className="text-muted hover:text-primary-theme font-medium transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={link.label}
                                suppressHydrationWarning
                                onClick={() => scrollToSection(link.href)}
                                className="text-muted hover:text-primary-theme font-medium transition-colors text-sm"
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Actions Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
                        suppressHydrationWarning
                        aria-label="Switch language"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary-theme transition-colors text-xs font-bold text-primary-theme glass"
                    >
                        <Globe className="w-3 h-3" />
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    {isHome ? (
                        <button
                            onClick={() => scrollToSection("#contact")}
                            suppressHydrationWarning
                            className="btn-primary px-6 py-2.5 text-sm"
                        >
                            {t.nav.cta}
                        </button>
                    ) : (
                        <Link
                            href="/#contact"
                            className="btn-primary px-6 py-2.5 text-sm"
                        >
                            {t.nav.cta}
                        </Link>
                    )}
                </div>

                {/* Mobile Top Bar (Just Logo + Toggles) */}
                <div className="lg:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
                        suppressHydrationWarning
                        aria-label="Switch language"
                        className="p-2 rounded-full border border-border text-primary-theme glass"
                    >
                        <span className="text-xs font-bold">{language === "en" ? "AR" : "EN"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
