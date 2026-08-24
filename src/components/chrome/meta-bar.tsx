"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SECTIONS } from "@/lib/sections";

const NAV = SECTIONS.filter((s) => s.nav);

/**
 * Top meta-bar (DESIGN.md §5) — a hairline-ruled document header, not a SaaS
 * navbar. Left = identity, right = section links + availability status.
 * A 1px amber scroll-progress line rides the bottom edge.
 */
export function MetaBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <header className="rule-b fixed inset-x-0 top-0 z-[100] bg-void/70 backdrop-blur-[2px]">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Identity */}
        <a
          href="#hero"
          className="group flex items-baseline gap-2 font-mono text-[11px] tracking-[0.14em] text-text uppercase"
        >
          <span>Anuran De</span>
          <span className="text-faint transition-colors group-hover:text-signal">
            /
          </span>
          <span className="text-dim">Data&nbsp;Engineer</span>
        </a>

        {/* Section links — hidden on small screens, doc-rail carries mobile */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:text-text"
            >
              {s.nav}
            </a>
          ))}
        </nav>

        {/* Availability status */}
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span className="text-dim">
            Available<span className="hidden sm:inline"> for work</span>
          </span>
        </div>
      </div>

      {/* Amber scroll-progress line, anchored to the bar's bottom edge */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-signal"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
