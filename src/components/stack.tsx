import { STACK } from "@/lib/stack";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

/**
 * 04 · Stack (DESIGN.md §6.05) — the skills as a typographic index grouped by
 * domain. Lead tools sit at full weight; the rest recede and rise on hover.
 * Deliberately not an icon-circle grid.
 */
export function Stack() {
  return (
    <section id="stack" className="px-6 py-20 sm:px-10 lg:pl-48">
      <div className="max-w-5xl">
        <SectionHeader num="04" title="STACK">
          Component inventory
        </SectionHeader>

        <div className="mt-4">
          {STACK.map((g) => (
            <Reveal key={g.num}>
              <div className="rule-t grid grid-cols-1 gap-x-10 gap-y-4 py-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase">
                    <span className="text-signal">{g.num}</span>
                    <span className="mx-2 text-faint">/</span>
                    <span className="text-dim">{g.domain}</span>
                  </p>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-2.5 lg:col-span-8">
                  {g.items.map((it) => (
                    <li
                      key={it.name}
                      className={`font-display text-lg leading-none tracking-tight transition-colors duration-300 hover:text-text ${
                        it.lead ? "text-text" : "text-faint"
                      }`}
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
