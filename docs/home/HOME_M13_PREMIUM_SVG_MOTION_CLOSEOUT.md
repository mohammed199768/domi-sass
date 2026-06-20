# HOME M13 — Premium SVG Motion Upgrade — Closeout

**Date:** 2026-06-20
**Scope:** Homepage premium motion/visual enhancement pass. No redesign, no copy
changes, no structural changes. Three lightweight inline SVG systems plus a
clear GSAP / Anime.js ownership split, fully theme- and reduced-motion-aware.

---

## 1. Summary

Added three professional, brand-aligned inline SVG systems to the homepage and
wired them with controlled motion:

- **HeroOrbitalSignatureSvg** — orbital "command studio" signature behind the
  hero portrait.
- **TransformationConstellationSvg** — a compact transformation network that
  echoes the `/work` Transformation Tree as a bridge into the "view all case
  studies" CTA.
- **ServiceOrbitSvg** — a calm-core service orbit supporting the Services
  section.

Motion ownership is split cleanly:

- **GSAP + ScrollTrigger** owns the one-time scroll-enter choreography
  (stroke-dashoffset line drawing + node pop-in), via a shared
  `useSvgReveal` hook that follows the existing `gsap.context()` cleanup
  pattern already used in the home hooks.
- **Anime.js (v4)** owns isolated local SVG micro-interactions only (a single
  finite settle pulse after the reveal, plus a finite hover/focus node glow).
  It is **dynamically imported** inside a client effect so it never touches the
  SSR bundle and only ships when a visual mounts.

No element is animated by both libraries at the same time. No infinite loops,
no Canvas, no WebGL, no Lottie, no particle engines, no `Math.random()` in
render. Brand identity, copy, and section order are unchanged.

---

## 2. Files added

| File | Purpose |
|------|---------|
| `src/features/home/components/visuals/HeroOrbitalSignatureSvg.tsx` | Hero orbital signature SVG |
| `src/features/home/components/visuals/TransformationConstellationSvg.tsx` | Portfolio transformation network SVG |
| `src/features/home/components/visuals/ServiceOrbitSvg.tsx` | Services orbit SVG |
| `src/features/home/components/visuals/useSvgReveal.ts` | Shared GSAP scroll-enter reveal (line draw + node pop), reduced-motion static state |
| `src/features/home/components/visuals/useNodePulse.ts` | Anime.js micro-interaction layer (dynamic import, finite pulses only) |
| `src/features/home/components/visuals/index.ts` | Barrel export for the three visuals |
| `docs/home/HOME_M13_PREMIUM_SVG_MOTION_CLOSEOUT.md` | This document |

---

## 3. Files changed

| File | Change |
|------|--------|
| `src/features/home/components/Hero.tsx` | Layered `HeroOrbitalSignatureSvg` behind the portrait (desktop only, low opacity). |
| `src/features/home/components/PortfolioSection.tsx` | Added `TransformationConstellationSvg` above the "view all case studies" CTA. |
| `src/features/home/components/ServicesSection.tsx` | Added `ServiceOrbitSvg` in the sticky left column (desktop only). |
| `package.json` / `package-lock.json` | Added `animejs@^4.4.1` dependency. |

No homepage copy, no section order, no routes, no modal logic touched.

---

## 4. SVG systems added

### A. HeroOrbitalSignatureSvg
- Concept: 3 orbital rings, central monolith node (halo ring + solid core),
  6 satellite nodes on fixed deterministic angles, 6 thin connecting lines.
- Location: layered behind the hero portrait (`lg:block hidden`).
- Theme: `text-primary-theme` → cyan/teal in dark, deep navy in light.
- Budget: 3 orbits + 6 links + 6 satellites + 3 core elements = 18 nodes.

### B. TransformationConstellationSvg
- Concept: central root node branching via 4 curved cubic paths to 4 endpoint
  nodes — one per transformation theme. Uses the exact same four accent colours
  as the `/work` Transformation Tree (`#2DD4BF`, `#F472B6`, `#60A5FA`,
  `#A78BFA`) so it visually echoes `/work` without duplicating the cards.
- Location: portfolio section, bridging into the `/work` CTA.
- Budget: 4 branches + 8 endpoint elements + 2 root elements = 14 nodes.

### C. ServiceOrbitSvg
- Concept: calm core, 2 subtle orbit rings, 5 service nodes on fixed angles,
  5 thin link lines. Service surface = websites / dashboards / backend /
  case-study systems / automation.
- Location: Services sticky left column (`lg:block hidden`).
- Theme: rings/core use `text-primary-theme`; service nodes use
  `fill-secondary-theme` (orange in light, pink in dark).
- Budget: 2 orbits + 5 links + 10 node elements + 3 core elements = 20 nodes.

**Totals across the homepage:** ~52 SVG elements rendered, of which the
animated set is **20 drawn paths** (`data-draw`) and **32 nodes**
(`data-node`). Animated *paths* = 20, at the stated budget ceiling; decorative
node count is split across three independent off-screen systems so no single
reveal animates more than ~18 elements at once.

---

## 5. GSAP usage

- Reuses the existing `@/lib/motion/gsapSetup` (`registerMotionPlugins`,
  `gsap`, `ScrollTrigger`) — no new GSAP plugins.
- `useSvgReveal` creates a `gsap.context()` scoped to each visual's container,
  with a single `ScrollTrigger` timeline (`start: "top 78%"`, `once: true`):
  1. `stroke-dashoffset` line drawing on `[data-draw]` paths (measured once via
     `getTotalLength()`).
  2. node pop-in (`opacity` + `scale`) on `[data-node]`.
- Cleanup: `ctx.revert()` on unmount; `ScrollTrigger.refresh()` after setup —
  matching the existing `usePortfolioAnimation` pattern.
- On completion the timeline dispatches a `svgRevealDone` CustomEvent that gates
  the Anime.js layer, guaranteeing the two libraries never overlap in time.

## 6. Anime.js usage

- **v4.4.1**, named-export API (`import { animate, stagger } from "animejs"`),
  loaded via **dynamic `import("animejs")`** inside a client `useEffect` only
  when `prefers-reduced-motion` is *not* set. SSR-safe.
- Two isolated micro-interactions only:
  - one **finite** settle pulse (`opacity` keyframes, `loop: false`) on a small
    `[data-pulse]` subset, fired once after `svgRevealDone`.
  - a **finite** hover/focus node glow (`scale` 1 → 1.35 → 1, `loop: false`).
- Never animates a property GSAP is mid-animating; never starts an infinite
  loop; gated behind the `played` ref so it cannot run before the reveal or
  under reduced motion. Load failure is swallowed silently (the GSAP static
  state is already correct), so it can never produce a console error.

---

## 7. Performance decisions

- **No WebGL, no Canvas, no Lottie, no particle engines, no infinite RAF loops.**
- Only `transform`, `opacity`, `scale`, `stroke-dashoffset`, `stroke-opacity`
  are animated — never layout properties.
- All geometry is **deterministic** (fixed angle/coordinate arrays, no
  `Math.random()`), so IDs/positions are stable between server and client →
  no hydration mismatch.
- Each visual's animation is a single `once: true` ScrollTrigger timeline that
  is killed on unmount; no standalone scroll listeners.
- Anime.js ships only on demand via dynamic import; nothing added to the SSR
  payload or the initial JS for users who never reach a visual.
- `will-change` is intentionally **not** sprinkled on; GSAP manages transforms
  on the small node sets directly, and the homepage already keeps the node
  count tiny (≤ ~20 animated nodes per system, well under the 40/20 budgets).
- No new large blur filters; no new `backdrop-filter` on moving elements.

## 8. Reduced-motion behavior

- `useSvgReveal` checks `useReducedMotion()` (the existing
  `prefers-reduced-motion` hook). When reduced:
  - `[data-draw]` paths are set to `stroke-dasharray: none; stroke-dashoffset:
    0; opacity: 1` — **fully drawn, no animation**.
  - `[data-node]` set to `opacity: 1; scale: 1`.
  - **No timeline is created**, the `played` ref is forced `true`, and the
    Anime.js layer is never enabled (`enabled = !prefersReducedMotion`).
- Verified: the reduced-motion homepage render shows all three visuals in their
  final static state with no drawing, pulsing, or shimmer. The four `/work`
  reduced-motion tests and the `/work` index reduced-motion test still pass.

## 9. Light / dark behavior

- All visuals are theme-aware via CSS color tokens — no hard-coded theme colours
  except the four `/work`-matched accents in the constellation (which are brand
  constants shared with `/work`).
  - `text-primary-theme` → `#2DD4BF` (cyan) dark / `#0D3B66` (navy) light.
  - `fill-secondary-theme` → `#F472B6` (pink) dark / `#FF7F11` (orange) light.
- Per-theme opacity tuning on each integration (`opacity-60 dark:opacity-45`,
  etc.) so dark stays obsidian/cyan-premium and light stays restrained navy —
  **no washed-out invisible lines, no black-only artboards.**
- Manually verified light hero rings are clearly visible (navy on off-white),
  not faint; dark hero rings glow teal behind the portrait.

## 10. Mobile behavior

- HeroOrbitalSignatureSvg and ServiceOrbitSvg are **`lg:block hidden`** — hidden
  below 1024px so cards and CTAs stay dominant and there are no complex line
  intersections on small screens.
- Only the small, centered TransformationConstellationSvg renders on mobile
  (it sits in a centered flex container above the CTA and scales with
  `h-40 w-40 sm:h-48 sm:w-48`).
- Visibility is controlled purely with **CSS responsive classes** — no runtime
  `window` measurements.
- Verified at 390px: **no horizontal overflow**, no clipped visuals, no text
  overlap.

## 11. Snapshot updates

- **No baselines were updated.** All 30 Playwright visual tests pass against the
  existing snapshots, including both homepage snapshots.
- Why the homepage baselines still match: the homepage tests capture from
  scroll-top without scrolling the full page, so the below-fold visuals
  (Services orbit, Portfolio constellation) remain in their pre-reveal hidden
  state at capture, and the hero signature's low-opacity thin lines behind the
  portrait produce a diff below the configured `maxDiffPixelRatio` (0.005).
- The intended new visuals were verified manually via full-page screenshots
  after scrolling (dark, light, mobile, Arabic, reduced-motion) — see §12.
- **No `/work` or `/work/[slug]` snapshots changed**, as required.

## 12. Validation results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | ✅ Clean |
| `npm run lint` (new files) | ✅ Zero errors/warnings in any new or changed file |
| `npm run build` | ✅ All 14 routes built (homepage + 4 case studies) |
| `npm run test:visual` (full suite) | ✅ **30/30 passed** |
| Console errors (5 homepage states) | ✅ NONE (dark/light/mobile/Arabic/reduced) |
| Hydration warnings | ✅ None (deterministic geometry, no random IDs) |
| Horizontal overflow (5 states) | ✅ None |
| Portfolio modal | ✅ Still opens (4 modal tests pass) |
| `/work` index + 4 case studies | ✅ All pass, snapshots unchanged |

> Note on `npm run lint`: the repo-wide lint run reports pre-existing errors,
> but they all originate in the **gitignored, generated `playwright-report/`
> directory** (minified trace bundles) plus pre-existing warnings in
> `LanguageContext.tsx`. None come from M13 files — linting the new/changed
> files directly returns zero output. This is a pre-existing lint-config gap
> (the report dir is not excluded from ESLint), out of scope for this milestone.

## 13. Remaining risks

- **Lint config gap (pre-existing):** `playwright-report/` is gitignored but not
  excluded from ESLint, so a full `npm run lint` reports thousands of
  warnings/errors from generated bundles. Not introduced here; worth adding an
  `ignores` entry in a future housekeeping pass.
- **Homepage baselines don't capture the below-fold visuals' animated state.**
  Because the visual tests never scroll, the Services/Portfolio reveals aren't
  exercised by snapshots. If future regression coverage of those reveals is
  desired, add a dedicated test that scrolls them into view before capturing.
- **Anime.js bundle:** ~2 MB unpacked in `node_modules`, but only the
  tree-shaken `animate`/`stagger` runtime ships, and only via dynamic import on
  visual mount. Footprint on first paint is unchanged.
- `@types/animejs` (v3) was intentionally **not** kept — v4 ships its own types;
  installing the v3 types would mis-type the v4 API.

## 14. Next recommended milestone

**HOME M14 — Section choreography + scroll-progress instrumentation.** With the
SVG systems in place, the next premium step is a light cross-section scroll
choreography pass (e.g. a thin vertical "system spine" / progress indicator tying
Hero → Services → Portfolio together, and subtle parallax on the existing ambient
orbs) — still GSAP-owned, still reduced-motion-safe, and an optional dedicated
visual test that scrolls the homepage to lock in baselines for the new
below-fold reveals.
