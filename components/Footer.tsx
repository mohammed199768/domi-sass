"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8 mb-8">
                    {/* Logo/Brand */}
                    <div className="text-3xl font-bold flex items-center gap-2">
                        <span>domi</span>
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-gray-400">
                        {t.footer.rights}
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        {t.footer.links.map((link, index) => (
                            <a key={index} href="#" className="hover:text-secondary transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
