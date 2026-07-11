import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, openStablePage } from "./helpers";

const states = [
  { name: "dark desktop", theme: "dark" as const, viewport: { width: 1440, height: 900 } },
  { name: "light desktop", theme: "light" as const, viewport: { width: 1440, height: 900 } },
  { name: "dark tablet", theme: "dark" as const, viewport: { width: 820, height: 1180 } },
  { name: "light tablet", theme: "light" as const, viewport: { width: 820, height: 1180 } },
  { name: "dark mobile", theme: "dark" as const, viewport: { width: 390, height: 844 } },
  { name: "light mobile", theme: "light" as const, viewport: { width: 390, height: 844 } },
] as const;

for (const state of states) {
  test(`homepage ${state.name} themed surface`, async ({ page }, testInfo) => {
    await openStablePage(page, "/", { language: "en", ...state, strictConsole: false });
    await expect(page.locator("#home")).toHaveAttribute("data-hero-theme", "adaptive");
    await expect(page.locator(".home-cinematic-stage").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    if (state.theme === "light") {
      const heroBackground = await page.locator("#home").evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(heroBackground).not.toBe("rgb(0, 0, 0)");
    }

    await page.screenshot({ path: testInfo.outputPath(`homepage-${state.theme}-${state.viewport.width}.png`), fullPage: false });
  });
}

for (const theme of ["light", "dark"] as const) {
  test(`homepage reduced-motion ${theme} fallback`, async ({ page }, testInfo) => {
    await openStablePage(page, "/", {
      language: "ar",
      theme,
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      strictConsole: false,
    });
    await expect(page.locator("#home")).toHaveAttribute("data-hero-theme", "adaptive");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: testInfo.outputPath(`homepage-reduced-${theme}.png`), fullPage: false });
  });
}

test("Hero remains a light, transparent-canvas composition after a live theme switch", async ({ page }, testInfo) => {
  await page.addInitScript(() => localStorage.setItem("dominase-theme", "dark"));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);

  const hero = page.locator("#home");
  const canvas = hero.locator("canvas");
  await expect(canvas).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await hero.screenshot({ path: testInfo.outputPath("hero-dark.png") });

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect.poll(async () => hero.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgb(0, 0, 0)");
  const contrast = await hero.evaluate((element) => {
    const wordmark = element.querySelector("[data-hero-wordmark]");
    return { background: getComputedStyle(element).backgroundColor, wordmark: wordmark ? getComputedStyle(wordmark).color : "" };
  });
  expect(contrast.wordmark).not.toBe(contrast.background);
  expect(await canvas.evaluate((node) => (node as HTMLCanvasElement).getContext("webgl")?.getContextAttributes()?.alpha === true)).toBe(true);
  await hero.screenshot({ path: testInfo.outputPath("hero-light-after-switch.png") });
});

test("cinematic stage keeps scene visibility atomic in both scroll directions", async ({ page }, testInfo) => {
  await page.addInitScript(() => localStorage.setItem("dominase-theme", "light"));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const stage = page.locator("section:has([data-home-scene])");
  const sceneState = () => page.locator("[data-home-scene]").evaluateAll((nodes) => nodes.map((node) => {
    const styles = getComputedStyle(node);
    return { active: node.getAttribute("data-scene-active"), visible: styles.visibility !== "hidden" && Number(styles.opacity) > 0.05 };
  }));
  const scrollStage = async (progress: number) => {
    await page.locator("[data-home-scene]").first().evaluate((node, value) => {
      const section = node.closest("section");
      if (!section) return;
      const start = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, start + (section.offsetHeight - window.innerHeight) * Number(value));
    }, progress);
    await page.waitForTimeout(750);
  };

  await scrollStage(0);
  expect((await sceneState()).filter((scene) => scene.visible)).toHaveLength(1);
  await page.locator("section:has([data-home-scene])").screenshot({ path: testInfo.outputPath("scene-01-stable.png") });

  await scrollStage(0.12);
  expect((await sceneState()).filter((scene) => scene.visible).length).toBeLessThanOrEqual(2);
  await page.locator("section:has([data-home-scene])").screenshot({ path: testInfo.outputPath("scene-01-02-midpoint.png") });

  await scrollStage(0.2);
  expect((await sceneState()).filter((scene) => scene.visible)).toHaveLength(1);
  await scrollStage(0);
  expect((await sceneState()).filter((scene) => scene.visible)).toHaveLength(1);
  await expect(stage).toBeVisible();
});
