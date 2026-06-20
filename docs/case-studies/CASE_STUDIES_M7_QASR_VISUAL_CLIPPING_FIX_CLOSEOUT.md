# CASE STUDIES M7 — QASR VISUAL CLIPPING FIX CLOSEOUT

## Summary
Successfully fixed the visual clipping issue in the Qasr Al-Farah case study. The transformation panel was originally stacked vertically, causing the visual to overflow the viewport height and clip at the bottom. The fix introduces a split layout explicitly for the Qasr theme and contains the SVG to a maximum height, preserving readability and visual balance without affecting the Manal Alhihi case study or other sections.

## Root cause
The `CaseStudyTransformationPanel` forced a stacked layout (text on top, visual below) for all case studies. Because Qasr's SVG was large and unconstrained, stacking it below the text block in a horizontal pinned layout caused the total content height to exceed the viewport (`100vh`), leading to clipping. 

## Files changed
- `src/features/case-studies/themeRegistry.tsx` (added `transformationLayout?: "stacked" | "split"` and set Qasr to `"split"`)
- `src/features/case-studies/CaseStudyPanels.tsx` (updated `CaseStudyTransformationPanel` to conditionally render the new split grid layout based on the theme)
- `src/features/case-studies/WeddingBookingSvg.tsx` (added explicit `max-h-[50vh] lg:max-h-[65vh] object-contain preserveAspectRatio="xMidYMid meet"` to the SVG wrapper)

## Visual fix applied
- **Layout Split:** The text block and the contained visual card are now side-by-side (`lg:grid-cols-[.8fr_1.2fr]`) on desktop for the Qasr theme.
- **Visual Containment:** The SVG now scales responsively and explicitly stops growing vertically before it reaches the viewport bounds.

## Desktop/mobile result
- **Desktop:** Text is fully readable on one side, and the visual card sits comfortably on the other side. The SVG is visually balanced, fully contained, and no longer clips at the bottom. The horizontal pinned scroll still triggers smoothly.
- **Mobile:** Because the split layout (`lg:grid-cols-...`) is responsive, mobile falls back to the native stacked layout seamlessly. The SVG scales down responsively, and no horizontal overflow occurs.

## Reduced-motion result
The reduced-motion fallback still renders the final static state correctly, but now it renders within the new split layout, ensuring no clipping in reduced-motion mode either.

## Snapshot update result
As expected, the `qasr reduced-motion static chapters` Playwright snapshot failed initially because the panel height naturally shrunk (from `1366x1155` down to `1366x769`). The baseline was intentionally updated to capture the newly balanced split layout. Unrelated snapshots (including all Manal snapshots and the homepage) were not affected.

## Validation results
- [x] `npm run lint` (Passed)
- [x] `npx tsc --noEmit` (Passed)
- [x] `npm run build` (Passed)
- [x] `npm run test:visual` (Passed after updating the Qasr transformation snapshot)

## Remaining risks
- The split layout requires the `WeddingBookingSvg` to properly balance itself to the left/right depending on the language direction. The current SVG design is centered inside the card, so RTL/LTR should look stable, but extreme text lengths could still slightly compress the visual column.

## Recommendation before starting Curevie
The case study motion and visual system is now fully stable, visually polished, and backed by robust Playwright regression checks. **Curevie can safely start now.**
