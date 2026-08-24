import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const root = path.resolve("exports/our-clinic-campaign-v1");

async function renderDocument(browser, input, outputDir, expectedWidth, expectedHeight) {
  await fs.mkdir(outputDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: expectedWidth + 160, height: expectedHeight + 160 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(input).href, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    })));
  });
  const items = page.locator(".page");
  const count = await items.count();
  for (let index = 0; index < count; index += 1) {
    const target = path.join(outputDir, `${String(index + 1).padStart(2, "0")}.png`);
    await items.nth(index).screenshot({ path: target, animations: "disabled" });
  }
  await page.close();
  return count;
}

const browser = await chromium.launch({ headless: true });
try {
  const graphicsCount = await renderDocument(
    browser,
    path.join(root, "graphics", "index.html"),
    path.join(root, "graphics", "renders"),
    1080,
    1920,
  );
  const carouselCount = await renderDocument(
    browser,
    path.join(root, "carousel", "index.html"),
    path.join(root, "carousel", "renders"),
    1080,
    1350,
  );
  console.log(`Rendered ${graphicsCount} reel graphics and ${carouselCount} carousel pages.`);
} finally {
  await browser.close();
}
