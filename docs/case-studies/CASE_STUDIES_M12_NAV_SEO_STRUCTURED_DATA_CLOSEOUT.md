# CASE STUDIES M12 — NAVIGATION + SEO STRUCTURED DATA CLOSEOUT

## Summary
The M12 milestone successfully adds a first-class `/work` route to the site navigation (desktop and mobile) and injects safe JSON-LD structured data into the case-study index and individual project pages, ensuring better SEO representation without redesigning or breaking existing behaviors.

## Files Changed
- `src/components/Header.tsx`: Added the `/work` link ("Case Studies") to the desktop navigation. Implemented safe route linking vs hash linking logic to preserve `#home` anchor behavior for non-home routes.
- `src/components/MobileNav.tsx`: Added the "Case Studies" route link with the `Library` icon to the bottom mobile navigation. Kept the nav visible on the `/work` index but hidden inside individual `/work/[slug]` case study journeys.
- `src/constants/content.ts`: Added localization for the new nav link under `nav.caseStudies` for both `en` and `ar`.
- `src/app/work/page.tsx`: Injected a `<script type="application/ld+json">` tag generating a `CollectionPage` schema with an `ItemList` of the four case studies.
- `src/app/work/[slug]/page.tsx`: Injected a `<script type="application/ld+json">` tag generating a `CreativeWork` schema using the respective case study's title, positioning (description), author (Mohammed Aldomi), and visual theme (keywords).
- `tests/visual/m12.spec.ts`: Added lightweight Playwright navigation and SEO script assertion tests.

## Navigation Changes
- **Desktop**: Added "Case Studies" alongside "Work" in the primary navigation bar.
- **Mobile**: Added the `Library` icon tab to the `MobileNav`. It properly links to the `/work` index.
- **Active State Handling**: Active routes (`isRoute`) render as `<Link>` tags with bold `text-primary-theme`. Hash routes (`#about`, etc.) render as standard links pointing to `/#about` from `/work` to ensure they navigate correctly.

## `/work` Structured Data
- Standard `CollectionPage` with an `ItemList`.
- Explicitly lists URLs to `/work/manal-alhihi`, `/work/qasr-alfarah`, `/work/curevie`, and `/work/horvath-survey`.
- Provides context for the `/work` collection without fabricating reviews, ratings, or prices.

## Case-Study Structured Data
- Individual case-study journeys generate `CreativeWork` schemas.
- Maps `study.content.en.title` as `name` and `study.content.en.positioning` as `description`.
- Declares the creator as a `Person` named `Mohammed Aldomi`.

## Metadata Notes
- The default `metadata` exported from `/work` and `[slug]` pages is preserved. The JSON-LD script is added to the DOM separately using `dangerouslySetInnerHTML`.
- Next.js successfully compiles and prerenders the static pages cleanly.

## Tests Added/Updated
- Playwright tests created in `tests/visual/m12.spec.ts` testing:
  - Header desktop `/work` visibility.
  - Mobile nav `/work` visibility.
  - Presence of all 4 links and JSON-LD on `/work`.
  - JSON-LD instantiation on `/work/[slug]`.
- Existing visual snapshots updated using `npm run test:visual:update` to cover the new header/mobile nav item.

## Validation Results
- `npm run lint`: Passed (resolved initial syntax error due to duplicated export).
- `npx tsc --noEmit`: Passed.
- `npm run build`: Passed cleanly, `app/work` and `app/work/[slug]` prerendered successfully.
- `npm run test:visual`: Passed (new baseline images accommodate the extra nav item).

## Remaining Risks
- The bottom mobile navigation tab bar contains 6 items, which fits tightly on narrow devices.
- `metadataBase` is not defined in the Next.js `layout.tsx`, producing build-time warnings for OpenGraph.

## Next Recommended Milestone
- Define global `metadataBase` to remove OpenGraph compilation warnings and provide robust social image rendering.
- Consider M13 for any additional global structural or content-level polish.
