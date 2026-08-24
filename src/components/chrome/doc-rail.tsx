"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/sections";

/**
 * Left doc-rail (DESIGN.md §5) — a vertical mono index that reinforces the
 * "spec document" frame: section list with the active one lit in amber, a
 * live scroll percentage, and a faint fixed coordinate. Desktop only.
 */
export function DocRail() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Active-section tracking — the section whose top is nearest the upper
    // third of the viewport wins.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    // Live scroll percentage
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
    >
      <ol className="flex flex-col gap-2.5">
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase"
              >
                <span
                  className={`transition-colors ${on ? "text-signal" : "text-faint"}`}
                >
                  {s.num}
                </span>
                {/* Tick that grows on the active row */}
                <span
                  className={`h-px transition-all duration-500 ${
                    on ? "w-6 bg-signal" : "w-3 bg-faint group-hover:w-5"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    on ? "text-text" : "text-faint group-hover:text-dim"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Live readout — scroll % + fixed coordinate (Bengaluru) */}
      <div className="flex flex-col gap-1 border-t border-[var(--hairline)] pt-3 font-mono text-[10px] tracking-[0.14em] text-faint tabular-nums">
        <span>
          SCROLL <span className="text-dim">{String(pct).padStart(3, "0")}%</span>
        </span>
        <span>12.9716°N 77.5946°E</span>
      </div>
    </aside>
  );
}
