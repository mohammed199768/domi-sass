import type { WhyChangeChartType } from "./whyChangeScenes";

type Props = { type: WhyChangeChartType; isAr: boolean };

const copy = {
  radial: { en: ["Internet adoption", "73.2%"], ar: ["انتشار الإنترنت", "73.2%"] },
  orbit: { en: ["Social identities", "5.79B", "94.7% monthly"], ar: ["هويات اجتماعية", "5.79B", "94.7% شهريًا"] },
  split: { en: ["Daily", "97%", "Almost constant", "4 / 10"], ar: ["يوميًا", "97%", "تقريبًا باستمرار", "4 / 10"] },
  flow: { en: ["STRANGER", "VISITOR"], ar: ["غريب", "زائر"] },
  "broken-path": { en: ["AD CLICK", "LANDING PLACE", "DECISION", "unclear"], ar: ["نقرة الإعلان", "مكان الوصول", "القرار", "غير واضح"] },
  hub: { en: ["What you offer", "Why trust you", "Next step", "CONVERSION CENTER"], ar: ["ماذا تقدم", "لماذا يثق بك", "الخطوة التالية", "مركز التحويل"] },
  speed: { en: ["1s", "2s", "3s", "53% RISK"], ar: ["1ث", "2ث", "3ث", "خطر 53%"] },
  funnel: { en: ["INTEREST", "CART", "DROP-OFF", "70.22%"], ar: ["اهتمام", "سلة", "انسحاب", "70.22%"] },
  ladder: { en: ["UNDERSTAND", "TRUST", "PROOF", "EASE", "NEXT STEP"], ar: ["فهم", "ثقة", "دليل", "وضوح", "خطوة"] },
  compare: { en: ["ADS ONLY", "LEAK", "ADS + SYSTEM", "REQUEST"], ar: ["إعلانات فقط", "تسرب", "إعلان + نظام", "طلب"] },
  chain: { en: ["ATTENTION", "TRUST", "REQUEST", "CUSTOMER"], ar: ["انتباه", "ثقة", "طلب", "عميل"] },
} as const;

export default function WhyChangeDataChart({ type, isAr }: Props) {
  const labels = copy[type][isAr ? "ar" : "en"];
  const common = { className: "why-chart", viewBox: "0 0 420 210", role: "img", "aria-hidden": true } as const;

  if (type === "radial") return <svg {...common}>
    <circle className="chart-grid" cx="112" cy="105" r="62" />
    <circle data-chart-path className="chart-signal chart-ring" cx="112" cy="105" r="62" pathLength="100" strokeDasharray="73.2 100" />
    {[0, 1, 2, 3, 4, 5].map((n) => <circle key={n} data-anime-node className="chart-node" cx={236 + n * 24} cy={n % 2 ? 126 : 84} r="4" />)}
    <path className="chart-grid-line" d="M230 105H362M248 84l32 42 34-42 32 42" />
    <text className="chart-value" x="112" y="102">{labels[1]}</text><text className="chart-label" x="112" y="125">{labels[0]}</text>
  </svg>;

  if (type === "orbit") return <svg {...common}>
    <ellipse className="chart-grid" cx="210" cy="104" rx="150" ry="68" />
    <ellipse data-chart-path className="chart-signal" cx="210" cy="104" rx="150" ry="68" pathLength="100" strokeDasharray="94.7 100" />
    {[72, 132, 210, 288, 348].map((x, n) => <circle key={x} data-anime-node className="chart-node" cx={x} cy={n % 2 ? 68 : 125} r={n === 2 ? 7 : 4} />)}
    <text className="chart-value" x="210" y="103">{labels[1]}</text><text className="chart-label" x="210" y="124">{labels[0]}</text><text className="chart-note" x="210" y="185">{labels[2]}</text>
  </svg>;

  if (type === "split") return <svg {...common}>
    <text className="chart-label start" x="28" y="42">{labels[0]}</text><text className="chart-value end" x="390" y="44">{labels[1]}</text>
    <rect className="chart-grid-fill" x="28" y="58" width="362" height="14" rx="7" /><rect data-chart-path className="chart-signal-fill" x="28" y="58" width="351" height="14" rx="7" />
    <text className="chart-label start" x="28" y="126">{labels[2]}</text><text className="chart-value end" x="390" y="128">{labels[3]}</text>
    <rect className="chart-grid-fill" x="28" y="142" width="362" height="14" rx="7" /><rect data-chart-path className="chart-accent-fill" x="28" y="142" width="145" height="14" rx="7" />
  </svg>;

  if (type === "flow") return <FlowSvg labels={labels} common={common} />;
  if (type === "broken-path") return <svg {...common}>
    <path className="chart-grid-line" d="M54 104H170M250 104h116" /><path data-chart-path className="chart-signal dash" d="M54 104H170l18-15 18 30 18-30 26 15h116" />
    {[54, 210, 366].map((x) => <circle key={x} data-anime-node className="chart-node" cx={x} cy="104" r="8" />)}
    <text className="chart-label" x="54" y="142">{labels[0]}</text><text className="chart-label" x="210" y="70">{labels[1]}</text><text className="chart-label" x="366" y="142">{labels[2]}</text><text className="chart-warning" x="210" y="166">{labels[3]}</text>
  </svg>;
  if (type === "hub") return <svg {...common}>
    <path data-chart-path className="chart-signal" d="M83 54L210 105 337 54M83 156l127-51 127 51" />
    <circle className="chart-hub" cx="210" cy="105" r="49" /><circle data-anime-node className="chart-node" cx="210" cy="105" r="7" />
    <text className="chart-value small" x="210" y="101">{labels[3]}</text>
    <text className="chart-label" x="83" y="38">{labels[0]}</text><text className="chart-label" x="337" y="38">{labels[1]}</text><text className="chart-label" x="337" y="184">{labels[2]}</text>
  </svg>;
  if (type === "speed") return <svg {...common}>
    <path className="chart-grid-line" d="M34 170H390M34 40v130" /><path data-chart-path className="chart-warning-line" d="M50 58L150 70 250 94 370 158" />
    {[50, 150, 250].map((x, n) => <g key={x}><circle data-anime-node className="chart-node" cx={x} cy={[58,70,94][n]} r="5"/><text className="chart-label" x={x} y="190">{labels[n]}</text></g>)}
    <text className="chart-warning" x="366" y="145">{labels[3]}</text>
  </svg>;
  if (type === "funnel") return <svg {...common}>
    <path data-chart-path className="chart-signal-fill soft" d="M35 35H385L318 91H102Z"/><path className="chart-accent-fill soft" d="M102 99H318L270 145H150Z"/><path className="chart-warning-fill soft" d="M150 153H270L248 183H172Z"/>
    <text className="chart-label" x="210" y="68">{labels[0]}</text><text className="chart-label" x="210" y="126">{labels[1]}</text><text className="chart-label" x="210" y="174">{labels[2]} · {labels[3]}</text>
  </svg>;
  if (type === "ladder") return <svg {...common}>
    <path data-chart-path className="chart-signal" d="M42 168H105V138H168V108H231V78H294V48H378" />
    {labels.map((label, n) => <g key={label}><circle data-anime-node className="chart-node" cx={74 + n * 68} cy={168 - n * 30} r="5"/><text className="chart-note" x={74 + n * 68} y={192 - n * 30}>{label}</text></g>)}
  </svg>;
  if (type === "compare") return <svg {...common}>
    <path data-chart-path className="chart-warning-line" d="M42 67H186l38 35"/><path data-chart-path className="chart-signal" d="M42 150H245l130-83"/>
    <circle className="chart-warning-fill" cx="224" cy="102" r="7"/><circle data-anime-node className="chart-node" cx="375" cy="67" r="7"/>
    <text className="chart-label start" x="42" y="50">{labels[0]}</text><text className="chart-warning" x="224" y="126">{labels[1]}</text><text className="chart-label start" x="42" y="177">{labels[2]}</text><text className="chart-value small" x="375" y="48">{labels[3]}</text>
  </svg>;
  return <FlowSvg labels={labels} common={common} chain />;
}

function FlowSvg({ labels, common, chain = false }: { labels: readonly string[]; common: React.SVGProps<SVGSVGElement>; chain?: boolean }) {
  const xs = chain ? [55, 158, 262, 365] : [90, 330];
  return <svg {...common}>
    <path data-chart-path className="chart-signal" d={chain ? "M55 105H365" : "M90 105H330"} />
    {xs.map((x, n) => <g key={x}><circle data-anime-node className={n === xs.length - 1 ? "chart-node accent" : "chart-node"} cx={x} cy="105" r="9"/><text className="chart-label" x={x} y={chain ? 138 : 140}>{labels[n]}</text></g>)}
    {!chain && <path className="chart-arrow" d="M315 95l15 10-15 10" />}
  </svg>;
}

