import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { buildDiagnosisResultV2 as buildExperimental } from "../../experimental-v2/buildDiagnosisResultV2.js";
import { buildDiagnosisResultV2 as buildPromoted } from "../buildDiagnosisResult.js";
import type { ProfileV2, RecommendationV2 } from "../types.js";

const appRoot = process.cwd();
const clinic = JSON.parse(fs.readFileSync(path.join(appRoot, "src/data/diagnosis/v2/clinic-diagnosis.json"), "utf8"));
const suite = JSON.parse(fs.readFileSync("C:/Users/domim/Desktop/dominase json/09_PILOT_EXPERIMENTS/clinic-v2/engine-v2-evaluation/20_SCENARIO_RESULTS_V2_MICRO_CLOSED.json", "utf8"));
const fallback: ProfileV2 = { id: "synthetic-balanced-opportunity", title: "Balanced Opportunity Map" };

function canonical(result: ReturnType<typeof buildPromoted>) {
  return {
    scores: result.scores,
    profile: result.profile,
    ranked: result.ranked,
    selection: result.selection,
  };
}

for (const scenario of suite.scenarios) {
  const input = {
    dimensions: clinic.dimensions,
    profiles: clinic.scoring.profiles as ProfileV2[],
    recommendations: clinic.recommendations as RecommendationV2[],
    answers: scenario.answers,
    fallbackProfile: fallback,
  };
  assert.deepEqual(canonical(buildPromoted(input)), canonical(buildExperimental(input)), `Parity failed for ${scenario.name}`);
}

console.log(`ENGINE_V2_PARITY_PASS (${suite.scenarios.length} clinic scenarios)`);
