"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PipelineNode } from "@/lib/pipeline";

/**
 * The mini "artifact" that opens when a journey node is clicked (section 02).
 * A surface spec-card floating over a dimmed field: headline, the story in
 * prose, and keyword chips. Built as a real dialog — focus is trapped and
 * returned, ESC and backdrop close it, and Lenis is paused while it's open so
 * the page underneath doesn't scroll.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type LenisLike = { stop: () => void; start: () => void };

export function JourneyArtifact({
  node,
  index,
  total,
  onClose,
}: {
  node: PipelineNode | null;
  /** 0-based position in the journey, for the "03 / 05" counter */
  index: number;
  total: number;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const open = node != null;

  // Pause Lenis + lock the body while open; restore focus to the trigger after.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog on the next frame (after mount).
    const id = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Keyboard: ESC closes, Tab is trapped inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const placeholder = node?.artifact.placeholder;

  return (
    <AnimatePresence>
      {open && node && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10 sm:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 -z-10 cursor-default bg-[rgba(4,5,6,0.72)] backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artifact-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.34, ease: EASE }}
            className="relative w-full max-w-xl overflow-hidden rounded-sm border border-[var(--hairline)] bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* amber signal edge */}
            <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-signal),transparent)]" />

            <div className="p-7 sm:p-9">
              {/* Header row — stage id + close */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-signal uppercase tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · Journey
                  </span>
                  <h3
                    id="artifact-title"
                    className="font-display text-[clamp(1.5rem,3.5vw,2.1rem)] leading-[1.05] tracking-[-0.01em] text-text"
                  >
                    {node.name}
                  </h3>
                  <p className="font-mono text-[12px] tracking-[0.04em] text-dim">
                    {node.role}
                    {node.period && (
                      <>
                        {" "}
                        <span className="text-faint">· {node.period}</span>
                      </>
                    )}
                    {node.place && <span className="text-faint"> · {node.place}</span>}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close artifact"
                  className="-mt-1 -mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[var(--hairline)] font-mono text-sm text-dim transition-colors hover:border-signal hover:text-signal"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              {placeholder ? (
                <div className="rule-t mt-7 pt-7">
                  <p className="font-display text-lg leading-snug text-text">
                    This chapter is being written.
                  </p>
                  <p className="mt-3 max-w-md leading-relaxed text-dim">
                    The details of this stage are on the way — check back shortly.
                  </p>
                </div>
              ) : (
                <>
                  {node.artifact.headline && (
                    <p className="rule-t mt-7 max-w-md pt-7 font-display text-[clamp(1.1rem,2.4vw,1.4rem)] leading-snug text-text text-balance">
                      {node.artifact.headline}
                    </p>
                  )}
                  <div className="mt-5 flex flex-col gap-4 leading-relaxed text-dim">
                    {node.artifact.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {node.artifact.tags && node.artifact.tags.length > 0 && (
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {node.artifact.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-sm border border-[var(--hairline)] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-faint uppercase"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
