"use client";

/**
 * FloatingActions — the site's persistent floating control cluster.
 *
 * Layout (physical coordinates, stable in LTR and RTL):
 *   bottom-right : WhatsApp (all pages) + FloatingThemeToggle stacked above it
 *                  (internal theme-enabled pages only — never on `/`)
 *   bottom-left  : DOMINASE Guide chat trigger (all pages)
 *   bottom-center: MobileNav trigger (rendered separately) stays clear of both.
 *
 * z-order: floating buttons (z-30) < mobile-nav scrim (z-40) < chat panel
 * (z-45) < mobile-nav panel/trigger + header (z-50).
 */

import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingSiteChat from "./FloatingSiteChat";
import FloatingThemeToggle from "./FloatingThemeToggle";

export default function FloatingActions() {
  return (
    <>
      <FloatingWhatsApp />
      <FloatingSiteChat />
      <FloatingThemeToggle />
    </>
  );
}
