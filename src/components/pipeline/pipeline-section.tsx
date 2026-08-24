"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { PIPELINE_NODES } from "@/lib/pipeline";
import { PipelineFallback } from "./pipeline-fallback";

const PipelineInteractive = dynamic(() => import("./pipeline-interactive"), {
  ssr: false,
});

/**
 * The interactive WebGL scrub is a wide-screen delight: the drei-Html node
 * labels are fixed screen-size and collide on narrow portrait widths, and the
 * particle field is wasted work on phones. Below `lg`, on no-WebGL, or with
 * reduced-motion we serve the crisp static diagram instead.
 */
function useInteractiveReady() {
  // null = undecided (SSR + first paint) → render the static fallback first.
  const [ready, setReady] = useState<boolean | null>(null);
  useEffect(() => {
    const evaluate = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        return false;
      }
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    };
    setReady(evaluate());
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setReady(evaluate());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return ready;
}

/**
 * 02 · The Pipeline (DESIGN.md §6.03) — the differentiator. A tall scroll track
 * with a sticky full-bleed stage: scrolling scrubs the GLSL record-stream so
 * the pipeline visibly *fills* Postgres → CDC → Spark → Delta → API, and each
 * stage lights up with its real role + throughput as the flow reaches it.
 * Reduced-motion / no-WebGL falls back to the crisp static diagram.
 */
export function PipelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pct, setPct] = useState(0);
  const ready = useInteractiveReady();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    revealRef.current = v;
    const next = Math.round(v * 100);
    setPct((p) => (p !== next ? next : p));
    // Which stages the flow has reached (small lead so a node lights just as
    // the leading records arrive).
    let idx = 0;
    for (let i = 0; i < PIPELINE_NODES.length; i++) {
      if (v >= PIPELINE_NODES[i].x - 0.03) idx = i;
    }
    setActiveIndex((cur) => (cur !== idx ? idx : cur));
  });

  const interactive = ready === true;

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      // Tall scroll track only when there's a scrub to drive; the static
      // fallback needs no extra travel.
      className={`relative ${interactive ? "h-[320svh]" : "min-h-[100svh]"}`}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <SectionHeader
          num="02"
          title="THE PIPELINE"
          className="absolute top-24 right-6 left-6 z-10 sm:right-10 sm:left-10 lg:pl-48"
        >
          Scroll to move the data
        </SectionHeader>

        {/* Visual — inset to the document's left gutter so the graph clears
            the fixed doc-rail on large screens. */}
        <div className="absolute inset-0 lg:left-44">
          {interactive ? (
            <PipelineInteractive revealRef={revealRef} activeIndex={activeIndex} />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6">
              <div className="w-full max-w-4xl">
                <PipelineFallback labels />
              </div>
            </div>
          )}
        </div>

        {/* Flow readout */}
        <div className="pointer-events-none absolute right-6 bottom-10 left-6 z-10 flex items-end justify-between gap-6 sm:right-10 sm:left-10 lg:pl-48">
          <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.08em] text-faint uppercase">
            Postgres → CDC → PySpark · Databricks → Delta Lake → API
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] text-dim tabular-nums">
            <span className="text-signal">FLOW</span>{" "}
            {String(pct).padStart(3, "0")}%
          </p>
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 h-px bg-[var(--hairline)] sm:inset-x-10 lg:left-48">
          <div
            className="h-px bg-signal transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </section>
  );
}
