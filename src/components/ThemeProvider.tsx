"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const pathname = usePathname();
    const forcedTheme = pathname === "/" ? "dark" : undefined;

    React.useEffect(() => {
        const root = document.documentElement;
        const storageKey = typeof props.storageKey === "string" ? props.storageKey : "theme";

        if (pathname === "/") {
            root.dataset.theme = "dark";
            return;
        }

        try {
            const savedTheme = window.localStorage.getItem(storageKey);
            root.dataset.theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
        } catch {
            root.dataset.theme = "dark";
        }
    }, [pathname, props.storageKey]);

    return (
        <NextThemesProvider {...props} forcedTheme={forcedTheme}>
            {children}
        </NextThemesProvider>
    );
}
