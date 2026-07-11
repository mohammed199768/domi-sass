import assert from "node:assert/strict";
import { getDiagnosisEngineVersion } from "../../runtime/engineConfig.js";

const previous = process.env.DIAGNOSIS_ENGINE_CLINIC;
process.env.DIAGNOSIS_ENGINE_CLINIC = "v2";
assert.equal(getDiagnosisEngineVersion("clinic"), "v2");
process.env.DIAGNOSIS_ENGINE_CLINIC = "v1";
assert.equal(getDiagnosisEngineVersion("clinic"), "v1");
process.env.DIAGNOSIS_ENGINE_CLINIC = "invalid";
assert.equal(getDiagnosisEngineVersion("clinic"), "v1");
if (previous === undefined) delete process.env.DIAGNOSIS_ENGINE_CLINIC; else process.env.DIAGNOSIS_ENGINE_CLINIC = previous;
console.log("RUNTIME_ROUTING_ROLLBACK_PASS (v2 -> v1 -> safe default)");
