import { pageBySlugQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const page = await client.fetch(pageBySlugQuery, { slug: `/${params.slug}` });

  if (!page) {
    error(404, 'Page not found');
  }

  return { page };
};

export async function entries() {
  const pages = await client.fetch<{ current: string }[]>(
    `*[_type == "page" && defined(slug.current)].slug`
  );

  return pages.map((slug) => ({
    slug: slug.current.replace(/^\//, '')
  }));
}
