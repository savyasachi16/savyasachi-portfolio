export const prerender = false;

import type { APIRoute } from 'astro';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10';

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

export const GET: APIRoute = async () => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const token = await getAccessToken();
    const res = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const tracks = (data.items ?? []).map((track: any) => ({
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[1]?.url ?? track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
    }));

    return new Response(JSON.stringify(tracks), { headers });
  } catch {
    return new Response(JSON.stringify([]), { status: 500, headers });
  }
};
