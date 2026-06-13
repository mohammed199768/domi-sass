"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { projectCaseStudies } from "@/constants/projectCaseStudies";
import { useLanguage } from "@/context/LanguageContext";
import ProjectFlipbook from "./ProjectFlipbook";

type ProjectFlipbookModalProps = {
    open: boolean;
    slug: string | null;
    onClose: () => void;
};

export default function ProjectFlipbookModal({
    open,
    slug,
    onClose,
}: ProjectFlipbookModalProps) {
    const { language } = useLanguage();
    const project = slug ? projectCaseStudies[slug] : null;
    const isArabic = language === "ar";

    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyPosition = document.body.style.position;
        const originalBodyTop = document.body.style.top;
        const originalBodyWidth = document.body.style.width;

        window.dispatchEvent(new CustomEvent("portfolio-modal:open"));

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.position = originalBodyPosition;
            document.body.style.top = originalBodyTop;
            document.body.style.width = originalBodyWidth;
            window.scrollTo(0, scrollY);
            window.dispatchEvent(new CustomEvent("portfolio-modal:close"));
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open || !project) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-flipbook-title"
            className="realistic-book-modal portfolio-modal-scroll-lock fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden overscroll-contain bg-[rgba(10,12,16,0.72)] p-2 text-[#252525] backdrop-blur-sm sm:p-4 lg:p-6"
            onWheelCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="realistic-book-shell relative mx-auto flex h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-full max-w-[1320px] flex-col overflow-hidden rounded-[18px] bg-[#f6f3ed] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-3rem)] lg:max-h-[calc(100dvh-3rem)]"
                onWheelCapture={(event) => event.stopPropagation()}
                onTouchMoveCapture={(event) => event.stopPropagation()}
            >
                <header className="flex h-14 flex-none items-center justify-between gap-4 overflow-hidden border-b border-black/10 bg-[#fbfaf7] px-4 py-2 sm:h-16 sm:px-6">
                    <div
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`min-w-0 ${isArabic ? "text-right" : "text-left"}`}
                    >
                        <h2
                            id="project-flipbook-title"
                            className="truncate text-base font-black leading-tight text-[#252525] sm:text-lg"
                        >
                            {project.title[language]}
                        </h2>
                        <p className="mt-1 truncate text-xs font-semibold text-[#8b7d6b]">
                            {project.category[language]}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close project case study"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#3a352e] shadow-sm transition hover:bg-[#f2eee7]"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </header>

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),transparent_38%),linear-gradient(180deg,#f7f4ee,#ebe5da)]">
                    <div className="flex min-h-0 flex-1 flex-col px-2 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                        <p
                            dir={isArabic ? "rtl" : "ltr"}
                            className={`realistic-book-summary mx-auto mb-1 max-h-6 max-w-3xl flex-none shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-5 text-[#6b6258] sm:mb-2 sm:text-sm ${isArabic ? "text-right" : "text-center"}`}
                        >
                            {project.summary[language]}
                        </p>
                        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                            <ProjectFlipbook key={project.slug} project={project} language={language} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
