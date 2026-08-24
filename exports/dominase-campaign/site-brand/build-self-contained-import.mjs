import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [sourceDirectory, outputFile, width, height, title] = process.argv.slice(2);

if (!sourceDirectory || !outputFile || !width || !height) {
  throw new Error("Usage: node build-self-contained-import.mjs <pages-dir> <output-html> <width> <height> [title]");
}

const artifactKey = `${sourceDirectory} ${outputFile}`.toLowerCase();
const labels = artifactKey.includes("qasr")
  ? ["The Message", "The Real Problem", "Built from Scratch", "Public Experience", "Booking Flow", "Platform Architecture", "After Booking", "The Outcome"]
  : artifactKey.includes("stories")
    ? ["Five Seconds Poll", "From Visits to Action", "Selected Work", "The Method", "Start a Project"]
    : ["Cover", "Our Clinic", "CureVie", "Qasr Al-Farah", "Manal LMS", "More Systems", "Process", "CTA"];

const pages = [];
for (let index = 0; index < labels.length; index += 1) {
  const filename = `${String(index + 1).padStart(2, "0")}.png`;
  const data = await readFile(path.join(sourceDirectory, filename));
  pages.push({
    label: `${String(index + 1).padStart(2, "0")} — ${labels[index]}`,
    dataUri: `data:image/png;base64,${data.toString("base64")}`,
  });
}

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title || "DOMINASE Campaign"}</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #020403; }
    body { display: flex; flex-direction: column; align-items: center; }
    .page { width: ${width}px; height: ${height}px; margin: 0; overflow: hidden; background: #020403; }
    .page img { display: block; width: 100%; height: 100%; object-fit: cover; }
  </style>
</head>
<body>
${pages.map((page) => `  <section class="page" data-document-role="page" data-label="${page.label}"><img src="${page.dataUri}" alt="" /></section>`).join("\n")}
</body>
</html>`;

await writeFile(outputFile, html, "utf8");
console.log(`Created ${outputFile} with ${pages.length} embedded pages.`);
