"use client";

import Image from "next/image";
import {
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
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { getActiveLenis } from "@/lib/motion/lenisStore";

type Props = {
  src: string;
  poster: string;
  title: string;
  context?: string;
  actionLabel?: string;
  presentation?: "stage" | "action";
  aspect?: "cinema" | "landscape" | "portrait";
  className?: string;
};

const CONTROLS_IDLE_MS = 2600;
const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function DominaseMediaViewer({
  src,
  poster,
  title,
  context,
  actionLabel = "Play film",
  presentation = "stage",
  aspect = "cinema",
  className = "",
}: Props) {
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | null>(null);
  const playingRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const clearIdleTimer = useCallback(() => {
    if (idleTimer.current !== null) {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  // Reveal controls; only schedule an auto-hide while actively playing.
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    clearIdleTimer();
    if (playingRef.current) {
      idleTimer.current = window.setTimeout(() => {
        if (playingRef.current) setControlsVisible(false);
      }, CONTROLS_IDLE_MS);
    }
  }, [clearIdleTimer]);

  const close = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    }
    setOpen(false);
  }, []);

  const openViewer = useCallback(() => {
    setLoading(true);
    setControlsVisible(true);
    setOpen(true);
  }, []);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
    revealControls();
  }, [revealControls]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    setMuted((prev) => {
      const next = !prev;
      if (video) {
        video.muted = next;
        if (!next && video.volume === 0) {
          video.volume = 0.6;
          setVolume(0.6);
        }
      }
      return next;
    });
    revealControls();
  }, [revealControls]);

  const changeVolume = useCallback((value: number) => {
    const video = videoRef.current;
    setVolume(value);
    if (video) {
      video.volume = value;
      video.muted = value === 0;
    }
    setMuted(value === 0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    } else {
      stage.requestFullscreen?.().catch(() => undefined);
    }
    revealControls();
  }, [revealControls]);

  // ---- Lifecycle while open: scroll lock, Lenis pause, inert background,
  //      focus management, keyboard shortcuts, fullscreen sync. ----
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const overlay = overlayRef.current;
    const lenis = getActiveLenis();

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Make everything except the viewer inert to trap AT + pointer focus.
    const inertTargets: HTMLElement[] = [];
    Array.from(document.body.children).forEach((child) => {
      if (
        child === overlay ||
        !(child instanceof HTMLElement) ||
        child.contains(overlay)
      ) {
        return;
      }
      if (!child.inert) {
        child.inert = true;
        inertTargets.push(child);
      }
    });

    const closeButton = dialogRef.current?.querySelector<HTMLButtonElement>(
      "[data-media-close]",
    );
    closeButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => undefined);
          } else {
            close();
          }
          break;
        case " ":
        case "k":
        case "K":
          event.preventDefault();
          togglePlayback();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "ArrowLeft":
        case "ArrowRight": {
          const video = videoRef.current;
          if (video && Number.isFinite(video.duration)) {
            event.preventDefault();
            const delta = event.key === "ArrowRight" ? 5 : -5;
            video.currentTime = Math.min(
              Math.max(0, video.currentTime + delta),
              video.duration,
            );
            revealControls();
          }
          break;
        }
        default:
          revealControls();
      }
    };

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      revealControls();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((el) => {
        el.inert = false;
      });
      // Restore the *current* Lenis instance so a route change or unexpected
      // unmount while open can never leave scrolling stopped.
      getActiveLenis()?.start();
      clearIdleTimer();
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [
    open,
    close,
    togglePlayback,
    toggleMute,
    toggleFullscreen,
    revealControls,
    clearIdleTimer,
  ]);

  // Reset transient state each time the viewer opens.
  useEffect(() => {
    if (!open) {
      playingRef.current = false;
      setPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setControlsVisible(true);
      setIsFullscreen(false);
    }
  }, [open]);

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const trigger =
    presentation === "action" ? (
      <button
        ref={triggerRef}
        type="button"
        className={`domi-action domi-action--media ${className}`.trim()}
        onClick={openViewer}
        aria-haspopup="dialog"
      >
        <Play aria-hidden="true" />
        {actionLabel}
      </button>
    ) : (
      <button
        ref={triggerRef}
        type="button"
        className={`domi-media-portal ${className}`.trim()}
        data-aspect={aspect}
        onClick={openViewer}
        aria-haspopup="dialog"
        aria-label={`${actionLabel}: ${title}`}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes="(max-width: 900px) 96vw, 78vw"
          className="domi-media-portal__poster"
        />
        <span className="domi-media-portal__scrim" aria-hidden="true" />
        <span className="domi-media-portal__signal" aria-hidden="true">
          <Play />
        </span>
        <span className="domi-media-portal__identity">
          {context ? <small>{context}</small> : null}
          <strong>{title}</strong>
        </span>
        <span className="domi-media-portal__action">
          {actionLabel}
          <Maximize2 aria-hidden="true" />
        </span>
      </button>
    );

  return (
    <>
      {trigger}
      {open
        ? createPortal(
            <div
              ref={overlayRef}
              className="domi-media-overlay"
              data-media-viewer-root="dominase"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                ref={dialogRef}
                className="domi-media-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onKeyDown={onDialogKeyDown}
              >
                <header className="domi-media-dialog__header">
                  <div>
                    {context ? <small>{context}</small> : null}
                    <h2 id={titleId}>{title}</h2>
                  </div>
                  <button
                    type="button"
                    className="domi-control domi-control--icon"
                    onClick={close}
                    aria-label="Close media viewer"
                    data-media-close
                  >
                    <X aria-hidden="true" />
                  </button>
                </header>

                <div
                  ref={stageRef}
                  className="domi-media-dialog__stage"
                  data-aspect={aspect}
                  data-controls={controlsVisible ? "shown" : "hidden"}
                  data-playing={playing ? "true" : "false"}
                  onPointerMove={revealControls}
                  onPointerDown={revealControls}
                  onPointerLeave={() => {
                    if (playingRef.current) setControlsVisible(false);
                  }}
                >
                  <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    autoPlay
                    muted={muted}
                    playsInline
                    preload="metadata"
                    onLoadStart={() => setLoading(true)}
                    onCanPlay={() => setLoading(false)}
                    onLoadedData={() => setLoading(false)}
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
                      clearIdleTimer();
                      setControlsVisible(true);
                    }}
                    onVolumeChange={(event) => {
                      setMuted(event.currentTarget.muted);
                      setVolume(event.currentTarget.volume);
                    }}
                    onLoadedMetadata={(event) => {
                      setDuration(event.currentTarget.duration);
                      event.currentTarget.volume = volume;
                    }}
                    onTimeUpdate={(event) =>
                      setCurrentTime(event.currentTarget.currentTime)
                    }
                    onEnded={() => {
                      playingRef.current = false;
                      setPlaying(false);
                      setControlsVisible(true);
                    }}
                  />

                  <button
                    type="button"
                    className="domi-media-dialog__center"
                    onClick={togglePlayback}
                    aria-label={playing ? "Pause video" : "Play video"}
                    tabIndex={-1}
                  >
                    <span>
                      {playing ? (
                        <Pause aria-hidden="true" />
                      ) : (
                        <Play aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {loading ? (
                    <div
                      className="domi-media-dialog__loading"
                      role="status"
                      aria-label="Loading video"
                    >
                      <span />
                    </div>
                  ) : null}

                  <div
                    className="domi-media-dialog__controls domi-control-bar"
                    onPointerMove={revealControls}
                  >
                    <button
                      type="button"
                      className="domi-control domi-control--icon domi-control--primary"
                      onClick={togglePlayback}
                      aria-label={playing ? "Pause video" : "Play video"}
                    >
                      {playing ? (
                        <Pause aria-hidden="true" />
                      ) : (
                        <Play aria-hidden="true" />
                      )}
                    </button>

                    <span className="domi-media-dialog__time">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      className="domi-media-dialog__scrubber"
                      min="0"
                      max={duration || 0}
                      step="0.05"
                      value={Math.min(currentTime, duration || 0)}
                      onChange={(event) => {
                        const nextTime = Number(event.target.value);
                        if (videoRef.current) {
                          videoRef.current.currentTime = nextTime;
                        }
                        setCurrentTime(nextTime);
                        revealControls();
                      }}
                      aria-label="Seek"
                      style={
                        {
                          "--media-progress": `${progressPct}%`,
                        } as React.CSSProperties
                      }
                    />
                    <span className="domi-media-dialog__time">
                      {formatTime(duration)}
                    </span>

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
                        min="0"
                        max="1"
                        step="0.02"
                        value={muted ? 0 : volume}
                        onChange={(event) =>
                          changeVolume(Number(event.target.value))
                        }
                        aria-label="Volume"
                        style={
                          {
                            "--media-progress": `${(muted ? 0 : volume) * 100}%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="domi-control domi-control--icon"
                      onClick={toggleFullscreen}
                      aria-label={
                        isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <Minimize2 aria-hidden="true" />
                      ) : (
                        <Maximize2 aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
