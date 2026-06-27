"use client";

import React from "react";

type RetroGridProps = {
    className?: string;
};

/**
 * Theme-aware technical perspective grid.
 *
 * All colors derive from the semantic `--rg-*` tokens in globals.css:
 *   Dark mode  → obsidian background, cyan/violet grid.
 *   Light mode → mist/pearl background, faint cyan/blue-gray grid.
 *
 * Purely decorative (aria-hidden) and static.
 */
export default function RetroGrid({ className = "" }: RetroGridProps) {
    return (
        <div className={`retro-grid ${className}`} aria-hidden="true">
            <div className="retro-grid__glow" />
            <div className="retro-grid__flat" />
            <div className="retro-grid__perspective" />
            <div className="retro-grid__fade" />
        </div>
    );
}
