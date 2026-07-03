export const NAV_ITEMS = [
    { id: "services", labelKey: "services", href: "#services", kind: "section" },
    { id: "portfolio", labelKey: "portfolio", href: "#portfolio", kind: "section" },
    { id: "why-change", labelKey: "whyChange", href: "/why-change", kind: "route" },
    { id: "why-us", labelKey: "whyUs", href: "/why-us", kind: "route" },
    { id: "case-studies", labelKey: "caseStudies", href: "/work", kind: "route" },
    { id: "diagnosis", labelKey: "diagnosis", href: "/diagnosis", kind: "route" },
    { id: "testimonials", labelKey: "testimonials", href: "#testimonials", kind: "section" },
    { id: "contact", labelKey: "contact", href: "/contact", kind: "route" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavLabelKey = NavItem["labelKey"];
export type NavLabels = Record<NavLabelKey, string>;

export function getNavItemLabel(nav: NavLabels, item: NavItem) {
    return nav[item.labelKey];
}

export function getNavItemHref(item: NavItem, isHome: boolean) {
    if (item.kind === "route" || isHome) {
        return item.href;
    }

    return `/${item.href}`;
}

export function isNavItemActive(item: NavItem, pathname: string) {
    return item.kind === "route" && pathname.startsWith(item.href);
}
