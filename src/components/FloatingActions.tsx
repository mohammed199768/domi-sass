"use client";

/**
 * FloatingActions is the site's persistent floating control cluster.
 * WhatsApp and the theme control share the lower-right stack; the DOMINASE
 * Guide remains lower-left and the mobile navigation trigger stays centered.
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
