import { expect, test } from "@playwright/test";
import {
  expectAllPanelsMode,
  expectCorePageAccessibility,
  expectHorizontalJourneyActive,
  expectNoHorizontalOverflow,
  expectNoLocalPanelScrollInHorizontalFit,
  expectVisiblePanelHeadingUnclipped,
  openStablePage,
  viewports,
} from "./helpers";

/**
 * CASE STUDIES M14B — tablet horizontal fit-to-viewport coverage.
 *
 * The user's requirement: tablets and smaller/shorter desktops must KEEP the
 * horizontal side-scroll journey, fitting each panel into one viewport instead
 * of clipping or falling into vertical scroll. These viewports are all >= 768px
 * wide, so with motion allowed the horizontal "fit" journey must be active.
 */

const studies = [
  { name: "manal", slug: "manal-alhihi" },
  { name: "qasr", slug: "qasr-alfarah" },
  { name: "curevie", slug: "curevie" },
  { name: "horvath", slug: "horvath-survey" },
] as const;

const tabletCases = [
  { label: "tablet portrait 768x1024", viewport: viewports.tabletPortrait, language: "en", theme: "light" },
  { label: "tablet portrait 820x1180", viewport: viewports.tabletPortraitLg, language: "ar", theme: "dark" },
  { label: "tablet landscape 1024x768", viewport: viewports.tabletLandscape, language: "ar", theme: "dark" },
  { label: "tablet landscape 1180x820", viewport: viewports.tabletLandscapeLg, language: "en", theme: "light" },
  { label: "short laptop 1366x650", viewport: viewports.shortLaptop, language: "en", theme: "light" },
] as const;

for (const study of studies) {
  for (const variant of tabletCases) {
    test(`${study.name} ${variant.label} — horizontal fit, no clipping, no v-scroll`, async ({ page }) => {
      await openStablePage(page, `/work/${study.slug}`, {
        language: variant.language,
        theme: variant.theme,
        viewport: variant.viewport,
      });

      await expectCorePageAccessibility(page, true);
      // Tablet stays horizontal — pinned journey active, not vertical stacked.
      await expectHorizontalJourneyActive(page);
      await expectAllPanelsMode(page, "horizontalFit");
      // The document itself never overflows horizontally (the pinned track is
      // clipped and translated by GSAP, not by document scroll).
      await expectNoHorizontalOverflow(page);
      // No chapter becomes a local vertical scroller — every panel fits.
      await expectNoLocalPanelScrollInHorizontalFit(page);
      // The first panel's heading is visible and unclipped at the start.
      await expectVisiblePanelHeadingUnclipped(page);
    });
  }
}

// Phone width stays stacked (mobileStacked), unchanged from before.
test("manal phone width remains stacked (no pin)", async ({ page }) => {
  await openStablePage(page, "/work/manal-alhihi", {
    language: "en",
    theme: "light",
    viewport: viewports.mobile,
  });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expectAllPanelsMode(page, "mobileStacked");
  await expectNoHorizontalOverflow(page);
});

// Two focused tablet snapshots (kept intentionally small): one split-transform
// theme in Arabic dark and one stacked-transform theme in English light, both at
// tablet portrait, captured at the journey start.
test("qasr tablet portrait Arabic dark fit snapshot", async ({ page }) => {
  await openStablePage(page, "/work/qasr-alfarah", {
    language: "ar",
    theme: "dark",
    viewport: viewports.tabletPortrait,
  });
  await expectHorizontalJourneyActive(page);
  await expect(page).toHaveScreenshot("qasr-tablet-portrait-ar-dark-fit.png");
});

test("manal tablet landscape English light fit snapshot", async ({ page }) => {
  await openStablePage(page, "/work/manal-alhihi", {
    language: "en",
    theme: "light",
    viewport: viewports.tabletLandscape,
  });
  await expectHorizontalJourneyActive(page);
  await expect(page).toHaveScreenshot("manal-tablet-landscape-en-light-fit.png");
});
