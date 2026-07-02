"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Use setTimeout to avoid synchronous setState warning (avoids cascading render logic)
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (pathname === "/") {
        return null;
    }

    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder to avoid hydration mismatch
    }

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            suppressHydrationWarning
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/90 text-primary-theme transition-colors hover:border-primary-theme hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Switch to ${nextTheme} theme`}
        >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
