import { EXPERIENCE } from "@/lib/experience";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * 03 · Experience (DESIGN.md §6.04) — a concise document timeline. Mono dates,
 * hairline rules, only lines that carry a number or a decision.
 */
export function Experience() {
  return (
    <section id="experience" className="px-6 py-20 sm:px-10 lg:pl-48">
      <div className="max-w-5xl">
        <SectionHeader num="03" title="EXPERIENCE">
          Maersk · WEBEL
        </SectionHeader>

        <div className="mt-4">
          {EXPERIENCE.map((r, i) => (
            <Reveal key={`${r.company}-${i}`}>
              <div className="rule-t grid grid-cols-1 gap-x-10 gap-y-4 py-10 lg:grid-cols-12">
                {/* Left: period + org */}
                <div className="lg:col-span-4">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-signal uppercase">
                    {r.period}
                  </p>
                  <p className="mt-2 font-display text-xl leading-tight text-text">
                    {r.company}
                  </p>
                  <p className="eyebrow mt-1 text-faint normal-case">
                    {r.location}
                    {r.internal ? " · Proprietary" : ""}
                  </p>
                </div>

                {/* Right: role + decision lines */}
                <div className="lg:col-span-8">
                  <h3 className="text-lg font-medium text-text">{r.role}</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {r.points.map((pt, j) => (
                      <li
                        key={j}
                        className="grid grid-cols-[auto_1fr] gap-3 leading-relaxed text-dim"
                      >
                        <span aria-hidden className="mt-2 h-px w-4 bg-signal/60" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
