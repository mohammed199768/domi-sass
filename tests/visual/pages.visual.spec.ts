import { expect, test } from "@playwright/test";
import { expectCorePageAccessibility, openStablePage, viewports, expectNoHorizontalOverflow } from "./helpers";

test("homepage light desktop", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "light", viewport: viewports.desktop });
  await expectCorePageAccessibility(page);
  await expect(page).toHaveScreenshot("homepage-light-desktop.png");
});

test("homepage dark large desktop", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "dark", viewport: viewports.largeDesktop });
  await expectCorePageAccessibility(page);
  await expect(page).toHaveScreenshot("homepage-dark-large-desktop.png");
});

test("Manal English light desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/manal-alhihi", { language: "en", theme: "light", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("manal-en-light-desktop-initial.png");
});

test("Manal Arabic dark large desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/manal-alhihi", { language: "ar", theme: "dark", viewport: viewports.largeDesktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("manal-ar-dark-large-desktop-initial.png");
});

test("Manal English light mobile", async ({ page }) => {
  await openStablePage(page, "/work/manal-alhihi", { language: "en", theme: "light", viewport: viewports.mobile });
  await expectCorePageAccessibility(page, true);
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot("manal-en-light-mobile.png");
});

test("Qasr English light desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/qasr-alfarah", { language: "en", theme: "light", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("qasr-en-light-desktop-initial.png");
});

test("Qasr Arabic dark large desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/qasr-alfarah", { language: "ar", theme: "dark", viewport: viewports.largeDesktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("qasr-ar-dark-large-desktop-initial.png");
});

test("Qasr Arabic dark mobile", async ({ page }) => {
  await openStablePage(page, "/work/qasr-alfarah", { language: "ar", theme: "dark", viewport: viewports.mobile });
  await expectCorePageAccessibility(page, true);
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot("qasr-ar-dark-mobile.png");
});

test("Curevie English light desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/curevie", { language: "en", theme: "light", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("curevie-en-light-desktop-initial.png");
});

test("Curevie Arabic dark desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/curevie", { language: "ar", theme: "dark", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("curevie-ar-dark-desktop-initial.png");
});

test("Curevie Arabic dark mobile", async ({ page }) => {
  await openStablePage(page, "/work/curevie", { language: "ar", theme: "dark", viewport: viewports.mobile });
  await expectCorePageAccessibility(page, true);
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot("curevie-ar-dark-mobile.png");
});

test("Horvath English light desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/horvath-survey", { language: "en", theme: "light", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("horvath-en-light-desktop-initial.png");
});

test("Horvath Arabic dark desktop initial state", async ({ page }) => {
  await openStablePage(page, "/work/horvath-survey", { language: "ar", theme: "dark", viewport: viewports.desktop });
  await expectCorePageAccessibility(page, true);
  await expect(page).toHaveScreenshot("horvath-ar-dark-desktop-initial.png");
});

test("Horvath Arabic dark mobile", async ({ page }) => {
  await openStablePage(page, "/work/horvath-survey", { language: "ar", theme: "dark", viewport: viewports.mobile });
  await expectCorePageAccessibility(page, true);
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot("horvath-ar-dark-mobile.png");
});

for (const study of [
  { name: "manal", slug: "manal-alhihi" },
  { name: "qasr", slug: "qasr-alfarah" },
  { name: "curevie", slug: "curevie" },
  { name: "horvath", slug: "horvath-survey" },
] as const) {
  test(`${study.name} reduced-motion static chapters`, async ({ page }) => {
    await openStablePage(page, `/work/${study.slug}`, {
      language: "en",
      theme: "light",
      viewport: viewports.desktop,
      reducedMotion: "reduce",
    });

    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[data-system-node]").first()).toHaveCSS("transform", "none");
    await expect(page.locator("[data-panel='transformation']")).toHaveScreenshot(`${study.name}-reduced-transformation.png`);
    await expect(page.locator("[data-panel='result']")).toHaveScreenshot(`${study.name}-reduced-result.png`);
  });
}
