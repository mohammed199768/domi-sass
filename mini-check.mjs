import ts from "typescript";
import fs from "fs";
const src = fs.readFileSync("/tmp/mini.ts", "utf8");
console.log("readback:", JSON.stringify(src.slice(0,40)));
const out = ts.transpileModule(src, { reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2020 } });
const errs = (out.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
console.log("errors:", errs.length);
errs.forEach(d=>console.log("  ", ts.flattenDiagnosticMessageText(d.messageText,"\n")));
