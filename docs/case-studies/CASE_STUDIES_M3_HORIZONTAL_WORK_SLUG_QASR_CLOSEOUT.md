# Case Studies M3 — Horizontal `/work/qasr-alfarah` Closeout

## Summary

Added Qasr Al-Farah as the second production case study in the shared `/work/[slug]` system. It preserves the seven-chapter horizontal desktop journey, bilingual rendering, theme tokens, vertical mobile fallback, and reduced-motion behavior while introducing a wedding-hall booking narrative and a distinct booking-to-memory motion system.

## Files changed

- `src/constants/caseStudies.ts`: extended the shared data contract and added complete Qasr content.
- `src/app/work/[slug]/page.tsx`: metadata now comes from each case-study record.
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx`: added theme-aware visuals, storyboard presentations, and before/after microcopy.
- `src/features/case-studies/WeddingBookingSvg.tsx`: added the Qasr-specific booking-flow illustration.
- `src/features/home/components/ProjectShowcaseModal.tsx`: added an explicit route map for the two live production case studies.
- `docs/case-studies/CASE_STUDIES_M3_HORIZONTAL_WORK_SLUG_QASR_CLOSEOUT.md`: this document.

## Data additions

The case-study contract now supports two visual themes, per-study cover images and SEO metadata, optional before/after microcopy, and image, concept, or responsive storyboard presentations. Qasr includes complete English and Arabic titles, positioning, before/after narratives, pain points, transformation points, six feature modules, storyboard captions and alt text, result copy, CTA, and chapter labels. No metrics or unsupported business claims were added.

## Shared vs project-specific architecture

The dynamic route, language selection, direction handling, header controls, horizontal track, progress line, GSAP lifecycle, chapter order, theme tokens, responsive breakpoint, and reduced-motion fallback remain shared. Qasr provides project-specific cover treatment, paper-agenda before styling, booking-flow SVG, four-item storyboard, content, and metadata. Manal continues to render its original training-platform SVG and three-item storyboard.

## Qasr motion language

The Qasr SVG begins with an agenda, event-detail chips, invitation node, and memory-book module separated around a central board. As the booking chapter enters, those modules consolidate, request dots align, booking-stage lines draw, and the central board resolves into a calendar, event details, invitation/RSVP state, and guest rows. It uses transforms and stroke dash offset only, with no Anime.js, WebGL, particles, or added dependency.

## Storyboard mapping

- Before: an accessible conceptual paper-agenda and phone-call composition, rather than a misleading product screenshot.
- Booking system: `qaser-alfarah3.png`, showing the hall’s digital entry and booking direction.
- Responsive devices: `qaser-alfarah2.png` composed into laptop, tablet, and phone frames using the real interface.
- Memory book: `qaser-alfarah1.png`, showing the project’s digital memory-book direction.
- Intro cover: `qaser-alfarah.png`, used in the arched hall visual.

No deleted flipbook assets, stock images, or broken legacy sources were used.

## Portfolio CTA behavior

The modal uses an explicit map from existing portfolio slugs to live work routes. Manal links to `/work/manal-alhihi`; the existing Qasr project key `qasr-al-farah` links to `/work/qasr-alfarah`. Curevie and Horvath render no full-case-study CTA. Labels remain bilingual.

## SEO and accessibility notes

Qasr has project-specific metadata describing the paper-to-digital booking transformation. The shared route still statically generates known slugs and calls `notFound()` for unknown ones. The page retains one H1, semantic chapter headings, local language and direction attributes, descriptive screenshot alt text, a labeled conceptual before visual, decorative SVG handling, and text equivalents for the transformation story.

## Validation results

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed; both Manal and Qasr are statically generated
- Desktop Qasr QA at `1440 × 900`: seven-panel pinned track, correct measured distance, SVG convergence, loaded storyboard assets, and no horizontal overflow
- English/Arabic QA: translated copy, LTR/RTL panel direction, and stable scroll position
- Light/dark QA: existing semantic tokens resolve correctly in both modes
- Mobile QA at `390 × 844`: vertical chapters, final SVG state, loaded images, and no horizontal overflow
- Reduced-motion QA: no pin spacer and final organized SVG state
- Manal regression QA: original route, metadata, training SVG, seven panels, and horizontal pin remain intact
- Browser console QA: no application errors, warnings, or hydration messages

The build retains the repository’s existing non-blocking warnings for stale `baseline-browser-mapping` data and missing root `metadataBase`.

## Remaining risks

- Fresh direct visits still default to English because the global language context does not persist a preference.
- Root document language remains English while each case-study main landmark carries its correct locale and direction.
- The responsive storyboard deliberately demonstrates the same real interface inside device frames; dedicated device captures would improve fidelity if produced later.
- Horizontal pacing and dense Qasr copy should receive a final editorial review on ultra-wide and short desktop viewports.

## Recommended next milestone

Refactor the now-proven differences into a small visual-theme registry for intro, transformation, and storyboard renderers, then add automated screenshot regression coverage for both case studies across language, theme, mobile, and reduced-motion modes before creating a third project.
