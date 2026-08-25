"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Hero } from "./hero";
import { About } from "./about";
import { PipelineCanvas } from "./pipeline/pipeline-canvas";

/**
 * The opening movement (DESIGN.md §6 · 00 Index) — Hero and About read as one
 * continuous beat rather than two chapters. A single ambient pipeline field is
 * pinned viewport-height behind both, so the background never breaks across the
 * seam. On scroll, the hero dissolves in place — fade + lift + blur — while the
 * About rises up into the same field: a vertical crossfade hand-off, not a cut.
 *
 * Reduced-motion collapses to a plain stack (still one shared field), and the
 * canvas itself already falls back to the static SVG when motion is off.
 */
export function Opening() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // The morph is driven in raw pixels off the first viewport of scroll, so the
  // hand-off timing is independent of however tall the About prose runs.
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const H = vh || 800;

  // Hero exit: mostly gone by the time the About's top edge slides up over it.
  const heroOpacity = useTransform(scrollY, [H * 0.12, H * 0.82], [1, 0]);
  const heroY = useTransform(scrollY, [0, H], [0, -110]);
  const heroBlurPx = useTransform(scrollY, [H * 0.12, H * 0.82], [0, 9]);
  const heroFilter = useMotionTemplate`blur(${heroBlurPx}px)`;

  return (
    <div id="opening" className="relative">
      {/* Shared ambient field — a viewport-tall canvas pinned behind the whole
          opening so hero → about ride the same living pipeline. The outer layer
          spans the movement without touching flow; the inner one sticks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="sticky top-0 h-svh w-full opacity-70"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 4%, rgba(0,0,0,0.25) 34%, #000 72%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 4%, rgba(0,0,0,0.25) 34%, #000 72%)",
          }}
        >
          <PipelineCanvas parallax />
        </div>
      </div>

      {reduce ? (
        <>
          <Hero />
          <About />
        </>
      ) : (
        <>
          {/* Hero — pinned, dissolving as the About takes the field */}
          <motion.div
            className="sticky top-0"
            style={{ opacity: heroOpacity, y: heroY, filter: heroFilter }}
          >
            <Hero />
          </motion.div>
          {/* About — rises up over the fading hero, same backdrop underneath */}
          <div className="relative">
            <About />
          </div>
        </>
      )}
    </div>
  );
}
