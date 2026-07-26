/**
 * Design-token ratchet.
 *
 * The audit in docs/BRAND_CONSISTENCY_AUDIT.md found ~400 hand-written colour
 * literals that had drifted around the token system — 60 near-identical
 * off-whites, 55 near-identical near-blacks. Collapsing those is a visual
 * decision and is deliberately NOT done here. What this script does is stop the
 * pile from growing: every file carries a recorded ceiling, and the build fails
 * if a file introduces literals beyond it.
 *
 * The ceiling only ever goes down. When you replace a literal with a token,
 * re-run with --update so the lower number is locked in and can't creep back.
 *
 *   node scripts/check-design-tokens.mjs            # verify
 *   node scripts/check-design-tokens.mjs --update   # re-baseline after cleanup
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const BASELINE = path.join(ROOT, "scripts", "design-token-baseline.json");
const UPDATE = process.argv.includes("--update");

/** globals.css is where tokens are *defined*, so its literals are the point. */
const EXEMPT = new Set(["src/styles/globals.css"]);

const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RGBA = /\brgba?\([0-9\s,./%]+\)/g;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(css|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const counts = {};
for (const file of walk(SRC)) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  if (EXEMPT.has(rel)) continue;
  const text = fs.readFileSync(file, "utf8");
  const n = (text.match(HEX) ?? []).length + (text.match(RGBA) ?? []).length;
  if (n > 0) counts[rel] = n;
}

if (UPDATE) {
  fs.writeFileSync(BASELINE, JSON.stringify(counts, null, 2) + "\n");
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`Baseline written: ${Object.keys(counts).length} files, ${total} literals.`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error("No baseline found. Run: node scripts/check-design-tokens.mjs --update");
  process.exit(1);
}

const base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
const regressions = [];
const improvements = [];

for (const [file, n] of Object.entries(counts)) {
  const allowed = base[file] ?? 0;
  if (n > allowed) regressions.push({ file, n, allowed });
  else if (n < allowed) improvements.push({ file, n, allowed });
}

for (const { file, n, allowed } of improvements) {
  console.log(`improved  ${file}  ${allowed} -> ${n}`);
}

if (regressions.length) {
  console.error("\nRaw colour literals increased. Use a token from globals.css instead.\n");
  for (const { file, n, allowed } of regressions) {
    console.error(`  ${file}  ${allowed} -> ${n}  (+${n - allowed})`);
  }
  console.error("\nIf the increase is genuinely intended, re-baseline with --update.");
  process.exit(1);
}

if (improvements.length) {
  console.log("\nLiterals went down — lock it in with: node scripts/check-design-tokens.mjs --update");
}
console.log(`\nOK — ${Object.values(counts).reduce((a, b) => a + b, 0)} literals, none above baseline.`);
