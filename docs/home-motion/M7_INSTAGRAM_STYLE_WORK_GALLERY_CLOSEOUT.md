# M7 — Remove Flipbook + Instagram-Style Work Gallery · Closeout

**Date:** 2026-06-17  
**Status:** ✅ Complete — Lint clean, Build passes, TypeScript clean

---

## Summary

Removed the entire book/flipbook UI system. Replaced the portfolio section's horizontal-scroll book cards with a clean 4-column grid (responsive: 1→2→4 cols). Replaced the `ProjectFlipbookModal` with `ProjectShowcaseModal` — a split-panel, image-carousel-left / project-info-right modal that uses all existing `projectCaseStudies.ts` page data. Uninstalled `react-pageflip`. Stripped all `realistic-book-*` CSS from globals. Simplified the portfolio animation hook to a vertical reveal stagger.

---

## Files Changed

| File | Change |
|------|--------|
| [`ProjectShowcaseModal.tsx`](file:///C:/Users/domim/Desktop/domi-sass/src/features/home/components/ProjectShowcaseModal.tsx) | **[NEW]** Instagram-style split-panel modal with image carousel |
| [`PortfolioSection.tsx`](file:///C:/Users/domim/Desktop/domi-sass/src/features/home/components/PortfolioSection.tsx) | **[REWRITTEN]** Grid layout + new modal, removed flipbook modal |
| [`usePortfolioAnimation.ts`](file:///C:/Users/domim/Desktop/domi-sass/src/features/home/hooks/usePortfolioAnimation.ts) | **[REWRITTEN]** Removed horizontal pin, simplified to grid reveal |
| [`globals.css`](file:///C:/Users/domim/Desktop/domi-sass/src/styles/globals.css) | **[REWRITTEN]** Stripped ~280 lines of flipbook CSS, added `showcase-img-fade` keyframe |
| `ProjectFlipbook.tsx` | **[DELETED]** No longer used |
| `ProjectFlipbookModal.tsx` | **[DELETED]** No longer used |
| `package.json` | `react-pageflip` uninstalled |

---

## What Flipbook Code Was Removed

| Removed | Details |
|---------|---------|
| `ProjectFlipbook.tsx` | Full component (~560 lines) — `react-pageflip` wrapper, `RealBookPage`, `FlipbookControls`, `buildFlipbookPages`, all book page kind renderers |
| `ProjectFlipbookModal.tsx` | Full component — modal shell, body scroll lock, `ProjectFlipbook` embed |
| `realistic-book-*` CSS | ~280 lines — book gutter, page texture, paper texture, cover gradients, spine, controls, shadow, responsive overrides |
| `react-pageflip` npm package | Removed from `node_modules` and `package.json` |
| Horizontal scroll pin | `usePinnedPortfolio`, `getScrollAmount`, the GSAP horizontal pin `ScrollTrigger`, `isDesktop` media query from hook |
| `useMediaQuery` import | Removed from hook (only needed for pin logic) |

---

## New Gallery/Post Viewer Architecture

### Portfolio Grid (`PortfolioSection.tsx`)
- **Layout**: CSS grid, responsive `1 → 2 → 4 cols` (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`)
- **Card image**: `aspect-[4/3]`, `object-cover`, `loading="lazy"`, proper `sizes`
- **Hover**: GSAP-animated image scale (1.08), gradient overlay reveal, slide-up project title/category text
- **Footer**: compact numbered row with project name + primary-color arrow CTA
- **Click**: opens `ProjectShowcaseModal` for projects with a slug

### Project Showcase Modal (`ProjectShowcaseModal.tsx`)
- **Left pane** (55% width on desktop): large project image with prev/next chevrons, dot indicator, thumbnail strip
- **Right pane** (flex-1): project category eyebrow, title, summary, current-screen eyebrow/title/body, counter row with prev/next buttons, attribution footer
- **Desktop**: side-by-side (`row` flexbox)
- **Mobile**: full-screen stacked (`flex-col`, the left image pane renders first)
- **Close**: X button top-right, Escape key, backdrop click
- **Image cycling**: `useState(activeIndex)`, `imageKey` counter triggers `showcase-img-fade` CSS animation on each change
- **Keyboard**: `ArrowRight`/`ArrowDown` = next, `ArrowLeft`/`ArrowUp` = prev, `Escape` = close
- **GSAP entrance**: backdrop fade, panel `opacity + y + scale` spring (`expo.out`, 0.44s)
- **RTL**: `flex-direction: row-reverse` when Arabic, chevron directions swap, text aligned right

---

## Data Strategy

No data files were changed. `projectCaseStudies.ts` remains the single source of truth.

- **Card thumbnails**: still from `content.ts` → `item.image` (the M5/M6 optimized paths)
- **Modal carousel**: `projectCaseStudies[slug].pages[]` → each page's `image`, `eyebrow`, `title`, `body` in the active language
- **Modal header**: `projectCaseStudies[slug].title`, `.category`, `.summary`
- Page count: Curevie now has 4 pages (from M6), Qasr Al-Farah has 4, Horvath 2, Manal 2

---

## Motion Behavior

| Animation | Implementation |
|-----------|---------------|
| Section title reveal | GSAP from `y:40, opacity:0`, stagger 0.18s, power3.out, ScrollTrigger |
| Ambient orb | GSAP fromTo scrub, ScrollTrigger |
| Grid cards stagger | GSAP from `y:60, opacity:0`, stagger 0.1s, back.out(1.4), ScrollTrigger |
| Card hover image | GSAP `scale: 1.08`, 0.45s power2.out |
| Card hover overlay | GSAP opacity 1→0 + CSS gradient-to-t overlay |
| Modal entrance | GSAP `opacity + y:20 + scale:0.97` → natural, expo.out 0.44s |
| Image cross-fade | CSS `@keyframes showcase-img-fade` — `opacity 0→1, scale 1.018→1`, 0.28s |
| Reduced motion | GSAP duration ~0, CSS animation disabled via `@media (prefers-reduced-motion: reduce)` |

---

## Mobile Behavior

| Breakpoint | Grid | Modal |
|------------|------|-------|
| `< 640px` (mobile) | 1 column full-width cards | Full-screen stacked, image pane on top (min-height 280px), info pane scrolls below |
| `640–1279px` (tablet) | 2 column grid | Same stacked layout |
| `≥ 1280px` (desktop) | 4 column grid | Split-panel side-by-side |

- No horizontal overflow at 390px
- Body scroll lock on open, released on close (restores `scrollY` position)
- Thumbnail strip is horizontally scrollable with `no-scrollbar`
- Image pane has `style={{ minHeight: "280px" }}` to prevent collapse on mobile

---

## Accessibility Notes

| Feature | Implementation |
|---------|---------------|
| Modal role | `role="dialog" aria-modal="true" aria-labelledby="showcase-modal-title"` |
| Modal title | `id="showcase-modal-title"` on the project `<h2>` |
| Close button | `aria-label="Close project showcase"` |
| Prev/Next in image pane | `aria-label="Previous screenshot"` / `"Next screenshot"` |
| Dot indicators | `aria-label="Go to screenshot N"` |
| Thumbnail buttons | `aria-label="View screenshot N"` |
| Counter nav buttons | `aria-label="Previous"` / `"Next"` |
| Keyboard | Escape = close, ArrowRight/Down = next, ArrowLeft/Up = prev |
| Card buttons | `aria-label="Open [title] case study"` |
| All images | meaningful `alt` text (page title or project title) |

---

## Performance Notes

- Grid card images: `loading="lazy"`, `sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"`
- Modal main image: `loading="lazy"`, `sizes="(max-width: 1024px) 100vw, 55vw"`, `priority={false}`
- Thumbnails: `loading="lazy"`, `sizes="56px"`
- No eager-loading of all modal images before open (modal renders only when `open && project`)
- `showcase-img-fade` is a lightweight CSS animation — no JS for image transitions
- Removed 2 npm packages (`react-pageflip` + its dependency `page-flip`)
- Removed ~280 lines of CSS
- No new dependencies added

---

## Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Zero errors |
| `npm run build` | ✅ Compiled successfully, TypeScript clean |
| `/` route | ✅ Static page generated |
| `/motion-lab` route | ✅ Static page generated |
| Portfolio grid | ✅ 4 project cards, all slugs wired to modal |
| All modals (Qasr / Curevie / Horvath / Manal) | ✅ Open correctly, images load |
| ESLint for deleted files | ✅ No dangling imports |
| `react-pageflip` removed | ✅ Confirmed via `npm uninstall` + grep |
| No flipbook CSS in build | ✅ All `realistic-book-*` rules stripped |

---

## Remaining Risks

| Risk | Notes |
|------|-------|
| Modal scroll on very small height screens (< 600px) | Right pane overflows downward. Works with scroll, but consider `max-h` constraint for landscape phone. |
| `showcase-img-fade` flickers if image CDN is slow | The fade animation starts before the image fully loads. Adding a `blur-sm` skeleton behind the image would improve perceived loading. |
| `onMouseDown` backdrop close | Uses `onMouseDown` on the backdrop for faster feel. If user clicks and drags from content to backdrop, modal closes. This is standard behavior but could be refined with a drag-threshold. |
| 4-col XL grid card height | At XL (4 cols), cards use `aspect-[4/3]` which may feel short for tall screenshots. Card footer text may truncate for very long project titles. |
| `react-pageflip-master/` still in repo | The `eslint.config.mjs` ignores `react-pageflip-master/**`. That directory may still exist if it was committed. It can be deleted safely if it exists. |

---

## Recommended Next Milestone

**M8 — Visual polish + Mobile refinement**

- Add a gentle skeleton/placeholder for modal images while loading
- Add landscape phone modal fix (constrain left pane height on `@media (max-height: 600px)`)
- Consider adding more projects or an "Explore all work" section
- Consider adding a `loading="eager"` cover-image-first strategy: preload the first `pages[0].image` when the modal opens
- Verify dark mode contrast on the modal right panel (text-muted in dark mode)
- Verify RTL card layout at 390px width (text alignment, arrow direction)
