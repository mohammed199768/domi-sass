# WHY CHANGE M1 — Cinematic Scroll Film + Charts Closeout

## Summary

`/why-change` is a bilingual, theme-aware scrollytelling experience that reframes a website as a conversion system. The desktop experience behaves like a pinned motion-graphics film; tablet, mobile, and reduced-motion experiences use a readable vertical edit.

## Files added

- `src/app/why-change/page.tsx`
- `src/features/why-change/WhyChangeFilmClient.tsx`
- `src/features/why-change/WhyChangeSceneFrame.tsx`
- `src/features/why-change/WhyChangeDataChart.tsx`
- `src/features/why-change/WhyChangeProgressSpine.tsx`
- `src/features/why-change/WhyChangeSources.tsx`
- `src/features/why-change/whyChangeScenes.ts`
- `src/features/why-change/why-change.module.css`
- `tests/visual/why-change.visual.spec.ts`
- Two focused visual baselines under `tests/visual/__screenshots__/why-change.visual.spec.ts/`

## Files changed

- `src/components/Footer.tsx`: added the bilingual `/why-change` entry point.

## Route structure

The server route owns metadata and renders one client film component. Story copy and scene definitions stay separate from rendering and motion logic.

## Film structure

The narrative contains eleven scenes: shift, discovery, new behavior, social handoff, post-click decision, conversion center, speed, complexity, strong-site path, diagnostic question, and final conversion chain. Desktop uses one fixed stage; each scene shares the same visual grammar of caption, framed illustration, and data/system graphic.

## GSAP usage

GSAP owns one desktop ScrollTrigger timeline. It pins one stage, scrubs scene crossfades and controlled frame movement, draws chart paths, reveals statistics, and advances the progress spine. `gsap.context()` contains selectors and cleanup. A media-query branch prevents pinning below 1100px or when reduced motion is enabled.

## Anime.js usage

Anime.js is dynamically imported only on motion-capable desktop. It performs a finite opacity pulse on small chart nodes after a scene becomes active. It has no loops, no shared transform ownership with GSAP, and import failure is non-fatal.

## Chart system

`WhyChangeDataChart` renders deterministic inline SVG charts: radial adoption, user-node orbit, split bars, flows, broken click path, conversion hub, speed drop-off, funnel, trust ladder, path comparison, and conversion chain. Numeric labels repeat visible text accessibly while each SVG remains decorative. The film contains 13 animated chart paths and 30 micro-interaction nodes, within the requested budgets.

## SVG asset usage

Ten supplied unDraw SVG files are rendered through `next/image`. Each is placed inside a diagnostic frame with grid, scanline, metadata, and restrained brand surfaces; the eleventh/final scene relies on its custom conversion-chain chart to respect the ten-asset cap. Below-fold assets use lazy loading.

## Performance decisions

- One pinned sequence and one ScrollTrigger.
- No Canvas, WebGL, Lottie, chart library, particle engine, mouse-follow, or custom RAF.
- Transform, opacity, and SVG stroke properties are animated; layout properties are not.
- No continuous animation loops or animated blur/backdrop filters.
- Scene data is predefined and render output is deterministic.

## Reduced-motion behavior

Reduced motion disables pinning, scrub, path drawing, and Anime.js. All eleven scenes render as normal vertical content with complete copy, charts, sources, and CTAs.

## Bilingual content

English and Arabic content are defined for every title, narrative, statistic, chart label, source heading, and CTA. The existing language context controls direction and typography without a page-specific state system.

## Sources handling

Attribution links cover DataReportal global and social data, Pew Research Center teen usage, Google mobile speed research, and Baymard cart abandonment research. Links open in a new tab with `noopener noreferrer`. Contextual caveats avoid presenting benchmarks as guaranteed outcomes.

## Tests and validation

- `npm run lint`: passes with two pre-existing warnings in `LanguageContext.tsx`.
- `npx tsc --noEmit`: passes.
- `npm run build`: passes; `/why-change` is statically generated.
- Focused Playwright suite: 3/3 passes, including desktop pinning, Arabic mobile overflow, reduced motion, scene/chart/stat presence, sources, and CTAs.
- Full Playwright suite: 61/62 passed on the first run. The only failure was the pre-existing homepage animated-orbit snapshot drifting by 1%; its isolated rerun passed. All `/why-change` tests passed in the full run.
- Visual inspection completed for the dark desktop film frame and light Arabic mobile opening.

## Remaining risks

The homepage orbital snapshot has a small timing-related flake unrelated to this route. Published audience totals can change as source reports update, so the statistic copy and links should be reviewed periodically.

## Next recommended milestone

Add conversion analytics for the two closing CTAs and review real scroll-depth data before tuning scene pacing. This preserves the current visual system while grounding the next animation iteration in visitor behavior.

