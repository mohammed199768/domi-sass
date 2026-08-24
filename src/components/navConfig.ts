export const NAV_ITEMS = [
    { id: "home", labelKey: "home", href: "/" },
    { id: "work", labelKey: "portfolio", href: "/work" },
    { id: "services", labelKey: "services", href: "/services" },
    { id: "studio", labelKey: "studio", href: "/studio" },
    { id: "insights", labelKey: "insights", href: "/insights" },
    { id: "about", labelKey: "about", href: "/about" },
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
