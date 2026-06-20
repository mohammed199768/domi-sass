# WHY CHANGE M1B — Visual Elevation Closeout

## Summary

M1B elevates `/why-change` from a repeated framed-slide treatment into a more open editorial film. The revision introduces warm ivory light-mode surfaces, five directed scene compositions, integrated illustration/chart stages, persistent SVG routing language, restrained scene-bound depth, and one-beat scroll settling.

## What was wrong with M1

M1 placed each illustration inside a filled rectangular frame and placed the related chart in a second bordered block. That repeated structure made the film feel like a sequence of designed cards. Its light mode was too close to plain white, directional storytelling was mostly local to the charts, and a large wheel impulse could settle more than one scene ahead.

## Files changed

- `src/features/why-change/WhyChangeFilmClient.tsx`
- `src/features/why-change/WhyChangeSceneFrame.tsx`
- `src/features/why-change/whyChangeScenes.ts`
- `src/features/why-change/why-change.module.css`
- `tests/visual/why-change.visual.spec.ts`
- `/why-change` desktop visual snapshots

Added:

- `src/features/why-change/WhyChangeContinuityRail.tsx`

## Light mode refinements

The page now establishes local warm-brand tokens: ivory background, bone surface, silver-navy hairlines, deep navy text, restrained cyan signals, and champagne decision marks. The film stage uses a very low-contrast directional wash rather than a cold white or gray slab. Shadows remain limited to a small static illustration separation.

## Visual stage refinements

The filled illustration rectangle and separate bordered chart widget were removed. Illustrations now occupy an open technical field with partial corners, a masked hairline grid, one scanline, route markers, and a chart integrated into the lower visual plane. The final non-illustration scene retains its typographic film frame. The charts share the stage instead of reading as detached cards.

## SVG wave and arrow system

Each scene includes two deterministic guide paths, two route markers, and one directional arrow. A separate full-stage continuity rail contains four route states. State one develops across scenes 1–3, then the route language changes at scenes 4, 7, and 10. The outgoing rail remains faintly present during the handoff, preventing a visual reset between every scene. GSAP reveals only a small set of paths at one time.

## Scroll progression fix

Desktop scroll segments increased from 82% to 105% of the stage measure. Scrub smoothing increased to `1.05`. ScrollTrigger snap uses fixed scene segmentation, disabled inertia, and a 0.20–0.55 second settling range. Most importantly, the requested snap index is clamped to one scene away from the last settled index. A focused Playwright test sends a 2,400px wheel impulse and confirms the film settles no farther than scene 2.

## Floating visual refinements

Illustrations receive a finite scene-entry rise from 18px with a very small scale correction. The movement ends at a slight depth offset and never loops. Static drop-shadow separation is subtle and filter animation is not used. Anime.js remains responsible only for one-shot node and arrow emphasis after a scene becomes active.

## Alternating scene composition

Scene data now declares one of five layouts:

- `opening`: hero-scale visual field and compact argument column.
- `copy-left`: classic copy-led staging.
- `visual-left`: reversed visual/copy order.
- `stat-led`: wider statistic/copy area and restrained illustration.
- `chart-led`: expanded chart plane with secondary illustration.

RTL receives corresponding grid-area composition rather than relying on accidental DOM mirroring. Tablet and reduced-motion layouts simplify to a balanced two-column edit; phone layouts remain one-column.

## Performance decisions

- One major pinned ScrollTrigger remains.
- Four continuity states are inline SVG, with two drawable rail paths per state.
- Each active scene draws only two guide paths plus its existing small chart path set.
- Motion is limited to transform, opacity, scale, and stroke offset.
- No Canvas, WebGL, Lottie, particles, mouse-follow, animated blur, ambient float loop, or custom RAF was introduced.
- Existing ten-illustration and deterministic-render budgets remain intact.

## Reduced motion behavior

Reduced motion still disables pinning, scrubbing, SVG drawing, and Anime.js. All scenes remain visible as vertical content. The first continuity rail is displayed statically at low opacity, preserving the refined route language without movement.

## Validation results

- `npm run lint`: passes with two pre-existing unused catch-variable warnings in `LanguageContext.tsx`.
- `npx tsc --noEmit`: passes.
- `npm run build`: passes; `/why-change` remains statically generated.
- Focused `/why-change` suite: 6/6 passes.
- Full Playwright visual suite: 65/65 passes.
- Verified dark desktop film, warm-light desktop film, English, Arabic mobile at 390px, reduced motion, one-beat strong-wheel settling, all five layout modes, transparent illustration stage, source/CTA integrity, and no mobile horizontal overflow.
- No console errors, page errors, or hydration warnings were reported by the browser harness.

## Remaining risks

Snap deliberately prioritizes authored scene beats over rapid traversal. Visitors intentionally trying to rush through the pinned film will need one settled gesture per scene; this is the desired narrative behavior but should be reviewed against real scroll-depth analytics. The supplied illustration palettes remain recognizable as unDraw, although their new open-stage treatment reduces the generic pasted-asset effect.

## Next recommended milestone

Instrument scene-settle and CTA events, then review completion and abandonment data. If the story holds attention, the next useful refinement is bespoke DOMINASE illustration art direction for the highest-impact scenes rather than adding more motion.

