# WHY CHANGE M1C — Scroll Stability + GPU Budget Closeout

## Summary

M1C hardens `/why-change` for production. Forced scene snapping was removed, each desktop scene received a longer scroll runway, ScrollTrigger progress became the only source of active-scene truth, and test-readable scene instrumentation was added. The background SVG system was reduced to one continuity path and one active scene guide while preserving the illustrations, charts, cinematic composition, and bilingual/theme behavior.

## What was wrong with M1B

M1B combined inertial smooth scrolling with a custom snap function that clamped the requested destination to one scene from a remembered settled position. The snap then corrected the actual scroll position after momentum had already moved it. Depending on the gesture and timing, that correction could pull backward, push forward, or settle after passing multiple scene thresholds.

M1B also kept four continuity-rail states, two guide paths and two route circles per scene, repeated rail arrows, a masked CSS grid, nested ambient rings, and CSS image filters. Most were restrained individually, but collectively they increased compositing cost and visual noise.

## Files changed

- `src/features/why-change/WhyChangeFilmClient.tsx`
- `src/features/why-change/WhyChangeContinuityRail.tsx`
- `src/features/why-change/WhyChangeSceneFrame.tsx`
- `src/features/why-change/why-change.module.css`
- `tests/visual/why-change.visual.spec.ts`
- `/why-change` dark and light desktop snapshots

## Scroll instability root cause

The root cause was the interaction between Lenis momentum, ScrollTrigger scrub, and M1B's forced snap correction. `settledProgress` and the clamped `snapTo` target were a second position authority layered on top of ScrollTrigger progress. No React scene state or explicit application `scrollTo` call was involved.

## Scroll fix

- Removed ScrollTrigger snap entirely.
- Removed settled-progress memory, snap clamping, inertia overrides, and snap-complete correction.
- Increased desktop scroll distance from 105% to 130% per scene transition.
- Increased scrub smoothing from 1.05 to 1.2.
- Kept a single pinned ScrollTrigger and one scrubbed master timeline.
- Active scene is derived only from ScrollTrigger progress.
- Added `data-active-scene` and `data-scene-index` to the film stage.
- The active marker is visual-state instrumentation only; it never changes scroll position.

Normal wheel and trackpad-like input now moves monotonically. Once inertial input finishes, there is no delayed mechanism capable of moving the page backward or forward.

## SVG/GPU reductions

- Continuity rail states: 4 → 1.
- Animated continuity paths: 8 → 1.
- Continuity arrows: 4 → 0.
- Scene guide paths: 2 per scene → 1 per scene.
- Scene route circles: 22 → 0.
- Nested ambient rings: 3 → 1 static ring.
- Removed the masked technical grid.
- Removed illustration `filter`, `drop-shadow`, saturation, brightness, and contrast compositing.
- Mobile, tablet, and reduced motion hide both the continuity rail and scene-guide SVGs.
- Inactive desktop scenes use GSAP `autoAlpha` visibility and are marked `data-scene-active="false"` with pointer events disabled.

At a settled desktop scene, only one continuity path and one scene-guide path are visible. The focused budget test enforces no more than three visible storytelling overlay paths and eight visible Anime.js targets.

## Anime.js cleanup

Anime.js remains dynamically imported only for motion-capable desktop. Before starting a scene pulse, the previous micro-animation is cancelled and paused. Cleanup repeats on component unmount or language-driven effect recreation. Pulses remain finite, run at most once per scene, and only target the current scene's nodes and single guide arrow. Reduced motion and mobile/tablet never load or run the micro-interaction.

## GSAP cleanup

The page retains one `gsap.context()` and one responsive `gsap.matchMedia()` orchestration. Context reversion removes the pinned timeline and its ScrollTrigger before language recreation or unmount. The four continuity-state timelines and all snap callbacks were removed. Hidden scenes have no independent ScrollTriggers or running animations; scene, chart, guide, and illustration tweens are children of the single scrubbed timeline.

## Tests added

- Controlled 1,200px wheel input advances by at most one active scene.
- The active scene remains unchanged across a second idle interval, preventing delayed forward/back movement.
- Three repeated 520px wheel steps remain monotonic and change by no more than one scene per step.
- `data-active-scene` and `data-scene-index` expose the single scene authority.
- Visible storytelling overlays remain at or below three paths.
- Visible Anime.js micro targets remain at or below eight.
- Mobile and reduced motion verify the continuity rail and scene guides are hidden.
- Existing pinning, snapshots, composition, source, CTA, and overflow coverage remains.

## Validation results

- `npm run lint`: passes with two pre-existing unused catch-variable warnings in `LanguageContext.tsx`.
- `npx tsc --noEmit`: passes.
- `npm run build`: passes; `/why-change` remains statically generated.
- Focused `/why-change` tests: 8/8 pass.
- Full Playwright visual suite: 67/67 pass.
- Verified dark/light desktop, Arabic mobile at 390px, English, reduced motion, controlled strong wheel input, repeated trackpad-like input, no delayed scene movement, no horizontal overflow, and route-only snapshot changes.
- The browser harness reported no console errors, page errors, or hydration warnings.

## Remaining risks

Automated wheel events approximate but cannot reproduce every physical trackpad's momentum curve. The new system deliberately avoids all positional correction, so unusual hardware input may move farther if the user supplies a genuinely large continuous scroll, but it will not reverse or advance later by itself. Real-device macOS trackpad QA remains useful before a public campaign launch.

## Next recommended milestone

Ship this stability baseline before adding any further motion. Instrument scene-index changes and film completion, then use real-device and real-user scroll data to decide whether scroll distance needs a small adjustment. Do not reintroduce forced snapping without hardware-level trackpad testing.

