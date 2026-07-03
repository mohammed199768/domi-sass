import ts from "typescript";
import fs from "fs";
for (const f of ["src/features/diagnosis/components/DiagnosisDomainCard.tsx"]) {
  const src = fs.readFileSync(f, "utf8");
  const out = ts.transpileModule(src, { reportDiagnostics: true, fileName: f, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } });
  const errs = (out.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
  for (const d of errs) {
    const pos = d.start!=null ? src.slice(0,d.start).split("\n").length : "?";
    const around = d.start!=null ? JSON.stringify(src.slice(d.start-30, d.start+30)) : "";
    console.log(`line~${pos}: ${ts.flattenDiagnosticMessageText(d.messageText,"\n")}`);
    console.log("   ctx:", around);
  }
}
