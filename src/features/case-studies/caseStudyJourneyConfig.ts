export const caseStudyJourneyConfig = {
  // Tailwind `lg` breakpoint — drives some grid/padding styling inside panels.
  desktopMediaQuery: "(min-width: 1024px)",

  // The horizontal side-scroll journey (pinned GSAP ScrollTrigger) runs for
  // tablet-sized widths and up whenever motion is allowed. Tablets stay
  // horizontal — they are NOT pushed into vertical scroll. Only true phone
  // widths (< 768px) fall back to the mobile stacked flow.
  journeyActiveMediaQuery: "(min-width: 768px)",

  // Full cinematic density is used only when the viewport is both wide and tall
  // enough to hold the original generous layout without clipping (the locked
  // 1366x768 desktop baseline is included). Anything that runs the journey but
  // is smaller/shorter than this uses the compact "horizontalFit" density so a
  // panel still fits inside one viewport without vertical scrolling.
  fullCinematicMediaQuery: "(min-width: 1280px) and (min-height: 760px)",

  panelWidth: "100vw",
  panelGap: 0,
  scrollDistanceMultiplier: 1,
  trackScrub: 0.8,
  visualScrub: 0.7,
} as const;
