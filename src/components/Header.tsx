"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/lib/motion/scrollToSection";

export default function Header() {
    const { t, language, toggleLanguage } = useLanguage();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: t.nav.about, href: "#about" },
        { label: t.nav.services, href: "#services" },
        { label: t.nav.portfolio, href: "#portfolio" },
        { label: t.nav.testimonials, href: "#testimonials" },
        { label: t.nav.contact, href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface/80 backdrop-blur-lg border-b border-border shadow-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="#home"
                    onClick={(event) => {
                        event.preventDefault();
                        scrollToSection("#home");
                    }}
                    className="font-bold text-2xl text-primary-theme flex items-center gap-2"
                >
                    <span className="text-3xl">Domi</span>
                    <div className="w-2 h-2 rounded-full bg-secondary-theme mt-2"></div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 glass px-8 py-3 rounded-full">
                    {navItems.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollToSection(link.href)}
                            className="text-muted hover:text-primary-theme font-medium transition-colors text-sm"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Actions Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
                        aria-label="Switch language"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary-theme transition-colors text-xs font-bold text-primary-theme glass"
                    >
                        <Globe className="w-3 h-3" />
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    <button
                        onClick={() => scrollToSection("#contact")}
                        className="bg-primary-theme text-background px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-primary-theme/20 text-sm"
                    >
                        {t.nav.cta}
                    </button>
                </div>

                {/* Mobile Top Bar (Just Logo + Toggles) */}
                <div className="lg:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
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
