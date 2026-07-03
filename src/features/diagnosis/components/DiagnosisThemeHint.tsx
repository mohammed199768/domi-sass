"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "dominase-diagnosis-theme-hint-seen";

export default function DiagnosisThemeHint({ isArabic }: { isArabic: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage may be unavailable; keep the hint non-blocking either way.
    }

    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const hideTimer = window.setTimeout(() => setVisible(false), 6500);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed end-4 top-[5.75rem] z-40 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-primary-theme/30 bg-surface px-4 py-3 text-sm font-semibold leading-7 text-foreground shadow-[0_24px_80px_-52px_var(--cool-shadow)] transition-[opacity,transform] duration-200 sm:end-6 sm:top-24"
    >
      <div className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-theme" aria-hidden="true" />
        <p className="flex-1">
          {isArabic
            ? "يمكنك تبديل وضع العرض من زر الثيم العائم قرب زر واتساب."
            : "You can switch light/dark mode from the floating theme button near WhatsApp."}
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label={isArabic ? "إغلاق التنبيه" : "Close theme hint"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
