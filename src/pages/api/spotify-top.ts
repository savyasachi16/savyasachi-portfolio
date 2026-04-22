export const prerender = false;

import type { APIRoute } from 'astro';
import { getAccessToken } from '../../lib/spotify';

const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5';

const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export const GET: APIRoute = async () => {
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
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
