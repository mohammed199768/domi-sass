# Case Studies M4 — Visual Theme Registry Closeout

## Summary

Refactored the two proven production case studies into a shared contract, shared panel layer, tunable journey orchestration, and exhaustive visual-theme registry. Manal and Qasr retain their existing content, routes, visual treatments, SVGs, responsive behavior, and motion outcomes. No new case study, dependency, homepage change, or portfolio behavior change was introduced.

## Files changed

- `src/features/case-studies/contracts.ts`: shared data contracts.
- `src/features/case-studies/themeRegistry.tsx`: visual-theme registry and theme-specific intro renderers.
- `src/features/case-studies/caseStudyJourneyConfig.ts`: shared pacing and breakpoint configuration.
- `src/features/case-studies/CaseStudyPanels.tsx`: shared chapter panel renderers.
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx`: reduced to route-level controls, track orchestration, and SVG timing.
- `src/constants/caseStudies.ts`: now imports the shared contract instead of defining types beside content.
- `src/context/LanguageContext.tsx`: safely remembers an explicit language choice after hydration.
- `docs/case-studies/CASE_STUDIES_M4_VISUAL_THEME_REGISTRY_CLOSEOUT.md`: this document.

## What was abstracted

- Bilingual case-study, content, feature, screenshot, SEO, and visual-theme types.
- The seven shared chapter layouts: intro, before, transformation, after, storyboard, features, and result.
- Horizontal pinning, measured track translation, progress, transformation-scene timing, cleanup, mobile fallback, and reduced-motion behavior.
- Safe pacing values for desktop media query, panel width documentation, gap, scroll-distance multiplier, track scrub, and visual scrub.
- Theme lookup from a single registry instead of conditionals inside shared panels.

## What stayed project-specific

- `TrainingPlatformSvg` and `WeddingBookingSvg` remain independent illustrations.
- Manal’s dashboard-style intro visual and Qasr’s arched hall/cover visual remain separate registry renderers.
- Theme-specific before/transformation frame shapes remain registry configuration.
- Story content, screenshots, presentation modes, SEO, and bilingual copy remain in data.

## Visual theme registry design

`caseStudyThemeRegistry` is an exhaustive record keyed by `CaseStudyVisualTheme`. Every entry supplies an intro renderer, transformation renderer, and the small frame-class differences required by shared panels. Adding a future theme requires extending the visual-theme union and satisfying the registry, so TypeScript reports a missing renderer at build time. The registry never branches on a project slug.

## Data contract changes

Types moved from `caseStudies.ts` into `contracts.ts`; the runtime data shape did not change. The contract remains intentionally small: slug, visual theme, cover, SEO, and bilingual content containing intro, before, transformation, after, storyboard, features, result, CTA, and chapter labels. No speculative CMS fields or universalized SVG schema were added.

## Language direct-visit finding

The global provider still uses English for server rendering and the first client render, which avoids hydration mismatch. A small safe improvement now stores an explicit `en` or `ar` choice in local storage and restores it immediately after hydration on future direct visits. This improves repeat visits but does not create shareable locale URLs or set the root document language. Proper first-request locale semantics still require a future `/en/...` and `/ar/...` routing decision.

## Ultra-wide pacing notes

The existing journey remains one viewport per panel with no gap. `caseStudyJourneyConfig` exposes the `1024px` desktop query, documented `100vw` panel width, zero panel gap, scroll-distance multiplier, `0.8` track scrub, and `0.7` visual scrub. Current values preserve the shipped experience. The scroll-distance multiplier provides a controlled future pacing adjustment without changing translation geometry.

## Validation results

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- Static routes preserved: `/work/manal-alhihi` and `/work/qasr-alfarah`
- Required routes returned HTTP 200
- Unknown work slug returned HTTP 404
- Desktop QA: both seven-panel tracks pin and translate at the original dimensions; correct theme SVG selected for each route
- English/Arabic and light/dark switching passed
- Persisted-language direct-visit check passed without hydration warnings
- Mobile QA at `390 × 844`: stacked chapters, final SVG state, and no horizontal overflow
- Reduced-motion QA: no pin spacer and complete static visual state
- Storyboard assets loaded without broken images
- Portfolio modal routes remained Manal/Qasr only
- Browser console reported no application errors, warnings, or hydration messages

The build retains the repository’s existing non-blocking warnings for stale `baseline-browser-mapping` data and missing root `metadataBase`.

## Remaining risks

- Language restoration occurs after hydration, so a returning Arabic visitor may briefly see the English first render.
- Root `<html lang>` remains English; main case-study content carries the correct local language and direction.
- The visual-theme union is intentionally closed and requires a code change for each new visual system.
- Automated visual-regression coverage remains absent.

## Recommended next milestone

Add automated browser screenshot coverage for both themes across English/Arabic, light/dark, desktop/mobile, and reduced motion. After that safety net exists, decide whether locale-prefixed routes are worth introducing before building a third case study.
