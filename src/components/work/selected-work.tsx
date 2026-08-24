import { PROJECTS } from "@/lib/projects";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "./project-card";

/**
 * 01 · Selected Work (DESIGN.md §6.02) — the projects as spec-sheet entries.
 */
export function SelectedWork() {
  return (
    <section id="work" className="px-6 py-20 sm:px-10 lg:pl-48">
      <div className="max-w-5xl">
        <SectionHeader num="01" title="SELECTED WORK">
          {PROJECTS.length} projects · Maersk &amp; OSS
        </SectionHeader>

        <div className="mt-4">
          {PROJECTS.map((p) => (
            <Reveal key={p.num}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
