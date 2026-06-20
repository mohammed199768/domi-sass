# Manal Alhihi SVG Motion Lab — Closeout

## Summary

Created an isolated, Arabic-first motion prototype at `/case-study-lab/manal`. The page tells the transition from scattered training operations to one organized platform through five scenes: hero, SVG transformation, before/after comparison, feature system, and final result statement. The homepage, portfolio gallery, `/motion-lab`, existing content, and project data were not changed.

## Files created

- `src/app/case-study-lab/manal/page.tsx`
- `src/features/case-study-lab/manal/ManalCaseStudyLabPage.tsx`
- `src/features/case-study-lab/manal/ManalHeroScene.tsx`
- `src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx`
- `src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx`
- `src/features/case-study-lab/manal/FeatureSystemScene.tsx`
- `src/features/case-study-lab/manal/ResultStatementScene.tsx`
- `src/features/case-study-lab/manal/svgPaths.ts`
- `docs/case-studies/CASE_STUDY_LAB_MANAL_SVG_MOTION_CLOSEOUT.md`

## Files changed

No existing source, style, content, or project-data files were changed. `package.json` and the lockfile remain unchanged.

## Anime.js

Anime.js was not already installed and was not added. The experiment only needs transform, opacity, compatible SVG path interpolation, and stroke-dashoffset animation. GSAP handles those requirements reliably in the existing motion architecture, while adding Anime.js would introduce a second animation owner without a distinct benefit. No property is shared across animation engines.

## SVG motion architecture

The core illustration uses one `1000 × 620` viewBox and small abstract primitives. Four loose file cards begin outside their organized positions, rotate into course modules, and expand through compatible path data. Attendance dots settle into a row, four connection paths draw toward the platform, and the central dashboard resolves into the visual anchor. The transformation uses pre-authored coordinates and does not calculate path geometry every frame.

## GSAP usage

- `ScrollTrigger` maps desktop scroll progress to the core SVG transformation.
- The before/after scene uses a scrubbed timeline to reduce the visual weight of the old workflow while the organized system enters.
- Hero, feature modules, and result statement use short, one-time entrance timelines.
- Animations are scoped with `gsap.context()` and every context is reverted during cleanup.
- Existing shared motion setup in `src/lib/motion` is reused; no global animation behavior was added.

## Anime.js usage

None. It was intentionally omitted for the reasons above.

## Mobile behavior

Below `768px`, the core transformation renders its final organized SVG state without a scrubbed or pinned sequence. The before/after scene becomes a normal vertical comparison. The SVG remains inside a responsive viewBox container, and browser QA at `390 × 844` confirmed no horizontal overflow.

## Reduced-motion behavior

When `prefers-reduced-motion: reduce` is active, the SVG is set directly to its final state, connection strokes are fully drawn, and entrance/scroll timelines are skipped. The extended desktop scroll canvases are also removed so the user does not traverse empty animation distance. All important copy remains visible independently of motion.

## Validation results

- `npm run lint`: passed
- `npx tsc --noEmit`: passed (no dedicated typecheck script exists)
- `npm run build`: passed
- Production HTTP smoke test: `/`, `/motion-lab`, and `/case-study-lab/manal` returned `200`
- Browser console: zero errors and zero warnings on the lab route
- Desktop QA at `1440 × 900`: five semantic scenes and no horizontal overflow
- Mobile QA at `390 × 844`: no horizontal overflow, static/non-sticky core scene, SVG contained
- Reduced-motion emulation: preference detected, transforms resolved to the final state, connection dash offset resolved to zero

The build emits existing non-blocking warnings about stale `baseline-browser-mapping` data and the root layout not defining `metadataBase`.

## What worked

- The visual story is legible without product screenshots or decorative clutter.
- Compatible path structures provide a restrained card-to-module morph without a paid morphing plugin.
- CSS sticky plus a scrubbed timeline keeps animation ownership simple and cleanup reliable.
- The final-state mobile and reduced-motion strategy preserves the story at substantially lower motion cost.

## Improvements before `/work/[slug]`

- Test the pacing with real users and real case-study copy before standardizing scroll distances.
- Replace lab-specific primitives with a reusable case-study visual schema only after a second project proves the abstraction.
- Add automated visual-regression coverage for desktop, mobile, dark/light site shells, and reduced motion.
- Decide whether case-study routes should set locale at the route-layout level; this lab marks its own main content as Arabic and RTL while the shared root document remains English.
- Validate the card-to-module interpolation across the project’s full browser support matrix.

## Recommended next milestone

Build one second case-study lab with a different story shape, then extract only the shared scene contracts (hero metadata, narrative beats, feature modules, and reduced-motion policy). Once both labs fit the same contract without compromising their storytelling, implement `/work/[slug]` as a data-driven route and graduate the strongest Manal scenes into it.
