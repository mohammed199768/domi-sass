# M2 Home Motion Upgrade Closeout

## What Changed

- Added a shared motion setup layer for GSAP, ScrollTrigger, media queries, and reduced-motion checks.
- Upgraded the homepage hero with a cinematic word reveal, a restrained ambient scale moment, and lightweight project evidence cards.
- Reworked the services area into a more story-like layout with a sticky section intro and stacked service cards.
- Added a desktop selected-work horizontal scroll experience for the portfolio section.
- Added a controlled portfolio opener inspired by the expanding-dot lab scene without turning it into a blocking transition.
- Added global reduced-motion CSS safeguards.

## Files Modified

- `src/features/home/components/Hero.tsx`
- `src/features/home/components/AboutSection.tsx`
- `src/features/home/components/ServicesSection.tsx`
- `src/features/home/components/PortfolioSection.tsx`
- `src/features/home/hooks/useHeroAnimation.ts`
- `src/features/home/hooks/usePortfolioAnimation.ts`
- `src/features/motion-lab/hooks/useMediaQuery.ts`
- `src/features/motion-lab/hooks/useReducedMotion.ts`
- `src/features/motion-lab/utils/gsapSetup.ts`
- `src/styles/globals.css`

Note: `.gitignore` was already modified in the working tree before this upgrade pass and still appears in `git status`.

## Files Added

- `src/lib/motion/gsapSetup.ts`
- `src/lib/motion/useMediaQuery.ts`
- `src/lib/motion/useReducedMotion.ts`
- `docs/home-motion/M2_HOME_MOTION_UPGRADE_CLOSEOUT.md`

## Deleted Folders

- `inspiration-repos`

This was deleted intentionally because it was no longer needed and was polluting lint/build validation.

## Motion-Lab Patterns Adapted

- Cinematic Text Reveal: adapted for the hero headline only.
- Expanding Dot Scene: adapted as a subtle portfolio section opener, not as a full-screen blocker.
- Horizontal Scroll Scene: adapted for desktop selected-work presentation.
- Sticky Split Scene: adapted conceptually through sticky About/Services composition, without adding a heavy scroll trap.

## What Was Intentionally Not Changed

- Homepage written content.
- Project names.
- Portfolio project data.
- Case-study data.
- Flipbook internals.
- Contact form endpoint.
- Theme system.
- Bilingual data structure.
- `/motion-lab` route behavior.

## Mobile Behavior

- Hero motion is short and transform-based.
- Portfolio horizontal pin is desktop-only.
- Mobile keeps normal readable project cards instead of heavy pinned horizontal scrolling.
- Services remain stacked and readable on smaller screens.

## Reduced-Motion Behavior

- GSAP hero and portfolio effects check `prefers-reduced-motion`.
- Dramatic scrubbed/pinned portfolio motion is skipped for reduced-motion users.
- Global CSS reduces animation and transition durations for users who prefer reduced motion.
- Text is never hidden permanently behind animation states.

## Validation Results

- `npm run lint`: passed.
- `npm run build`: passed.
- Typecheck script: not present in `package.json`.
- Homepage `/`: returned HTTP 200 on local dev server.
- Motion lab `/motion-lab`: returned HTTP 200 on local dev server.
- Flipbook modal: verified in browser by opening the Qasr Al-Farah project; dialog appeared with 0 console errors.

## Remaining Risks

- The portfolio horizontal scroll should be visually reviewed on a real desktop viewport to tune card width and scroll pacing.
- The Arabic content currently appears mojibake in source files; this was pre-existing and intentionally not changed during the motion upgrade.
- The global Lenis setup and section button scroll behavior are still not fully unified.
- Framer Motion and GSAP still coexist; the current upgrade avoids a full motion-system refactor.

## Recommended Next Milestone

M3 should focus on selected-work polish:

- Tune the desktop portfolio card composition.
- Add a refined project-modal opening transition before the flipbook appears.
- Review project image weights and responsive image sizing.
- Fix the pre-existing Arabic text encoding issue in a separate content-focused pass.
