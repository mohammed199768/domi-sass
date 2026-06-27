"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin, Briefcase } from "lucide-react";

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-surface-muted text-foreground py-12 px-6 border-t border-border transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-border pb-8 mb-8">
                    {/* Logo/Brand */}
                    <div className="flex flex-col items-center gap-1 text-primary-theme md:items-start">
                        <div className="flex items-center gap-2 text-3xl font-black tracking-wide">
                            <span>DOMINASE</span>
                            <div className="mt-2 h-2 w-2 rounded-full bg-secondary-theme" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                            Digital Product Studio
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/mohammed199768"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:border-primary-theme hover:bg-primary-theme hover:text-background transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.upwork.com/freelancers/~012bcb31d6467e2e71?mp_source=share"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Upwork"
                            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:border-primary-theme hover:bg-primary-theme hover:text-background transition-colors"
                        >
                            <Briefcase className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mohammed199768"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:border-primary-theme hover:bg-primary-theme hover:text-background transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-muted">
                        {t.footer.rights}
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <Link href="/why-us" className="text-muted hover:text-secondary-theme transition-colors">
                            {language === "ar" ? "لماذا نحن؟" : "Why Us?"}
                        </Link>
                        <Link href="/why-change" className="text-muted hover:text-secondary-theme transition-colors">
                            {language === "ar" ? "لماذا التغيير؟" : "Why Change?"}
                        </Link>
                        {t.footer.links.map((link, index) => (
                            <a key={index} href="#" className="text-muted hover:text-secondary-theme transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
