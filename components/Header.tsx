"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { Globe, Menu, X } from "lucide-react";

export default function Header() {
    const { t, language, toggleLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: t.nav.about, href: "#about" },
        { label: t.nav.services, href: "#services" },
        { label: t.nav.portfolio, href: "#portfolio" },
        { label: t.nav.testimonials, href: "#testimonials" },
        { label: t.nav.contact, href: "#contact" },
    ];

    const scrollTo = (href: string) => {
        setMobileMenuOpen(false);
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
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-gray-600 hover:text-primary font-medium transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary transition-colors text-sm font-semibold text-primary"
                    >
                        <Globe className="w-4 h-4" />
                        {language === "en" ? "عربي" : "English"}
                    </button>
                    <button
                        onClick={() => scrollTo("#contact")}
                        className="bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
                    >
                        {t.nav.cta}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-full border border-gray-200 text-primary"
                    >
                        <span className="text-xs font-bold">{language === "en" ? "AR" : "EN"}</span>
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-primary"
                    >
                        {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 lg:hidden p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-left text-lg font-medium text-gray-700 hover:text-primary py-2"
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo("#contact")}
                        className="bg-primary text-white w-full py-3 rounded-lg font-bold text-center mt-2"
                    >
                        {t.nav.cta}
                    </button>
                </div>
            )}
        </header>
    );
}
