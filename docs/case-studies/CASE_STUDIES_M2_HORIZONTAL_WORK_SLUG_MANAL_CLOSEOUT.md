# Case Studies M2 — Horizontal `/work/[slug]` Manal Closeout

## Summary

Implemented the first production, data-driven case-study route at `/work/manal-alhihi`. On desktop, seven full-width chapters form one pinned horizontal journey controlled by vertical scrolling. Tablet, mobile, and reduced-motion experiences use a readable vertical flow. The route supports the site language and theme contexts without changing the homepage design or removing either experimental lab.

## Files created

- `src/constants/caseStudies.ts`
- `src/app/work/[slug]/page.tsx`
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx`
- `src/features/case-studies/TrainingPlatformSvg.tsx`
- `docs/case-studies/CASE_STUDIES_M2_HORIZONTAL_WORK_SLUG_MANAL_CLOSEOUT.md`

## Files changed

- `src/features/home/components/ProjectShowcaseModal.tsx`: added the Manal-only full case-study CTA and removed manual image preload tags that caused browser warnings.
- `src/components/MobileNav.tsx`: hides homepage-only anchor navigation on `/work/*` routes.

## Data model

`caseStudies.ts` defines typed localized content, features, and screenshot records. Each study has a slug, visual theme, and complete `en`/`ar` content branches. The route reads this record for static params, metadata, and rendering. No fake metrics or outcome claims were introduced.

## Bilingual content strategy

The server passes the complete serializable study record into a small client renderer. The renderer reads the existing `LanguageContext`, selects the matching content branch, and applies `lang`, RTL/LTR direction, and the appropriate font at the main-content level. The horizontal track remains technically LTR so its geometry is stable; each panel independently adopts the selected content direction. Language changes preserve the user’s horizontal journey position.

## Horizontal journey architecture

The journey contains seven panel divs: introduction, before, transformation, after, storyboard, feature system, and result. At desktop widths, the track is `7 × 100vw`; ScrollTrigger pins the viewport and translates the track by its measured overflow distance. A non-interactive progress line reflects scroll progress. Focus remains in normal DOM order, and the movement does not introduce a focus trap.

## GSAP and ScrollTrigger behavior

The shared GSAP registration and existing Lenis-to-ScrollTrigger bridge are reused. Distances are function-based and invalidated on refresh. All motion is scoped with `gsap.context()` and reverted when the viewport or motion preference changes. No dependency was added, and Anime.js is not used.

## SVG transformation behavior

The transformation panel reuses the motion-lab concept with simple SVG nodes, paths, course modules, attendance dots, and a central dashboard. On desktop, nodes converge, dots align, and connection lines draw as the transformation chapter enters the horizontal viewport. The SVG is decorative and marked `aria-hidden`; its meaning is repeated in adjacent text. Mobile and reduced-motion modes render the final organized state directly.

## Desktop, tablet, and mobile behavior

- Desktop (`>=1024px`): pinned horizontal journey with seven viewport-wide chapters.
- Tablet and mobile: normal vertical chapters with no pinning, horizontal scroll, or scroll trap.
- Browser QA at `390 × 844` confirmed all seven panels, contained SVG sizing, hidden homepage mobile navigation, and no horizontal overflow.

## Light and dark mode behavior

The page uses the existing background, surface, foreground, border, primary, secondary, and muted tokens. Browser QA confirmed token-driven background, foreground, card, SVG, and accent changes in both light and dark modes. No case-study-specific brand palette was added.

## Portfolio link behavior

Only the Manal project modal renders a full case-study link. Its copy is `View full case study` in English and `عرض دراسة الحالة الكاملة` in Arabic. Client navigation preserves the active language, closes the modal through route unmounting, and restores body scrolling. Other project modal behavior remains unchanged.

## SEO and accessibility notes

The dynamic route uses `generateStaticParams`, `generateMetadata`, and `notFound()`. Metadata describes the training-platform transformation without metrics. The page uses one H1, semantic chapter headings, screenshot alt text, local language/direction attributes, readable copy outside the SVG, labeled theme/language controls, and links rather than scripted navigation for route changes.

## Validation results

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed; `/work/manal-alhihi` is statically generated
- Required route smoke tests: HTTP 200 for `/`, `/motion-lab`, `/case-study-lab/manal`, and `/work/manal-alhihi`
- Desktop browser QA at `1440 × 900`: seven panels, correct pin distance, progress update, horizontal track movement, SVG completion, and no overflow
- English/Arabic QA: correct content, LTR/RTL panel direction, stable track direction, language preserved through portfolio navigation
- Light/dark QA: semantic tokens resolve correctly in both themes
- Mobile QA at `390 × 844`: vertical track, static final SVG, no homepage mobile nav, no horizontal overflow
- Reduced-motion QA: no pin spacer, vertically stacked chapters, final SVG state
- Console QA: no errors, hydration warnings, or application warnings after removing manual image preloads

The production build retains the repository’s existing non-blocking warnings for stale `baseline-browser-mapping` data and missing root `metadataBase`.

## Remaining risks

- The global language state defaults to English on a fresh direct visit because language persistence is not currently part of `LanguageContext`.
- Root document language remains English; the case-study main landmark carries the correct locale and direction.
- Horizontal pacing should be reviewed on very wide monitors and with real users before standardizing it for every project.
- Visual-regression coverage is still manual.

## Next recommended milestone

Add a second production case study with a materially different visual theme while keeping the same typed content contract. That will reveal which panel structures are truly reusable before extracting a generalized case-study panel registry or CMS adapter.
