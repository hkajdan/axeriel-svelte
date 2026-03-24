import { client } from '$lib/sanity/client';
import { PUBLIC_SITE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

const siteUrl = PUBLIC_SITE_URL.replace(/\/$/, '');

const sitemapQuery = `{
  "pages": *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    language,
    _updatedAt
  },
  "homePages": *[_type == "homePage"]{
    language,
    _updatedAt
  },
  "offers": *[_type == "offer" && defined(slug.current)]{
    "slug": slug.current,
    language,
    _updatedAt
  },
  "enableEnglish": *[_type == "settings" && language == "fr"][0].enableEnglish
}`;

function buildUrl(path: string, lang: string): string {
  if (lang === 'en') {
    return path === '/' ? `${siteUrl}/en` : `${siteUrl}/en${path}`;
  }
  return `${siteUrl}${path}`;
}

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  alternates: Array<{ lang: string; href: string }>;
}

export const GET: RequestHandler = async () => {
  const data = await client.fetch(sitemapQuery);
  const enableEnglish = data.enableEnglish ?? false;

  // Group by content path to avoid duplicates per language
  const urlMap = new Map<string, SitemapUrl>();

  const addEntry = (path: string, lang: string, updatedAt?: string) => {
    // Skip EN entries entirely when English is disabled
    if (lang === 'en' && !enableEnglish) return;

    const existing = urlMap.get(path);

    const alternates = enableEnglish
      ? [
          { lang: 'fr', href: buildUrl(path, 'fr') },
          { lang: 'en', href: buildUrl(path, 'en') },
          { lang: 'x-default', href: buildUrl(path, 'fr') },
        ]
      : [
          { lang: 'x-default', href: buildUrl(path, 'fr') },
        ];

    if (!existing) {
      urlMap.set(path, {
        loc: buildUrl(path, lang),
        lastmod: updatedAt,
        alternates,
      });
    }
  };

  // Home pages
  for (const home of data.homePages) {
    addEntry('/', home.language, home._updatedAt);
  }

  // Pages
  for (const page of data.pages) {
    const path = page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
    addEntry(path, page.language, page._updatedAt);
  }

  // Offers
  for (const offer of data.offers) {
    addEntry(`/offers/${offer.slug}`, offer.language, offer._updatedAt);
  }

  const urls = Array.from(urlMap.values());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod.split('T')[0]}</lastmod>` : ''}${u.alternates
      .map(
        (alt) =>
          `\n    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`
      )
      .join('')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
