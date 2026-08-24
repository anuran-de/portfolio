"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal (DESIGN.md §7.3): translateY + blur + opacity,
 * heavy-settle curve. Enters once when scrolled into view. Reduced-motion is
 * honored globally via CSS, and Framer respects it for transforms too.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
  className?: string;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
