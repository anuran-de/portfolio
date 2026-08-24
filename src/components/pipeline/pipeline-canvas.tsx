"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PipelineFallback } from "./pipeline-fallback";

// Three never touches the server render path.
const PipelineGL = dynamic(() => import("./pipeline-gl"), { ssr: false });

function useWebGLReady() {
  // null = undecided (SSR + first paint), true/false after capability check.
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(false);
      return;
    }
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl")
      );
    } catch {
      ok = false;
    }
    setReady(ok);
  }, []);

  return ready;
}

/**
 * Capability-aware pipeline visual (DESIGN.md §8): the live WebGL scene when
 * supported and motion is allowed, otherwise a crisp static SVG of the same
 * architecture. Renders the SVG on the server / first paint so there's never a
 * blank box, then upgrades to WebGL on the client.
 */
export function PipelineCanvas({
  reveal = 1,
  parallax = true,
  labels = false,
}: {
  reveal?: number;
  parallax?: boolean;
  labels?: boolean;
}) {
  const ready = useWebGLReady();

  if (ready === true) {
    return <PipelineGL reveal={reveal} parallax={parallax} />;
  }
  // undecided or unsupported → static SVG
  return <PipelineFallback labels={labels} />;
}
