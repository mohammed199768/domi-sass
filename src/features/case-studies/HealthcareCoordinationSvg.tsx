type Props = { finalState: boolean };

const scatteredNodes = [
  { x: 100, y: 80, dx: -120, dy: -50, kind: "nurse" },
  { x: 680, y: 90, dx: 140, dy: -40, kind: "doctor" },
  { x: 120, y: 380, dx: -100, dy: 60, kind: "service" },
  { x: 700, y: 360, dx: 110, dy: 70, kind: "support" },
];

export default function HealthcareCoordinationSvg({ finalState }: Props) {
  return (
    <svg viewBox="0 0 960 520" aria-hidden="true" className="mx-auto h-auto w-full max-w-3xl max-h-[50vh] lg:max-h-[65vh] object-contain" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="home-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="var(--border)" opacity=".55">
        {Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 120} 0V520`} />)}
        {Array.from({ length: 6 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 104}H960`} />)}
      </g>

      {/* Pathways drawing towards the center */}
      {[
        "M180 120 L400 220",
        "M760 130 L560 220",
        "M200 420 L400 300",
        "M780 400 L560 300"
      ].map((d, i) => (
        <path
          key={i}
          data-system-path
          d={d}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset={finalState ? 0 : 400}
        />
      ))}

      <g data-platform-core>
        {/* Central glow */}
        <circle cx="480" cy="260" r="160" fill="url(#home-glow)" />
        
        {/* Central Home Card */}
        <rect x="380" y="160" width="200" height="200" rx="24" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
        
        {/* Subtle home icon / healthcare cross */}
        <path d="M480 200 L430 240 H450 V310 H510 V240 H530 Z" fill="var(--primary)" opacity=".1" />
        <rect x="465" y="240" width="30" height="30" rx="4" fill="var(--secondary)" />
        <rect x="477" y="246" width="6" height="18" rx="2" fill="var(--surface)" />
        <rect x="471" y="252" width="18" height="6" rx="2" fill="var(--surface)" />
        
        {/* Patient / Family representation */}
        <circle cx="460" cy="285" r="12" fill="var(--primary)" />
        <circle cx="500" cy="285" r="12" fill="var(--primary)" opacity=".6" />
      </g>

      {/* Scattered Nodes organizing around center */}
      {scatteredNodes.map((node, i) => (
        <g key={i} transform={`translate(${node.x} ${node.y})`}>
          <g data-system-node style={finalState ? undefined : { transform: `translate(${node.dx}px, ${node.dy}px)` }}>
            <rect width="160" height="80" rx="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
            
            {node.kind === "nurse" && (
              <>
                <circle cx="30" cy="40" r="12" fill="var(--primary)" opacity="0.8" />
                <rect x="55" y="30" width="80" height="6" rx="3" fill="var(--primary)" opacity=".2" />
                <rect x="55" y="44" width="50" height="6" rx="3" fill="var(--primary)" opacity=".1" />
              </>
            )}
            
            {node.kind === "doctor" && (
              <>
                <rect x="18" y="28" width="24" height="24" rx="6" fill="var(--secondary)" opacity="0.9" />
                <rect x="55" y="30" width="80" height="6" rx="3" fill="var(--primary)" opacity=".2" />
                <rect x="55" y="44" width="65" height="6" rx="3" fill="var(--primary)" opacity=".1" />
              </>
            )}

            {node.kind === "service" && (
              <>
                <path d="M20 40 L40 20 L60 40" stroke="var(--primary)" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="70" y="30" width="60" height="6" rx="3" fill="var(--primary)" opacity=".2" />
                <rect x="70" y="44" width="40" height="6" rx="3" fill="var(--primary)" opacity=".1" />
              </>
            )}

            {node.kind === "support" && (
              <>
                <circle cx="30" cy="40" r="14" fill="var(--primary)" opacity="0.3" />
                <circle cx="30" cy="40" r="6" fill="var(--secondary)" />
                <rect x="55" y="30" width="80" height="6" rx="3" fill="var(--primary)" opacity=".2" />
                <rect x="55" y="44" width="50" height="6" rx="3" fill="var(--primary)" opacity=".1" />
              </>
            )}
          </g>
        </g>
      ))}

      {/* Subtle pulse rings for care support */}
      {[0, 1, 2].map(i => (
        <circle 
          key={i} 
          data-system-dot 
          cx="480" 
          cy="260" 
          r={180 + i * 40} 
          fill="none" 
          stroke="var(--secondary)" 
          strokeWidth="1" 
          opacity={finalState ? 0.3 - (i * 0.1) : 0} 
        />
      ))}
    </svg>
  );
}
