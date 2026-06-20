# Case Studies M5 — Playwright Visual Regression Closeout

## Summary

Added a focused Playwright/Chromium visual-regression baseline for the homepage, Manal, Qasr, reduced-motion chapter states, and routed project modals. The suite uses a production build and `next start`, restores language and theme through the same local-storage keys as the application, and keeps one browser project with one worker for predictable first-pass baselines.

The first baseline exposed a real Arabic desktop issue: the oversized horizontal track was positioned by its RTL parent, so a direct Arabic visit displayed the result chapter at scroll origin. The shared orchestration section is now explicitly LTR while each chapter retains its own RTL content direction. Corrected Arabic intro baselines were regenerated intentionally.

## Files added

- `playwright.config.ts`
- `tests/visual/helpers.ts`
- `tests/visual/pages.visual.spec.ts`
- `tests/visual/modal.visual.spec.ts`
- `tests/visual/__screenshots__/modal.visual.spec.ts/*.png`
- `tests/visual/__screenshots__/pages.visual.spec.ts/*.png`
- `docs/case-studies/CASE_STUDIES_M5_VISUAL_REGRESSION_CLOSEOUT.md`

## Files changed

- `package.json`: visual-test scripts and `@playwright/test` development dependency.
- `package-lock.json`: locked Playwright packages.
- `.gitignore`: ignores reports and transient test output while preserving approved baselines.
- `src/features/case-studies/CaseStudyHorizontalJourney.tsx`: fixes RTL parent alignment at the horizontal orchestration boundary.

## Playwright setup

- One official Chromium project using Playwright’s `chromium` channel.
- One worker, no local retries, one CI retry.
- Production-like `webServer`: `npm run build && npm run start -- -p 3200`.
- Stable `en-US` locale and `Asia/Amman` timezone.
- HTML/list reporting; reports, traces, and failure screenshots are ignored.
- Approved snapshots live under `tests/visual/__screenshots__`, grouped by spec file.
- Snapshot comparison permits a maximum `0.5%` differing-pixel ratio.

New environments should run `npx playwright install chromium` after installing dependencies.

## Snapshot matrix

Fourteen approved snapshots across thirteen tests:

- Homepage: English light `1366×768`; English dark `1440×900`.
- Manal: English light desktop initial; Arabic dark large-desktop initial; English light mobile `390×844`.
- Qasr: English light desktop initial; Arabic dark large-desktop initial; Arabic dark mobile `390×844`.
- Reduced motion: isolated transformation and result chapters for both Manal and Qasr.
- Portfolio modal: Manal and Qasr light desktop dialogs.
- Assertion-only coverage verifies Curevie and Horvath have no dead `/work/` CTA.

## Language and theme helpers

`openStablePage` writes `domi-language` and `theme` before application scripts execute, then waits for the requested page language/direction and root theme class. It also waits for fonts, application settling, and an explicit scroll-origin reset. This uses the application’s real persistence mechanisms without changing server markup or introducing hydration mismatch.

## Reduced-motion coverage

Both case-study routes are opened with `prefers-reduced-motion: reduce`. Tests assert there is no GSAP pin spacer and the SVG nodes have their final static transform. Transformation and result panels receive dedicated element snapshots, providing stable middle/final story coverage without trying to freeze a scrubbed desktop timeline.

## Modal coverage

The suite opens Manal and Qasr through their homepage portfolio cards, checks the dialog role, close control, loaded project image, and exact live case-study href, then snapshots each dialog. Curevie and Horvath are opened separately and asserted to contain no `/work/` link.

## What was intentionally not covered

- No mid-scrub horizontal screenshot; scroll-linked GSAP timing is more fragile than the reduced-motion static chapter baseline.
- No full-page mobile screenshots; the first baseline focuses on readable entry states and isolated static chapters.
- No Firefox or WebKit projects yet.
- No `/motion-lab` or `/case-study-lab/manal` visual baseline; they remain outside the production-page baseline.
- No complete accessibility audit or automated contrast analysis.

## Validation results

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- `npm run test:visual:update`: 13 passed; 14 baselines generated and inspected
- `npm run test:visual`: 13 passed against approved baselines
- No missing routes, broken modal images, dead production CTAs, hydration warnings, or test console failures were observed

The production build still reports the repository’s existing non-blocking `baseline-browser-mapping` age and missing root `metadataBase` warnings. `npm install` reports nine dependency audit findings; no broad or forceful dependency mutation was attempted in this scoped milestone.

## How to update snapshots

1. Review the intended UI change locally.
2. Run `npm run test:visual:update`.
3. Inspect every changed PNG under `tests/visual/__screenshots__`.
4. Run `npm run test:visual` normally and require a clean pass.
5. Commit only snapshots that correspond to an intentional reviewed change; never approve `test-results` failure artifacts.

## Remaining risks

- Snapshot output depends on the installed Chromium and host font rasterization; baseline updates should be generated in a consistent environment.
- The current threshold is intentionally small but not pixel-perfect.
- Animated mid-journey states are covered structurally and through static reduced-motion chapters, not image-diffed during scrub.
- Cross-browser rendering differences remain untested.

## Recommended next milestone

Run this suite in CI on a pinned Windows or Linux image, publish the HTML report as an artifact on failure, and require reviewed baseline changes. Add WebKit only after Chromium stability is established and the baseline environment is standardized.
