"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import type { StudioMedia } from "@/features/home/studio/studioProfile";
import { useViewerShell } from "./useViewerShell";

const CONTROLS_IDLE_MS = 2600;
const SLIDE_MS = 6200;
const SWIPE_PX = 44;

function fmt(v: number) {
  if (!Number.isFinite(v)) return "0:00";
  const m = Math.floor(v / 60);
  const s = Math.floor(v % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Props = {
  items: StudioMedia[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  language: "en" | "ar";
  dir: "ltr" | "rtl";
  profile: { name: string; avatar: string; category: string };
  restoreRef?: RefObject<HTMLElement | null>;
};

export default function StudioMediaViewer({
  items,
  index,
  onIndexChange,
  onClose,
  language,
  dir,
  profile,
  restoreRef,
}: Props) {
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleTimer = useRef<number | null>(null);
  const slideTimer = useRef<number | null>(null);
  const playingRef = useRef(false);
  const holdRef = useRef(false);
  const swipeX = useRef<number | null>(null);

  const item = items[index];
  const isCarousel = item?.kind === "carousel";
  const slideCount = item?.slides?.length ?? 0;

  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rtl = dir === "rtl";

  // ---- shared shell (scroll lock, lenis, inert, focus trap, restore) ----
  useViewerShell({ open: true, dialogRef, overlayRef, restoreRef });

  const clearIdle = useCallback(() => {
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    idleTimer.current = null;
  }, []);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    clearIdle();
    if (playingRef.current) {
      idleTimer.current = window.setTimeout(() => {
        if (playingRef.current) setControlsVisible(false);
      }, CONTROLS_IDLE_MS);
    }
  }, [clearIdle]);

  const close = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    onClose();
  }, [onClose]);

  // reset per item
  useEffect(() => {
    setSlide(0);
    setCurrentTime(0);
    setDuration(0);
    setControlsVisible(true);
    playingRef.current = false;
  }, [index]);

  const go = useCallback(
    (dir1: 1 | -1) => {
      // within a carousel, move slides; at the edges move between items
      if (isCarousel) {
        const next = slide + dir1;
        if (next >= 0 && next < slideCount) {
          setSlide(next);
          return;
        }
      }
      const nextItem = index + dir1;
      if (nextItem >= 0 && nextItem < items.length) {
        onIndexChange(nextItem);
      } else if (dir1 === 1) {
        close();
      }
    },
    [isCarousel, slide, slideCount, index, items.length, onIndexChange, close],
  );

  // logical prev/next respect reading direction
  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  // ---- carousel auto-advance (pause while held / reduced-motion off) ----
  useEffect(() => {
    if (slideTimer.current !== null) {
      window.clearTimeout(slideTimer.current);
      slideTimer.current = null;
    }
    if (!isCarousel || reducedMotion || slideCount <= 1) return;
    if (holdRef.current) return;
    slideTimer.current = window.setTimeout(() => {
      if (!holdRef.current) go(1);
    }, SLIDE_MS);
    return () => {
      if (slideTimer.current !== null) window.clearTimeout(slideTimer.current);
    };
  }, [isCarousel, reducedMotion, slideCount, slide, go]);

  // ---- keyboard ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
          else close();
          break;
        case "ArrowRight":
          e.preventDefault();
          rtl ? prev() : next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          rtl ? next() : prev();
          break;
        case " ":
        case "k":
          if (!isCarousel) {
            e.preventDefault();
            togglePlay();
          }
          break;
        default:
          revealControls();
      }
    };
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtl, next, prev, close, isCarousel]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
    revealControls();
  }, [revealControls]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    setMuted((m) => {
      const nx = !m;
      if (v) {
        v.muted = nx;
        if (!nx && v.volume === 0) {
          v.volume = 0.6;
          setVolume(0.6);
        }
      }
      return nx;
    });
    revealControls();
  }, [revealControls]);

  const changeVolume = useCallback((val: number) => {
    const v = videoRef.current;
    setVolume(val);
    if (v) {
      v.volume = val;
      v.muted = val === 0;
    }
    setMuted(val === 0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const s = stageRef.current;
    if (!s) return;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    else s.requestFullscreen?.().catch(() => undefined);
    revealControls();
  }, [revealControls]);

  // ---- pointer: swipe + hold-to-pause ----
  const onPointerDown = (e: ReactPointerEvent) => {
    swipeX.current = e.clientX;
    holdRef.current = true;
    revealControls();
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    holdRef.current = false;
    const start = swipeX.current;
    swipeX.current = null;
    if (start == null) return;
    const dx = e.clientX - start;
    // Only handle deliberate swipes here; tap navigation is owned by the
    // explicit prev/next zone buttons (avoids double navigation).
    if (Math.abs(dx) > SWIPE_PX) {
      if (dx < 0) rtl ? prev() : next();
      else rtl ? next() : prev();
    }
  };

  if (!item) return null;

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const activeSlide = item.slides?.[slide];
  const route = item.route;

  return createPortal(
    <div
      ref={overlayRef}
      className="domi-media-overlay studio-viewer"
      data-media-viewer-root="studio"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="domi-media-dialog studio-viewer__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={item.title[language]}
        data-kind={item.kind}
        data-aspect={item.aspect}
      >
        {/* segmented progress for carousels/stories */}
        {isCarousel && slideCount > 1 ? (
          <div className="studio-viewer__segments" aria-hidden="true">
            {Array.from({ length: slideCount }, (_, i) => (
              <span key={i} data-state={i < slide ? "done" : i === slide ? "active" : "idle"}>
                <i style={{ animationDuration: reducedMotion ? "0s" : `${SLIDE_MS}ms` }} />
              </span>
            ))}
          </div>
        ) : null}

        <header className="studio-viewer__head">
          <div className="studio-viewer__identity">
            <span className="studio-viewer__avatar">
              <Image src={profile.avatar} alt="" width={40} height={40} />
            </span>
            <div>
              <strong dir="ltr">
                {profile.name}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="studio-verified">
                  <path d="M12 1.8 14.5 4l3.2-.3 1 3 2.8 1.6L22.2 12l1.3 2.9-2.8 1.6-1 3-3.2-.3L12 22.2 9.5 20l-3.2.3-1-3-2.8-1.6L3.8 12 2.5 9.1l2.8-1.6 1-3L9.5 4z" />
                  <path d="m8.5 12 2.3 2.3 4.7-4.8" fill="none" stroke="#04130d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </strong>
              <small>{item.title[language]}</small>
            </div>
          </div>
          <button
            type="button"
            className="domi-control domi-control--icon"
            onClick={close}
            aria-label={language === "ar" ? "إغلاق" : "Close"}
            data-viewer-initial-focus
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div
          ref={stageRef}
          className="studio-viewer__stage"
          data-aspect={item.aspect}
          data-controls={controlsVisible ? "shown" : "hidden"}
          data-playing={playing ? "true" : "false"}
          onPointerMove={revealControls}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => {
            holdRef.current = false;
          }}
        >
          {isCarousel && activeSlide ? (
            <Image
              key={activeSlide.src}
              src={activeSlide.src}
              alt={activeSlide.alt[language]}
              fill
              sizes="(max-width: 800px) 96vw, 40rem"
              className="studio-viewer__slide"
              priority
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={item.videoSrc}
                poster={item.poster}
                autoPlay
                muted={muted}
                playsInline
                preload="metadata"
                onLoadStart={() => setLoading(true)}
                onCanPlay={() => setLoading(false)}
                onWaiting={() => setLoading(true)}
                onPlaying={() => {
                  setLoading(false);
                  playingRef.current = true;
                  setPlaying(true);
                  revealControls();
                }}
                onPlay={() => {
                  playingRef.current = true;
                  setPlaying(true);
                }}
                onPause={() => {
                  playingRef.current = false;
                  setPlaying(false);
                  clearIdle();
                  setControlsVisible(true);
                }}
                onVolumeChange={(e) => {
                  setMuted(e.currentTarget.muted);
                  setVolume(e.currentTarget.volume);
                }}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration);
                  e.currentTarget.volume = volume;
                }}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              />
              <button
                type="button"
                className="studio-viewer__tap"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                tabIndex={-1}
              >
                <span>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</span>
              </button>
              {loading ? (
                <div className="domi-media-dialog__loading" role="status" aria-label="Loading">
                  <span />
                </div>
              ) : null}
            </>
          )}

          {/* previous / next zones for keyboard + pointer users */}
          <button
            type="button"
            className="studio-viewer__zone studio-viewer__zone--prev"
            onClick={() => (rtl ? next() : prev())}
            aria-label={language === "ar" ? "السابق" : "Previous"}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="studio-viewer__zone studio-viewer__zone--next"
            onClick={() => (rtl ? prev() : next())}
            aria-label={language === "ar" ? "التالي" : "Next"}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <footer className="studio-viewer__foot">
          <div className="studio-viewer__meta">
            <p>{item.caption[language]}</p>
            {item.project ? <span className="studio-viewer__project">{item.project}</span> : null}
          </div>

          {!isCarousel ? (
            <div className="studio-viewer__controls domi-control-bar" data-hidden={!controlsVisible}>
              <button
                type="button"
                className="domi-control domi-control--icon domi-control--primary"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              </button>
              <span className="domi-media-dialog__time">{fmt(currentTime)}</span>
              <input
                type="range"
                className="domi-media-dialog__scrubber"
                min={0}
                max={duration || 0}
                step="0.05"
                value={Math.min(currentTime, duration || 0)}
                onChange={(e) => {
                  const t = Number(e.target.value);
                  if (videoRef.current) videoRef.current.currentTime = t;
                  setCurrentTime(t);
                  revealControls();
                }}
                aria-label="Seek"
                style={{ "--media-progress": `${progressPct}%` } as React.CSSProperties}
              />
              <span className="domi-media-dialog__time">{fmt(duration)}</span>
              <div className="domi-media-dialog__volume">
                <button
                  type="button"
                  className="domi-control domi-control--icon"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  <VolumeIcon aria-hidden="true" />
                </button>
                <input
                  type="range"
                  className="domi-media-dialog__volume-slider"
                  min={0}
                  max={1}
                  step="0.02"
                  value={muted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  aria-label="Volume"
                  style={{ "--media-progress": `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties}
                />
              </div>
              <button
                type="button"
                className="domi-control domi-control--icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
              </button>
            </div>
          ) : (
            <div className="studio-viewer__post-actions">
              {slideCount > 1 ? (
                <div className="studio-viewer__dots" aria-hidden="true">
                  {Array.from({ length: slideCount }, (_, i) => (
                    <span key={i} data-active={i === slide} />
                  ))}
                </div>
              ) : (
                <span />
              )}
              {route ? (
                <Link
                  href={route}
                  className="domi-action domi-action--primary"
                  onClick={close}
                >
                  {language === "ar" ? "افتح" : "Open"}
                  <ArrowUpRight aria-hidden="true" className={rtl ? "-scale-x-100" : ""} />
                </Link>
              ) : null}
            </div>
          )}
        </footer>
      </div>
    </div>,
    document.body,
  );
}
