"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SUGGESTIONS } from "@/lib/assistant-context";

/**
 * "ask.anuran" — a console-style assistant that answers questions about Anuran.
 *
 * A launcher chip (bottom-right, site-wide) opens a terminal window over a
 * dimmed field. Questions POST to /api/chat, which streams tokens back from a
 * free LLM; they render live with a blinking amber caret. Built as a real
 * dialog: focus is trapped and restored, ESC/backdrop close it, and Lenis is
 * paused while it's open. Reduced motion drops the blink and slide.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const FALLBACK = "The assistant couldn't be reached. Reach Anuran at anurande514@gmail.com.";

type LenisLike = { stop: () => void; start: () => void };
type Line = { role: "user" | "assistant"; content: string; system?: boolean };

export function AssistantConsole() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const started = lines.some((l) => l.role === "user");

  // Pause Lenis + lock body while open; restore focus to the launcher after.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      launcherRef.current?.focus?.();
    };
  }, [open]);

  // Keyboard: ESC closes, Tab is trapped inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
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
  }, [open]);

  // Keep the newest line in view as tokens stream in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || streaming) return;
      setInput("");

      const history: Line[] = [...lines, { role: "user", content: question }];
      setLines(history);
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok || !res.body) {
          const { error } = await res
            .json()
            .catch(() => ({ error: "The assistant is offline right now." }));
          setLines((prev) => [...prev, { role: "assistant", content: error, system: true }]);
          return;
        }

        setLines((prev) => [...prev, { role: "assistant", content: "" }]);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setLines((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
            return copy;
          });
        }
      } catch {
        setLines((prev) => [...prev, { role: "assistant", content: FALLBACK, system: true }]);
      } finally {
        setStreaming(false);
        window.requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [lines, streaming],
  );

  return (
    <>
      {/* Launcher — a console prompt chip, bottom-right, site-wide */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group fixed right-4 bottom-4 z-[80] flex items-center gap-2 rounded-sm border border-[var(--hairline)] bg-void/80 px-3.5 py-2.5 font-mono text-[12px] tracking-[0.14em] text-dim uppercase backdrop-blur-sm transition-colors hover:border-signal hover:text-signal sm:right-6 sm:bottom-6"
      >
        <span className="text-signal">ask</span>
        <span aria-hidden className="text-faint transition-colors group-hover:text-signal">
          ▸
        </span>
        <span className="hidden sm:inline">anuran</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="absolute inset-0 -z-10 cursor-default bg-[rgba(4,5,6,0.72)] backdrop-blur-sm"
            />

            {/* Terminal window */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Ask about Anuran"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              className="relative flex h-[72vh] max-h-[560px] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-[var(--hairline)] bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)]"
            >
              {/* amber signal edge */}
              <span className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,var(--color-signal),transparent)]" />

              {/* Title bar */}
              <div className="rule-b flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
                  />
                  ask.anuran
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--hairline)] font-mono text-xs text-dim transition-colors hover:border-signal hover:text-signal"
                >
                  ✕
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-5 font-mono text-[13px] leading-relaxed"
              >
                {/* Intro */}
                <p className="text-faint">
                  <span className="text-signal">▸</span> a small assistant on Anuran&rsquo;s work —
                  ask about Maersk, his projects, stack, or how to reach him.
                </p>

                {!started && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => send(s.prompt)}
                        className="rounded-sm border border-[var(--hairline)] px-2.5 py-1 text-[11px] tracking-[0.08em] text-dim lowercase transition-colors hover:border-signal hover:text-signal"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Transcript */}
                <div className="mt-5 flex flex-col gap-4" aria-live="polite">
                  {lines.map((line, i) => {
                    const isLast = i === lines.length - 1;
                    if (line.role === "user") {
                      return (
                        <p key={i} className="flex gap-2 text-text">
                          <span aria-hidden className="text-signal">
                            &gt;
                          </span>
                          <span>{line.content}</span>
                        </p>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className={`flex gap-2 ${line.system ? "text-faint" : "text-dim"}`}
                      >
                        <span aria-hidden className={line.system ? "text-faint" : "text-signal"}>
                          ▸
                        </span>
                        <span className="whitespace-pre-wrap">
                          {line.content}
                          {streaming && isLast && !line.system && <Caret reduce={!!reduce} />}
                        </span>
                      </p>
                    );
                  })}

                  {/* Caret on an as-yet-empty assistant turn */}
                  {streaming && lines[lines.length - 1]?.role === "user" && (
                    <p className="flex gap-2 text-dim">
                      <span aria-hidden className="text-signal">
                        ▸
                      </span>
                      <Caret reduce={!!reduce} />
                    </p>
                  )}
                </div>
              </div>

              {/* Prompt */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="rule-t flex items-center gap-2 px-4 py-3.5"
              >
                <span aria-hidden className="font-mono text-sm text-signal">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={1000}
                  placeholder={streaming ? "…" : "ask about anuran"}
                  aria-label="Ask a question about Anuran"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent font-mono text-[13px] text-text placeholder:text-faint focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send"
                  className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase transition-colors hover:text-signal disabled:cursor-not-allowed disabled:text-faint disabled:hover:text-faint"
                >
                  send ↵
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Blinking block caret; static under reduced motion. */
function Caret({ reduce }: { reduce: boolean }) {
  if (reduce) return <span className="text-signal">▮</span>;
  return (
    <motion.span
      aria-hidden
      className="text-signal"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
    >
      ▮
    </motion.span>
  );
}
