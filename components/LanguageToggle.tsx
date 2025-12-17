"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-full border-2 border-gray-200 hover:border-primary transition-all duration-300"
            aria-label="Toggle language"
        >
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">
                {language === "en" ? "عربي" : "EN"}
            </span>
        </motion.button>
    );
}
