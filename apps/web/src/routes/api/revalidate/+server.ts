import { REVALIDATION_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url }) => {
  const secret = request.headers.get('x-sanity-webhook-secret');

  if (secret !== REVALIDATION_SECRET) {
    return json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug } = body;

  // Build the list of paths to revalidate
  const paths: string[] = [];

  if (_type === 'homePage') {
    paths.push('/');
  } else if (_type === 'page' && slug?.current) {
    const cleanSlug = slug.current.startsWith('/') ? slug.current.slice(1) : slug.current;
    paths.push(`/${cleanSlug}`);
  } else if (_type === 'offer') {
    if (slug?.current) {
      paths.push(`/career/${slug.current}`);
    }
    // Also revalidate the career page which lists job offers
    paths.push('/career');
  }

  // Also revalidate the homepage when navbar/footer/settings change
  if (['navbar', 'footer', 'settings'].includes(_type)) {
    paths.push('/');
  }

  // Revalidate each path by sending a GET request with the bypass token
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
