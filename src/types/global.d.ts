import type Lenis from "lenis";

declare global {
  interface Window {
    /** Active Lenis instance, set by SmoothScroll for GSAP sync. */
    __lenis?: Lenis;
  }
}

export {};
