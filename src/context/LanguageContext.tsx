"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { content } from "@/constants/content";

type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof content.en;
    dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = "domi-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        let savedLanguage: string | null = null;
        try {
            savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch (e) {
            // Ignore if localStorage is disabled
        }
        
        if (savedLanguage !== "en" && savedLanguage !== "ar") return;

        // Keep the server and first client render identical, then restore the
        // visitor's explicit preference after hydration.
        const timer = window.setTimeout(() => setLanguage(savedLanguage as Language), 0);
        return () => window.clearTimeout(timer);
    }, []);

    const toggleLanguage = () => {
        setLanguage((prev) => {
            const nextLanguage = prev === "en" ? "ar" : "en";
            try {
                window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
            } catch (e) {
                // Ignore
            }
            return nextLanguage;
        });
    };

    const t = content[language];
    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
            <div dir={dir} className={language === "ar" ? "font-sans-ar" : "font-sans"}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
