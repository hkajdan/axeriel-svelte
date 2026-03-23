import { pageBySlugQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { error } from '@sveltejs/kit';
import { REVALIDATION_SECRET } from '$env/static/private';

export const config = {
  isr: {
    expiration: false,
    bypassToken: REVALIDATION_SECRET
  }
};

export const load: PageServerLoad = async ({ params, locals }) => {
  const page = await client.fetch(pageBySlugQuery, { slug: `/${params.slug}`, lang: locals.lang });

  if (!page) {
    error(404, 'Page not found');
  }

  return { page };
};