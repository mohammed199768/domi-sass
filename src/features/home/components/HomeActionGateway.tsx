"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Compass, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "../content/homeContent";
import HomeTextMotion from "./HomeTextMotion";

const gatewayCopy = {
  en: {
    chapter: "Begin / 05",
    title: "Choose your first move.",
    body: "",
    consultation: "Book a consultation",
    consultationBody: "Bring the product and the result you need.",
    diagnosis: "Start with diagnosis",
    diagnosisBody: "A structured path to the clearest first step.",
    ready: "Direct project conversation",
    guided: "Guided diagnostic path",
    continueContact: "Book the consultation",
    continueDiagnosis: "Start the diagnosis",
    screenLabel: "DOMINASE / Project gateway",
  },
  ar: {
    chapter: "ابدأ / ٠٥",
    title: "اختر خطوتك الأولى.",
    body: "",
    consultation: "احجز استشارة",
    consultationBody: "أحضر المنتج والنتيجة التي تريدها.",
    diagnosis: "ابدأ بالتشخيص",
    diagnosisBody: "مسار منظم لأوضح خطوة أولى.",
    ready: "محادثة مباشرة حول المشروع",
    guided: "مسار تشخيصي موجه",
    continueContact: "احجز الاستشارة",
    continueDiagnosis: "ابدأ التشخيص",
    screenLabel: "DOMINASE / بوابة المشروع",
  },
} as const;

export default function HomeActionGateway() {
  const { language, dir } = useLanguage();
  const copy = gatewayCopy[language];
  const legacyCopy = getHomeContent(language).action;
  const [active, setActive] = useState<"contact" | "diagnosis">("contact");
  const isContact = active === "contact";
  const href = isContact ? "/contact" : "/diagnosis";

  return (
    <section
      id="start"
      className="home-gateway"
      aria-labelledby="home-gateway-title"
    >
      <div className="home-gateway__shell">
        <header className="home-gateway__heading">
          <p className="home-chapter-label">{copy.chapter}</p>
          <h2 id="home-gateway-title">
            <HomeTextMotion variant="signal">{copy.title}</HomeTextMotion>
          </h2>
          {copy.body ? <span>{copy.body}</span> : null}
        </header>

        <div className="home-gateway__device">
          <div className="home-gateway__lid">
            <div className="home-gateway__camera" aria-hidden="true">
              <span />
            </div>

            <div className="home-gateway__screen">
              <header>
                <p dir="ltr">DOMINASE</p>
                <span>{copy.screenLabel}</span>
                <i aria-hidden="true" />
              </header>

              <div className="home-gateway__screen-body">
                <div className="home-gateway__screen-intro">
                  <span>{isContact ? "01" : "02"}</span>
                  <p>{isContact ? copy.ready : copy.guided}</p>
                  <h3>
                    {isContact ? copy.consultation : copy.diagnosis}
                  </h3>
                  <div>
                    <Check aria-hidden="true" />
                    <span>
                      {isContact
                        ? copy.consultationBody
                        : copy.diagnosisBody}
                    </span>
                  </div>
                </div>

                <div
                  className="home-gateway__path-preview"
                  data-active={active}
                  aria-hidden="true"
                >
                  <div className="home-gateway__preview-rail">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="home-gateway__preview-window">
                    <p>{isContact ? copy.consultation : legacyCopy.diagnosisCTA}</p>
                    <span />
                    <span />
                    <i />
                  </div>
                </div>
              </div>

              <footer>
                <div className="home-gateway__tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    className="domi-setting-control"
                    aria-selected={isContact}
                    onClick={() => setActive("contact")}
                  >
                    <MessageSquareText aria-hidden="true" />
                    {copy.consultation}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    className="domi-setting-control"
                    aria-selected={!isContact}
                    onClick={() => setActive("diagnosis")}
                  >
                    <Compass aria-hidden="true" />
                    {copy.diagnosis}
                  </button>
                </div>

                <Link
                  href={href}
                  className="domi-action domi-action--primary"
                >
                  {isContact
                    ? copy.continueContact
                    : copy.continueDiagnosis}
                  <ArrowUpRight
                    aria-hidden="true"
                    className={dir === "rtl" ? "-scale-x-100" : ""}
                  />
                </Link>
              </footer>
            </div>
          </div>

          <div className="home-gateway__base" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
