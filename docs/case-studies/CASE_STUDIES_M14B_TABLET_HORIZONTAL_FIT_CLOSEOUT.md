# CASE STUDIES M14B — TABLET HORIZONTAL FIT-TO-VIEWPORT CLOSEOUT

## Summary
Restored and preserved the horizontal side-scroll case-study journey on tablets and
smaller/shorter desktop screens, and fixed the top/bottom clipping the right way — by making
each panel **fit inside one viewport** through compact density plus a measured fit-to-viewport
scale, rather than by switching those screens to vertical scroll. The four routes
(`/work/manal-alhihi`, `/work/qasr-alfarah`, `/work/curevie`, `/work/horvath-survey`) now run
the pinned GSAP horizontal journey at 768×1024, 820×1180, 1024×768, 1180×820, and 1366×650.
Only true phone widths (< 768px) remain stacked. Desktop, mobile, and reduced-motion behaviour
are unchanged.

## What was wrong with M14
M14 solved clipping by sending tablets and short desktops into a **vertically-scrolling,
contained** layout (`max-h-[calc(100svh-4rem)]` + local `overflow-y-auto`). That removed the
clipping but broke the intended experience: the case-study journey is meant to stay
horizontal/side-scroll on tablets, not turn into a "scroll down inside each chapter" page.
M14 also made tablets behave like mobile. The correct fix is to keep the horizontal journey and
make every panel responsive enough to fit the viewport — which is what M14B does.

## Files changed
- `src/features/case-studies/caseStudyJourneyConfig.ts` — replaced the single
  `horizontalJourneyMediaQuery` with two queries: `journeyActiveMediaQuery: "(min-width: 768px)"`
  (the journey runs for tablets and up) and `fullCinematicMediaQuery: "(min-width: 1280px) and
  (min-height: 760px)"` (full vs compact density).
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx` — the pinned GSAP journey now runs
  whenever `journeyActive && !reducedMotion` (tablets included); a `panelMode`
  (`horizontal | horizontalFit | roomy | mobileStacked`) is computed and passed to every chapter.
- `src/features/case-studies/CaseStudyPanels.tsx` — reworked `CaseStudyPanelShell` for the four
  modes; added per-panel compact density for `horizontalFit`; background decorations now render
  outside the fit wrapper via a new `decoration` prop.
- `src/features/case-studies/FitToViewport.tsx` (new) — measured scale wrapper used only in
  `horizontalFit`.
- `src/features/case-studies/transformationSvgClass.ts` (new) — shared per-mode SVG height caps.
- `src/features/case-studies/TrainingPlatformSvg.tsx`, `WeddingBookingSvg.tsx`,
  `HealthcareCoordinationSvg.tsx`, `AiReadinessIndexSvg.tsx` — accept `mode`, use the shared cap.
- `src/features/case-studies/themeRegistry.tsx` — `TransformationVisual` now takes `mode`.
- `tests/visual/helpers.ts` — new tablet viewports + assertion helpers
  (`expectHorizontalJourneyActive`, `expectNoLocalPanelScrollInHorizontalFit`,
  `expectAllPanelsMode`, `expectVisiblePanelHeadingUnclipped`); removed the M14 stacked helpers.
- `tests/visual/case-studies-tablet.visual.spec.ts` — rewritten for the horizontal-fit behaviour.
- Removed the two obsolete M14 tablet snapshots; added two new tablet "fit" snapshots.

## New layout mode strategy
The journey decides one of four modes in JS (it owns the media-query hooks) and passes it to
every chapter, so all classes stay static and Tailwind-safe (no fragile arbitrary variants):

| Mode | When | Layout |
|------|------|--------|
| `horizontal` | width ≥ 1280px **and** height ≥ 760px, motion allowed | Full cinematic pinned journey. Reproduces the original desktop layout exactly. |
| `horizontalFit` | width ≥ 768px, not full-cinematic, motion allowed | **Still the pinned horizontal journey**, but compact density + measured fit so a whole panel fits one viewport. No vertical panel scroll. |
| `roomy` | width ≥ 1280px and height ≥ 760px, **reduced motion** | Vertically-centred full-viewport flow (preserves the reduced-motion desktop baseline). |
| `mobileStacked` | width < 768px (or reduced motion below full-cinematic) | Natural vertical document flow (the original mobile layout, untouched). |

The pinned GSAP journey runs for `horizontal` + `horizontalFit`. Tablets are in `horizontalFit`,
so they stay horizontal.

## HorizontalFit implementation
Two layers, smallest-impact first:

1. **CSS density (primary).** In `horizontalFit` every panel renders a compact variant: smaller
   headings (e.g. `text-3xl md:text-4xl` instead of `text-6xl/7xl`), tighter gaps and margins,
   smaller pain-point/feature cards and lower card `min-h`, denser storyboard grid (2-up at
   tablet), and smaller SVG caps. This keeps the natural content close to viewport size so any
   scaling stays minimal and readable. Panel padding also tightens (`px-6 py-6 md:px-10 md:py-8`).

2. **Measured fit wrapper (guarantee).** `FitToViewport` wraps the compact content only in
   `horizontalFit`. It measures the available panel stage and the content's natural size with a
   `ResizeObserver` (plus a font-ready and a one-shot post-mount remeasure — **no RAF loop**) and
   applies `transform: scale(min(1, availW/contentW, availH/contentH))` with
   `transform-origin: center`, clamped to a readable minimum of `0.72`. Background decorations
   (ambient gradients, the result-panel grid) render outside the wrapper so they always fill the
   full panel. The panel itself is `overflow-hidden` and is never a scroller.

## Typography / spacing adjustments
Per panel, the `fit` density tightens:
- **Intro** — headline `text-3xl md:text-4xl`, tighter subtitle, `gap-7`.
- **Before / After** — `text-3xl md:text-4xl` heads, smaller pain/result cards (`min-h-16` /
  `min-h-20`), `gap-7`, smaller frame `min-h`.
- **Transformation** — `text-3xl md:text-4xl` head, `gap-6`, smaller frame padding; SVG capped
  hard (below).
- **Storyboard** — 2-column tablet grid, `gap-4`, reduced caption padding (`min-h-0`).
- **Features** — `text-base md:text-lg` card titles, `min-h-0` cards, `gap-6`.
- **Result** (densest) — `text-2xl md:text-3xl` head, `md:grid-cols-2` business value,
  compact list/typography, smaller CTAs (kept visible).

## SVG fit changes
`transformationSvgClass(mode)` centralises the caps:
- `horizontalFit`: `max-h-[34svh] md:max-h-[36svh] lg:max-h-[40svh]` — the visual shrinks well
  before any text is sacrificed.
- `horizontal` / `roomy`: `max-h-[50svh] lg:max-h-[65vh]` (the original generous desktop cap;
  `vh` at `lg` keeps the locked desktop and reduced-motion snapshots pixel-identical).
- `mobileStacked`: `max-h-[50svh]` (original mobile cap).
Each SVG keeps its own extras (e.g. `object-contain` for the wedding/healthcare visuals).

## Breakpoint changes
- Journey active: **`(min-width: 768px)`** + motion allowed (was `(min-width: 1280px) and
  (min-height: 760px)`). Tablets now stay horizontal.
- Full cinematic density: **`(min-width: 1280px) and (min-height: 760px)`** (unchanged threshold,
  now only chooses density rather than gating the whole journey). 1366×768 desktop baseline stays
  full cinematic; 1366×650 short laptop is `horizontalFit`; 1024×768 tablet landscape is
  `horizontalFit`.
- Phone stacked: width < 768px.

## Playwright updates
- New viewports: `tabletPortrait` (768×1024), `tabletPortraitLg` (820×1180),
  `tabletLandscape` (1024×768), `tabletLandscapeLg` (1180×820), `shortLaptop` (1366×650).
- New helpers: `expectHorizontalJourneyActive` (asserts a `.pin-spacer` exists and the track is a
  `flex-row`), `expectNoLocalPanelScrollInHorizontalFit` (each panel computes `overflow:hidden`
  and cannot be scrolled — transform-scale guarantee, since CSS transforms don't change
  scrollHeight), `expectAllPanelsMode` (via `data-mode`), `expectVisiblePanelHeadingUnclipped`.
- `case-studies-tablet.visual.spec.ts` rewritten: 20 assertion tests (4 routes × 5 tablet/short
  sizes) confirming the journey is active, all panels are `horizontalFit`, no horizontal overflow,
  no local panel scroll, headings unclipped; 1 phone-stays-stacked test; **2** focused snapshots
  (Qasr AR/dark split-transform at tablet portrait, Manal EN/light at tablet landscape).
- Removed the two obsolete M14 tablet snapshots. No homepage/`/work` snapshots were changed.

## Validation results
- [x] `npm run lint` — Passed (only the 2 pre-existing `LanguageContext.tsx` warnings).
- [x] `npx tsc --noEmit` — Passed.
- [x] `npm run build` — Passed; all four `/work/[slug]` routes prerender.
- [x] `npm run test:visual` — All case-study, desktop, mobile, reduced-motion, and the new tablet
  tests pass (52/53). The single `homepage light desktop` diff (ratio 0.01) is a pre-existing
  homepage animation-timing flake unrelated to case studies; it passes in isolation. No
  case-study desktop/mobile/reduced-motion baseline changed.

## Remaining risks
- **Extreme content / very small tablets.** The measured scale is clamped at `0.72`. If a future
  copy expansion (especially long Arabic on the dense result panel) cannot fit even at `0.72`, the
  panel would visually crop rather than scroll (by design — no vertical scroll). Compact density
  keeps the typical scale well above the clamp today; worth re-checking if result copy grows.
- **FitToViewport is client-only.** Before measurement (SSR / first paint) content renders at
  scale 1; it settles on mount. The Playwright `openStablePage` settle delay covers this; on very
  slow devices there may be a brief pre-scale frame.
- **Reduced motion on tablets** falls back to `mobileStacked` (vertical), because a horizontal
  journey requires scroll-driven motion. This is intentional and accessible.

## Next recommended milestone
**CASE STUDIES M15 — real-device touch QA & fit telemetry:** validate the pinned horizontal
journey and the fit scale on physical iPad / Android tablets (touch inertia, address-bar
show/hide, orientation change), and add a tiny dev-only readout of the computed fit scale per
panel so density can be tuned with data before any future copy changes.
