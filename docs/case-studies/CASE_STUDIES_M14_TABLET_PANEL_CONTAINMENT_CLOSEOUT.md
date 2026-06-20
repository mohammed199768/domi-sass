# CASE STUDIES M14 — TABLET / SHORT VIEWPORT PANEL CONTAINMENT CLOSEOUT

## Summary
Fixed top/bottom content clipping on the four case-study pages (`/work/manal-alhihi`,
`/work/qasr-alfarah`, `/work/curevie`, `/work/horvath-survey`) on tablets and shorter
viewports. The case-study chapter panels are now driven by an explicit three-mode layout
shell (`CaseStudyPanelShell`) and the cinematic horizontal pinned journey only runs when
there is genuinely enough room for it. On tablet portrait, tablet landscape, and short
laptops the panels become contained and scroll-safe so no text, heading, visual, or CTA is
ever hidden behind the top or bottom viewport edge. The desktop horizontal journey and the
mobile stacked layout are preserved unchanged.

## Root cause
The clipping had two compounding causes:

1. **Width-only breakpoint.** The horizontal journey was gated on
   `useMediaQuery("(min-width: 1024px)")` and the panels keyed their full-viewport styling
   off the Tailwind `lg:` (≥1024px) **width-only** breakpoint. A tablet in landscape
   (1024×768) or a short laptop therefore matched the "desktop" branch and was forced into a
   `min-h-screen` / `h-screen`, pinned, `overflow-hidden` panel with content vertically
   centred via `items-center` and `py-24` padding. When the viewport height was small, the
   centred content exceeded the available height and the top/bottom were clipped with no
   scroll path to reach them.

2. **`100vh` unreliability + hard centring.** Panel height relied on `vh`, which is unstable
   on mobile/tablet browser chrome, and `items-center` on a box shorter than its content
   pushes the overflow equally above and below — putting the heading top *above* the fixed
   header where it is unreachable. This is exactly what the new short-laptop Playwright test
   reproduced before the fix (result-panel heading top at ≈ −15px).

## Files changed
- `src/features/case-studies/caseStudyJourneyConfig.ts` — added
  `horizontalJourneyMediaQuery: "(min-width: 1280px) and (min-height: 760px)"` (width **and**
  height aware) alongside the existing `desktopMediaQuery`.
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx` — gate the pinned GSAP journey
  on the new height-aware query; compute a `panelMode` (`"horizontal" | "roomy" | "contained"`)
  and pass it to every chapter; section uses `h-svh`.
- `src/features/case-studies/CaseStudyPanels.tsx` — introduced the shared
  `CaseStudyPanelShell` containment wrapper with the three layout modes; all panel components
  now take a `mode: PanelLayoutMode` prop instead of `horizontal: boolean`.
- `src/features/case-studies/TrainingPlatformSvg.tsx`,
  `WeddingBookingSvg.tsx`, `HealthcareCoordinationSvg.tsx`, `AiReadinessIndexSvg.tsx` —
  tightened the transformation-visual height cap on the tablet band.
- `tests/visual/helpers.ts` — added tablet/short viewports and two assertion helpers
  (`expectStackedJourney`, `expectAllChapterHeadingsReachable`).
- `tests/visual/case-studies-tablet.visual.spec.ts` — new focused tablet/short-viewport spec.

## Panel containment strategy
A single shared shell, `CaseStudyPanelShell`, renders every chapter in one of three modes.
The mode is decided in JavaScript by the journey (which owns the media-query hooks) and passed
down, so **all classes are static** and reliably emitted by Tailwind — no fragile arbitrary
media-query variants.

- **`horizontal`** — the cinematic, full-viewport pinned panel for the desktop horizontal
  journey. Reproduces the original desktop layout exactly (`lg:min-h-svh lg:w-screen
  lg:items-center … lg:py-24`); only the viewport unit moves from `vh` to the more reliable
  `svh`.
- **`roomy`** — a real desktop that is wide and tall enough but is **not** running the journey
  (i.e. reduced motion). Full-viewport, vertically centred, `py-24` — reproduces the
  long-standing reduced-motion desktop layout.
- **`contained`** — tablet / short viewport / mobile. At `sm` and up each chapter is capped at
  the visible viewport minus the fixed 4rem header (`max-h-[calc(100svh-4rem)]`) and may scroll
  **locally** only if a single chapter genuinely overflows — a clip guard so nothing hides
  behind the top/bottom edge. Mobile (`< sm`) keeps pure natural document flow (no cap, no
  inner scroll). It uses a **block** scroll container with an **auto-margin inner wrapper**
  rather than flex `items-center`, because a flex item taller than its scroll parent gets its
  top clipped and unreachable in every browser engine; auto margins centre the content when it
  fits and collapse to 0 when it overflows, keeping the top reachable.

## Breakpoint strategy
- **Horizontal journey:** `(min-width: 1280px) and (min-height: 760px)` **and** motion allowed.
  Width ≥ 1280px keeps real desktops (including the locked 1366×768 visual baseline) on the
  cinematic journey while pushing tablet landscape (1024×768) down to the stacked layout —
  width is what separates those two 768px-tall cases. The 760px height floor additionally drops
  very short desktop windows.
- **Roomy (stacked):** same width/height gate satisfied but motion reduced → centred
  full-viewport flow.
- **Contained (stacked):** everything else at `sm` and up (tablet portrait 768×1024, tablet
  landscape 1024×768, short laptop 1366×650) → capped, scroll-safe flow.
- **Mobile (`< sm`):** untouched natural document flow.

(The breakpoint split between 1366×768 staying horizontal and 1024×768 going stacked was an
explicit product decision — both are 768px tall, so a pure height floor cannot separate them;
width is the discriminator. This preserves the locked desktop snapshots.)

## SVG containment changes
The four transformation visuals moved from `max-h-[50vh] lg:max-h-[65vh]` to
`max-h-[50svh] sm:max-h-[42svh] lg:max-h-[65vh]`:
- Mobile (`< sm`): `50svh` — numerically identical to the old `50vh` in the fixed-viewport
  test runner, so the mobile baseline is unchanged, but more reliable on real devices.
- Tablet band (`sm`): `42svh` — a more aggressive cap so the visual shrinks before the text
  column is ever sacrificed on short viewports.
- Large desktop (`lg`): retained `65vh` so the cinematic and reduced-motion desktop snapshots
  stay pixel-identical.

## Text / Arabic safety changes
- Arabic heading safety is already enforced by the existing global rules in
  `src/styles/globals.css` (`[dir="rtl"] h1 { line-height: 1.35 !important; word-break:
  break-word }` and the equivalent `h2/h3` rule at 1.5). These `!important` rules override any
  `leading-tight` utility in Arabic, so RTL headings keep generous leading on tablets. No new
  CSS was required and none was added (to avoid snapshot churn).
- Top safety: in the contained mode the auto-margin centring collapses to 0 when content
  overflows, so the heading starts at the panel's top padding and is never flush against / behind
  the fixed header. Verified by `expectAllChapterHeadingsReachable` across all four routes at
  tablet sizes.

## Scroll safety
- Inner `overflow-y-auto` is applied only on the contained branch at `sm` and up, and only
  engages when a single chapter genuinely exceeds the available height — most chapters fit and
  never scroll, so page-level scroll remains the primary mechanism and there is no nested
  scroll trap on mobile.
- `overscroll-contain` prevents scroll chaining surprises when a chapter does scroll locally.
- The closing CTA is asserted reachable at every tested tablet/short size.

## Tablet / short viewport QA
Behaviour verified via the new Playwright spec (assertion + snapshot) at:
- **768×1024** (tablet portrait) — contained, no overflow, headings reachable, CTA reachable.
- **1024×768** (tablet landscape, short) — now stacked/contained instead of pinned; no clipping.
- **1366×650** (short laptop) — contained; previously clipped the result-panel heading
  (≈ −15px), now reachable.
- **390×844** (mobile) — unchanged natural flow (existing mobile snapshots still pass).
- **1366×768 / 1440×900** (desktop / large desktop) — horizontal journey preserved; locked
  snapshots unchanged.

Both languages (EN/AR), both themes (light/dark), and reduced motion were exercised across the
matrix.

## Playwright updates
- `tests/visual/helpers.ts`: added `tabletPortrait` (768×1024), `tabletLandscape` (1024×768),
  `shortLaptop` (1366×650) viewports; added `expectStackedJourney` (asserts no `.pin-spacer`,
  proving the fallback engaged) and `expectAllChapterHeadingsReachable` (walks all seven chapters
  and asserts each heading is on-screen and not clipped above the fold).
- `tests/visual/case-studies-tablet.visual.spec.ts` (new): 12 assertion-only tests (4 routes ×
  3 tablet/short variants) plus **2** focused snapshots (Qasr AR/dark split-transformation and
  Manal EN/light stacked-transformation at tablet portrait). Snapshot count deliberately kept
  small.
- Re-baselined the 4 `*-reduced-*` case-study snapshots: the reduced-motion desktop panels now
  use `w-full` instead of the previous `lg:w-screen`, which removes a ~15px horizontal overflow
  that used to sit under the scrollbar. This is an intended correctness improvement; only the
  case-study reduced-motion snapshots changed.

## Validation results
- [x] `npm run lint` — Passed (only the 2 pre-existing `LanguageContext.tsx` `no-unused-vars`
  warnings, unrelated to this change).
- [x] `npx tsc --noEmit` — Passed.
- [x] `npm run build` — Passed; all four `/work/[slug]` routes prerender.
- [x] `npm run test:visual` — 44 passed (after the intended reduced-motion re-baseline and the
  2 new tablet snapshots).

## Remaining risks
- **Inner scroll on very dense chapters.** On the smallest tablets, an exceptionally tall
  chapter (the result panel with `businessValue` + `technicalStory`) can engage a local scroll.
  This is the intended clip guard, but a chapter that needs scrolling shows a panel-level
  scrollbar; it is reachable and `overscroll-contain`-isolated, but worth a manual touch pass on
  a real device if copy grows substantially.
- **Breakpoint cliff at 1280px width.** A window between 1024px and 1279px wide that is also
  tall (≥760px) gets the contained layout rather than the cinematic journey. This is by design
  (width is the discriminator that keeps 1024×768 safe), but a very tall narrow desktop window
  will not pin.
- **`svh` support.** `svh`/`max-h-[calc(100svh-…)]` requires a reasonably modern browser; the
  project already targets current evergreen browsers, so this is low risk.

## Next recommended milestone
**CASE STUDIES M15 — real-device touch QA & motion polish:** validate the contained scroll
behaviour and momentum scrolling on physical iPad / Android tablets, and consider a light
fade/slide-in for chapters in the contained flow (respecting reduced motion) so the stacked
tablet experience feels as intentional as the desktop journey.
