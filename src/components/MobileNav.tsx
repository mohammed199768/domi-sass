"use client";

import React from "react";
import { Briefcase, CircleHelp, Layers, Library, Mail, Quote, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getNavItemHref, getNavItemLabel, isNavItemActive, NAV_ITEMS, type NavItem } from "./navConfig";

const navIcons: Record<NavItem["id"], React.ComponentType<{ className?: string }>> = {
    services: Layers,
    portfolio: Briefcase,
    "why-change": CircleHelp,
    "why-us": Sparkles,
    "case-studies": Library,
    testimonials: Quote,
    contact: Mail,
};

export default function MobileNav() {
    const { t } = useLanguage();
    const pathname = usePathname();

    const isHome = pathname === "/";

    // Hide only on specific case study pages, not the /work index
    if (pathname.startsWith("/work/")) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe transition-colors duration-300">
            <nav className="glass grid grid-cols-7 items-center gap-1 rounded-t-[2rem] border-t border-border bg-surface/92 px-2 pb-8 pt-4 shadow-[0_-8px_28px_rgba(0,0,0,0.08)]">
                {NAV_ITEMS.map((item) => {
                    const Icon = navIcons[item.id];
                    const label = getNavItemLabel(t.nav, item);
                    const href = getNavItemHref(item, isHome);
                    const isActive = isNavItemActive(item, pathname);
                    const itemClassName = `flex min-w-0 flex-col items-center gap-1 transition-colors ${isActive ? "text-primary-theme font-bold" : "text-muted hover:text-primary-theme"}`;

                    if (item.kind === "route") {
                        return (
                            <Link
                                key={item.id}
                                href={href}
                                aria-label={label}
                                className={itemClassName}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-center text-[9px] font-medium">{label}</span>
                            </Link>
                        );
                    }

                    if (!isHome) {
                        return (
                            <Link
                                key={item.id}
                                href={href}
                                aria-label={label}
                                className={itemClassName}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-center text-[9px] font-medium">{label}</span>
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            suppressHydrationWarning
                            onClick={() => scrollToSection(item.href)}
                            aria-label={label}
                            className={itemClassName}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-center text-[9px] font-medium">{label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
