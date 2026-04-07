# folio — portfolio template

> A personal portfolio template built with Astro, Tailwind CSS v4, and Vercel. Includes Spotify now-playing, Goodreads reading shelf, dark/light/system theme toggle, and a typewriter hero animation.

**Live demo:** https://folio-rouge-chi.vercel.app

---

## Use this template

1. Fork or clone this repo
2. Fill in **`src/data/config.ts`** — your name, bio, social links, Goodreads user ID
3. Replace content in `src/data/` — `experience.ts`, `projects.ts`, `skills.ts`, `education.ts`
4. Drop your resume at `public/resume.pdf`
5. Push to GitHub → connect to Vercel → auto-deploys on every push

That's it for a basic setup. Spotify now-playing is optional — see **Integrations** below.

---

Personal portfolio for Savyasachi Jagadeeshan (Savy) — Technical Lead & Senior Software Engineer.

**Live:** https://folio-rouge-chi.vercel.app

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
| Work experience | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Education | `src/data/education.ts` |
| Resume | Replace `public/resume.pdf` |
| Contact form | `src/components/sections/Contact.astro` — swap `FORM_ID` |

---

## Integrations

**Goodreads** — build-time RSS fetch, no API key. Updates on every deploy.

**Spotify** — runtime `/api/spotify` serverless function. Needs three env vars in Vercel project settings:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

See `docs/spotify-setup.md` for setup.

---

## Deploy

Push to `main` → Vercel auto-deploys. No config needed.
