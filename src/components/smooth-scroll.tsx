"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Weighted smooth-scroll (DESIGN.md §7.1). Lenis drives the page so scroll
 * feels like it has mass. Honors prefers-reduced-motion by staying out of the
 * way entirely — native scroll, no RAF loop, no hijack.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Signature heavy-settle curve, matched to --ease-settle
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose for later GSAP ScrollTrigger sync (§7.1)
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
