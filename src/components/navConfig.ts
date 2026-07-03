export const NAV_ITEMS = [
    { id: "home", labelKey: "home", href: "/" },
    { id: "work", labelKey: "portfolio", href: "/work" },
    { id: "diagnosis", labelKey: "diagnosis", href: "/diagnosis" },
    { id: "why-change", labelKey: "whyChange", href: "/why-change" },
    { id: "why-us", labelKey: "whyUs", href: "/why-us" },
    { id: "contact", labelKey: "contact", href: "/contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavLabelKey = NavItem["labelKey"];
export type NavLabels = Record<NavLabelKey, string>;

export function getNavItemLabel(nav: NavLabels, item: NavItem) {
    return nav[item.labelKey];
}

export function isNavItemActive(item: NavItem, pathname: string) {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
}
