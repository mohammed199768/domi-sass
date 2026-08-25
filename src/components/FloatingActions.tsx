"use client";

import { useEffect, useRef, useState } from "react";
import { LifeBuoy, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingSiteChat from "./FloatingSiteChat";
import FloatingThemeToggle from "./FloatingThemeToggle";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const collapse = () => setOpen(false);
    window.addEventListener("scroll", collapse, { passive: true });
    return () => window.removeEventListener("scroll", collapse);
  }, []);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", outside);
    return () => window.removeEventListener("pointerdown", outside);
  }, [open]);

  const label = language === "ar" ? "المساعدة" : "Assistance";
  return (
    <div ref={rootRef} className={`assistance-system ${open ? "is-open" : ""}`}>
      <div className="assistance-system__actions">
        <FloatingSiteChat />
        <FloatingWhatsApp />
        <FloatingThemeToggle />
      </div>
      <button type="button" className="assistance-system__orb" aria-label={label} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden="true" /> : <LifeBuoy aria-hidden="true" />}
      </button>
    </div>
  );
}
