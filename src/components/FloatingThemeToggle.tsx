"use client";

/**
 * FloatingThemeToggle — the only theme control on the site.
 *
 * Appears exclusively on internal pages that support Dark/Light:
 * /contact, /why-change, /why-us, /work (incl. case studies, which have
 * always shown theme support). Never rendered on `/` — the homepage stays
 * forced-dark and its regression guard is untouched: this component only
 * calls next-themes `setTheme`, exactly like the old header toggle did, so
 * `dominase-theme` persistence behaves identically.
 *
 * Motion: opacity/transform transitions only. No backdrop-filter, no blur.
 */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const THEME_TOGGLE_ROUTES = ["/contact", "/why-change", "/why-us", "/work"];

export default function FloatingThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const { language } = useLanguage();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Deferred to avoid hydration mismatch (same pattern as the old toggle).
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const allowed = THEME_TOGGLE_ROUTES.some((route) => pathname.startsWith(route));
    if (pathname === "/" || !allowed) {
        return null;
    }
    if (!mounted) {
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
            className="fixed right-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-primary-theme shadow-[0_18px_50px_-24px_var(--cool-shadow)] ring-1 ring-transparent transition-[transform,border-color,box-shadow] duration-200 hover:border-primary-theme hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:translate-y-0"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.75rem)" }}
        >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
