"use client";

import { useEffect, type RefObject } from "react";
import { getActiveLenis } from "@/lib/motion/lenisStore";

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal-shell behavior extracted from the proven DominaseMediaViewer:
 * background scroll lock, Lenis pause/restore, inert background, initial focus,
 * Tab focus-trap, and focus restoration. The system cursor is never touched and
 * no wheel/touch preventDefault is attached, so the viewer owns its own scroll
 * without freezing interaction. Escape / arrows / shortcuts stay with the
 * consumer so each viewer mode can define its own keys.
 */
export function useViewerShell({
  open,
  dialogRef,
  overlayRef,
  restoreRef,
}: {
  open: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<HTMLElement | null>;
  restoreRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!open) return;

    const lenis = getActiveLenis();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const inertTargets: HTMLElement[] = [];
    Array.from(document.body.children).forEach((child) => {
      if (
        child === overlay ||
        !(child instanceof HTMLElement) ||
        (overlay && child.contains(overlay))
      ) {
        return;
      }
      if (!child.inert) {
        child.inert = true;
        inertTargets.push(child);
      }
    });

    const initial =
      dialogRef.current?.querySelector<HTMLElement>(
        "[data-viewer-initial-focus]",
      ) ?? dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    initial?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const nodes = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((el) => {
        el.inert = false;
      });
      // Restore the current Lenis instance so a route change / unexpected
      // unmount while open can never leave scrolling stopped.
      getActiveLenis()?.start();
      const restore = restoreRef?.current;
      window.requestAnimationFrame(() => restore?.focus());
    };
  }, [open, dialogRef, overlayRef, restoreRef]);
}
