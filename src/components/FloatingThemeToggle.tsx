"use client";

/**
 * FloatingThemeToggle - the site's persistent internal-page theme control.
 *
 * It is never rendered on `/`, so the homepage fixed-dark behavior remains
 * untouched. It uses the existing next-themes `dominase-theme` state only.
 */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const THEME_TOGGLE_ROUTES = ["/contact", "/why-change", "/why-us", "/work", "/diagnosis"];

export default function FloatingThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const { language } = useLanguage();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const allowed = THEME_TOGGLE_ROUTES.some((route) => pathname.startsWith(route));
    if (pathname === "/" || !allowed || !mounted) {
        return null;
    }

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const label =
        language === "ar"
            ? nextTheme === "light"
                ? "التبديل إلى الوضع الفاتح"
                : "التبديل إلى الوضع الداكن"
            : `Switch to ${nextTheme} theme`;

    return (
        <button
            type="button"
            suppressHydrationWarning
            onClick={() => setTheme(nextTheme)}
            aria-label={label}
            title={label}
            className="fixed right-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-primary-theme shadow-[0_18px_50px_-24px_var(--cool-shadow)] ring-1 ring-transparent transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:translate-y-0"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.75rem)" }}
        >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
