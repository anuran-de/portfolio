"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Masked line reveal (DESIGN.md §7.3): translateY + blur + opacity, staggered.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const line: Variants = {
  hidden: { y: "1.1em", opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};
const soft: Variants = {
  hidden: { y: "1.5rem", opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const STATS = [
  { value: "12M+", label: "Records / day" },
  { value: "30+", label: "Global terminals" },
  { value: "70%", label: "Latency cut" },
  { value: "$4B+", label: "Ops enabled" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-center px-6 pt-28 pb-16 sm:px-10 lg:pl-48"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl"
      >
        {/* Eyebrow */}
        <motion.p variants={soft} className="eyebrow mb-8 text-dim">
          Data &amp; ML Engineer
          <span className="mx-2 text-faint">·</span>
          <span className="text-signal">A.P. Moller–Maersk</span>
        </motion.p>

        {/* Display headline — masked line reveal */}
        <h1 className="font-display text-balance font-medium tracking-[-0.03em] text-text">
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              className="block text-[clamp(2.3rem,6.6vw,6.25rem)] leading-[0.95]"
            >
              I build the pipelines behind
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              className="block text-[clamp(2.3rem,6.6vw,6.25rem)] leading-[0.95]"
            >
              the boxes that move the world.
            </motion.span>
          </span>
          <span className="mt-4 block overflow-hidden">
            <motion.span
              variants={line}
              className="block text-[clamp(1.4rem,3.4vw,2.9rem)] leading-[1.05] text-dim"
            >
              — and the{" "}
              <span className="text-signal">ML systems</span> that make sense of
              them.
            </motion.span>
          </span>
        </h1>

        {/* Mono sub */}
        <motion.p
          variants={soft}
          className="mt-10 max-w-2xl font-mono text-[13px] leading-relaxed tracking-wide text-dim"
        >
          12M+ records/day on Delta Lake
          <span className="mx-2 text-faint">·</span>
          multi-agent RAG at 94% accuracy
          <span className="mx-2 text-faint">·</span>
          NLP that lifted dataset quality +35%.
        </motion.p>

        {/* CTA island link — mono, not a candy pill */}
        <motion.div variants={soft} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 border border-[var(--hairline)] px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-text uppercase transition-colors hover:border-signal hover:text-signal"
          >
            Selected Work
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-1 py-3 font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:text-text"
          >
            Get in touch
            <span aria-hidden>↗</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Stat row */}
      <motion.dl
        variants={container}
        initial="hidden"
        animate="show"
        className="rule-t mt-16 grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={soft}
            className="flex flex-col gap-1 pt-5"
          >
            <dt className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-tight text-text tabular-nums">
              {s.value}
            </dt>
            <dd className="eyebrow text-faint">{s.label}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
