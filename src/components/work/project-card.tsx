import type { Project } from "@/lib/projects";

/**
 * A single spec-sheet entry (DESIGN.md §6.02): big index numeral, Clash name,
 * a mono metadata block, prose, and pulled metric callouts. Internal work gets
 * an honest PROPRIETARY tag; public work gets a ↗ SOURCE island link.
 * Hover lifts the row and lights the index amber (CSS only).
 */
export function ProjectCard({ project }: { project: Project }) {
  const p = project;
  return (
    <article className="group rule-t grid grid-cols-1 gap-x-10 gap-y-8 py-14 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:grid-cols-12">
      {/* Left: identity + meta */}
      <div className="lg:col-span-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-signal">{p.num}</span>
          <span className="eyebrow text-faint">
            {p.internal ? "Proprietary — Maersk" : "Open source"}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[0.95] tracking-tight text-text transition-colors duration-500 group-hover:text-signal">
          {p.name}
        </h3>
        <p className="eyebrow mt-3 text-dim normal-case">{p.kicker}</p>

        {/* Mono metadata block */}
        <dl className="mt-6 flex flex-col gap-2 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
          <div className="flex justify-between gap-4">
            <dt>Date</dt>
            <dd className="text-dim">{p.date}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Role</dt>
            <dd className="text-dim">{p.role}</dd>
          </div>
        </dl>

        {/* Source link (public) or proprietary tag (internal) */}
        <div className="mt-6">
          {p.sourceUrl ? (
            <a
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--hairline)] px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] text-text uppercase transition-colors hover:border-signal hover:text-signal"
            >
              Source
              <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 border border-dashed border-[var(--hairline)] px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
              <span aria-hidden>⌗</span> Internal
            </span>
          )}
        </div>
      </div>

      {/* Right: detail */}
      <div className="lg:col-span-8">
        <p className="max-w-2xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-text text-balance">
          {p.what}
        </p>
        <p className="mt-5 max-w-2xl leading-relaxed text-dim">
          {p.contribution}
        </p>

        {/* Stack — typographic index, not chips-with-icons */}
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] tracking-[0.08em] text-faint">
          {p.stack.map((s) => (
            <li key={s} className="before:mr-2 before:text-signal/60 before:content-['·']">
              {s}
            </li>
          ))}
        </ul>

        {/* Metric callouts */}
        <dl className="rule-t mt-8 grid grid-cols-3 gap-px">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 pt-4">
              <dt className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-none tracking-tight text-text tabular-nums">
                {m.value}
              </dt>
              <dd className="eyebrow text-faint">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
