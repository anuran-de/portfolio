import type { ReactNode } from "react";

/**
 * Numbered document chapter header (DESIGN.md §5): "↳ 01 — SELECTED WORK".
 * Hairline-ruled, mono. The section number encodes real reading order.
 */
export function SectionHeader({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="rule-t flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-5">
      <h2 className="eyebrow flex items-center gap-2 text-dim">
        <span className="text-signal">↳ {num}</span>
        <span aria-hidden>—</span>
        <span>{title}</span>
      </h2>
      {children ? (
        <span className="eyebrow text-faint normal-case">{children}</span>
      ) : null}
    </div>
  );
}
