"use client";

/**
 * MobileNav — premium app-style navigation panel (mobile / tablet only).
 *
 * A single centered trigger pill opens a rounded, layered panel with four
 * text-first destinations: Home, Contact, Why Change, Why Us. No icon noise,
 * no sparkles — just typography, a small active dot, and generous thumb rows.
 *
 * Motion: opacity + transform transitions only (no backdrop-filter, no blur,
 * no keyframe loops). The global reduced-motion rule in globals.css collapses
 * every transition to ~0ms, so reduced motion is respected automatically.
 *
 * A11y: trigger has aria-expanded/aria-controls; Escape closes and restores
 * focus to the trigger; the scrim is a real button; focus states are visible.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = [
    { id: "home", href: "/" },
    { id: "contact", href: "/contact" },
    { id: "why-change", href: "/why-change" },
    { id: "why-us", href: "/why-us" },
] as const;

export default function MobileNav() {
    const pathname = usePathname();

    return <MobileNavInner key={pathname} pathname={pathname} />;
}

function MobileNavInner({ pathname }: { pathname: string }) {
    const { t, language } = useLanguage();
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const labels: Record<(typeof NAV_LINKS)[number]["id"], string> = {
        home: t.nav.home,
        contact: t.nav.contact,
        "why-change": t.nav.whyChange,
        "why-us": t.nav.whyUs,
    };

    // Escape closes the panel and returns focus to the trigger.
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

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <div className="mobile-nav-shell min-[1025px]:hidden">
            {/* Scrim — solid color at low opacity (no backdrop-filter). */}
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

            {/* App panel */}
            <nav
                id="mobile-nav-panel"
                aria-label={menuLabel}
                aria-hidden={!open}
                inert={!open}
                className={`fixed inset-x-4 z-50 mx-auto max-w-sm rounded-[1.9rem] border border-border bg-surface p-2.5 shadow-[0_28px_80px_-32px_var(--cool-shadow)] transition-[opacity,transform] duration-300 ease-out ${
                    open
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-5 scale-[0.97] opacity-0"
                }`}
                style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
            >
                <div className="rounded-[1.45rem] border border-border bg-surface-hover p-1.5">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        tabIndex={open ? 0 : -1}
                                        aria-current={active ? "page" : undefined}
                                        className={`flex min-h-13 items-center justify-between gap-4 rounded-[1.1rem] px-5 py-3.5 text-base font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme ${
                                            active
                                                ? "bg-surface text-primary-theme"
                                                : "text-foreground hover:bg-surface hover:text-primary-theme"
                                        }`}
                                    >
                                        <span>{labels[item.id]}</span>
                                        <span
                                            aria-hidden="true"
                                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                                                active ? "bg-secondary-theme" : "bg-border"
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Trigger pill — bottom center, clear of the corner floating actions. */}
            <button
                ref={triggerRef}
                type="button"
                suppressHydrationWarning
                aria-label={open ? closeLabel : menuLabel}
                aria-expanded={open}
                aria-controls="mobile-nav-panel"
                onClick={() => setOpen((v) => !v)}
                className="fixed inset-x-0 z-50 mx-auto flex h-12 w-fit items-center gap-3 rounded-full border border-border bg-surface px-6 font-display text-xs font-black uppercase tracking-[0.22em] text-foreground shadow-[0_18px_50px_-24px_var(--cool-shadow)] transition-[transform,border-color,color] duration-200 hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:scale-95"
                style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
            >
                {/* Minimal two-line mark that folds into an X (transform only). */}
                <span aria-hidden="true" className="relative block h-3 w-4">
                    <span
                        className={`absolute left-0 top-0.5 block h-px w-4 bg-current transition-transform duration-200 ${
                            open ? "translate-y-[4.5px] rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`absolute bottom-0.5 left-0 block h-px w-4 bg-current transition-transform duration-200 ${
                            open ? "-translate-y-[4.5px] -rotate-45" : ""
                        }`}
                    />
                </span>
                {menuLabel}
            </button>
        </div>
    );
}
