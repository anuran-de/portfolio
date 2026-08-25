import { Reveal } from "@/components/reveal";

/**
 * About (DESIGN.md §6 · 00 Index) — the second beat of the opening, a
 * continuation of the hero rather than its own chapter. It carries no section
 * number: the hero dissolves and this rises into the same field. Reuses the
 * Experience/Stack 4-8 grid so it still reads as native — a mono "// constants"
 * index (the engineering-doc device made true, the values that don't change)
 * beside warmly-typeset prose whose lead deliberately echoes the hero's.
 */

/** The constants — pulled straight from the prose, nothing invented. */
const CONSTANTS: { key: string; value: string }[] = [
  { key: "Club", value: "Mohun Bagan · 19 yrs" },
  { key: "Club", value: "Arsenal · Wenger era" },
  { key: "Runtime", value: "Spotify · always on" },
  { key: "Domain", value: "systems · AI · data" },
];

export function About() {
  return (
    <section id="about" className="px-6 pt-10 pb-24 sm:px-10 lg:pl-48">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* Left: the constants — a mono spec of the things that don't change */}
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-signal uppercase">
              // constants
            </p>
            <dl className="mt-5 flex flex-col">
              {CONSTANTS.map((c, i) => (
                <div
                  key={`${c.key}-${i}`}
                  className="flex items-baseline justify-between gap-4 border-t border-[var(--hairline)] py-3 first:border-t-0 font-mono text-[12px] tracking-[0.04em]"
                >
                  <dt className="text-faint uppercase">{c.key}</dt>
                  <dd className="text-dim tabular-nums">{c.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Right: the prose */}
          <div className="lg:col-span-8">
            {/* Lead */}
            <Reveal>
              <p className="max-w-2xl font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-[1.2] tracking-[-0.01em] text-text text-balance">
                I build <span className="text-signal">intelligent systems</span>
                —and spend an unreasonable amount of time thinking about how to
                make them consume, process, and make sense of data.
              </p>
            </Reveal>

            {/* Body */}
            <div className="mt-8 flex max-w-2xl flex-col gap-6 leading-relaxed text-dim">
              <Reveal delay={0.05}>
                <p>
                  By day, I&rsquo;m usually somewhere between system
                  architecture, AI, data, and figuring out why something that
                  should work absolutely refuses to.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p>
                  When I&rsquo;m not building things, there&rsquo;s a good chance
                  I&rsquo;m watching football. I&rsquo;ve been a{" "}
                  <span className="text-text">Mohun Bagan</span> supporter for 19
                  years—long enough for the club to become less of a football
                  team and more of a permanent emotional condition. Somewhere
                  along the way, I also fell hopelessly in love with{" "}
                  <span className="text-text">Arsenal</span>, back when Ars&egrave;ne
                  Wenger was pulling the strings and football still felt a little
                  more romantic.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="font-display text-xl leading-snug text-text">
                  And then there&rsquo;s Spotify.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p>
                  My earphones are less of an accessory and more of a
                  life-support system. There is a fairly high correlation between
                  my productivity, sanity, and whether Spotify is currently
                  playing something.
                </p>
              </Reveal>
            </div>

            {/* In short — the summary, ruled off */}
            <Reveal delay={0.15}>
              <p className="rule-t mt-10 max-w-2xl pt-8 font-display text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug text-text text-balance">
                <span className="text-faint">So, in short — </span>I build
                intelligent systems, obsess over architecture, overthink
                football, and require a suspicious amount of music to function.
              </p>
            </Reveal>

            {/* Sign-off */}
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
                &rarr; Welcome to my little corner of the internet.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
