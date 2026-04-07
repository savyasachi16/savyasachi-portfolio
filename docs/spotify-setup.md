# Spotify Integration Setup

One-time setup to get the now-playing card working on the live site.

## What you need
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

---

## Step 1 — Create a Spotify app

1. Go to https://developer.spotify.com/dashboard
2. Click **Create app**
3. Set **Redirect URI** to `http://localhost:3000`
4. Copy your **Client ID** and **Client Secret**

---

## Step 2 — Get a refresh token

Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played
```

After authorizing, you'll be redirected to `http://localhost:3000?code=XXXX`. Copy the `code` value, then run:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d "grant_type=authorization_code&code=XXXX&redirect_uri=http://localhost:3000"
```

Save the `refresh_token` from the response.

---

## Step 3 — Add env vars to Vercel

1. Go to **vercel.com** → your project → **Settings → Environment Variables**
2. Add all three vars, setting scope to **Production + Preview + Development**:

| Key | Value |
|-----|-------|
| `SPOTIFY_CLIENT_ID` | from Step 1 |
| `SPOTIFY_CLIENT_SECRET` | from Step 1 |
| `SPOTIFY_REFRESH_TOKEN` | from Step 2 |

3. Go to **Deployments** → click the three dots on the latest deploy → **Redeploy**

The card will show a pulsing green dot when something is actively playing, or the last played track otherwise.

---

## Local dev

Add the same vars to a `.env` file at the project root (already gitignored):

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

Then `npm run dev` — the `/api/spotify` endpoint will work locally too.
