"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";
import * as React from "react";

const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function getStoredTheme(storageKey: string) {
    try {
        const savedTheme = window.localStorage.getItem(storageKey);
        return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch {
        return null;
    }
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const pathname = usePathname();
    const isHomeRoute = pathname === "/";
    const forcedTheme = isHomeRoute ? "dark" : undefined;
    const storageKey = typeof props.storageKey === "string" ? props.storageKey : "theme";

    useIsomorphicLayoutEffect(() => {
        const root = document.documentElement;
        const applyHomeTheme = () => {
            if (root.dataset.theme !== "dark") {
                root.dataset.theme = "dark";
            }
        };

        if (isHomeRoute) {
            applyHomeTheme();

            const observer = new MutationObserver(applyHomeTheme);
            observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

            return () => observer.disconnect();
        }

        root.dataset.theme = getStoredTheme(storageKey) ?? "dark";
    }, [isHomeRoute, storageKey]);

    return (
        <NextThemesProvider {...props} forcedTheme={forcedTheme}>
            {children}
        </NextThemesProvider>
    );
}
