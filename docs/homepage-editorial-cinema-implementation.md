# DOMINASE Homepage — Editorial Cinema Implementation

Date: 2026-07-24  
Production repository: `C:\Users\domim\Desktop\domi-sass`  
Implementation branch: `feat/editorial-cinema-homepage`

## 1. Starting branch and HEAD

- The production repository started clean on `main`.
- Starting HEAD: `4e04d5d1c2f9d7bbb207d174ba63c628af4e85c7`.
- Work was isolated on `feat/editorial-cinema-homepage`.
- The previous 1440 × 900 homepage measured approximately 14,475 px, or 16.1 viewports, with the strongest project proof appearing late in the journey.
- No commit, push, or pull request was created.

## 2. Repositories inspected

- Production: `C:\Users\domim\Desktop\domi-sass`
- Experimental, treated as read-only: `C:\Users\domim\Desktop\new-dominase-hero`
- The experimental systems inspected included `HeroFrameSequence`, `CinematicOpening`, `CinematicOverlay`, `LiquidTransition`, `MethodOrbit`, `SplitStickyShowcase`, `PhoneScrollShowcase`, `DigitalEcosystem`, the section-progress helpers, motion contracts, tokens, and the 193-frame hero source.
- The production audit covered the existing homepage composition, layout providers, Header, MobileNav, Footer, floating controls, themes, language context, canonical case-study data, testimonials, route structure, motion utilities, and real media.
- The experimental repository was not modified.

## 3. Planning files read

All ten files in `new-dominase-hero/docs/final-homepage-planning` were read in full:

1. `01-DOMI-SASS-AUDIT.md`
2. `02-EXPERIMENTAL-HOMEPAGE-AUDIT.md`
3. `03-REFERENCE-BRIEF-ANALYSIS.md`
4. `04-REPOSITORY-COMPATIBILITY-MAP.md`
5. `05-CREATIVE-DIRECTIONS.md`
6. `06-RECOMMENDED-HOMEPAGE-BLUEPRINT.md`
7. `07-MOTION-AND-READABILITY-CONTRACT.md`
8. `08-MIGRATION-PLAN.md`
9. `09-FIRST-IMPLEMENTATION-SLICE.md`
10. `10-DECISION-SUMMARY.md`

The attached final brief superseded the earlier staged approval gates and requested the complete Editorial Cinema implementation in this task.

## 4. Open Design availability

Open Design was checked before implementation. Its local daemon at `127.0.0.1:7456` was unavailable, so there was no reachable active project or artifact to inspect. No Open Design source was changed.

## 5. Final architecture

The production homepage now follows this sequence:

1. Preserved Header and mobile navigation
2. Clarity-first cinematic hero
3. Three real services
4. Four-stage method
5. Featured Qasr Al-Farah product proof
6. Four canonical selected projects
7. Four system layers
8. Real testimonial trust section
9. Contact/diagnosis action gateway
10. Preserved Footer

Obsolete homepage sections were removed from `src/app/page.tsx`, but their reusable component files were retained for rollback and unrelated routes were left intact.

## 6. Content sources used

- Brand, hero, services, testimonials, CTA, navigation, footer, and contact language: `src/constants/content.ts`
- Canonical project slugs, case-study routes, cover media, friction, transformation, and bilingual case-study copy: `src/constants/caseStudies.ts`
- Existing Qasr Al-Farah product captures: `public/assest/resize/qaser-alfarah.png`, `qaser-alfarah1.png`, and `qaser-alfarah2.png`
- Existing canonical covers for HORVÁTH Survey, Qasr Al-Farah, Manal Alhihi, and Curevie
- New bilingual editorial bridge copy is centralized in `src/features/home/content/homeContent.ts`.
- No client, project, metric, result, testimonial, award, logo, or product screen was invented.

## 7. Hero media strategy

- The 193 experimental WebP frames were inspected as a source system.
- Every fourth source frame was sampled, including the first and last, to produce 49 production frames.
- Frame 0001 is also the static poster.
- The complete production hero media directory contains 50 files and is 1,933,300 bytes on disk.
- The browser begins with a real poster. The canvas is an enhancement, never the only visual.
- Enhancement requires a viewport of at least 1025 px × 560 px, fine hover/pointer input, no reduced-motion preference, and more than 4 GB device memory when the browser reports that value.
- The frame store is capped at 18 decoded images, prefetches seven ahead and three behind, and caps canvas DPR at 1.5.
- Scroll work is section-bounded, requestAnimationFrame-throttled, and IntersectionObserver-gated.
- Mobile, tablet, short landscape, reduced motion, no-JavaScript, and failed-frame cases retain the poster.
- Directed hero traversal changed the sampled canvas pixels at top, middle, and end and loaded 23 sequence resources; the small finishing scale reached approximately 1.025.

## 8. Services implementation

The page uses the three real bilingual service categories already defined in production:

1. Websites that explain the offer
2. Product and dashboard interfaces
3. Booking, form, and workflow paths

They are rendered as wide numbered rows with descriptive copy and one route to the real contact page. There are no decorative cards, invented outcomes, or motion loops.

## 9. Method implementation

The method is a real bilingual four-stage sequence:

1. Diagnosis
2. Trust Architecture
3. Living Build
4. Continuous Improvement

Desktop uses one sticky, simplified system visual whose state is owned by the four semantic ordered-list steps. Tablet, mobile, and reduced-motion layouts use readable normal flow. Forward state verification produced `0 → 1 → 2 → 3`; reverse verification produced `3 → 2 → 1 → 0`.

## 10. Featured product selected and why

Qasr Al-Farah was selected.

The preferred HORVÁTH option had only two verified production captures: an assessment form and landing screen. That was not sufficient to substantiate a three-stage product story without repetition or invention. Qasr had three distinct verified states that support a truthful sequence:

1. Public offer and booking entry
2. Bilingual service exploration
3. Custom invitation and post-booking continuity

The section links to `/work/qasr-alfarah`.

## 11. Selected Work data binding

Selected Work binds directly to the canonical `caseStudies` record rather than duplicating project claims. It uses:

1. HORVÁTH Survey — `/work/horvath-survey`
2. Qasr Al-Farah — `/work/qasr-alfarah`
3. Manal Alhihi — `/work/manal-alhihi`
4. Curevie — `/work/curevie`

Each entry reads its canonical cover, localized eyebrow, “before” title, transformation body, image alternative text, and slug at render time. All four routes returned HTTP 200 in the production browser run.

## 12. Trust content used

The manual testimonial selector uses the three existing, unedited production testimonials:

- Dr. Ahmad Al-Akhras, Director, Curevie
- Sultan Al-Hajj, Director, Inkspire
- Eng. Ahmad Khaled, Owner, Engineering Company

There is no autoplay. Selecting Sultan Al-Hajj updated the quote and author and set the corresponding button to `aria-pressed="true"`.

## 13. Motion ownership by section

- Hero: poster-to-canvas enhancement, bounded frame selection, rule progress, and a small finishing scale
- Method: active stage only
- Product proof: active product-state crossfade only
- Selected Work: restrained image hover scale only
- Trust: explicit user-controlled quote selection
- Services, system layers, action gateway, and footer: no narrative motion ownership
- No stacked global scroll timelines, autoplay carousels, continuous particle loops, or competing pin regions were introduced.

## 14. Mobile strategy

- The hero becomes a single static-poster viewport.
- Method and product proof become normal flow.
- Every product state has a real image, useful alt text, and caption.
- Selected Work is a one-column editorial sequence below 768 px and a compact two-column project composition on tablet.
- Persistent MobileNav, floating contact controls, and footer remain available.
- Tested widths include 320, 390, 720, 834, 844-short-landscape, and 1440 CSS pixels.
- No tested viewport produced horizontal overflow.

## 15. Arabic strategy

- Complete Arabic editorial copy is provided for every new homepage section.
- The existing language control switches the content without replacing the production language system.
- `document.documentElement.lang` and `dir` now synchronize to `ar` and `rtl`, not only the provider wrapper.
- RTL quiet-zone gradients, text alignment, arrow direction, project naming, heading line height, and scroll-rule origin are handled explicitly.
- Arabic dark and light variants were scrolled in production with no console, hydration, image, or overflow errors.

## 16. Theme strategy

- The existing `next-themes` provider and `dominase-theme` storage key are preserved.
- Hero, product proof, and action gateway are intentional dark cinematic islands in both themes.
- Services, method, system layers, and trust use the production theme tokens.
- Selected Work uses a deliberate pearl tonal reset in both themes to separate proof from narrative.
- The header receives a scoped hero-overlay treatment for legibility before it enters its existing scrolled surface.
- Interactive verification switched dark to light while the hero remained `rgb(2, 4, 3)`.

## 17. Reduced-motion strategy

- The hero frame engine is disabled and only the poster loads.
- Sticky narrative dependencies are removed.
- Method stages remain readable in normal flow.
- The three Qasr product states render as static desktop cards; tablet and mobile retain the normal-flow figures.
- Route drawing is shown in its completed state and image hover transforms are disabled.
- The final 1440 × 900 reduced-motion page measured 10,683 px, or 11.87 viewports, with no overflow or runtime errors.

## 18. Accessibility protections

- One H1 and one main landmark
- Semantic sections, headers, ordered lists, articles, figures, descriptions, blockquote, cite, and footer
- Skip link that moves focus to the programmatically focusable main element
- Correct document language and direction
- Descriptive link labels and real image alternative text; decorative canvas/images are hidden from accessibility APIs
- Visible focus treatments and Escape/focus-return behavior in MobileNav
- Active Header, Footer, Guide, homepage, and mobile controls have at least 44 px targets
- Removed the Footer’s placeholder `#` links and connected them to `/work` and `/contact`
- Chromium accessibility tree: 498 exposed nodes, one main, one navigation, 26 headings, 37 interactive controls, and zero unnamed interactive controls
- Measured contrast examples: hero primary 19.03:1, hero support 12.66:1, hero accent 13.62:1, work body 7.47:1, work accent 5.13:1, primary button label 12.49:1

## 19. Performance measurements

Measurements are from the local optimized production server and are diagnostic, not field Core Web Vitals:

- Desktop initial hero media: 9 requests / 376,584 encoded bytes
- Desktop rapid full-page pass: 13 hero requests / 568,002 encoded bytes
- Directed hero traversal: 23 sequence requests
- Tablet initial hero media: one poster / 23,182 encoded bytes
- 390 px mobile initial hero media: one poster / 12,442 encoded bytes
- Reduced-motion desktop initial hero media: one poster / 33,844 encoded bytes
- Initial encoded resources were approximately 1.17 MB on English desktop and 805 KB on English mobile in the tested browser context.
- Layout shift measured `0` in all 12 matrix variants.
- Local LCP observation ranged from 168 ms to 1,092 ms; the main candidate was the hero visual container, with H1 as the reduced-motion candidate.
- Canvas enhancement loaded no sequence requests on tablet, mobile, short landscape, reduced motion, or the 200%-zoom-equivalent layout.
- The decoded image cache has a hard cap of 18 frames, approximately 63.3 MiB at the source’s 1280 × 720 decoded size, instead of retaining all 193 source frames.

## 20. Files changed

Homepage composition and shared integration:

- `src/app/page.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/FloatingSiteChat.tsx`
- `src/context/LanguageContext.tsx`

New homepage implementation:

- `src/features/home/components/HomeHero.tsx`
- `src/features/home/components/HomeHeroMedia.tsx`
- `src/features/home/components/HomeServices.tsx`
- `src/features/home/components/HomeMethod.tsx`
- `src/features/home/components/HomeMethodVisual.tsx`
- `src/features/home/components/FeaturedProductProof.tsx`
- `src/features/home/components/HomeSelectedWork.tsx`
- `src/features/home/components/HomeSystemLayers.tsx`
- `src/features/home/components/HomeTrust.tsx`
- `src/features/home/components/HomeActionGateway.tsx`
- `src/features/home/components/HomeSkipLink.tsx`
- `src/features/home/components/HomeHashScroll.tsx`
- `src/features/home/content/homeContent.ts`
- `src/features/home/motion/heroProgress.ts`
- `src/features/home/motion/useBoundedSectionProgress.ts`
- `src/features/home/styles/home-editorial-cinema.css`

Media and documentation:

- `public/assest/home/hero/poster.webp`
- `public/assest/home/hero/frames/frame-01.webp` through `frame-49.webp`
- `docs/homepage-editorial-cinema-implementation.md`

No dependency or package-lock change was required.

## 21. Tests run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Local optimized `next start` browser testing with Playwright/Chromium
- English and Arabic, dark and light
- 1440 × 900 desktop
- 834 × 1112 tablet
- 390 × 844 mobile
- 320 × 700 small mobile
- 844 × 390 short landscape
- 720 × 450 layout-equivalent check for 200% zoom
- 1440 × 900 reduced motion
- Full-page scroll and screenshot review
- Forward and reverse method/product state progression
- Hero top/middle/end pixel and transform change
- Keyboard, skip link, mobile menu, Escape/focus return, language, theme, and testimonial selection
- Chromium accessibility-tree inspection
- Internal-route HTTP status audit
- No-JavaScript rendering
- Forced sequence-frame failure fallback
- Console, page error, request failure, broken image, hydration, target size, and overflow checks

## 22. Build result

- TypeScript: passed with no output
- ESLint: passed with zero errors
- ESLint reported two pre-existing warnings outside this homepage work:
  - `DiagnosisPdfReport.tsx` uses an `<img>`
  - `pdf-empty-module.js` has an anonymous default export
- Optimized Next.js 16.0.10 build: passed
- The homepage remained statically generated and all four canonical case-study routes were generated successfully.

## 23. Remaining real asset requirements

- A future HORVÁTH featured-product version requires at least one additional verified, high-resolution product state and preferably genuine outcome evidence. The two current captures do not support a truthful three-stage proof sequence.
- Higher-resolution than 1280 × 720 hero source frames would improve very large/high-DPI displays without upscaling.
- Field performance should be verified after deployment through real-user monitoring and a mobile-network Lighthouse/WebPageTest run.

## 24. Known limitations

- Open Design could not be inspected because its local daemon was unavailable.
- The hero intentionally samples 49 of the 193 experimental frames; it favors bounded transfer and memory over frame-for-frame fidelity.
- Mobile is longer than the desktop/tablet target because every service, product state, project, system layer, full testimonial, and action remains in accessible normal flow.
- Local LCP and transfer figures are not a substitute for production network measurements.
- Previous homepage components remain in the repository, unreferenced by `src/app/page.tsx`, to support rollback and avoid deleting reusable unrelated work.
- No changes were pushed and no pull request was opened.
