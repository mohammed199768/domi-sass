"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_ITEMS, getNavItemLabel } from "./navConfig";
import { useConsultation } from "@/components/consultation/ConsultationProvider";

export default function MobileNav() {
  const pathname = usePathname();
  return <MobileNavInner key={pathname} pathname={pathname} />;
}

function MobileNavInner({ pathname }: { pathname: string }) {
  const { t, language } = useLanguage();
  const { openConsultation } = useConsultation();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const menuLabel = language === "ar" ? "القائمة" : "Menu";
  const closeLabel = language === "ar" ? "إغلاق القائمة" : "Close menu";
  const contactLabel = language === "ar" ? "احجز استشارة" : "Book a consultation";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="mobile-nav-shell min-[1025px]:hidden">
      <button
        type="button"
        suppressHydrationWarning
        aria-label={closeLabel}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--domi-bg)_62%,transparent)] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        id="mobile-nav-panel"
        aria-label={menuLabel}
        aria-hidden={!open}
        inert={!open}
        className={`premium-surface fixed inset-x-4 z-50 mx-auto max-w-sm rounded-[1.75rem] p-2.5 transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-[0.97] opacity-0"
        }`}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
      >
        <div className="rounded-[1.25rem] border border-border bg-surface-hover p-1.5">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between gap-4 rounded-2xl px-5 py-3 text-[15px] font-bold transition-[background-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:scale-[0.99] ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface))] text-primary-theme"
                        : "text-foreground hover:bg-surface hover:text-primary-theme"
                    }`}
                  >
                    <span>{getNavItemLabel(t.nav, item)}</span>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${active ? "bg-secondary-theme" : "bg-border"}`}
                    />
                  </Link>
                </li>
              );
            })}
            <li className="mt-1 border-t border-border pt-1">
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                  window.setTimeout(() => openConsultation({ ctaLocation: "mobile_navigation", originType: "global_navigation" }), 0);
                }}
                className="flex min-h-12 items-center justify-between rounded-2xl bg-primary-theme px-5 py-3 text-[15px] font-black text-[var(--primary-contrast)]"
              >
                <span>{contactLabel}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <button
        ref={triggerRef}
        type="button"
        suppressHydrationWarning
        aria-label={open ? closeLabel : menuLabel}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="premium-surface domi-setting-control fixed inset-x-0 z-50 mx-auto flex h-12 w-fit items-center gap-3 px-6 font-display text-xs font-black uppercase tracking-[0.18em] text-foreground transition-[transform,border-color,color] duration-200 hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:scale-[0.98]"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span className={`absolute left-0 top-0.5 block h-px w-4 bg-current transition-transform duration-200 ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
          <span className={`absolute bottom-0.5 left-0 block h-px w-4 bg-current transition-transform duration-200 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
        </span>
        {menuLabel}
      </button>
    </div>
  );
}
