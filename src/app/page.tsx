import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work/selected-work";
import { SectionHeader } from "@/components/section-header";
import { SECTIONS } from "@/lib/sections";

// Sections still to be built. Rendered as honest numbered placeholders so the
// doc-rail, nav anchors, and scroll logic stay wired end-to-end.
const PENDING = SECTIONS.filter((s) => !["hero", "work"].includes(s.id));

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />

      {PENDING.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="min-h-[70svh] px-6 py-20 sm:px-10 lg:pl-48"
        >
          <div className="max-w-5xl">
            <SectionHeader num={s.num} title={s.label.toUpperCase()}>
              in progress
            </SectionHeader>
            <p className="mt-10 max-w-md font-mono text-[13px] leading-relaxed text-faint">
              Section {s.num} scaffolded. Content lands in the next build step.
            </p>
          </div>
        </section>
      ))}

      {/* Colophon (DESIGN.md §6) */}
      <footer className="rule-t px-6 py-10 sm:px-10 lg:pl-48">
        <div className="flex max-w-5xl flex-wrap items-baseline justify-between gap-4 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
          <span>Anuran De — Data &amp; ML Engineer</span>
          <span>Clash Display · Geist · Geist Mono</span>
          <span>Bengaluru, IN</span>
        </div>
      </footer>
    </main>
  );
}
