# savyasachi.dev — Portfolio Website

Owner: Savyasachi "Savy" Jagadeeshan (jsavyasachi@gmail.com)
Live: https://savyasachi.dev
Repo: github.com/savyasachi16/savyasachi-portfolio

## Stack
- Astro 6.x — `output: 'static'` in astro.config.mjs
- Tailwind CSS v4 — via `@tailwindcss/vite` (NOT `@astrojs/tailwind` — that's v3 only)
- TypeScript strict — data files only, not in .astro frontmatter
- Formspree — contact form, no backend (form ID lives in src/components/sections/Contact.astro)
- Vercel — free tier, auto-deploys on push to main

## Project Structure
```
src/data/                   — all content as typed TS arrays/objects (edit here to update content)
src/components/sections/    — one file per page section
src/components/ui/          — reusable presentational components
src/layouts/BaseLayout.astro — root HTML shell, head, fonts, global.css
src/pages/index.astro       — single page, imports all sections
public/resume.pdf           — static asset, linked from Hero CTA
```

## Common Tasks

### Add a project
Edit `src/data/projects.ts` — add an object to the `projects` array. Card grid is fully data-driven.

### Update work experience
Edit `src/data/experience.ts`. PayPal has two roles under one company entry via `roles[]` array.

### Update skills
Edit `src/data/skills.ts` — add to an existing category or add a new `SkillCategory` object.

### Replace resume
Drop new PDF at `public/resume.pdf`. Filename must stay the same — Hero links to `/resume.pdf`.

### Update contact form
Formspree form ID is in `src/components/sections/Contact.astro`.
Log in at formspree.io with jsavyasachi@gmail.com to manage submissions.

## Dev Commands
```bash
npm run dev      # localhost:4321
npm run build    # production build → dist/
npm run preview  # preview built output locally
```

## Deploy
Push to `main` → Vercel auto-deploys via GitHub integration.
Build command: `npm run build` | Output: `dist/` | Node: 20.x

## Design System
- Background: `#0f0f0f`, surface: `#1a1a1a`, accent: `#6366f1` (indigo)
- All colors defined as CSS custom properties in `src/styles/global.css`
- Font: Inter (loaded from Google Fonts in BaseLayout.astro)
- Accent used only on: links, CTA buttons, timeline dots, skill pill borders

## Owner Info (for content updates)
- Email: jsavyasachi@gmail.com
- LinkedIn: linkedin.com/in/jsavyasachi/
- GitHub: github.com/savyasachi16
- Resume: public/resume.pdf (update by replacing file)
