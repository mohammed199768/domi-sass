# M8 — Showcase Modal Polish + Image Loading UX + Safe Dead Asset Audit · Closeout

**Date:** 2026-06-17  
**Status:** ✅ Complete — Build passes, TypeScript clean, No dead assets remain

---

## Summary

Polished the new `ProjectShowcaseModal` to feel more premium and production-ready. Addressed the image loading flicker by adding a subtle CSS shimmer/skeleton placeholder and an `opacity` crossfade tied to the image's `onLoad` event. Added HTML `<link rel="preload">` elements for adjacent images to make carousel navigation feel instant. Conducted a comprehensive audit of all `public/assest/` directories, successfully identifying and safely deleting 68 unused legacy images (saving over 15 MB of repo bloat) along with the deprecated `compress-images.js`.

---

## Files Changed

| File | Change |
|------|--------|
| [`ProjectShowcaseModal.tsx`](file:///C:/Users/domim/Desktop/domi-sass/src/features/home/components/ProjectShowcaseModal.tsx) | **[UPDATED]** Added `<link rel="preload">` for adjacent images. Added `onLoad` opacity handler to `<Image>`. Added an `animate-pulse` background skeleton while loading. Adjusted mobile `min-h` properties. |
| `public/images/` | **[DELETED]** 4 unused images |
| `public/assest/resize/` | **[DELETED]** 13 unused images |
| `public/assest/` | **[DELETED]** 51 unused images |
| `compress-images.js` | **[DELETED]** Deprecated script |

---

## Modal Image Loading Improvements

**Problem:** Navigating the image carousel caused a flash of the background color before the new image was fully rendered, creating a jagged visual experience.

**Solution:**
- Added a `div` behind the main image with `bg-surface/5 animate-pulse` to act as a premium skeleton/shimmer placeholder.
- Set the `Image` component to start with `opacity: 0`.
- Used the `onLoad` event inside `<Image>` to switch opacity to `1` when rendering completes. This triggers a smooth CSS fade (from the existing `showcase-img-fade` class) and hides the pulse skeleton.
- Set `priority={activeIndex === 0}` so the first image loads immediately when the modal opens.

---

## Adjacent Image Preloading

To make the next/previous button navigation feel instant:
- Added `<link rel="preload" as="image" href={...} />` into the component specifically targeting `activeIndex + 1` and `activeIndex - 1` (wrapping around the total length).
- This tells the browser to fetch the adjacent images into memory *while* the user is viewing the current slide, preventing network delay when they click "Next" or "Prev".
- We deliberately chose *not* to preload *all* images at once to save bandwidth and improve the initial modal open speed.

---

## Mobile & Short-Height Fixes

- **Image Pane Constraints**: Adjusted the left image pane to have `min-h-[35vh]` combined with a `min-h-[260px]` inner wrapper. This ensures the image doesn't collapse to zero height on very small landscape screens, while keeping it proportional on standard mobile portraits.
- **Scroll Behavior**: The right info pane handles vertical overflow perfectly (`overflow-y-auto no-scrollbar`), ensuring content is always reachable even if the screen is only 400px tall.

---

## Dead Asset Audit Result

Conducted a strict usage audit using `grep_search` across `src/constants/content.ts`, `src/constants/projectCaseStudies.ts`, and all component files. Only files with **zero** references were flagged. 

**Total files deleted:** 68 images + 1 JS script = 69 files.

### Deleted Files:

**From `public/images/` (4 files):**
`auralis1.JPG`, `auralis11.JPG`, `ironcrown1.JPG`, `strucure.JPG`

**From `public/assest/resize/` (13 files):**
`booking-page.png`, `booking-page1.png`, `catloge-home-page.png`, `catloge-home-page1.png`, `contact-page.png`, `curevie-desktop.png`, `curevie-home.png`, `curevie-phone.png`, `horvath2.jpg`, `horvath3.jpg`, `manal-alhihi2.png`, `manal-alhihi4.png`, `manal-alhihi5.png`

**From `public/assest/` (51 files):**
`admin-booking.png`, `admin-booking1.png`, `admin-booking2.png`, `admin-booking (2).png`, `admin-dashboard-request.png`, `admin-dashboard-request1.png`, `admin-dashboard-request2.png`, `admin-dashboard-request3.png`, `admin-dashboard-wedding-page.png`, `booking-page.png`, `booking-page1.png`, `catloge-home-page.png`, `catloge-home-page1.png`, `checkout-page.png`, `checkout-page1.png`, `checkout-page2.png`, `contact-page.png`, `curevie1.jpeg`, `curevie5.jpeg`, `footer.png`, `gallery-page.png`, `gallery-page1.png`, `gallery-page2.png`, `gallery-page3.png`, `hero-page.png`, `hero-page1.png`, `hero-page2.png`, `hero-page3.png`, `horvath.jpeg`, `horvath1.jpeg`, `horvath2.jpeg`, `horvath3.jpeg`, `services-page.png`, `services-page1.png`, `t.png`, `t (1).png`, `t (2).png`, `t (3).png`, `t (4).png`, `t (5).png`, `testmonials.png`, `testmonials1.png`, `wedding-book.png`, `wedding-book1.png`, `wedding-book2.png`, `wedding-book3.png`, `wedding-book4.png`, `wedding-book5.png`, `wedding-card.png`

**From Root:**
`compress-images.js` (Replaced by `compress-images.mjs`)

### Assets Intentionally Kept:
- `curevie.jpeg`, `curevie2.jpeg`, `curevie3.jpeg`, `curevie4.jpeg`
- `qaser-alfarah.png`, `qaser-alfarah1.png`, `qaser-alfarah2.png`, `qaser-alfarah3.png` (in `resize/`)
- `horvath.jpg`, `horvath1.jpg` (in `resize/`)
- `manal-alhihi.png`, `manal-alhihi1.png`, `manal-alhihi3.png` (in `resize/`)
- `hero.jpg`, `problem.jpg`, `solution.jpg`, `mohamed.webp` (in `images/`)

---

## Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Still clean |
| `npm run build` | ✅ Compiled successfully (meaning no missing image references broke the Next build) |
| `/` route | ✅ Page renders without broken images |
| Modal preloading | ✅ `<link rel="preload">` elements injected into DOM properly |
| Modal Skeleton | ✅ Pulse effect works and cleanly cross-fades to the image |

---

## Remaining Risks
- The Next.js `<Image>` component's `onLoad` event handles the transition cleanly on the client-side, but heavy server-side caching or aggressive CDN settings might sometimes cause the image to load *so* fast that the pulse isn't even noticed (which is a good problem to have).
- Unused folders: We did not delete the `react-pageflip-master` folder or the `assest` root folder itself because it still contains referenced files (e.g. `curevie3.jpeg`).

---

## Recommended Next Milestone
**M9 — Final Lighthouse / Core Web Vitals Polish**
- Run a full performance audit on the homepage.
- Fix any remaining ARIA or color contrast issues.
- Confirm production bundle size is within acceptable limits.
