"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { trackDominaseEvent } from "@/lib/analytics";

export type ConsultationService = "website" | "platform" | "system" | "education" | "clinic" | "ux" | "unsure";
export type ConsultationOpenOptions = { serviceInterest?: ConsultationService; ctaLocation: string; originType?: string };

type ConsultationContextValue = { openConsultation: (options: ConsultationOpenOptions) => void };
type ActiveConsultation = ConsultationOpenOptions & { initialService: ConsultationService | ""; originType: string };

const ConsultationDialog = dynamic(() => import("./ConsultationDialog"), { ssr: false });
const ConsultationContext = createContext<ConsultationContextValue | null>(null);

function serviceFromPath(pathname: string): ConsultationService | undefined {
  if (pathname.includes("education") || pathname.includes("manal-alhihi")) return "education";
  if (pathname.includes("clinic") || pathname.includes("our-clinic") || pathname.includes("curevie")) return "clinic";
  if (pathname.includes("custom-systems") || pathname.includes("pulse-gym") || pathname.includes("horvath")) return "system";
  if (pathname.includes("web-development") || pathname.includes("sultan-shadi") || pathname.includes("qasr")) return "website";
  return undefined;
}

function pageType(pathname: string) {
  if (pathname === "/") return "home";
  return pathname.split("/").filter(Boolean)[0] || "page";
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [active, setActive] = useState<ActiveConsultation | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const openConsultation = (options: ConsultationOpenOptions) => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    const initialService = options.serviceInterest ?? serviceFromPath(pathname) ?? "";
    const originType = options.originType ?? pageType(pathname);
    setActive({ ...options, initialService, originType });
    const query = new URLSearchParams(window.location.search);
    trackDominaseEvent("consultation_open", {
      page_path: pathname, page_type: originType, language,
      service_interest: initialService || undefined, cta_location: options.ctaLocation,
      utm_source: query.get("utm_source") || undefined,
      utm_medium: query.get("utm_medium") || undefined,
      utm_campaign: query.get("utm_campaign") || undefined,
    });
  };

  const closeConsultation = () => {
    setActive(null);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  };

  return <ConsultationContext.Provider value={{ openConsultation }}>
    {children}
    {active ? <ConsultationDialog initialService={active.initialService} ctaLocation={active.ctaLocation} originType={active.originType} pathname={pathname} onClose={closeConsultation} /> : null}
  </ConsultationContext.Provider>;
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) throw new Error("useConsultation must be used inside ConsultationProvider");
  return context;
}
