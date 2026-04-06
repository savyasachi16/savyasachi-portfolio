export const prerender = false;

import type { APIRoute } from 'astro';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const id = import.meta.env.SPOTIFY_CLIENT_ID;
  const secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refresh = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  });

  const data = await res.json();
  return data.access_token as string;
}

function trackPayload(track: any, isPlaying: boolean) {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[1]?.url ?? track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  };
}

export const GET: APIRoute = async () => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const token = await getAccessToken();
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, auth);

    if (nowRes.status === 200) {
      const now = await nowRes.json();
      if (now?.item) {
        return new Response(JSON.stringify(trackPayload(now.item, now.is_playing)), { headers });
      }
    }

    // Nothing playing — fall back to most recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, auth);
    const recent = await recentRes.json();
    const track = recent.items?.[0]?.track;

    if (track) {
      return new Response(JSON.stringify(trackPayload(track, false)), { headers });
    }

    return new Response(JSON.stringify({ title: null }), { headers });
  } catch {
    return new Response(JSON.stringify({ error: true }), { status: 500, headers });
  }
};
