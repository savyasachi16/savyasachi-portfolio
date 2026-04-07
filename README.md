# folio — portfolio template

> A personal portfolio template built with Astro, Tailwind CSS v4, and Vercel. Includes Spotify now-playing, Goodreads reading shelf, dark/light/system theme toggle, and a typewriter hero animation.

**Live demo:** https://savyasachi.dev

---

## Use this template

1. Fork or clone this repo
2. Fill in **`src/data/config.ts`** — your name, bio, social links, Goodreads user ID
3. Replace content in `src/data/` — `experience.ts`, `projects.ts`, `skills.ts`, `education.ts`
4. Drop your resume at `public/resume.pdf`
5. Deploy to Vercel (see below)

That's it for a basic setup. Spotify now-playing is optional — see **Integrations** below.

---

## Stack

<a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white" alt="Astro" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" /></a>
<a href="https://www.spotify.com"><img src="https://img.shields.io/badge/Spotify_API-1DB954?style=flat&logo=spotify&logoColor=white" alt="Spotify" /></a>
<a href="https://www.goodreads.com"><img src="https://img.shields.io/badge/Goodreads_RSS-F4F1EA?style=flat&logo=goodreads&logoColor=372213" alt="Goodreads" /></a>

---

## Local dev

```bash
npm install
npm run dev      # localhost:4321 — live reload, use this for everything
npm run build    # production build → dist/client/
```

> `npm run preview` is broken — the Vercel adapter writes output to `dist/client/` which astro preview doesn't handle. Just use `npm run dev`.

---

## Project structure

```
src/
  data/               — all content lives here, edit to update copy
    config.ts         — your personal info (name, bio, social links)
    experience.ts
    projects.ts
    skills.ts
    education.ts
  components/
    sections/         — one file per page section
    ui/               — ExperienceCard, ProjectCard, SkillGroup, SocialLink
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    api/spotify.ts    — serverless now-playing endpoint
  styles/
    global.css
public/
  resume.pdf
docs/
  spotify-setup.md
```

---

## Updating content

| What | File |
|------|------|
| Name, bio, social links | `src/data/config.ts` |
| Work experience | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Education | `src/data/education.ts` |
| Resume | Run `python scripts/redact_resume.py <your-pdf>` → writes to `public/resume.pdf` (see `docs/resume-redaction.md`) |
| Contact form | `src/components/sections/Contact.astro` — swap `FORM_ID` |

---

## Deploy to Vercel

1. Go to **vercel.com** and sign up with your GitHub account
2. Click **Add New Project** → import your forked repo
3. Leave all build settings as-is — Vercel auto-detects Astro
4. If using Spotify: add env vars before deploying (see Integrations below)
5. Click **Deploy** → you'll get a `*.vercel.app` URL

Every push to `main` auto-deploys from here on.

### Custom domain

1. Buy a domain (Namecheap, Squarespace Domains, etc.)
2. Vercel dashboard → Project → **Settings → Domains** → add your domain
3. Vercel will show you DNS records to add at your registrar (usually an A record + CNAME)
4. Once DNS propagates (~1–24h), your domain is live

---

## Integrations

**Goodreads** — build-time RSS fetch from your public shelf. No API key. Set `goodreadsUserId` in `config.ts`. Updates on every deploy.

**Spotify** — runtime now-playing via `/api/spotify` serverless function. Optional. See `docs/spotify-setup.md` for the full setup guide.

---
