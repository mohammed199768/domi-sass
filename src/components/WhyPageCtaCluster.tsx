"use client";

import React from "react";
import Link from "next/link";

export type WhyCtaIntent = "primary" | "secondary" | "tertiary";

export type WhyCtaAction = {
  label: string;
  href: string;
  intent: WhyCtaIntent;
};

type WhyPageCtaClusterProps = {
  /** Ordered list of CTA links to render (primary, secondary, tertiary). */
  actions: WhyCtaAction[];
  /** Wrapper class — lets each page keep its own palette-aware container. */
  className?: string;
  /** Base button class shared by every action (e.g. "why-button"). */
  buttonClassName: string;
  /** Optional aria-label for the navigation landmark. */
  ariaLabel?: string;
};

/**
 * Shared structural CTA cluster for the why-* pages. It owns the layout,
 * accessible link semantics, and intent → modifier-class mapping, while each
 * page passes its own palette-aware classes so neither page is redesigned.
 *
 * No nested buttons/anchors and no animation — visuals live entirely in CSS.
 */
export default function WhyPageCtaCluster({
  actions,
  className,
  buttonClassName,
  ariaLabel,
}: WhyPageCtaClusterProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={`${buttonClassName} ${buttonClassName}--${action.intent}`}
        >
          {action.label}
        </Link>
      ))}
    </nav>
  );
}
