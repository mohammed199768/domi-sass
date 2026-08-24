import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("exports/our-clinic-campaign-v1");
const inputPath = path.join(root, "carousel", "index.html");
const outputPath = path.join(root, "our-clinic-carousel-self-contained.html");
const sourceDir = path.dirname(inputPath);

const mimeByExtension = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function toDataUri(relativePath) {
  if (/^(data:|https?:)/i.test(relativePath)) return relativePath;
  const absolutePath = path.resolve(sourceDir, relativePath);
  const mime = mimeByExtension[path.extname(absolutePath).toLowerCase()];
  if (!mime) throw new Error(`Unsupported embedded asset: ${absolutePath}`);
  const data = await fs.readFile(absolutePath);
  return `data:${mime};base64,${data.toString("base64")}`;
}

let html = await fs.readFile(inputPath, "utf8");
for (const match of [...html.matchAll(/src="([^"]+)"/g)]) {
  html = html.replace(match[0], `src="${await toDataUri(match[1])}"`);
}
for (const match of [...html.matchAll(/url\("([^"]+)"\)/g)]) {
  html = html.replace(match[0], `url("${await toDataUri(match[1])}")`);
}
await fs.writeFile(outputPath, html, "utf8");
console.log(outputPath);
