import { expect, test } from "@playwright/test";
import { expectLoadedImage, openStablePage, viewports } from "./helpers";

test.beforeEach(async ({ page }) => {
  await openStablePage(page, "/", {
    language: "en",
    theme: "light",
    viewport: viewports.desktop,
    reducedMotion: "reduce",
  });
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

test("projects without production routes have no dead CTA", async ({ page }) => {
  for (const project of ["Curevie", "Horvath Survey"]) {
    await page.getByRole("button", { name: `Open ${project} case study` }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("a[href^='/work/']")).toHaveCount(0);
    await dialog.getByRole("button", { name: "Close project showcase" }).click();
  }
});
