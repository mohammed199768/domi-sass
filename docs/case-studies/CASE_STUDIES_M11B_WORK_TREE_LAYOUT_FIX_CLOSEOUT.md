# CASE STUDIES M11B — WORK TREE LAYOUT FIX CLOSEOUT

## Summary
M11B fixes the rejected `/work` index page. The original M11 implementation was a hardcoded-black page with a structural SVG tree that was visually disconnected from the four project cards. M11B replaces it with a fully theme-aware, four-branch deterministic transformation tree with one card per branch, a proper light/dark mode, and a clean mobile vertical timeline.

---

## What Was Wrong with M11

| Problem | Root Cause |
|---|---|
| Page looked black in light mode | Hardcoded `bg-[#050505]`, `text-white`, `bg-[#111]`, `bg-[#1a1a1a]` everywhere — no theme tokens |
| Branches didn't connect to cards | SVG lived in an `absolute` overlay with pixel coordinates that never matched the cards' CSS positions |
| All projects appeared on one line | Branch y-values (150, 300, 500, 650px) didn't align with where cards actually rendered |
| Cards felt floating and sparse | Cards used `window.innerWidth` check in SSR render — positions never applied correctly |
| Composition felt unfinished | No per-branch accent colors, no visual identity per project, no root node |

---

## Files Changed

| File | Change |
|---|---|
| `src/features/work/TransformationTreeClient.tsx` | Complete rewrite |
| `tests/visual/__screenshots__/pages.visual.spec.ts/work-index-desktop.png` | Baseline updated |
| `tests/visual/__screenshots__/pages.visual.spec.ts/work-index-mobile.png` | Baseline updated |
| `tests/visual/__screenshots__/pages.visual.spec.ts/work-index-reduced.png` | Baseline updated |

No other files were changed. No case-study pages were touched.

---

## Light Mode Fix

Removed all hardcoded black color values. Now uses the existing design token system:

- `bg-background` / `text-foreground` — responds to `.dark` class
- `border-border` — uses `--border` CSS variable
- `text-muted` — uses `--muted` variable
- `text-primary-theme` / `bg-secondary-theme` — for branded accents
- `glass` / `glass-card` Tailwind utilities — use `color-mix` against `--surface` so they adapt to both themes
- Header uses `bg-background/80 backdrop-blur-xl` — consistent with case-study headers

**Dark mode**: cinematic obsidian (`#050505` via CSS var)  
**Light mode**: warm off-white (`#ffffff` via CSS var) with soft glass cards and subtle colored borders

---

## Branch / Card Mapping Fix

The fundamental problem in M11 was that the SVG overlay used pixel coordinates in a `1000×800` viewBox while cards were positioned absolutely in CSS with no relation to those coordinates.

**M11B solution — CSS Grid + SVG overlay with `preserveAspectRatio="none"`:**

1. A 5-column × 5-row CSS Grid is declared with named `gridArea` for each of the 4 corners + 1 center cell
2. Project cards are placed in grid areas: `manal` (top-left), `qasr` (top-right), `curevie` (bottom-left), `horvath` (bottom-right)
3. The SVG is placed as an `absolute` overlay covering the entire grid with `w-full h-full` + `preserveAspectRatio="none"`
4. SVG uses a `0 0 100 100` viewBox — so coordinates are percentages of the grid
5. Root node sits at `(50, 50)`. Branch endpoints sit at the 4 corners at matching percentage positions:
   - Manal: `(18, 22)` → aligns with top-left card
   - Qasr: `(82, 22)` → aligns with top-right card
   - Curevie: `(18, 78)` → aligns with bottom-left card
   - Horvath: `(82, 78)` → aligns with bottom-right card
6. Each branch is a smooth cubic Bézier curve from root → endpoint, bowing gently outward

---

## Desktop Tree Layout

- CSS Grid with `gridTemplateAreas` for named placement — no JS measurement
- SVG overlay with `preserveAspectRatio="none"` stretches exactly over the grid
- `viewBox="0 0 100 100"` + branch coordinates in percentage space = always aligned
- Each branch has its own accent color (teal / pink / blue / violet)
- Root node at center with primary-theme color
- Endpoint nodes: large soft outer ring + small sharp inner dot

---

## Mobile Fallback

- Desktop grid and SVG are hidden: `hidden lg:block`
- Mobile section shown: `lg:hidden`
- Vertical trunk line via CSS border on a positioned element
- Each card preceded by a circular branch node dot (accent-colored border + inner dot)
- Cards stack vertically, no horizontal overflow
- RTL-aware: trunk line switches side for Arabic, card layout flips correctly

---

## Performance Decisions

| Decision | Rationale |
|---|---|
| No WebGL / Canvas | Pure SVG + CSS |
| `strokeDashoffset` draw animation | One-shot, no RAF loop |
| GSAP `ScrollTrigger` with `once: true` | Fires once per page load |
| No continuous animations | Hover uses CSS `transition` only |
| Reduced motion: skip all GSAP | Static final state shown immediately |
| No image thumbnails | Removed cover images — composition clarity > visual clutter |

---

## Snapshot Updates

Only the 3 `/work` index snapshots were updated:
- `work-index-desktop.png`
- `work-index-mobile.png`
- `work-index-reduced.png`

No Manal, Qasr, Curevie, Horvath, homepage, or modal snapshots were modified.

---

## Validation Results

| Step | Result |
|---|---|
| `npm run lint` | ✅ Clean |
| `npx tsc --noEmit` | ✅ Clean |
| `npm run build` | ✅ Clean — 14 pages generated |
| `npm run test:visual` (before update) | 23 passed, 3 failed (only `/work` diffs) |
| `npm run test:visual:update` | 26 passed — `/work` baselines updated |
| `npm run test:visual` (after update) | 26 passed |

---

## Remaining Risks

- **SVG `preserveAspectRatio="none"`** stretches the SVG to fill the grid. If the grid row heights change significantly due to content length, branch endpoints may drift slightly from card corners. The current layout uses `min-h-[220px]` on the centre cell as a stabiliser.
- **Arabic branch direction** is layout-correct (grid flips via `dir="rtl"` on the parent), but SVG endpoints are hardcoded at left/right. The SVG does not flip for RTL — branches still point left/right by absolute position. This is acceptable because the visual metaphor is a radial tree, not a directional flow.

---

## Next Recommended Milestone

**M12 — Navigation & Routing polish**

Suggested tasks:
- Add `/work` as a visible nav item in the main Header
- Animate the homepage → `/work` transition
- Add structured data (JSON-LD) for the portfolio pages
- Add Open Graph metadata per case study
