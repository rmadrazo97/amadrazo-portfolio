# amadrazo-portfolio

Personal portfolio website of Alejandro (Alex) Madrazo — Senior AI Engineer.

Built from the **Portfolio.dc.html** design in the
[`Senior engineer portfolio design system`](https://claude.ai/design/p/a0d84663-baa9-4d3f-98d9-16d2c0dc97b9)
Claude Design project.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- Fonts: JetBrains Mono + Space Grotesk (Google Fonts)
- A hand-written `<canvas>` "AM" dot-mesh / glitch signature mark
  ([`src/components/GlitchMark.tsx`](src/components/GlitchMark.tsx))

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

- `src/app/page.tsx` — the single-page portfolio (hero, capabilities, selected
  work, trajectory timeline, stack, contact).
- `src/components/GlitchMark.tsx` — the animated canvas signature mark.
- `src/app/globals.css` — base resets, keyframes, and hover utilities ported
  from the design.
- `public/assets/` — project preview images.
