# M3 Contact Portal Transition Closeout

## Summary

Implemented a controlled contact portal transition before the final contact area. The effect uses a small expanding dot to shift the atmosphere into a darker, calmer contact zone, then reveals the existing contact content and form with restrained motion.

## Files Changed

- `src/app/page.tsx`
- `src/features/home/components/ContactPortalSection.tsx`
- `src/features/home/components/ContactSection.tsx`
- `src/features/home/index.ts`

## How The Expanding Dot Transition Works

- `ContactPortalSection` wraps the existing `ContactSection`.
- A small centered dot expands with `transform: scale()`.
- The desktop sequence uses one GSAP timeline with ScrollTrigger.
- The timeline pins only the contact portal wrapper, expands the dot, fades in the contact atmosphere, then reveals contact content marked with `data-contact-portal-reveal`.
- Cleanup uses `gsap.context()` and `context.revert()`.
- `ScrollTrigger.refresh()` runs after setup so layout measurements stay current.

## Contact Section Visual Polish

- The contact area now feels darker, calmer, and more premium.
- The form card has stronger hierarchy, refined borders, glass/material depth, and clearer focus states.
- Inputs use stronger focus rings and more deliberate spacing.
- Contact details have refined icon containers and better contrast.
- The original copy, labels, contact info, Formspree endpoint, and submit behavior were preserved.

## Mobile Behavior

- Mobile skips the heavy pinned portal.
- The dot/background resolves immediately into the contact atmosphere.
- Normal scrolling is preserved.
- The form remains readable and reachable.
- No horizontal layout pattern was introduced.

## Reduced-Motion Behavior

- Reduced-motion users do not get scrubbed pinned dot scaling.
- Contact content is shown normally.
- Reveal items are forced visible.
- No form content waits behind an animation.

## Performance Considerations

- Dot expansion uses `transform: scale()`, not width or height animation.
- Reveal motion uses opacity, y transform, and clip-path.
- No new dependency was added.
- The animation is isolated to one wrapper and one controlled timeline.
- Mobile avoids pinned ScrollTrigger work.

## Validation Results

- `npm run lint`: passed.
- `npm run build`: passed.
- Typecheck script: not present in `package.json`.
- `/`: returned HTTP 200.
- `/motion-lab`: returned HTTP 200.
- Contact nav link: verified.
- Contact form focus/use: verified by focusing the Name field.
- Flipbook modal: verified by opening Qasr Al-Farah; dialog appeared with 0 console errors.
- Mobile fallback: verified at 390px width.

## Remaining Risks

- The desktop pinned portal should be visually tuned on a real large display for final pacing.
- The source still contains pre-existing Arabic mojibake in content/status strings; this was not changed in M3.
- Existing M2 horizontal portfolio pin can make offscreen project cards awkward to click when the page is already scrolled far past that section; direct section entry still opens the flipbook correctly.

## Recommended Next Milestone

M4 should focus on navigation and motion foundation polish:

- Unify native `scrollIntoView` calls with the Lenis scroll system.
- Add a shared `scrollToSection` helper.
- Tune the portfolio horizontal pin edge cases.
- Add a subtle case-study opening transition before the flipbook modal.
