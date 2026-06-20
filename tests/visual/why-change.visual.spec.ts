import { expect, test } from "@playwright/test";
import { expectCorePageAccessibility, expectNoHorizontalOverflow, openStablePage, viewports } from "./helpers";

test("why-change English desktop film", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.desktop });
  await expectCorePageAccessibility(page);
  await expect(page.getByRole("heading", { level: 1, name: "Why Change?" })).toBeVisible();
  await expect(page.locator("[data-why-scene]")).toHaveCount(11);
  await expect(page.locator("[data-why-scene] .why-chart")).toHaveCount(11);
  await expect(page.locator("[data-why-scene] img[src*='/assest/why/']")).toHaveCount(10);
  await expect(page.getByText("6.04B internet users")).toBeAttached();
  await expect(page.getByText("70.22% average cart abandonment")).toBeAttached();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await expect(page.locator("[data-scene-id='shift']")).toHaveScreenshot("why-change-film-dark-desktop.png");
});

test("why-change Arabic mobile remains vertical", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "ar", theme: "light", viewport: viewports.mobile });
  await expect(page.getByRole("heading", { level: 1, name: "لماذا التغيير؟" })).toBeVisible();
  await expect(page.getByText("6.04 مليار مستخدم للإنترنت")).toBeAttached();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".why-continuity")).toBeHidden();
  await expect(page.locator(".why-scene__guide").first()).toBeHidden();
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveScreenshot("why-change-light-mobile.png");
});

test("why-change warm light desktop film", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "light", viewport: viewports.desktop });
  await expect(page.locator(".why-change-page")).toHaveCSS("background-color", "rgb(248, 245, 238)");
  await expect(page.locator("[data-scene-id='shift']")).toHaveScreenshot("why-change-film-light-desktop.png");
});

test("why-change controlled wheel advances at most one scene and stays settled", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.desktop });
  await page.evaluate(() => document.querySelector("#why-film-stage")?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, 1_200);
  await page.waitForTimeout(1_500);
  const film = page.locator("#why-film-stage");
  const settledScene = Number(await film.getAttribute("data-scene-index"));
  expect(settledScene).toBeLessThanOrEqual(1);
  const settledId = await film.getAttribute("data-active-scene");
  await page.waitForTimeout(1_500);
  expect(await film.getAttribute("data-scene-index")).toBe(String(settledScene));
  expect(await film.getAttribute("data-active-scene")).toBe(settledId);
});

test("why-change small wheel steps progress monotonically", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.desktop });
  await page.evaluate(() => document.querySelector("#why-film-stage")?.scrollIntoView());
  await page.waitForTimeout(700);
  const film = page.locator("#why-film-stage");
  const indexes: number[] = [];
  for (let step = 0; step < 3; step += 1) {
    await page.mouse.wheel(0, 520);
    await page.waitForTimeout(900);
    indexes.push(Number(await film.getAttribute("data-scene-index")));
  }
  expect(indexes.every((value, index) => index === 0 || value >= indexes[index - 1])).toBe(true);
  expect(indexes.every((value, index) => index === 0 || value - indexes[index - 1] <= 1)).toBe(true);
});

test("why-change visible SVG storytelling stays within budget", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.desktop });
  await page.evaluate(() => document.querySelector("#why-film-stage")?.scrollIntoView());
  await page.waitForTimeout(900);
  const counts = await page.evaluate(() => {
    const visible = (node: Element) => {
      const style = getComputedStyle(node);
      return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0;
    };
    return {
      overlayPaths: Array.from(document.querySelectorAll("[data-flow-path], [data-scene-guide]")).filter(visible).length,
      microNodes: Array.from(document.querySelectorAll("[data-anime-node], [data-anime-arrow]")).filter(visible).length,
    };
  });
  expect(counts.overlayPaths).toBeLessThanOrEqual(3);
  expect(counts.microNodes).toBeLessThanOrEqual(8);
});

test("why-change alternates editorial composition", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.desktop });
  for (const layout of ["opening", "copy-left", "visual-left", "stat-led", "chart-led"]) {
    await expect(page.locator(`[data-layout='${layout}']`).first()).toBeAttached();
  }

  const visualLeft = page.locator("[data-layout='visual-left']").first();
  const visualBox = await visualLeft.locator(".why-scene__visual").boundingBox();
  const copyBox = await visualLeft.locator(".why-scene__copy").boundingBox();
  expect(visualBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(visualBox!.x).toBeLessThan(copyBox!.x);
  await expect(visualLeft.locator(".why-scene__frame")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("why-change sources and conversion CTAs", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "light", viewport: viewports.desktop, reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".why-continuity")).toBeHidden();
  await expect(page.locator(".why-scene__guide").first()).toBeHidden();
  await expect(page.locator("[data-why-scene]").first()).toBeVisible();
  await expect(page.locator("[data-why-scene]").last()).toBeVisible();
  await expect(page.locator("a[target='_blank'][rel='noopener noreferrer']")).toHaveCount(8);
  await expect(page.getByRole("link", { name: "Start your project" })).toHaveAttribute("href", "/#contact");
  await expect(page.getByRole("link", { name: "View case studies" })).toHaveAttribute("href", "/work");
});
