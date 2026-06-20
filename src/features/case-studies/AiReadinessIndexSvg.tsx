import { memo } from "react";
import { transformationSvgClass } from "./transformationSvgClass";
import type { PanelLayoutMode } from "./CaseStudyPanels";

function AiReadinessIndexSvg({ finalState, mode }: { finalState?: boolean; mode: PanelLayoutMode }) {
  const isFinal = finalState;

  // The 6 dimension labels
  const dimensions = ["DATA", "CAPABILITIES", "STRATEGY", "GOVERNANCE", "VALUE", "TECH"];

  return (
    <svg viewBox="0 0 800 600" className={transformationSvgClass(mode)} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* Background Grid */}
      <defs>
        <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="currentColor" className="text-border" />
        </pattern>
        <linearGradient id="ai-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#ai-grid)" />

      {/* Scattered background dots (Before state remnants that float into the chart) */}
      {[...Array(15)].map((_, i) => (
        <circle
          key={i}
          cx={100 + (i * 47) % 600}
          cy={50 + (i * 31) % 500}
          r="3"
          className="fill-muted/20"
          data-system-dot
          style={isFinal ? { transform: `translate(${300 - (100 + (i * 47) % 600)}px, ${300 - (50 + (i * 31) % 500)}px)`, opacity: 0 } : { transform: `translate(${Math.sin(i)*100}px, ${Math.cos(i)*100}px)` }}
        />
      ))}

      {/* Main Core: The Dashboard / Radar Chart */}
      <g
        data-platform-core
        style={isFinal ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "scale(0.8)", transformOrigin: "center" }}
        className="origin-center"
      >
        <rect x="250" y="180" width="300" height="240" rx="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
        <rect x="250" y="180" width="300" height="240" rx="16" fill="url(#ai-glow)" />
        <text x="400" y="215" textAnchor="middle" className="fill-foreground text-sm font-black tracking-widest">READINESS INDEX</text>
        
        {/* Radar/Spider chart rings */}
        <circle cx="400" cy="290" r="60" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="400" cy="290" r="40" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="400" cy="290" r="20" fill="none" stroke="var(--border)" strokeWidth="1" />
        
        {/* Radar Fill Area */}
        <polygon points="400,230 450,260 440,330 380,340 350,290" fill="var(--secondary)" fillOpacity="0.2" stroke="var(--secondary)" strokeWidth="2" />
        
        {/* Score indicator */}
        <rect x="365" y="375" width="70" height="30" rx="8" fill="var(--primary)" />
        <text x="400" y="395" textAnchor="middle" className="fill-background text-xs font-black">68 / 100</text>
      </g>

      {/* Dimension Nodes & Sliders */}
      {dimensions.map((dim, i) => {
        // Final position for each dimension (3 on left, 3 on right)
        const isLeft = i < 3;
        const fx = isLeft ? 100 : 700;
        const fy = 200 + (i % 3) * 100;
        
        // Initial scattered position using deterministic offsets
        const pseudoRandX = (i * 17) % 50;
        const pseudoRandY = (i * 23) % 200;
        const ix = isLeft ? fx - 100 + pseudoRandX : fx + 50 - pseudoRandX;
        const iy = fy + (pseudoRandY - 100);

        // Gap lines connecting to the core
        const pathStartX = isLeft ? 170 : 630;
        const pathEndX = isLeft ? 250 : 550;
        const pathD = `M ${pathStartX} ${fy} L ${pathEndX} ${280 + (i % 3) * 10}`;

        return (
          <g key={dim}>
            {/* Connection path */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              data-system-path
              style={isFinal ? { strokeDashoffset: 0 } : { strokeDasharray: 400, strokeDashoffset: 400 }}
            />
            
            {/* The Dimension Node */}
            <g
              data-system-node
              style={isFinal ? { transform: "none" } : { transform: `translate(${ix - fx}px, ${iy - fy}px)` }}
            >
              <rect x={fx - 70} y={fy - 30} width="140" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" className="shadow-sm" />
              <text x={fx} y={fy - 10} textAnchor="middle" className="fill-foreground text-[10px] font-bold tracking-wider">{dim}</text>
              
              {/* Target vs Current Slider visuals */}
              {/* Target Line */}
              <line x1={fx - 50} y1={fy + 5} x2={fx + 50} y2={fy + 5} stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
              <line x1={fx - 50} y1={fy + 5} x2={fx + 20 - (i*5)} y2={fy + 5} stroke="var(--secondary)" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
              
              {/* Current Line */}
              <line x1={fx - 50} y1={fy + 15} x2={fx + 50} y2={fy + 15} stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
              <line x1={fx - 50} y1={fy + 15} x2={fx - 10 + (i*10)} y2={fy + 15} stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>
        );
      })}

      {/* Strategic Recommendation Bubbles */}
      {[
        { x: 300, y: 130, r: 35, text: "DATA OPS" },
        { x: 400, y: 100, r: 45, text: "AI GOV" },
        { x: 500, y: 130, r: 35, text: "UPSKILL" }
      ].map((bubble) => (
        <g
          key={bubble.text}
          data-system-node
          style={isFinal ? { transform: "none", opacity: 1 } : { transform: `translate(0, -50px)`, opacity: 0 }}
          className="transition-opacity duration-500 delay-500"
        >
          <circle cx={bubble.x} cy={bubble.y} r={bubble.r} fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
          <text x={bubble.x} y={bubble.y + 4} textAnchor="middle" className="fill-primary-theme text-[10px] font-bold tracking-wider">{bubble.text}</text>
        </g>
      ))}

      {/* Lead Capture Node entering from top left */}
      <g
        data-system-node
        style={isFinal ? { transform: "none" } : { transform: "translate(-100px, -100px)" }}
      >
        <path d="M 120 70 L 250 180" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="6 6" />
        <rect x="50" y="40" width="100" height="40" rx="20" fill="var(--foreground)" />
        <text x="100" y="64" textAnchor="middle" className="fill-background text-xs font-black">LEAD IN</text>
      </g>
    </svg>
  );
}

export default memo(AiReadinessIndexSvg);
