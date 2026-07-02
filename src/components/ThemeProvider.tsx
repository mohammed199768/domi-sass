"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const pathname = usePathname();
    const forcedTheme = pathname === "/" ? "dark" : undefined;

    return (
        <NextThemesProvider {...props} forcedTheme={forcedTheme}>
            {children}
        </NextThemesProvider>
    );
}
