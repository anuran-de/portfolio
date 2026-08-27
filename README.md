# Portfolio — anuran.de

Personal portfolio of **Anuran De**, Data & ML Engineer at A.P. Moller–Maersk.
A dark, technical, editorial single-page site built as one continuous scroll —
hero, work, an interactive data-pipeline visualisation, experience, stack, and
contact — with **ask.anuran**, a streaming AI assistant that answers questions
about my work.

**Live:** [anuran.de](https://anuran.de)

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) · **React 19** · **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — theme tokens in `globals.css`
- **[Framer Motion](https://www.framer.com/motion/)** — scroll-driven transitions
- **[React Three Fiber](https://r3f.docs.pmnd.rs/)** + **[drei](https://github.com/pmndrs/drei)** + **[three.js](https://threejs.org)** — WebGL pipeline visual, with graceful static fallbacks
- **[Lenis](https://lenis.darkroom.engineering/)** — weighted smooth scroll · **[GSAP](https://gsap.com)**
- **[Groq](https://groq.com)** (OpenAI-compatible) — LLM backing the ask.anuran assistant
- Deployed on **[Vercel](https://vercel.com)**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

The **ask.anuran** assistant needs a free [Groq](https://console.groq.com/keys)
API key (no card required). Copy the example file and paste your key:

```bash
cp .env.example .env.local
# then set GROQ_API_KEY=... in .env.local
```

The rest of the site renders without it — only the assistant requires the key.
See [`.env.example`](.env.example) for the full list (including the optional
`GROQ_MODEL` override).

> The API key is **never** committed. In production it lives only in the Vercel
> project's Environment Variables.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Structure

```
src/
├─ app/
│  ├─ layout.tsx          # fonts, chrome, smooth scroll, assistant mount, metadata
│  ├─ page.tsx            # the single-page composition
│  ├─ globals.css         # Tailwind v4 theme tokens + base styles
│  ├─ api/chat/route.ts   # ask.anuran — streaming Groq proxy
│  └─ *-image.tsx         # generated OG / icons
├─ components/
│  ├─ opening.tsx         # hero → about, one shared pipeline field
│  ├─ pipeline/           # WebGL data-pipeline scene + static fallbacks
│  ├─ work/ experience.tsx stack.tsx contact.tsx
│  ├─ assistant/          # ask.anuran console UI
│  └─ chrome/             # fixed meta-bar + doc-rail
└─ lib/                   # content: projects, experience, stack, sections, assistant context
```

Content lives as typed data in `src/lib/` — editing the site is mostly editing
those files, not the components. The design system and rationale are documented
in [`DESIGN.md`](DESIGN.md).

## ask.anuran

A console-style assistant (bottom-right) that answers questions about my
background. Requests hit `src/app/api/chat/route.ts`, which streams tokens from
Groq's OpenAI-compatible API back to the browser via Server-Sent Events. It's
scoped to professional context and declines off-topic or personal-detail
requests.

## Deployment

Auto-deploys to Vercel on push to `main`. Set `GROQ_API_KEY` in the project's
Environment Variables so the assistant works in production.

## License

All rights reserved. The code is here to browse; the content, copy, and design
are personal. Please don't redeploy it as your own.
