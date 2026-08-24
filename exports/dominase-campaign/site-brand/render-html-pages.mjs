import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [htmlFile, outputDirectory] = process.argv.slice(2);

if (!htmlFile || !outputDirectory) {
  throw new Error("Usage: node render-html-pages.mjs <html-file> <output-directory>");
}

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 2200 }, deviceScaleFactor: 1 });

await page.goto(pathToFileURL(path.resolve(htmlFile)).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const slides = page.locator('[data-document-role="page"]');
const count = await slides.count();

for (let index = 0; index < count; index += 1) {
  const filename = `${String(index + 1).padStart(2, "0")}.png`;
  await slides.nth(index).screenshot({ path: path.join(outputDirectory, filename) });
}

await browser.close();
console.log(`Rendered ${count} pages to ${path.resolve(outputDirectory)}`);
