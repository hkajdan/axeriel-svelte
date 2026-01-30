import { pageBySlugQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { sanity } }) => {
  const { client, previewEnabled } = sanity;
  const options = { stega: previewEnabled ? true : false };

  try {
    // Try to fetch from Sanity first
    // Add leading slash to match Sanity slug format
    const page = await client.fetch(pageBySlugQuery, { slug: `/${params.slug}` }, options);

    if (page) {
      return {
        page
      };
    }

    // Page not found
    return {
      status: 404,
      error: new Error('Page not found')
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    return {
      status: 500,
      error: new Error('Failed to load page')
    };
  }
};
