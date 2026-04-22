export const prerender = false;

import type { APIRoute } from 'astro';
import { getAccessToken } from '../../lib/spotify';

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

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

const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
};

export const GET: APIRoute = async () => {
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

    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, auth);
    const recent = await recentRes.json();
    const track = recent.items?.[0]?.track;

    if (track) {
      return new Response(JSON.stringify(trackPayload(track, false)), { headers });
    }

    return new Response(JSON.stringify({ title: null }), { headers });
  } catch {
    return new Response(JSON.stringify({ error: true }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
