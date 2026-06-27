"use client";

import React from "react";
import { useFlowSection, type FlowTransition } from "./useFlowSection";

type FlowSectionProps = {
  transition: FlowTransition;
  children: React.ReactNode;
};

const innerClassByTransition: Record<FlowTransition, string> = {
  none: "",
  "ominous-gate": "flow-inner-ominous",
  "diagonal-reveal": "flow-inner-diagonal",
  "depth-lift": "flow-inner-depth",
  "panel-slide": "flow-inner-panel",
  settle: "flow-inner-settle",
};

/**
 * Wraps a single homepage section with one cinematic scroll transition.
 *
 * Renders a non-landmark <div> wrapper so the child section keeps its own
 * id, role, and heading hierarchy untouched (anchor links + a11y preserved).
 * Only `.flow-inner` is transformed; transition overlays are siblings of it
 * so they never affect the document/content flow.
 */
export default function FlowSection({ transition, children }: FlowSectionProps) {
  const { sectionRef, innerRef, overlayRef, gateLineRef } = useFlowSection(transition);

  const sectionClass =
    transition === "ominous-gate"
      ? "flow-section flow-transition-ominous"
      : "flow-section";

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className={sectionClass}
      data-flow-transition={transition}
    >
      {transition === "ominous-gate" && (
        <div ref={overlayRef} className="flow-ominous-overlay" aria-hidden="true">
          <div ref={gateLineRef} className="flow-gate-line" />
        </div>
      )}

      {transition === "diagonal-reveal" && (
        <div className="flow-diagonal-mask" aria-hidden="true" />
      )}

      {transition === "depth-lift" && (
        <div className="flow-depth-layer" aria-hidden="true" />
      )}

      <div ref={innerRef} className={`flow-inner ${innerClassByTransition[transition]}`}>
        {children}
      </div>
    </div>
  );
}
