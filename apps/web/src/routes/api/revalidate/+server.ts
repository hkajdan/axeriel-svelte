import { REVALIDATION_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url }) => {
  const secret = request.headers.get('x-sanity-webhook-secret');

  if (secret !== REVALIDATION_SECRET) {
    return json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug, language } = body;

  // Build the list of paths to revalidate
  const paths: string[] = [];

  // Helper to add both FR and EN paths, or just the relevant one
  const addPath = (frPath: string) => {
    if (!language || language === 'fr') {
      paths.push(frPath);
    }
    if (!language || language === 'en') {
      paths.push(`/en${frPath === '/' ? '' : frPath}`);
    }
  };

  if (_type === 'homePage') {
    addPath('/');
  } else if (_type === 'page' && slug?.current) {
    const cleanSlug = slug.current.startsWith('/') ? slug.current.slice(1) : slug.current;
    addPath(`/${cleanSlug}`);
  } else if (_type === 'offer') {
    if (slug?.current) {
      addPath(`/offers/${slug.current}`);
    }
  } else if (_type === 'uiStrings') {
    // UI strings affect all pages — revalidate home at minimum
    addPath('/');
  }

  // Singletons (navbar, footer, settings) affect all pages
  if (['navbar', 'footer', 'settings'].includes(_type)) {
    addPath('/');
  }

  // Revalidate each path
  const origin = url.origin;
  const results = await Promise.allSettled(
    paths.map((path) =>
      fetch(`${origin}${path}`, {
        method: 'HEAD',
        headers: {
          'x-prerender-revalidate': REVALIDATION_SECRET
        }
      })
    )
  );

  const revalidated = results
    .map((r, i) => ({
      path: paths[i],
      status: r.status === 'fulfilled' ? r.value.status : 'failed'
    }));

  return json({ revalidated });
};
