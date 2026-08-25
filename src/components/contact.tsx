import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

const LINKS = [
  { label: "Email", value: "anurande514@gmail.com", href: "mailto:anurande514@gmail.com" },
  { label: "GitHub", value: "github.com/anuran-de", href: "https://github.com/anuran-de" },
  {
    label: "LinkedIn",
    value: "in/anuran-de",
    href: "https://www.linkedin.com/in/anuran-de-7b7083286",
  },
];

/**
 * 05 · Contact / Colophon (DESIGN.md §6.06) — a specific CTA, a mono link
 * list with an amber underline-wipe on hover, and a real colophon.
 */
export function Contact() {
  return (
    <section id="contact" className="px-6 pt-20 pb-10 sm:px-10 lg:pl-48">
      <div className="max-w-5xl">
        <SectionHeader num="05" title="CONTACT">
          Currently at Maersk · open to what&apos;s next
        </SectionHeader>

        {/* CTA */}
        <Reveal>
          <h2 className="mt-12 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] text-text text-balance">
            Have data that needs to move at scale?{" "}
            <span className="text-signal">Let&rsquo;s talk.</span>
          </h2>
        </Reveal>

        {/* Link list */}
        <ul className="mt-14 flex flex-col">
          {LINKS.map((l, i) => (
            <Reveal as="li" key={l.label} delay={i * 0.05}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group rule-t flex items-baseline justify-between gap-6 py-6"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-none tracking-tight text-text">
                    {/* amber underline wipe */}
                    <span className="bg-[linear-gradient(var(--color-signal),var(--color-signal))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                      {l.label}
                    </span>
                  </span>
                </span>
                <span className="flex items-baseline gap-4">
                  <span className="hidden font-mono text-[12px] tracking-[0.08em] text-dim sm:inline">
                    {l.value}
                  </span>
                  <span className="text-dim transition-transform duration-500 group-hover:translate-x-1 group-hover:text-signal">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  );
}
