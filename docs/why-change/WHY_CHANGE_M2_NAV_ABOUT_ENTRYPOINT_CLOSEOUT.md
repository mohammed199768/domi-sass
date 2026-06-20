# WHY CHANGE M2 — Navigation + About Entry Point Closeout

## Summary

M2 connects /why-change to the primary site journey. The desktop header now exposes a bilingual, active-aware route link; the six-slot mobile navigation includes the same destination without increasing density; and the homepage About section now frames the website as the customer's decision point with a semantic CTA to the cinematic story.

## Files changed

- src/components/Header.tsx
- src/components/MobileNav.tsx
- src/constants/content.ts
- src/features/home/components/AboutSection.tsx
- tests/visual/why-change-entry.spec.ts
- Intentional homepage and /why-change visual baselines
- docs/why-change/WHY_CHANGE_M2_NAV_ABOUT_ENTRYPOINT_CLOSEOUT.md

## Nav link implementation

content.nav.whyChange defines “Why Change?” and “لماذا التغيير؟”. The desktop header treats /why-change exactly like /work: it renders a Next.js route link, works from home and internal routes, and inherits the existing active-state styling through pathname.startsWith.

Desktop navigation spacing was tightened from 32px gaps/32px horizontal padding to 24px gaps/24px padding so the seventh destination fits without changing the overall header treatment.

Mobile navigation remains at six items. The redundant #portfolio shortcut was replaced with /why-change, while the higher-value /work case-studies route remains. This avoids a seventh bottom-nav item and preserves Home, About, Expertise, Case Studies, and Contact access.

## About copy update

The old product-builder biography was replaced by a strategic three-part argument:

1. Customers complete a digital journey before trust or purchase.
2. A website converts attention into trust and action.
3. /why-change explains why this system matters for business growth.

The existing image, two-column hierarchy, sticky behavior, theme surfaces, and Framer Motion entrance remain unchanged. The copy is stored as a paragraph array so the diagnostic rhythm is preserved semantically rather than collapsed into a single text block.

## CTA route behavior

The former button called scrollToSection("#contact"). It is now a keyboard-accessible Next.js Link with href="/why-change". The CTA no longer uses a scroll helper, works after language changes, preserves focus-visible styling, and routes correctly from the homepage.

## Bilingual content

English:

- “A website is not a page. It is the decision point.”
- “Why does your company need a website?”

Arabic:

- “الموقع ليس صفحة. إنه نقطة القرار.”
- “لماذا تحتاج شركتك إلى موقع؟”

Both languages include the complete three-paragraph argument. Navigation and CTA labels update through the existing LanguageContext; no page-specific language state was introduced.

## Tests and validation

- Added focused coverage for the English and Arabic desktop nav labels and /why-change href.
- Verified the mobile nav exposes /why-change, remains at six total actions, and has no horizontal overflow at 390px.
- Verified English and Arabic About titles, diagnostic body copy, and CTA href.
- Verified /why-change still loads and remains overflow-safe on mobile.
- Existing /work desktop/mobile navigation tests continue to pass.
- npm run lint: passes with two pre-existing unused catch-variable warnings in LanguageContext.tsx.
- npx tsc --noEmit: passes.
- npm run build: passes; /why-change remains statically generated.
- Full Playwright suite: 72/72 passes.
- Only intentional homepage and /why-change snapshots were regenerated.
- Browser harness reported no console errors, page errors, or hydration warnings.

## Remaining risks

The mobile bottom nav intentionally no longer links directly to the homepage #portfolio gallery; visitors retain the fuller /work route. If product analytics later show strong dependence on the gallery shortcut, the mobile information architecture should be revisited rather than adding a seventh cramped item.

## Next recommended milestone

Instrument the Header, mobile-nav, About CTA, and Footer /why-change entry points with distinct analytics labels. That will show which narrative doorway is useful without altering the stable film or homepage design.

