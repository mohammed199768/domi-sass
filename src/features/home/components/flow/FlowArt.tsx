"use client";

import React from "react";
import "./flow-transitions.css";

type FlowArtProps = {
  children: React.ReactNode;
};

/**
 * Container for the homepage section-transition system.
 *
 * Imports the transition stylesheet once and establishes the brand-token
 * scope (.flow-art) that every FlowSection overlay reads from. Renders a
 * plain wrapper div so it adds no landmark and no layout of its own.
 *
 * Usage:
 *   <FlowArt>
 *     <FlowSection transition="depth-lift">...</FlowSection>
 *     <FlowSection transition="diagonal-reveal">...</FlowSection>
 *     ...
 *   </FlowArt>
 */
export default function FlowArt({ children }: FlowArtProps) {
  return <div className="flow-art">{children}</div>;
}
