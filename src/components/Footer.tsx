"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin, Briefcase } from "lucide-react";

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="border-t border-border bg-surface-muted px-5 py-12 text-foreground transition-colors duration-300 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col items-center justify-between gap-8 border-b border-border pb-8 md:flex-row">
                    {/* Logo/Brand */}
                    <div className="flex flex-col items-center gap-1 text-primary-theme md:items-start">
                        <div className="font-display flex items-center gap-2 text-3xl font-black tracking-wide">
                            <span>DOMINASE</span>
                            <div className="mt-2 h-2 w-2 rounded-full bg-secondary-theme" />
                        </div>
                        <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-muted">
                            Digital Product Studio
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-3">
                        <a
                            href="https://github.com/mohammed199768"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="premium-surface premium-interactive flex h-11 w-11 items-center justify-center rounded-full text-muted hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.upwork.com/freelancers/~012bcb31d6467e2e71?mp_source=share"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Upwork"
                            className="premium-surface premium-interactive flex h-11 w-11 items-center justify-center rounded-full text-muted hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                        >
                            <Briefcase className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mohammed199768"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="premium-surface premium-interactive flex h-11 w-11 items-center justify-center rounded-full text-muted hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="text-center text-sm leading-6 text-muted md:text-start">
                        {t.footer.rights}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
                        <Link href="/why-us" className="premium-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme">
                            {language === "ar" ? "لماذا نحن؟" : "Why Us?"}
                        </Link>
                        <Link href="/why-change" className="premium-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme">
                            {language === "ar" ? "لماذا التغيير؟" : "Why Change?"}
                        </Link>
                        {t.footer.links.map((link, index) => (
                            <a key={index} href="#" className="premium-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
