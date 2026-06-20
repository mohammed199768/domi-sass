type Props = { finalState: boolean };

const looseModules = [
  { x: 70, y: 100, dx: -105, dy: -60, rotate: -8, kind: "agenda" },
  { x: 70, y: 310, dx: -120, dy: 75, rotate: 7, kind: "details" },
  { x: 710, y: 100, dx: 110, dy: -65, rotate: 8, kind: "invite" },
  { x: 710, y: 310, dx: 125, dy: 78, rotate: -7, kind: "memory" },
];

export default function WeddingBookingSvg({ finalState }: Props) {
  return (
    <svg viewBox="0 0 960 520" aria-hidden="true" className="h-auto w-full">
      <defs>
        <linearGradient id="booking-board" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--surface-hover)" />
        </linearGradient>
      </defs>
      <g stroke="var(--border)" opacity=".55">
        {Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 120} 0V520`} />)}
        {Array.from({ length: 6 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 104}H960`} />)}
      </g>

      {[
        "M245 142C286 142 288 174 330 174", "M710 142C668 142 668 174 630 174",
        "M245 352C286 352 288 338 330 338", "M710 352C668 352 668 338 630 338",
      ].map((d) => <path key={d} data-system-path d={d} fill="none" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" style={finalState ? undefined : { strokeDasharray: 170, strokeDashoffset: 170 }} />)}

      <g data-platform-core>
        <rect x="310" y="62" width="340" height="400" rx="25" fill="url(#booking-board)" stroke="var(--border)" strokeWidth="2" />
        <rect x="334" y="88" width="292" height="43" rx="11" fill="var(--primary)" />
        <rect x="354" y="104" width="85" height="10" rx="5" fill="var(--bg)" opacity=".72" />
        <circle cx="599" cy="109" r="7" fill="var(--secondary)" />

        <g>
          {[0, 1, 2, 3].map((i) => <g key={i}><circle cx={357 + i * 77} cy="166" r="11" fill={i < 3 ? "var(--primary)" : "var(--secondary)"} opacity={i < 3 ? ".82" : "1"}/>{i < 3 && <path d={`M368 ${166}H${423 + i * 77}`} stroke="var(--primary)" strokeWidth="3" opacity=".2"/>}</g>)}
        </g>

        <rect x="334" y="204" width="178" height="104" rx="14" fill="var(--primary)" opacity=".08" />
        <rect x="525" y="204" width="101" height="104" rx="14" fill="var(--secondary)" opacity=".16" />
        {[0, 1, 2].map((i) => <g key={i}><rect x={350 + i * 51} y="225" width="39" height="34" rx="8" fill="var(--surface)" stroke="var(--border)"/><circle cx={369 + i * 51} cy="275" r="5" fill={i === 1 ? "var(--secondary)" : "var(--primary)"}/></g>)}

        <rect x="334" y="324" width="292" height="112" rx="14" fill="var(--primary)" opacity=".065" />
        {[0, 1, 2].map((i) => <g key={i}><circle cx="357" cy={350 + i * 29} r="6" fill="var(--primary)"/><rect x="373" y={345 + i * 29} width={132 - i * 13} height="9" rx="4.5" fill="var(--primary)" opacity=".2"/><rect x="558" y={343 + i * 29} width="47" height="14" rx="7" fill={i === 2 ? "var(--secondary)" : "var(--surface)"} stroke="var(--border)"/></g>)}
      </g>

      {looseModules.map((module) => (
        <g key={module.kind} transform={`translate(${module.x} ${module.y})`}>
          <g data-system-node style={finalState ? undefined : { transform: `translate(${module.dx}px, ${module.dy}px) rotate(${module.rotate}deg)`, transformOrigin: "87px 43px" }}>
            <rect width="175" height="86" rx={module.kind === "memory" ? 26 : 15} fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
            {module.kind === "agenda" && <><rect x="18" y="16" width="55" height="9" rx="4.5" fill="var(--primary)"/><path d="M19 40H155M19 56H132M19 71H145" stroke="var(--primary)" strokeOpacity=".18" strokeWidth="6" strokeLinecap="round"/></>}
            {module.kind === "details" && <><circle cx="38" cy="32" r="12" fill="var(--secondary)" opacity=".55"/><circle cx="70" cy="32" r="12" fill="var(--primary)" opacity=".25"/><path d="M20 62H152" stroke="var(--primary)" strokeOpacity=".18" strokeWidth="7" strokeLinecap="round"/></>}
            {module.kind === "invite" && <><rect x="18" y="17" width="139" height="24" rx="12" fill="var(--primary)" opacity=".12"/><circle cx="35" cy="63" r="8" fill="var(--secondary)"/><path d="M54 63H145" stroke="var(--primary)" strokeOpacity=".2" strokeWidth="7" strokeLinecap="round"/></>}
            {module.kind === "memory" && <><path d="M37 31C37 17 57 16 64 29C71 16 91 17 91 31C91 44 64 62 64 62S37 44 37 31Z" fill="var(--secondary)" opacity=".65"/><path d="M111 30H151M111 48H143M111 65H133" stroke="var(--primary)" strokeOpacity=".18" strokeWidth="6" strokeLinecap="round"/></>}
          </g>
        </g>
      ))}

      {[0, 1, 2, 3, 4].map((i) => <circle key={i} data-system-dot cx={410 + i * 35} cy="489" r="8" fill={i === 4 ? "var(--secondary)" : "var(--primary)"} style={finalState ? undefined : { transform: `translate(${i % 2 ? 150 : -150}px, ${(i - 2) * 28}px)` }} />)}
    </svg>
  );
}
