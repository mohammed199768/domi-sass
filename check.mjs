import ts from "typescript";
import fs from "fs";
const files = [
  "src/features/diagnosis/components/DiagnosisLanding.tsx",
  "src/features/diagnosis/components/DiagnosisDomainCard.tsx",
  "src/app/diagnosis/page.tsx",
];
let ok = true;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const out = ts.transpileModule(src, {
    reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, esModuleInterop: true },
  });
  const errs = (out.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
  if (errs.length) { ok = false; console.log(`FAIL ${f}`); errs.forEach(d => console.log("  ", ts.flattenDiagnosticMessageText(d.messageText, "\n"))); }
  else console.log(`OK   ${f}`);
}
process.exit(ok ? 0 : 1);
