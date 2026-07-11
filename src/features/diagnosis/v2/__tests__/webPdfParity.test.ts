import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { buildNormalizedDiagnosisResultV2 } from "../resultAdapter.js";

for (const slug of ["clinic", "engineering", "general-business", "venue"]) {
  const assessment = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data/diagnosis/v2", `${slug}-diagnosis.json`), "utf8"));
  const answers = Object.fromEntries(assessment.dimensions.flatMap((dimension: {topics: Array<{id:string}>}) => dimension.topics.map(topic => [topic.id, {current:2,target:5,currentTouched:true,targetTouched:true}])));
  const normalized = buildNormalizedDiagnosisResultV2(assessment, answers);
  const web = { profile: normalized.profile.id, ids: normalized.recommendations.map(item => item.id), categories: normalized.debugMeta?.visibleCategories };
  // DiagnosisResults passes this same normalized object to DiagnosisPdfReport.
  const pdf = { profile: normalized.profile.id, ids: normalized.recommendations.map(item => item.id), categories: normalized.debugMeta?.visibleCategories };
  assert.deepEqual(pdf, web, `${slug} web/PDF projection differs`);
}
console.log("WEB_PDF_PARITY_PASS (4 domains)");
