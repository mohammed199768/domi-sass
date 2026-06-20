# CASE STUDIES M8 — HORIZONTAL WORK SLUG CUREVIE CLOSEOUT

## Summary
Successfully implemented the third production bilingual horizontal case study for the portfolio at `/work/curevie`. The addition leverages the existing horizontal journey and theme registry architecture, introducing a new healthcare-specific visual language while maintaining strict Playwright visual regression stability.

## Files Changed
- `src/features/case-studies/contracts.ts`
- `src/constants/caseStudies.ts`
- `src/features/case-studies/themeRegistry.tsx`
- `src/features/home/components/ProjectShowcaseModal.tsx`
- `src/features/case-studies/HealthcareCoordinationSvg.tsx` (New)
- `tests/visual/pages.visual.spec.ts`
- `tests/visual/modal.visual.spec.ts`

## Curevie Data Additions
Added the complete Curevie narrative to `caseStudies.ts`, maintaining strict bilingual fidelity (English/Arabic). The content focuses on the transformation from an unclear, scattered home healthcare request process into an organized, reassuring digital experience. No fake metrics or unsupported medical claims were introduced.

## Visual Theme Registry Addition
Introduced the `healthcare-coordination` visual theme to `themeRegistry.tsx`. Created a specialized `HealthcareCoordinationIntroVisual` featuring a calm, rounded design with a subtle mix-blend luminosity effect, establishing a softer medical identity right from the introduction chapter.

## Healthcare SVG/Motion Language
Created `HealthcareCoordinationSvg.tsx` powered by GSAP.
- **Before State**: Represents scattered service questions and disconnected medical support nodes (nurse, doctor, support, service) drifting haphazardly.
- **After State**: The nodes gracefully organize around a central "Home" card. Support pathways draw lines toward the center, and a subtle, non-alarming pulse ring signifies calm medical trust reaching the home. No red emergency colors were used; the visual relies entirely on the established theme tokens (`primary`, `secondary`, `surface`).

## Storyboard Image Mapping
Mapped existing, verified assets to the storyboard chapter:
- `curevie3.jpeg` - Clarity concept and service presentation
- `curevie.jpeg` - Visual tone and medical identity
- `curevie2.jpeg` - Service detail and care path
- `curevie4.jpeg` - Responsive device view

## Portfolio CTA Behavior
Updated `ProjectShowcaseModal.tsx` to map the `"curevie"` slug to its live route. The "View full case study" CTA is now active for Curevie in both English and Arabic. The "Horvath Survey" modal correctly remains without a live route CTA.

## Playwright Coverage Added
Focused visual coverage added:
- `/work/curevie` EN Light Desktop (Initial state)
- `/work/curevie` AR Dark Desktop (Initial state)
- `/work/curevie` EN Light Desktop (Reduced motion static chapters)
- `Curevie project modal visual and live CTA`
Generated new baselines strictly for these tests. Unrelated snapshots (Manal, Qasr, Homepage) were deliberately left untouched.

## SEO/Accessibility Notes
Added specific bilingual SEO metadata for the Curevie case study:
- English: "Curevie Home Healthcare Case Study | كيورفي"
- Arabic: "Curevie Home Healthcare Case Study | كيورفي"
The SVG includes `aria-hidden="true"` and the visual tests actively assert standard accessibility conditions via `expectCorePageAccessibility`. Reduced motion fallback ensures the final transformed SVG state renders immediately without animation for users preferring reduced motion.

## Validation Results
- `npm run lint` -> Passed
- `npx tsc --noEmit` -> Passed
- `npm run build` -> Passed (successfully generated static pages for all 3 routes)
- `npm run test:visual:update` -> Generated 5 new snapshot baselines.
- `npm run test:visual` -> Passed (17 total tests, covering all major portfolio variants).

## Remaining Risks
- The `baseline-browser-mapping` warning logged during Next.js build remains, though it doesn't affect production output.
- Storyboard images for Curevie are not strictly uniform in aspect ratio compared to Qasr, but `object-cover` styling mitigates layout shifts.

## Next Recommended Milestone
- **M9: Horvath Survey Implementation**: Build out the final case study for Horvath, completing the core portfolio loop.
- **M10: Mobile Optimization Review**: A dedicated pass specifically reviewing and perfecting the mobile stacked layout spacing and touch targets across all case studies.
