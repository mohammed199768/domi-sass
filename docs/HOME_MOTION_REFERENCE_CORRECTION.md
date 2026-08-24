# DOMINASE Home Motion Reference Correction

This pass corrects the homepage motion language to follow the uploaded portfolio motion reference while preserving DOMINASE's brand system, Light-first theme, Arabic/English content, SEO architecture, and the previously added interactive project CTAs.

## What changed

- Replaced the conventional split hero with a full-viewport, oversized-typography hero.
- Added a centered magnetic DOMINASE object with floating product-world cards.
- Kept all main CTAs as pill/capsule controls.
- Added two scroll-reactive horizontal product-image marquee rows.
- Added an About / Make it simple section with character-by-character scroll reveal.
- Added a large-number vertical services section.
- Replaced the old homepage work-orbit presentation with sticky stacking project cards.
- Preserved the interactive education and clinic/system CTA section after the product storytelling sections.
- Kept Light Mode as the default and used DOMINASE design tokens rather than copying the reference palette.
- Added mobile fallbacks so sticky stacks become normal cards and high-motion sections remain usable.

## Reference mechanics intentionally reproduced

- Fade-in entrance sequencing.
- Magnetic pointer response on the hero centerpiece.
- Scroll-bound marquee translation.
- Character-by-character text opacity reveal.
- Oversized fluid typography using clamp().
- Sticky project stacking with scale changes.
- Rounded/pill primary and ghost actions.

## Verification state

- Design-token ratchet: PASS.
- Asset-path checks for the new homepage imagery: PASS.
- Full npm install/build cannot be re-run in the sandbox because dependencies are not available offline. The prior redesign build was verified after merge on the user's local machine; this correction must be re-run through `npm install`, `npx tsc --noEmit`, and `npm run build` after overlaying it on the local repository.
