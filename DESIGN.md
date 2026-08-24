# DESIGN.md — Anuran De · Portfolio

> Step 2. The design bible. Approved direction: **dark, technical, editorial** — "a
> beautifully typeset internal engineering doc, not a marketing site." Every choice below is
> made against your two references and your explicit *avoid* list. Nothing generic ships.

---

## 1. Design Thesis

A data engineer's portfolio should feel like the **thing they build**: a precise, instrumented,
high-throughput system — legible under load, no decoration without function. So the site reads like a
**living engineering document**: hairline-ruled columns, document section numbers (`00 / 01 / 02`), mono
metadata, a persistent status rail — with **one cinematic centerpiece**: a bespoke WebGL data-pipeline that
streams "records" through `Postgres → Spark → Delta Lake → API` in real time.

**Mapping the references:**
- **mitchelleaton.com** → the *motion register* and *editorial confidence*: near-black canvas, oversized
  display type, masked line-by-line reveals, buttery Lenis scroll, WebGL that feels bespoke not bolted-on.
- **diogotc.com (landing)** → the *restraint and mono precision*: developer-minimal, generous negative space,
  monospace labels doing quiet structural work, nothing shouting.

**We take from the loaded design skill:** double-bezel nested cards, custom `cubic-bezier` motion,
`py-24`+ breathing room, eyebrow tags, magnetic hovers, transform/opacity-only animation.
**We reject from it (per your avoid list):** glassmorphism, backdrop-blur cards, SaaS-glass orbs,
purple/emerald gradients.

## 2. How this beats the "generic" checklist (your avoid list → the antidote)

| You said avoid | What we do instead |
|---|---|
| Generic SaaS landing look | Engineering-**document** layout: section numbers, doc rail, colophon, spec-sheet cards |
| Purple→blue gradients | **Monochrome + one warm spot color** (signal amber). Only gradient is a single-hue amber→gold in the data-viz |
| Centered hero + rounded pill button | **Left-aligned editorial split**, asymmetric. CTA is a mono "island" link, not a candy pill |
| Inter / system-ui generic | **Clash Display + Geist Sans + Geist Mono** (all free, self-hosted, none banned) |
| Glassmorphism cards | **Matte spec-sheet cards**: flat surface, hairline ring, inset top-highlight — reads like anodized metal, not glass |
| Emoji as icons | **Phosphor / Remix ultra-light line icons** + mono glyphs (`↗ ◍ ∴ ⌗`) |
| Icon-in-circle 3× feature grid | Skills become a **typographic index/table** (like a doc's component inventory), never circles |
| Drop-shadow-on-everything | **Hairlines + inset highlights** for depth; shadows only as wide, near-invisible ambient diffusion |
| "Building the future of X" copy | Copy pulled **verbatim from your metrics** — 12M records/day, 99.7% consistency, −75% resolution time |

## 3. Typography

A deliberate 3-voice system — editorial display, technical body, data mono.

| Role | Typeface | Usage | Why |
|---|---|---|---|
| **Display** | **Clash Display** (Variable, Fontshare) | Hero, section titles, big statements, index numerals | Characterful editorial grotesk with authority — a masthead voice, not a UI font |
| **Body / UI** | **Geist Sans** (Variable, Vercel) | Paragraphs, project prose, nav | Neutral engineering clarity; precise, unfussy |
| **Data / Mono** | **Geist Mono** (Variable, Vercel) | Eyebrows, metrics, labels, dates, tags, pipeline nodes, code | The "engineering doc / terminal readout" texture — carries the whole technical tone |

**Scale (fluid, `clamp()`):** hero display `clamp(3rem, 11vw, 11rem)` with tight `-0.03em` tracking and
`0.92` line-height · section titles `clamp(2rem, 5vw, 4.5rem)` · body `18–20px / 1.6` · mono labels
`11–13px`, `uppercase`, `letter-spacing: 0.18em`. Editorial tension = **huge display against microscopic mono**.

**Two headline options (impact-led, from the resume — pick one, I'll default to A):**
- **A.** eyebrow `DATA ENGINEER · A.P. MOLLER–MAERSK` → display: **"I build the pipelines behind the boxes that move the world."** → mono sub: *12M+ shipping records a day · 30+ global terminals · Databricks Delta Lake.*
- **B.** display: **"Anuran De"** → statement: **"Real-time data infrastructure for $4B+ of container operations."** → sub: *pipelines, gateways, and the RAG systems on top of them.*

## 4. Color — monochrome canvas + one signal

Warm-neutral OLED dark so it feels like ink on dark paper, not cold UI. **One accent only** — a spot color,
like a print publication.

```
--void        #08090A   /* page — near-black, faint warmth, not pure #000 (keeps depth) */
--surface     #0F1113   /* raised spec-sheet cards */
--surface-2   #15181B   /* nested inner core / inputs */
--hairline    rgba(255,255,255,0.08)   /* the ruling lines — the whole grid is drawn in these */
--text        #F2F0EA   /* warm paper white — primary */
--text-dim    #9BA1A6   /* muted cool grey — secondary / mono labels */
--text-faint  #565B61   /* faint — coordinates, colophon */
--signal      #E9B44C   /* SIGNAL AMBER — the single spot color */
--signal-soft rgba(233,180,76,0.14)     /* tints, glows, active fills */
--flow-hi     #F6D79A   /* pale gold — top of the data-viz single-hue gradient */
```

**Why amber, not the expected cyan/green/purple:** it reads as an **oscilloscope/terminal signal** and as a
**press spot-color** simultaneously — warm against the cold black, and it has *zero* relationship to the banned
purple/blue palette. Used sparingly and with intent: active nav dot, the flowing records in the pipeline,
one emphasized word per headline, metric emphasis, link underlines. *(If you'd rather a cooler "phosphor
green" signal, it's a one-token swap — say the word.)*

**Texture:** a fixed, `pointer-events-none` **film-grain** overlay at ~3.5% opacity (engineering-doc paper
feel). Optional faint scanline on the hero shader only. No grain on scrolling containers (perf).

## 5. Chrome — the "document" frame

- **Top meta-bar** (not a SaaS navbar): hairline-ruled, mono. Left = `ANURAN DE / DATA ENGINEER`.
  Right = section links + `◍ AVAILABLE` status. A 1px **amber scroll-progress** line rides the bottom edge.
- **Left doc-rail** (desktop): vertical mono index of sections + live scroll `%` + a faint coordinate/timestamp.
  Reinforces "spec document." Collapses on mobile.
- **Section headers** are numbered `↳ 01 — SELECTED WORK` like document chapters.

## 6. Sections — treatment · interaction · motion

**00 · Hero** — Editorial split. Left: eyebrow + massive Clash Display headline (masked line reveal on
load) + mono sub. Below: the **stat row** `12M+ · 30+ · 70% · $4B+` in mono, count-up when scrolled into view.
Right/behind: the **WebGL pipeline shader** (§8) as a living backdrop, subtly hover-reactive. Lenis takes over
scroll. → *Motion: GSAP masked text reveal, staggered; parallax on the shader.*

**01 · Signal ticker** — thin mono marquee of the stack + metrics scrolling like a data feed. Connective
tissue between hero and work. → *Motion: seamless infinite translate, pauses on hover.*

**02 · Selected Work** — 3–5 projects (SARA, RateFlow, Delta Lake Platform, researgent, + TELEDOC) as
**spec-sheet entries**: big index numeral, name in Clash Display, mono metadata block (stack · date · role ·
`PROPRIETARY — MAERSK` tag where internal), the what/contribution/impact prose, and a pulled **metric callout**.
Layout alternates asymmetrically; **left project index pins** (GSAP ScrollTrigger) while detail scrolls.
Public repos get a `↗ SOURCE` island link; internal ones get an honest `PROPRIETARY` tag, no dead link. →
*Motion: hairline rows draw in; hover = magnetic lift + amber index; SARA card reveals a mini agent-graph.*

**03 · The Pipeline** *(the differentiator)* — full-bleed interactive architecture: `Postgres → CDC →
PySpark/Databricks → Delta Lake → API/Analytics`. **Scroll scrubs the flow** (GSAP ScrollTrigger) — the
pipeline "fills" as you descend; nodes are hoverable and print their real role + throughput (12M/day, 99.7%
consistency, <100ms P95). GLSL particles = amber records streaming edge to edge. → *Motion: scroll-scrubbed
shader uniform; node tooltips spring in.*

**04 · Experience** — concise doc timeline: Maersk (ASE → Intern) + WEBEL. Mono dates, hairline rules, zero
filler bullets — only lines that carry a number or a decision. → *Motion: staggered fade-up per row.*

**05 · Stack** — the skills as a **typographic index/table** grouped by domain (Data Eng · AI/RAG · API/Cloud ·
Databases), mono, weighted by relevance. Explicitly **not** an icon-circle grid. → *Motion: row-by-row reveal;
hover raises the term to `--text`.*

**06 · Contact / Colophon** — big Clash Display CTA (specific, not stock — e.g. *"Have data that needs to move
at scale? Let's talk."*), mono link list (email · GitHub · LinkedIn · LeetCode), and a real **colophon**:
typefaces, `Built with Next.js · React Three Fiber · GSAP · custom GLSL`, and a footer coordinate/timestamp.
→ *Motion: magnetic links; CTA underline wipes in amber.*

## 7. Motion philosophy

1. **Scroll is the narrative.** Lenis for weighted smooth-scroll; GSAP ScrollTrigger drives every sequence.
2. **Mass, not linearity.** Every transition uses a custom curve — signature `cubic-bezier(0.22, 1, 0.36, 1)`
   (heavy settle); never `linear`/`ease-in-out`. Durations 600–1000ms for reveals.
3. **Reveal, don't pop.** Elements enter with `translateY(2rem) + blur(6px) + opacity 0 → 0`, staggered.
4. **Kinetic micro-interactions** (Framer Motion): magnetic buttons/links, amber active states, count-ups.
5. **The WebGL is reactive**, never idle wallpaper — it responds to pointer and scroll.
6. **transform/opacity only.** `prefers-reduced-motion` → all scroll-scrub & shaders drop to static, elegant
   states; the site is fully legible with JS/motion off.

## 8. Signature data-viz — the pipeline shader (bespoke GLSL)

- **Not** a stock Three primitive. A custom shader: instanced particles advected along bezier "pipes" between
  nodes via a GLSL flow-field; amber→pale-gold single-hue gradient; additive glow; density maps to real
  throughput. Nodes are R3F meshes with mono HTML labels (drei `Html`).
- **Hero mode:** ambient, slow, pointer-parallax. **Section 03 mode:** same scene, scroll-scrubbed, nodes
  interactive. Reuses one scene for cohesion + perf.
- **Fallback:** reduced-motion / no-WebGL → a crisp static SVG of the same architecture. Never a blank box.

## 9. Tech architecture

`Next.js (App Router) + TypeScript` · `Tailwind` (custom tokens above) · `@react-three/fiber` + `drei` ·
custom **GLSL** · `GSAP` + `ScrollTrigger` · `Framer Motion` (micro) · `Lenis` (smooth scroll) ·
fonts self-hosted (`geist` npm + Fontshare Clash Display) · Phosphor line icons. Deploy: Vercel-ready.

## 10. Accessibility & performance

Semantic landmarks, keyboard-navigable, focus-visible in amber, AA contrast on all text, `prefers-reduced-motion`
honored end-to-end, 3D lazy-loaded + `dpr` capped + paused off-screen, images/fonts optimized, grain/blur only
on fixed layers.

## 11. Build order (incremental — screenshot + critique each step, per your process)

`00` Scaffold (Next+Tailwind+fonts+tokens+Lenis+grain+chrome) → `01` Hero + stat row → `02` Pipeline shader
(the risky centerpiece, early) → `03` Selected Work → `04` Experience + Stack → `05` Contact/Colophon →
`06` polish pass, reduced-motion, Lighthouse. **After each:** dev-server screenshot → critique vs. references
& avoid list → fix generic tells → **commit + push** (frequent, granular — for your contribution graph).
