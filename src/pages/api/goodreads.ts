export const prerender = false;

import type { APIRoute } from 'astro';
import { config } from '../../data/config';

interface Book {
  title: string;
  author: string;
  cover: string;
  rating: number;
  link: string;
}

function parseRSS(xml: string): Book[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  return items.map((item) => {
    const tag = (name: string) => {
      const m =
        item.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`)) ??
        item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`));
      return (m?.[1] ?? '').trim();
    };
    const cover = tag('book_image_url').replace(/_S[XY]\d+_/, '_SX98_');
    return {
      title: tag('title'),
      author: tag('author_name'),
      cover,
      rating: parseInt(tag('user_rating')) || 0,
      link: tag('link'),
    };
  });
}

async function fetchShelf(shelf: string, limit: number): Promise<Book[]> {
  try {
    const res = await fetch(
      `https://www.goodreads.com/review/list_rss/${config.goodreadsUserId}?shelf=${shelf}&sort=date_read&per_page=${limit}`,
    );
    const xml = await res.text();
    return parseRSS(xml).slice(0, limit);
  } catch {
    return [];
  }
}

export const GET: APIRoute = async () => {
  const [currentlyReading, recentlyRead] = await Promise.all([
    fetchShelf('currently-reading', 4),
    fetchShelf('read', 8),
  ]);

  return new Response(JSON.stringify({ currentlyReading, recentlyRead }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
