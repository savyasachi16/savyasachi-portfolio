const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

let cached: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.token;
  }

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
  const token = data.access_token as string;
  const ttl = (data.expires_in as number | undefined) ?? 3600;
  cached = { token, expiresAt: Date.now() + ttl * 1000 };
  return token;
}
