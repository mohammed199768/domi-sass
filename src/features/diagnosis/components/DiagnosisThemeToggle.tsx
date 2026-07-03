"use client";

/**
 * DiagnosisThemeToggle - a compact, diagnosis-scoped light/dark control.
 *
 * It drives the existing next-themes context only. No separate theme state is
 * introduced, so the homepage fixed-dark guard and the rest of the site keep
 * their current behavior.
 */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DiagnosisThemeToggle({ isArabic }: { isArabic: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <span aria-hidden="true" className="inline-block h-11 w-[6.25rem]" />;
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const currentLabel = isArabic ? (isDark ? "داكن" : "فاتح") : isDark ? "Dark" : "Light";
  const ariaLabel = isArabic
    ? nextTheme === "light"
      ? "التبديل إلى الوضع الفاتح"
      : "التبديل إلى الوضع الداكن"
    : `Switch to ${nextTheme} theme`;

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(nextTheme)}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary-theme/35 bg-surface px-3.5 py-2 text-sm font-extrabold text-foreground shadow-[0_14px_40px_-30px_var(--cool-shadow)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5 hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
    >
      {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      <span>{currentLabel}</span>
    </button>
  );
}
