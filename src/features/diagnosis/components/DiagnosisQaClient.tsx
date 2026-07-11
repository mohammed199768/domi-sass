"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers, DiagnosisResult, DiagnosisSlug } from "../lib/types";
import { buildDiagnosisResultForVersion } from "../runtime/engineRouter";
import type { DiagnosisEngineVersion } from "../runtime/types";

const slugs: DiagnosisSlug[] = ["clinic", "engineering", "general-business", "venue"];
const presets = [
  ["all-1-5", "All 1/5", 1, 5], ["all-3-3", "All 3/3", 3, 3], ["all-4-4", "All 4/4", 4, 4], ["all-5-5", "All 5/5", 5, 5],
  ["gap-.5", "Gap 0.5", 4.5, 5], ["gap-1", "Gap 1", 4, 5], ["gap-1.5", "Gap 1.5", 3.5, 5], ["gap-2", "Gap 2", 3, 5],
  ["severe-conversion", "Severe conversion gap", 4, 4], ["severe-trust", "Severe trust gap", 4, 4],
  ["weak-followup", "Weak follow-up", 4, 4], ["website-operations", "Strong website / weak operations", 4, 4],
  ["domain-isolated", "Domain-specific isolated severe gap", 4, 4],
] as const;

export default function DiagnosisQaClient({ assessments }: { assessments: Record<DiagnosisEngineVersion, Record<string, DiagnosisAssessment>> }) {
  const [slug, setSlug] = useState<DiagnosisSlug>("clinic");
  const [version, setVersion] = useState<DiagnosisEngineVersion>("v2");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const assessment = assessments[version][slug];
  const [preset, setPreset] = useState("all-3-3");
  const [context, setContext] = useState<DiagnosisContextAnswers>({});
  const [answerOverrides, setAnswerOverrides] = useState<DiagnosisAnswerMap>({});
  const answers = useMemo(() => ({ ...makeAnswers(assessment, preset), ...answerOverrides }), [assessment, preset, answerOverrides]);
  const selected = buildDiagnosisResultForVersion(assessment, answers, context, version);
  const comparisonVersion = version === "v2" ? "v1" : "v2";
  const comparison = buildDiagnosisResultForVersion(assessments[comparisonVersion][slug], answers, context, comparisonVersion);
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[.2em] text-primary-theme">Local-only decision review</p>
        <h1 className="mt-3 text-4xl font-black">Diagnosis QA dashboard</h1>
        <div className="mt-7 grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-4">
          <Select label="Domain" value={slug} onChange={value => { setSlug(value as DiagnosisSlug); setContext({}); }} options={slugs.map(x => [x, x])} />
          <Select label="Engine" value={version} onChange={value => setVersion(value as DiagnosisEngineVersion)} options={[["v1","V1"],["v2","V2"]]} />
          <Select label="Language" value={language} onChange={value => setLanguage(value as "en"|"ar")} options={[["en","English"],["ar","العربية"]]} />
          <Select label="Scenario" value={preset} onChange={setPreset} options={presets.map(x => [x[0],x[1]])} />
        </div>
        <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-3">
          {assessment.contextForm.fields.map(field => <label key={field.id} className="text-xs font-bold">{language === "ar" ? field.labelAr || field.label : field.label}<input className="mt-1 w-full rounded-lg border border-border bg-background p-2" value={context[field.id] || ""} onChange={event => setContext(current => ({...current,[field.id]:event.target.value}))} /></label>)}
        </div>
        <details className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <summary className="cursor-pointer text-sm font-black">Answer controls</summary>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {assessment.dimensions.flatMap(d => d.topics).map(topic => <div key={topic.id} className="rounded-xl bg-surface-muted p-3 text-xs font-bold"><p>{language === "ar" ? topic.labelAr || topic.label : topic.label}</p>{(["current","target"] as const).map(key => <label key={key} className="mt-2 flex items-center gap-2"><span className="w-14 capitalize">{key}</span><input type="range" min={1} max={5} step={0.5} value={answers[topic.id]?.[key] ?? 1} onChange={event => setAnswerOverrides(current => ({...current,[topic.id]:{current:answers[topic.id]?.current ?? 1,target:answers[topic.id]?.target ?? 1,currentTouched:true,targetTouched:true,[key]:Number(event.target.value)}}))}/><span>{answers[topic.id]?.[key]}</span></label>)}</div>)}
          </div>
        </details>
        <button type="button" className="btn-primary mt-4 px-5 py-3" onClick={() => setAnswerOverrides(current => ({...current}))}>Run assessment</button>
        <div className="mt-6 grid gap-5 lg:grid-cols-2"><ResultCard title={`${version.toUpperCase()} selected`} result={selected} /><ResultCard title={`${comparisonVersion.toUpperCase()} comparison`} result={comparison} /></div>
        <div className="mt-6 flex flex-wrap gap-3"><Link className="btn-primary px-5 py-3" href={`/diagnosis/${slug}?engine=${version}`}>Open real route</Link><button className="btn-secondary px-5 py-3" onClick={() => window.print()}>Export / print QA PDF</button></div>
      </div>
    </main>
  );
}

function makeAnswers(assessment: DiagnosisAssessment, presetId: string): DiagnosisAnswerMap {
  const p=presets.find(x=>x[0]===presetId) || presets[1];
  const topics=assessment.dimensions.flatMap(d=>d.topics);
  const answers=Object.fromEntries(topics.map(t=>[t.id,{current:p[2],target:p[3],currentTouched:true,targetTouched:true}])) as DiagnosisAnswerMap;
  const patterns: Record<string, (topic: typeof topics[number]) => boolean> = {
    "severe-conversion": topic => topic.tags.some(tag => /conversion|booking|quote|availability|cta/.test(tag)),
    "severe-trust": topic => topic.tags.some(tag => /trust|proof|portfolio|credential|testimonial/.test(tag)),
    "weak-followup": topic => topic.tags.some(tag => /follow-up|crm|tracking/.test(tag)),
    "website-operations": topic => topic.tags.some(tag => /follow-up|crm|system|tracking/.test(tag)),
    "domain-isolated": topic => topic.id === topics[0]?.id,
  };
  if(patterns[presetId]) topics.filter(patterns[presetId]).forEach(topic => { answers[topic.id]={current:1,target:5,currentTouched:true,targetTouched:true}; });
  return answers;
}
function Select({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:readonly (readonly [string,string])[]}){return <label className="text-xs font-bold">{label}<select className="mt-1 w-full rounded-lg border border-border bg-background p-2" value={value} onChange={e=>onChange(e.target.value)}>{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>}
function ResultCard({title,result}:{title:string;result:DiagnosisResult}){return <section className="rounded-2xl border border-border bg-surface p-5"><h2 className="text-xl font-black">{title}</h2><dl className="mt-4 grid grid-cols-3 gap-2 text-xs"><Metric label="Profile" value={result.profile.id}/><Metric label="Current / target" value={`${result.averageCurrent} / ${result.averageTarget}`}/><Metric label="Cards" value={String(result.recommendations.length)}/><Metric label="Decision hash" value={result.debugMeta?.decisionHash || "V1"}/><Metric label="Suppressed" value={String(result.debugMeta?.suppressedRecommendations.length || 0)}/><Metric label="Visible" value={result.debugMeta?.visibleCategories.join(", ") || "all V1 sections"}/></dl><ol className="mt-5 space-y-2 text-sm">{result.recommendations.map(r=><li key={r.id} className="rounded-lg bg-surface-muted p-3"><b>{r.category}</b> · {r.title}</li>)}</ol>{result.debugMeta?<details className="mt-4 text-xs"><summary>Ranking and suppression details</summary><pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap">{JSON.stringify(result.debugMeta,null,2)}</pre></details>:null}</section>}
function Metric({label,value}:{label:string;value:string}){return <div><dt className="text-muted">{label}</dt><dd className="mt-1 break-words font-bold">{value}</dd></div>}
