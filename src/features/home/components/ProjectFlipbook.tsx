"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type {
    LocalizedText,
    ProjectCaseStudy,
    ProjectCaseStudyPage,
} from "@/constants/projectCaseStudies";

type Language = keyof LocalizedText;
type FlipCorner = "top" | "bottom";
type PageSide = "left" | "right";
type BookSize = {
    pageWidth: number;
    pageHeight: number;
    compact: boolean;
    short: boolean;
    singlePage: boolean;
    ready: boolean;
};

type PageFlipController = {
    flipPrev: (corner?: FlipCorner) => void;
    flipNext: (corner?: FlipCorner) => void;
};

type FlipBookHandle = {
    pageFlip: () => PageFlipController | undefined;
};

type FlipEvent = {
    data: number;
};

type InitEvent = {
    data: {
        page: number;
    };
};

type FlipbookPage =
    | { kind: "intro"; key: string }
    | { kind: "cover"; key: string; image: string }
    | { kind: "content"; key: string; page: ProjectCaseStudyPage; contentIndex: number }
    | { kind: "back"; key: string }
    | { kind: "blank"; key: string };

type HTMLFlipBookProps = {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
    width: number;
    height: number;
    size: "fixed" | "stretch";
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    drawShadow: boolean;
    flippingTime: number;
    usePortrait: boolean;
    startZIndex: number;
    autoSize: boolean;
    maxShadowOpacity: number;
    showCover: boolean;
    mobileScrollSupport: boolean;
    clickEventForward: boolean;
    useMouseEvents: boolean;
    swipeDistance: number;
    showPageCorners: boolean;
    disableFlipByClick: boolean;
    renderOnlyPageLengthChange?: boolean;
    onFlip?: (event: FlipEvent) => void;
    onInit?: (event: InitEvent) => void;
    ref?: React.Ref<FlipBookHandle>;
    startPage: number;
};

const HTMLFlipBook = dynamic<HTMLFlipBookProps>(
    () =>
        import("react-pageflip").then(
            (mod) => mod.default as React.ComponentType<HTMLFlipBookProps>
        ),
    { ssr: false }
);

const labels = {
    en: {
        selected: "Selected Product Work",
        endTitle: "End of Case Study",
        endBody: "A printed-style snapshot of the product thinking, interface detail, and delivery craft behind the project.",
        brand: "Mohammed Aldomi / Domi",
        previous: "Previous",
        next: "Next",
        hint: "Drag or click page corners",
        page: "Page",
        of: "of",
    },
    ar: {
        selected: "مختارات من الأعمال",
        endTitle: "نهاية عرض المشروع",
        endBody: "لقطة بأسلوب مطبوع لتفكير المنتج، تفاصيل الواجهة، وحرفة التنفيذ خلف المشروع.",
        brand: "Mohammed Aldomi / Domi",
        previous: "السابق",
        next: "التالي",
        hint: "اسحب أو اضغط على زوايا الصفحة",
        page: "صفحة",
        of: "من",
    },
};

labels.ar = {
    selected: "مختارات من الأعمال",
    endTitle: "نهاية عرض المشروع",
    endBody: "لقطة بأسلوب مطبوع لتفكير المنتج، تفاصيل الواجهة، وحرفة التنفيذ خلف المشروع.",
    brand: "Mohammed Aldomi / Domi",
    previous: "السابق",
    next: "التالي",
    hint: "اسحب أو اضغط على زوايا الصفحة",
    page: "صفحة",
    of: "من",
};

function text(value: LocalizedText | undefined, language: Language, fallback = "") {
    return value?.[language] || value?.en || value?.ar || fallback;
}

function pageSide(pageIndex: number): PageSide {
    if (pageIndex === 0) return "right";

    return pageIndex % 2 === 1 ? "left" : "right";
}

function pageDensity(bookPage: FlipbookPage) {
    return bookPage.kind === "cover" || bookPage.kind === "back" ? "hard" : "soft";
}

const PAGE_RATIO = 520 / 700;

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function useMeasuredBookSize(stageRef: React.RefObject<HTMLDivElement | null>): BookSize {
    const [bookSize, setBookSize] = useState<BookSize>({
        pageWidth: 320,
        pageHeight: 430,
        compact: true,
        short: true,
        singlePage: true,
        ready: false,
    });

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const updateSize = () => {
            const rect = stage.getBoundingClientRect();
            const safetyPadding = 24;
            const availableWidth = Math.max(rect.width - safetyPadding, 220);
            const availableHeight = Math.max(rect.height - safetyPadding, 300);
            const isNarrow = availableWidth < 760;
            const pagesAcross = isNarrow ? 1 : 2;
            const maxPageWidthByWidth = availableWidth / pagesAcross;
            const maxPageWidthByHeight = availableHeight * PAGE_RATIO;
            const pageWidth = Math.floor(clamp(Math.min(maxPageWidthByWidth, maxPageWidthByHeight), 220, 520));
            const pageHeight = Math.floor(clamp(pageWidth / PAGE_RATIO, 300, 700));

            setBookSize({
                pageWidth,
                pageHeight,
                compact: pageWidth < 340 || pageHeight < 470,
                short: pageHeight < 520,
                singlePage: isNarrow,
                ready: true,
            });
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(stage);

        return () => observer.disconnect();
    }, [stageRef]);

    return bookSize;
}

function buildFlipbookPages(project: ProjectCaseStudy): FlipbookPage[] {
    const insidePages: FlipbookPage[] = [
        { kind: "intro", key: `${project.slug}-intro` },
        ...project.pages.map((page, index) => ({
            kind: "content" as const,
            key: `${project.slug}-content-${index}-${page.image}`,
            page,
            contentIndex: index + 1,
        })),
    ];

    if (insidePages.length % 2 !== 0) {
        insidePages.push({ kind: "blank", key: `${project.slug}-blank-inside` });
    }

    return [
        { kind: "cover", key: `${project.slug}-cover`, image: project.cover },
        ...insidePages,
        { kind: "back", key: `${project.slug}-back` },
    ];
}

const RealBookPage = forwardRef<
    HTMLDivElement,
    {
        bookPage: FlipbookPage;
        pageIndex: number;
        totalPages: number;
        project: ProjectCaseStudy;
        language: Language;
        compact: boolean;
        short: boolean;
        side: PageSide;
    }
>(({ bookPage, pageIndex, totalPages, project, language, compact, short, side }, ref) => {
    const isArabic = language === "ar";
    const projectTitle = text(project.title, language, project.slug);
    const projectCategory = text(project.category, language);
    const projectSummary = text(project.summary, language);
    const pagePadding = compact ? "p-4" : short ? "p-5" : "p-7";
    const imageHeight = compact ? "46%" : short ? "50%" : "54%";
    const imageMinHeight = compact ? 120 : short ? 150 : 180;
    const bodyClamp = compact ? "line-clamp-3" : "line-clamp-4";
    const sideClass = side === "left" ? "realistic-book-page-left" : "realistic-book-page-right";
    const pageNumber = pageIndex + 1;

    const imageFrameStyle: React.CSSProperties = {
        height: imageHeight,
        minHeight: imageMinHeight,
        maxHeight: "58%",
    };

    if (bookPage.kind === "intro") {
        return (
            <div
                ref={ref}
                dir={isArabic ? "rtl" : "ltr"}
                data-density={pageDensity(bookPage)}
                className={`realistic-book-page realistic-paper-texture h-full w-full ${sideClass}`}
            >
                <article className={`flex h-full flex-col overflow-hidden text-[#252525] ${pagePadding}`}>
                    <div className={`flex-none ${isArabic ? "text-right" : "text-left"}`}>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8b7d6b] sm:text-xs">
                            {labels[language].selected}
                        </p>
                        <div className={compact ? "mt-3 h-px w-full bg-black/10" : "mt-5 h-px w-full bg-black/10"} />
                    </div>

                    <div className={`flex min-h-0 flex-1 flex-col justify-center ${isArabic ? "text-right" : "text-left"}`}>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b7d6b]">
                            {projectCategory}
                        </p>
                        <h3 className={`mt-4 font-black leading-tight text-[#202020] ${compact ? "text-xl" : "text-3xl"}`}>
                            {projectTitle}
                        </h3>
                        <p className={`mt-4 max-w-sm text-[#55514b] ${compact ? "line-clamp-5 text-[12px] leading-5" : "line-clamp-6 text-sm leading-7"}`}>
                            {projectSummary}
                        </p>
                    </div>

                    <footer className={`flex-none border-t border-black/10 pt-3 font-semibold text-[#8b7d6b] ${compact ? "text-[9px]" : "text-[11px]"}`}>
                        {labels[language].brand}
                    </footer>
                </article>
            </div>
        );
    }

    if (bookPage.kind === "cover") {
        return (
            <div
                ref={ref}
                dir={isArabic ? "rtl" : "ltr"}
                data-density={pageDensity(bookPage)}
                className={`realistic-book-page realistic-book-cover realistic-book-front-cover realistic-paper-texture h-full w-full ${sideClass}`}
            >
                <article className={`relative flex h-full flex-col overflow-hidden text-[#252525] ${pagePadding}`}>
                    <div className="realistic-cover-spine" />
                    <div
                        className={`relative flex-none overflow-hidden rounded-[10px] border border-white/25 bg-[#18130f] shadow-[inset_0_1px_10px_rgba(255,255,255,0.08),0_18px_34px_rgba(24,18,12,0.24)] ${compact ? "p-2" : "p-3"}`}
                        style={imageFrameStyle}
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-[#efe7d7]">
                            <Image
                                src={bookPage.image}
                                alt={`${projectTitle} cover screenshot`}
                                width={1200}
                                height={800}
                                loading="eager"
                                sizes="(max-width: 768px) 78vw, 430px"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className={`mt-4 min-h-0 flex-1 overflow-hidden ${isArabic ? "text-right" : "text-left"}`}>
                        <p className={`font-black uppercase tracking-[0.22em] text-[#f0d7aa] ${compact ? "text-[9px]" : "text-xs"}`}>
                            {projectCategory}
                        </p>
                        <h3 className={`mt-2 font-black leading-tight text-[#fff7e8] ${compact ? "text-xl" : "text-3xl"}`}>
                            {projectTitle}
                        </h3>
                        <p className={`mt-3 text-[#ddc9aa] ${compact ? "line-clamp-3 text-[11px] leading-5" : "line-clamp-4 text-sm leading-6"}`}>
                            {projectSummary}
                        </p>
                    </div>

                    <footer className={`flex flex-none items-center justify-between border-t border-white/15 pt-2 font-semibold text-[#d9be8e] ${compact ? "text-[9px]" : "text-[11px]"}`}>
                        <span>{labels[language].selected}</span>
                        <span>{pageNumber} / {totalPages}</span>
                    </footer>
                </article>
            </div>
        );
    }

    if (bookPage.kind === "content") {
        const page = bookPage.page;
        const pageEyebrow = text(page.eyebrow, language);
        const pageTitle = text(page.title, language, page.image);
        const pageBody = text(page.body, language);

        return (
            <div
                ref={ref}
                dir={isArabic ? "rtl" : "ltr"}
                data-density={pageDensity(bookPage)}
                className={`realistic-book-page realistic-paper-texture h-full w-full ${sideClass}`}
            >
                <article className={`flex h-full flex-col overflow-hidden text-[#252525] ${pagePadding}`}>
                    <div
                        className={`relative flex-none overflow-hidden rounded-[14px] border border-black/10 bg-[#f1eee7] shadow-[inset_0_1px_10px_rgba(34,28,18,0.06)] ${compact ? "p-2" : "p-3"}`}
                        style={imageFrameStyle}
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#e9e4da]">
                            <Image
                                src={page.image}
                                alt={`${pageTitle} screenshot`}
                                width={1200}
                                height={800}
                                loading="eager"
                                sizes="(max-width: 768px) 78vw, 430px"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className={`mt-4 min-h-0 flex-1 overflow-hidden ${isArabic ? "text-right" : "text-left"}`}>
                        <p className={`font-black uppercase tracking-[0.22em] text-[#8b7d6b] ${compact ? "text-[9px]" : "text-xs"}`}>
                            {pageEyebrow}
                        </p>
                        <h4 className={`mt-2 font-black leading-snug text-[#1f2933] ${compact ? "text-[16px]" : short ? "text-[19px]" : "text-[22px]"}`}>
                            {pageTitle}
                        </h4>
                        <p className={`mt-2 ${bodyClamp} text-[#55514b] ${compact ? "text-[11px] leading-[1.45]" : "text-[14px] leading-[1.65]"}`}>
                            {pageBody}
                        </p>
                    </div>

                    <footer className={`flex flex-none items-center justify-between gap-3 border-t border-black/10 pt-2 font-semibold text-[#8b7d6b] ${compact ? "mt-2 text-[9px]" : "mt-3 text-[11px]"}`}>
                        <span className="truncate">{pageEyebrow}</span>
                        <span className="shrink-0">
                            {labels[language].page} {String(bookPage.contentIndex).padStart(2, "0")} {labels[language].of} {String(project.pages.length).padStart(2, "0")}
                        </span>
                    </footer>
                </article>
            </div>
        );
    }

    if (bookPage.kind === "back") {
        return (
            <div
                ref={ref}
                dir={isArabic ? "rtl" : "ltr"}
                data-density={pageDensity(bookPage)}
                className={`realistic-book-page realistic-book-cover realistic-book-back-cover realistic-paper-texture h-full w-full ${sideClass}`}
            >
                <article className={`relative flex h-full flex-col items-center justify-center overflow-hidden text-center text-[#fff7e8] ${pagePadding}`}>
                    <div className="realistic-cover-spine" />
                    <div className={compact ? "mb-5 h-12 w-px bg-white/20" : "mb-8 h-16 w-px bg-white/20"} />
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#f0d7aa]">
                        {labels[language].endTitle}
                    </p>
                    <h4 className={`mt-5 max-w-sm font-black leading-tight text-[#fff7e8] ${compact ? "text-xl" : "text-3xl"}`}>
                        {projectTitle}
                    </h4>
                    <p className={`mt-5 max-w-sm text-[#ddc9aa] ${compact ? "line-clamp-4 text-[11px] leading-5" : "line-clamp-5 text-sm leading-6"}`}>
                        {labels[language].endBody}
                    </p>
                    <div className="mt-8 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-bold tracking-[0.18em] text-[#d9be8e]">
                        {labels[language].brand}
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            dir={isArabic ? "rtl" : "ltr"}
            data-density={pageDensity(bookPage)}
            className={`realistic-book-page realistic-paper-texture h-full w-full ${sideClass}`}
        >
            <article className={`flex h-full flex-col justify-end overflow-hidden text-[#8b7d6b] ${pagePadding}`}>
                <div className="h-px w-full bg-black/10" />
            </article>
        </div>
    );
});

RealBookPage.displayName = "RealBookPage";

function FlipbookControls({
    currentPage,
    totalPages,
    language,
    singlePage,
    onPrevious,
    onNext,
}: {
    currentPage: number;
    totalPages: number;
    language: Language;
    singlePage: boolean;
    onPrevious: () => void;
    onNext: () => void;
}) {
    const isFirstPage = currentPage <= 0;
    const isLastPage = currentPage >= totalPages - (singlePage ? 1 : 2);

    return (
        <div className="realistic-book-controls flex h-16 flex-none shrink-0 flex-col items-center justify-center gap-2 px-4 pb-2 pt-2 sm:h-[72px]">
            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={onPrevious}
                    disabled={isFirstPage}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-[#2d2a24] shadow-sm transition hover:border-black/20 hover:bg-[#fbfaf7] disabled:cursor-not-allowed disabled:opacity-35 sm:px-5 sm:text-sm"
                >
                    {labels[language].previous}
                </button>
                <div className="rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-2 text-[11px] font-bold tracking-[0.16em] text-[#7a7164] sm:px-4 sm:text-xs">
                    {Math.min(currentPage + 1, totalPages)} / {totalPages}
                </div>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={isLastPage}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-[#2d2a24] shadow-sm transition hover:border-black/20 hover:bg-[#fbfaf7] disabled:cursor-not-allowed disabled:opacity-35 sm:px-5 sm:text-sm"
                >
                    {labels[language].next}
                </button>
            </div>
            <p className="hidden text-xs font-medium text-[#8b7d6b] sm:block">{labels[language].hint}</p>
        </div>
    );
}

export default function ProjectFlipbook({
    project,
    language,
}: {
    project: ProjectCaseStudy;
    language: Language;
}) {
    const bookRef = useRef<FlipBookHandle | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const { pageWidth, pageHeight, compact, short, singlePage, ready } = useMeasuredBookSize(stageRef);

    const flipbookPages = useMemo(() => buildFlipbookPages(project), [project]);
    const totalPages = flipbookPages.length;
    const flipbookKey = `${project.slug}-${pageWidth}x${pageHeight}-${singlePage ? "portrait" : "landscape"}`;

    const flipPrev = () => {
        bookRef.current?.pageFlip()?.flipPrev("bottom");
    };

    const flipNext = () => {
        bookRef.current?.pageFlip()?.flipNext("bottom");
    };

    return (
        <div className="flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden">
            <div ref={stageRef} className="realistic-book-stage flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden p-2 sm:p-3">
                <div className="realistic-book-shadow max-h-full min-h-0">
                    {ready ? (
                        <HTMLFlipBook
                            key={flipbookKey}
                            ref={bookRef}
                            className="realistic-book-gutter overflow-visible"
                            style={{ margin: "0 auto" }}
                            width={pageWidth}
                            height={pageHeight}
                            size="fixed"
                            minWidth={220}
                            maxWidth={520}
                            minHeight={300}
                            maxHeight={700}
                            drawShadow
                            maxShadowOpacity={0.62}
                            showCover
                            mobileScrollSupport
                            usePortrait={singlePage}
                            flippingTime={1050}
                            startPage={0}
                            startZIndex={0}
                            autoSize={false}
                            clickEventForward
                            useMouseEvents
                            swipeDistance={24}
                            showPageCorners
                            disableFlipByClick={false}
                            renderOnlyPageLengthChange
                            onInit={(event) => setCurrentPage(event.data.page)}
                            onFlip={(event) => setCurrentPage(event.data)}
                        >
                            {flipbookPages.map((bookPage, index) => (
                                <RealBookPage
                                    key={bookPage.key}
                                    bookPage={bookPage}
                                    pageIndex={index}
                                    totalPages={totalPages}
                                    project={project}
                                    language={language}
                                    compact={compact}
                                    short={short}
                                    side={pageSide(index)}
                                />
                            ))}
                        </HTMLFlipBook>
                    ) : (
                        <div className="h-[430px] w-[320px] rounded bg-[#fffdf8] shadow-[0_18px_45px_rgba(20,16,10,0.12)]" />
                    )}
                </div>
            </div>

            <FlipbookControls
                currentPage={currentPage}
                totalPages={totalPages}
                language={language}
                singlePage={singlePage}
                onPrevious={flipPrev}
                onNext={flipNext}
            />
        </div>
    );
}
