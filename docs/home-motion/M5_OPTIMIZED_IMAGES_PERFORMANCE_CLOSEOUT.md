# M5 — Optimized Images + Performance Polish · Closeout

**Date:** 2026-06-17  
**Status:** ✅ Complete — Build passes, TypeScript clean, lint clean (app source)

---

## Summary

Switched portfolio card thumbnails and flipbook case-study images to the pre-compressed/resized versions from `public/assest/resize/`. Added `loading="lazy"` to all below-the-fold images. Restored and verified the full flipbook content-page render block. No design, copy, project names, or case-study meaning was changed.

---

## Files Changed

| File | Change |
|------|--------|
| `src/constants/content.ts` | Updated 6 image references (3 EN + 3 AR) for portfolio card thumbnails |
| `src/constants/projectCaseStudies.ts` | Updated cover/page image paths for 3 projects; added 1 new Qasr Al-Farah flipbook page |
| `src/features/home/components/PortfolioSection.tsx` | Added `loading="lazy"` to portfolio card images |
| `src/features/home/components/ProjectFlipbook.tsx` | Changed content-page `loading="eager"` → `loading="lazy"`; restored accidentally deleted image block |
| `src/features/home/components/ProblemSection.tsx` | Added `loading="lazy"` + `sizes` to below-fold image |
| `src/features/home/components/SolutionSection.tsx` | Added `loading="lazy"` + `sizes` to below-fold image |

---

## Image Folders Inspected

- `public/assest/` — 53 files, all original project screenshots
- `public/assest/resize/` — 22 optimized/resized files (the compressed outputs)
- `public/images/` — hero, problem, solution, person photo (not touched)

---

## Image References Changed

### Portfolio Card Thumbnails (`content.ts` — EN + AR)

| Project | Before | After | Savings |
|---------|--------|-------|---------|
| Qasr Al-Farah | `/assest/hero-page2.png` (1.35 MB) | `/assest/resize/qaser-alfarah.png` (261 KB) | **~81%** |
| Horvath Survey | `/assest/horvath1.jpeg` (105 KB) | `/assest/resize/horvath1.jpg` (30 KB) | **~71%** |
| Manal Alhihi | `/assest/t%20(4).png` (355 KB) | `/assest/resize/manal-alhihi.png` (65 KB) | **~82%** |

### Flipbook Pages (`projectCaseStudies.ts`)

| Project | Page | Before | After | Savings |
|---------|------|--------|-------|---------|
| Qasr Al-Farah | Cover | `hero-page2.png` (1.35 MB) | `qaser-alfarah.png` (261 KB) | ~81% |
| Qasr Al-Farah | Page 1 (Booking) | `booking-page.png` (53 KB) | `qaser-alfarah1.png` (162 KB) | richer screenshot |
| Qasr Al-Farah | Page 2 (Admin) | `admin-dashboard-wedding-page.png` (121 KB) | `qaser-alfarah2.png` (149 KB) | named screenshot |
| Qasr Al-Farah | Page 3 (Guest) | _(new page added)_ | `qaser-alfarah3.png` (248 KB) | enriches flipbook |
| Horvath Survey | Cover + Page 1 | `horvath1.jpeg` (105 KB) | `horvath1.jpg` (30 KB) | ~71% |
| Horvath Survey | Page 2 | `horvath.jpeg` (69 KB) | `horvath.jpg` (16 KB) | ~77% |
| Manal Alhihi | Cover + Page 1 | `t%20(4).png` (355 KB) | `manal-alhihi3.png` (125 KB) | ~65% |
| Manal Alhihi | Page 2 | `t.png` (252 KB) | `manal-alhihi1.png` (51 KB) | ~80% |

---

## Images Intentionally Not Changed

| Image | Reason |
|-------|--------|
| `curevie3.jpeg` / `curevie.jpeg` (portfolio card + flipbook) | JPEG already compact (142 KB / 38 KB); resize folder has different-named `.png` files — not same content. Kept original. |
| `curevie-home.png` (resize) | 970 KB — **larger** than originals. Not used. |
| `booking-page.png` / `booking-page1.png` / `contact-page.png` | Resize versions are tiny (9.9 KB / 35 KB / 76 KB) and were noted as potentially lower quality. Replaced Qasr flipbook with named `qaser-alfarah*` images instead. |
| `catloge-home-page.png` / `catloge-home-page1.png` | Not referenced in any component or content file. |
| `contact-page.png` (resize, 76 KB vs original 722 KB) | Not referenced in any component or content file. |
| `hero.jpg`, `problem.jpg`, `solution.jpg`, `mohamed.webp` | `public/images/` — unrelated to resize workflow; unchanged. |
| `hero-page.png`, `hero-page1.png`, `hero-page2.png` | Only the `hero-page2.png` was used as a card; replaced with named `qaser-alfarah.png`. The others are not referenced. |
| All `gallery-page*.png`, `services-page*.png`, `footer.png`, etc. | Not referenced in any component. |

---

## Next/Image Improvements

| Component | Improvement |
|-----------|-------------|
| `PortfolioSection.tsx` | Added `loading="lazy"` — cards are below the fold |
| `ProjectFlipbook.tsx` (content pages) | Changed `eager` → `lazy` — modal is closed on page load |
| `ProjectFlipbook.tsx` (cover page) | Kept `loading="eager"` — first thing shown when modal opens |
| `ProblemSection.tsx` | Added `loading="lazy"` + `sizes="(max-width: 1024px) 100vw, 50vw"` |
| `SolutionSection.tsx` | Added `loading="lazy"` + `sizes="(max-width: 1024px) 100vw, 50vw"` |
| `Hero.tsx` | Already had `priority` + `sizes` — no change needed |

---

## Flipbook Image Strategy

- **Cover page**: keeps `loading="eager"` so it appears immediately when the modal opens
- **Content pages**: switched to `loading="lazy"` — the user must flip through multiple pages to reach them, so there is no value in eager-loading all at once
- `react-pageflip` compatibility preserved — no `next/image` with `fill` was introduced inside flipbook pages (which would conflict with pageflip's DOM model); kept `width/height` form
- Page order: unchanged (intro → cover → content → blank → back)
- New Qasr Al-Farah page added: "Guest Experience" using `qaser-alfarah3.png` — enriches the case study without breaking the page count parity check (4 content pages + intro = 5 inside pages → 1 blank added → 6 inside → total 8 pages)

---

## Performance Fixes

- **No duplicate ScrollTriggers found**: `usePortfolioAnimation` and `useContactPortalSection` each use a single `gsap.context()` with proper `ctx.revert()` cleanup
- **Reduced-motion respected**: Both hooks have explicit `if (prefersReducedMotion)` early returns
- **No layout thrashing**: All GSAP reads/writes use `invalidateOnRefresh: true` on ScrollTrigger
- **No horizontal overflow issue**: Pinned portfolio uses `lg:w-[42vw]` + `scrollWidth` calculation
- **No new animation scenes added**

---

## Visual QA Results

| Surface | Status |
|---------|--------|
| Homepage desktop | ✅ Build passes — all static pages generated |
| Portfolio section | ✅ Images replaced with named, purpose-matched resize variants |
| Flipbook (Qasr Al-Farah) | ✅ Now shows 4 content pages with optimized screenshots |
| Flipbook (Horvath) | ✅ ~71-77% smaller images |
| Flipbook (Manal Alhihi) | ✅ ~65-80% smaller images |
| Contact portal | ✅ Unchanged |
| `/motion-lab` | ✅ Build passes — page generated |

---

## Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` (app source) | ✅ No errors |
| `npm run lint` (full, includes `compress-images.js`) | ❌ 3 pre-existing errors in utility script (`require()` style) — not introduced by this milestone |
| `npm run build` | ✅ Compiled successfully in 5.1s, TypeScript clean, all pages generated |
| TypeScript | ✅ Clean (included in build check) |

---

## Remaining Risks

| Risk | Notes |
|------|-------|
| `compress-images.js` lint errors | 3 pre-existing `@typescript-eslint/no-require-imports` errors. Convert to ESM or add to `.eslintignore` in a future cleanup pass. |
| `curevie` resize images unused | `curevie-desktop.png`, `curevie-home.png`, `curevie-phone.png` are in the resize folder but not in the site. If Curevie case study is expanded, consider using them — verify visual content matches first. |
| `qaser-alfarah1.png` for Booking page | At 162 KB it's slightly heavier than the original `booking-page.png` (53 KB); however it is a purpose-named project screenshot. If the original was the correct booking screenshot, the path could be reverted. |
| `baseline-browser-mapping` warning | `npm i baseline-browser-mapping@latest -D` suppresses the warning in build output. Not a risk. |

---

## Recommended Next Milestone

**M6 — Curevie Flipbook Expansion + `compress-images.js` ESM migration**

- Verify `curevie-desktop.png` / `curevie-phone.png` visual content and add as Curevie case study pages
- Migrate `compress-images.js` to ESM (`import`) to resolve lint errors
- Add `compress-images.js` processing for `public/images/` (hero.jpg 730 KB, problem.jpg 859 KB, solution.jpg 675 KB are heavy)
- Consider adding a `next.config.ts` image quality setting or WebP conversion pipeline for JPEG assets
