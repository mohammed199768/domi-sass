import { expect, test } from "@playwright/test";
import { expectLoadedImage, openStablePage, viewports, expectNoHorizontalOverflow } from "./helpers";

test.beforeEach(async ({ page }) => {
  await openStablePage(page, "/", {
    language: "en",
    theme: "light",
    viewport: viewports.desktop,
    reducedMotion: "reduce",
  });
});

test("Manal project modal visual mobile layout", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await openStablePage(page, "/", {
    language: "en",
    theme: "light",
    viewport: viewports.mobile,
    reducedMotion: "reduce",
  });
  await page.getByRole("button", { name: "Open Manal Alhihi Educational Platform case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expectLoadedImage(page, "[role='dialog'] img");
  await expectNoHorizontalOverflow(page);
  await expect(dialog).toHaveScreenshot("modal-manal-light-mobile.png");
});

test("Manal project modal visual and live CTA", async ({ page }) => {
  await page.getByRole("button", { name: "Open Manal Alhihi Educational Platform case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close project showcase" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "View full case study" })).toHaveAttribute("href", "/work/manal-alhihi");
  await expectLoadedImage(page, "[role='dialog'] img");
  await expect(dialog).toHaveScreenshot("modal-manal-light-desktop.png");
});

test("Qasr project modal visual and live CTA", async ({ page }) => {
  await page.getByRole("button", { name: "Open Qasr Al-Farah case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close project showcase" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "View full case study" })).toHaveAttribute("href", "/work/qasr-alfarah");
  await expectLoadedImage(page, "[role='dialog'] img");
  await expect(dialog).toHaveScreenshot("modal-qasr-light-desktop.png");
});

test("Curevie project modal visual and live CTA", async ({ page }) => {
  await page.getByRole("button", { name: "Open Curevie case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close project showcase" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "View full case study" })).toHaveAttribute("href", "/work/curevie");
  await expectLoadedImage(page, "[role='dialog'] img");
  await expect(dialog).toHaveScreenshot("modal-curevie-light-desktop.png");
});

test("Horvath Survey project modal visual and live CTA", async ({ page }) => {
  await page.getByRole("button", { name: "Open Horvath Survey case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close project showcase" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "View full case study" })).toHaveAttribute("href", "/work/horvath-survey");
  await expectLoadedImage(page, "[role='dialog'] img");
  await expect(dialog).toHaveScreenshot("modal-horvath-light-desktop.png");
});
