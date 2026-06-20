type Props = { finalState: boolean };

const nodes = [
  { x: 85, y: 95, dx: -90, dy: -55, rotate: -9 },
  { x: 85, y: 300, dx: -100, dy: 70, rotate: 8 },
  { x: 635, y: 95, dx: 95, dy: -65, rotate: 7 },
  { x: 635, y: 300, dx: 110, dy: 70, rotate: -8 },
];

export default function TrainingPlatformSvg({ finalState }: Props) {
  return (
    <svg viewBox="0 0 880 500" aria-hidden="true" className="h-auto w-full">
      <g className="text-border" stroke="currentColor" opacity=".55">
        {Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 110} 0V500`} />)}
        {Array.from({ length: 6 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100}H880`} />)}
      </g>
      {[
        "M245 135C300 135 305 180 344 180", "M635 135C580 135 575 180 536 180",
        "M245 340C300 340 305 310 344 310", "M635 340C580 340 575 310 536 310",
      ].map((d) => <path key={d} data-system-path d={d} fill="none" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" style={finalState ? undefined : { strokeDasharray: 180, strokeDashoffset: 180 }} />)}

      <g data-platform-core>
        <rect x="330" y="90" width="220" height="330" rx="26" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
        <rect x="354" y="116" width="172" height="34" rx="10" fill="var(--primary)" />
        <circle cx="503" cy="133" r="6" fill="var(--secondary)" />
        <rect x="354" y="170" width="78" height="82" rx="12" fill="var(--primary)" opacity=".12" />
        <rect x="444" y="170" width="82" height="82" rx="12" fill="var(--secondary)" opacity=".2" />
        <rect x="354" y="270" width="172" height="120" rx="12" fill="var(--primary)" opacity=".08" />
        {[0, 1, 2, 3].map((i) => <g key={i}><circle cx="374" cy={293 + i * 25} r="5" fill="var(--primary)"/><rect x="389" y={289 + i * 25} width={86 - i * 5} height="8" rx="4" fill="var(--primary)" opacity=".22"/></g>)}
      </g>

      {nodes.map((node, index) => (
        <g key={index} transform={`translate(${node.x} ${node.y})`}>
          <g data-system-node style={finalState ? undefined : { transform: `translate(${node.dx}px, ${node.dy}px) rotate(${node.rotate}deg)`, transformOrigin: "80px 40px" }}>
            <rect width="160" height="80" rx="15" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
            <rect x="18" y="19" width="48" height="7" rx="3.5" fill="var(--primary)" opacity=".72" />
            <rect x="18" y="38" width={index % 2 ? 112 : 95} height="6" rx="3" fill="var(--primary)" opacity=".17" />
            <rect x="18" y="55" width="68" height="6" rx="3" fill="var(--secondary)" opacity=".45" />
          </g>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} data-system-dot cx={364 + i * 31} cy="452" r="8" fill={i === 4 ? "var(--secondary)" : "var(--primary)"} style={finalState ? undefined : { transform: `translate(${i % 2 ? 130 : -130}px, ${(i - 2) * 25}px)` }} />)}
    </svg>
  );
}
