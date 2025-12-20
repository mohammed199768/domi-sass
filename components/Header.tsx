"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="#" className="font-bold text-2xl text-primary flex items-center gap-2">
                    <span className="text-3xl">domi</span>
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 glass px-8 py-3 rounded-full">
                    {navItems.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors text-sm"
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
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 hover:border-primary transition-colors text-xs font-bold text-primary dark:text-white glass"
                    >
                        <Globe className="w-3 h-3" />
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    <button
                        onClick={() => scrollTo("#contact")}
                        className="bg-primary dark:bg-primary-dark text-white dark:text-gray-900 px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 text-sm"
                    >
                        {t.nav.cta}
                    </button>
                </div>

                {/* Mobile Top Bar (Just Logo + Toggles) */}
                <div className="lg:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-primary dark:text-white glass"
                    >
                        <span className="text-xs font-bold">{language === "en" ? "AR" : "EN"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

