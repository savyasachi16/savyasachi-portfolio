# savyasachi.dev — Portfolio Website

Owner: Savyasachi Jagadeeshan (jsavyasachi@gmail.com)
Live: https://savyasachi.dev
Repo: github.com/savyasachi16/folio

## Stack

- Astro 6 — `output: 'static'` + `@astrojs/vercel` adapter (needed for /api/spotify)
- Tailwind CSS v4 — via `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- TypeScript strict — data files only, not in .astro frontmatter
- Formspree — contact form (`FORM_ID` placeholder in Contact.astro, not yet configured)
- Vercel — auto-deploys on push to main

## Design system

- **Fonts**: Syne (headings, `font-family: 'Syne', sans-serif`) + Inter (body)
- **Palette**: pastel blue — NOT indigo/purple. Colors as CSS custom properties only.
- **Dark mode** (default): bg `#0c0f14`, surface `#131820`, accent `#7eb8f7`, border `#1e2a3a`
- **Light mode**: bg `#f0f5fc`, surface `#ffffff`, accent `#3b82c4`, border `#d0ddf0`
- **Theme toggle**: defaults to `prefers-color-scheme`, persists to localStorage
- **Max width**: `max-w-6xl` on all sections
- **No `@apply`** — utility classes directly in templates
- **No purple/indigo** anywhere — if you see `indigo-*` Tailwind classes, replace with `var(--color-accent)`

## Project structure

```
src/data/               — all content as typed TS (source of truth for copy)
src/components/sections/ — one file per page section
src/components/ui/       — ExperienceCard, ProjectCard, SkillGroup, SocialLink
src/layouts/BaseLayout.astro
src/pages/index.astro   — imports all sections in order
src/pages/api/spotify.ts — serverless, prerender=false
src/styles/global.css   — @import tailwindcss + :root vars + dot grid + orb keyframe
public/resume.pdf        — linked from Hero (not yet added — user will drop it in)
docs/spotify-setup.md   — Spotify OAuth setup instructions
```

## Sections (in page order)

1. **Hero** — name, role pills (Technical Lead / Senior SWE / Backend Engineering), bio, CTAs
2. **Experience** — collapsible per role using `<details>`/`<summary>`, collapsed by default
3. **Projects** — 3-col grid, data-driven from projects.ts
4. **Skills** — pill badges, grouped by category
5. **Education** — timeline style, same as Experience
6. **Beyond the IDE** — Spotify now-playing card + Goodreads currently-reading + recently-read grid
7. **Contact** — Formspree form + social links

## Common tasks

### Update work experience
Edit `src/data/experience.ts`. PayPal has two roles under one company via `roles[]`.

### Add a project
Edit `src/data/projects.ts`. Card grid is data-driven.

### Update skills
Edit `src/data/skills.ts`.

### Replace resume
Drop new PDF at `public/resume.pdf` (keep filename).

### Set up contact form
Replace `FORM_ID` in `src/components/sections/Contact.astro` with real Formspree ID.
Log in at formspree.io with jsavyasachi@gmail.com.

### Set up Spotify
See `docs/spotify-setup.md`. Three env vars needed in Vercel project settings.

## Integrations

**Goodreads** (build-time): `Beyond.astro` fetches RSS for user ID `62623007` at build time.
No API key. Updates on every deploy.

**Spotify** (runtime): `/api/spotify` exchanges refresh token for access token, checks
`/me/player/currently-playing`, falls back to `/me/player/recently-played`.
Env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.

## Critical rules

- **Never fabricate content** — experience, projects, skills must come from the resume
  (`/Users/savya/Downloads/Resume_Savyasachi_Jagadeeshan.pdf`) or explicit user input.
  Do not invent job titles, accomplishments, tech stacks, or project names.
- **Never use indigo/purple** — accent is pastel blue (`#7eb8f7` dark / `#3b82c4` light).
- **No emojis** unless explicitly asked.
- The nav title is **"Savyasachi Jagadeeshan"** — not "Savy" or any other shorthand.

## Dev commands

```bash
npm run dev      # localhost:4321 — use this for all local work, has live reload
npm run build    # production build → dist/client/ (Vercel adapter splits output here)
npm run preview  # BROKEN — astro preview doesn't handle Vercel adapter output
```

### Local preview workflow

**Always use `npm run dev`** for local work. It has HMR and is ready immediately.

Never use `npm run preview` — the Vercel adapter writes output to `dist/client/` instead
of `dist/`, which breaks `astro preview`. If you need to verify a production build,
use `npx serve dist/client -p 4322`, but there is almost never a reason to do this.
