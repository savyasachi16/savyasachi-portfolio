# savyasachi.dev

Personal portfolio site for Savyasachi Jagadeeshan — Senior Software Engineer & Technical Lead.

Live: https://savyasachi.dev

## Stack

- **Astro 6** — static output with Vercel adapter for the Spotify serverless endpoint
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **TypeScript** — strict, data files only
- **Vercel** — auto-deploys on push to `main`
- **Formspree** — contact form (no backend)

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
