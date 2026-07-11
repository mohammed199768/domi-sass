import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, openStablePage, viewports } from "./helpers";

test("homepage keeps the selected light theme and exposes its toggle", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "light", viewport: viewports.desktop });
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page.reload({ waitUntil: "networkidle" });
  await expect(root).toHaveAttribute("data-theme", "dark");
});

test("homepage work uses one accessible coverflow interaction model", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "dark", viewport: viewports.desktop, strictConsole: false });
  const work = page.locator("#portfolio");
  await expect(work.locator("article")).toHaveCount(4);
  await expect(work.locator("article[aria-hidden='false']")).toHaveCount(1);
  await work.getByRole("button", { name: "Next project" }).click();
  await expect(work.locator("a[href='/work/horvath-survey'][tabindex='0']")).toBeVisible();
  await expect(work.locator("a[tabindex='0']")).toHaveCount(1);
});

test("homepage phone uses the coverflow and one Beneath Interface SVG stage", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "light", viewport: { width: 390, height: 844 } });
  await expectNoHorizontalOverflow(page);
  await expect(page.locator("#portfolio article")).toHaveCount(4);
  await expect(page.locator("#portfolio").getByRole("button", { name: /Swipe to explore/ })).toBeAttached();
  await expect(page.locator("#services svg")).toHaveCount(1);
  await expect(page.locator("#services [data-bi-scene]")).toHaveCount(6);
});

test("homepage Beneath Interface stays static and readable with reduced motion", async ({ page }) => {
  await openStablePage(page, "/", { language: "ar", theme: "dark", viewport: viewports.tabletPortrait, reducedMotion: "reduce" });
  await expect(page.locator("#services")).toBeVisible();
  await expect(page.locator("#services svg")).toHaveCount(1);
  await expect(page.locator("#services a[href='/contact']").first()).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("homepage shared stages fit the required responsive viewport range", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "light", viewport: { width: 360, height: 800 }, strictConsole: false });
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 820, height: 1180 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(250);
    await expectNoHorizontalOverflow(page);
    await expect(page.locator("#services svg")).toHaveCount(1);
    await expect(page.locator("#portfolio article")).toHaveCount(4);
  }
});

test("homepage dark phone and RTL composition retain the shared stages", async ({ page }) => {
  await openStablePage(page, "/", { language: "ar", theme: "dark", viewport: { width: 360, height: 800 }, strictConsole: false });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body > div[dir='rtl']")).toBeVisible();
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(250);
    await expectNoHorizontalOverflow(page);
    await expect(page.locator("#services svg")).toHaveCount(1);
    await expect(page.locator("#portfolio article[aria-hidden='false'] a[tabindex='0']")).toBeVisible();
  }
});
