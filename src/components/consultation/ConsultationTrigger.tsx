"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useConsultation, type ConsultationService } from "./ConsultationProvider";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  children?: ReactNode;
  ctaLocation: string;
  originType?: string;
  serviceInterest?: ConsultationService;
};

export default function ConsultationTrigger({ children, ctaLocation, originType, serviceInterest, ...props }: Props) {
  const { language } = useLanguage();
  const { openConsultation } = useConsultation();
  return (
    <button type="button" onClick={() => openConsultation({ ctaLocation, originType, serviceInterest })} {...props}>
      {children ?? (language === "ar" ? "احجز استشارة" : "Book a consultation")}
    </button>
  );
}
