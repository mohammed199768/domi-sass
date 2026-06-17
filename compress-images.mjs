/**
 * compress-images.mjs
 *
 * Safe image compression utility (ESM).
 * - Reads each image into a buffer, compresses, compares sizes.
 * - Only overwrites if the compressed version is smaller.
 * - Prints a clean summary table.
 *
 * Usage:
 *   node compress-images.mjs [dir1] [dir2] ...
 *
 * Defaults to: public/assest/resize  and  public/images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Configuration ────────────────────────────────────────────────────────────

const DEFAULT_DIRS = [
  path.join(__dirname, 'public', 'assest', 'resize'),
  path.join(__dirname, 'public', 'images'),
];

/** Quality settings. Higher = better visual quality, larger file. */
const JPEG_QUALITY = 75;   // mozjpeg 75 keeps good quality
const PNG_QUALITY  = 75;   // palette PNG quality
const WEBP_QUALITY = 80;   // webp output quality

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function pad(str, len, right = false) {
  const s = String(str);
  return right ? s.padEnd(len) : s.padStart(len);
}

async function compressBuffer(inputBuffer, ext) {
  if (ext === '.png') {
    return sharp(inputBuffer)
      .png({ palette: true, compressionLevel: 9, quality: PNG_QUALITY })
      .toBuffer();
  }
  if (ext === '.webp') {
    return sharp(inputBuffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
  }
  // .jpg / .jpeg
  return sharp(inputBuffer)
    .jpeg({ mozjpeg: true, quality: JPEG_QUALITY })
    .toBuffer();
}

// ─── Core ─────────────────────────────────────────────────────────────────────

async function processDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`  [skip] Directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) =>
    /\.(png|jpe?g|webp)$/i.test(f)
  );

  if (files.length === 0) {
    console.log(`  [skip] No images found in: ${dir}`);
    return [];
  }

  const rows = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const originalSize = inputBuffer.length;

      const outputBuffer = await compressBuffer(inputBuffer, ext);
      const newSize = outputBuffer.length;

      if (newSize >= originalSize) {
        rows.push({ file, originalSize, newSize, status: 'skipped (larger)' });
        continue;
      }

      fs.writeFileSync(filePath, outputBuffer);
      const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      rows.push({ file, originalSize, newSize, status: `−${saved}%` });
    } catch (err) {
      rows.push({ file, originalSize: 0, newSize: 0, status: `ERROR: ${err.message}` });
    }
  }

  return rows;
}

function printTable(dir, rows) {
  const colFile    = Math.max(8, ...rows.map((r) => r.file.length));
  const colFrom    = 10;
  const colTo      = 10;
  const colStatus  = Math.max(8, ...rows.map((r) => r.status.length));

  const sep = `${'─'.repeat(colFile + 2)}┼${'─'.repeat(colFrom + 2)}┼${'─'.repeat(colTo + 2)}┼${'─'.repeat(colStatus + 2)}`;
  const header = ` ${pad('File', colFile, true)} │ ${pad('Before', colFrom)} │ ${pad('After', colTo)} │ ${pad('Result', colStatus, true)}`;

  console.log(`\n  📁 ${dir}`);
  console.log(`  ${sep}`);
  console.log(`  ${header}`);
  console.log(`  ${sep}`);

  for (const r of rows) {
    const from   = r.originalSize ? formatBytes(r.originalSize) : '—';
    const to     = r.newSize      ? formatBytes(r.newSize)      : '—';
    const line   = ` ${pad(r.file, colFile, true)} │ ${pad(from, colFrom)} │ ${pad(to, colTo)} │ ${pad(r.status, colStatus, true)}`;
    const icon   = r.status.startsWith('−') ? '✔' : r.status.startsWith('ERROR') ? '✖' : '·';
    console.log(`  ${icon}${line}`);
  }

  console.log(`  ${sep}`);
}

async function main() {
  const targetDirs = process.argv.slice(2).length
    ? process.argv.slice(2).map((d) => path.resolve(d))
    : DEFAULT_DIRS;

  console.log('\n🗜  Image Compression (safe mode — skips if output is larger)\n');

  for (const dir of targetDirs) {
    const rows = await processDir(dir);
    if (rows.length > 0) {
      printTable(dir, rows);
    }
  }

  console.log('\n✅ Done.\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
