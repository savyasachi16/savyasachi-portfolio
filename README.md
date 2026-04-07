# savyasachi.dev

Personal portfolio site for Savyasachi Jagadeeshan — Senior Software Engineer & Technical Lead.

Live: https://savyasachi.dev

## Tech Stack

<a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white" alt="Astro" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" /></a>
<a href="https://formspree.io"><img src="https://img.shields.io/badge/Formspree-E74B3C?style=flat&logo=formspree&logoColor=white" alt="Formspree" /></a>
<a href="https://www.spotify.com"><img src="https://img.shields.io/badge/Spotify_API-1DB954?style=flat&logo=spotify&logoColor=white" alt="Spotify" /></a>
<a href="https://www.goodreads.com"><img src="https://img.shields.io/badge/Goodreads_RSS-F4F1EA?style=flat&logo=goodreads&logoColor=372213" alt="Goodreads" /></a>

## Dev

```bash
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
npm run preview  # preview built output
```

## Project structure

```
src/
  data/               — all content (edit here to update copy)
    experience.ts     — work history
    projects.ts       — side projects
    skills.ts         — skill categories
    education.ts      — degrees
  components/
    sections/         — one file per page section
    ui/               — reusable card/pill components
  layouts/
    BaseLayout.astro  — HTML shell, fonts, global.css
  pages/
    index.astro       — single page
    api/spotify.ts    — serverless endpoint for Spotify now-playing
  styles/
    global.css        — @import tailwindcss + CSS custom properties
public/
  resume.pdf          — linked from Hero CTA
docs/
  spotify-setup.md    — one-time Spotify OAuth setup instructions
```

## Updating content

| What | Where |
|------|-------|
| Work experience | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Education | `src/data/education.ts` |
| Resume PDF | Replace `public/resume.pdf` (keep filename) |
| Contact form ID | `src/components/sections/Contact.astro` — replace `FORM_ID` |

## Integrations

**Goodreads** — fetched at build time from public RSS feeds. No API key needed. Updates on every deploy.

**Spotify** — live now-playing via `/api/spotify` serverless function. Requires three env vars. See `docs/spotify-setup.md`.

## Deploy

Push to `main` → Vercel auto-deploys. Build command: `npm run build`. Output: `dist/`.

Spotify env vars (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`) must be set in Vercel project settings.
