import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work/selected-work";
import { Experience } from "@/components/experience";
import { Stack } from "@/components/stack";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { PipelineSection } from "@/components/pipeline/pipeline-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <PipelineSection />
      <Experience />
      <Stack />
      <About />
      <Contact />

      {/* Colophon (DESIGN.md §6) */}
      <footer className="rule-t px-6 py-10 sm:px-10 lg:pl-48">
        <div className="flex max-w-5xl flex-wrap items-baseline justify-between gap-4 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
          <span>Anuran De — Data &amp; ML Engineer</span>
          <span>© 2026 · Built in Bengaluru</span>
          <span>Bengaluru, IN</span>
        </div>
      </footer>
    </main>
  );
}
