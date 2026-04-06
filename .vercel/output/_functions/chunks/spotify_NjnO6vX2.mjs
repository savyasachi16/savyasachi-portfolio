const prerender = false;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
async function getAccessToken() {
  const id = undefined                                 ;
  const secret = undefined                                     ;
  const refresh = undefined                                     ;
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh })
  });
  const data = await res.json();
  return data.access_token;
}
function trackPayload(track, isPlaying) {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images[1]?.url ?? track.album.images[0]?.url,
    songUrl: track.external_urls.spotify
  };
}
const GET = async () => {
  const headers = { "Content-Type": "application/json" };
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
    return new Response(JSON.stringify({ error: true }), { status: 500, headers });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
