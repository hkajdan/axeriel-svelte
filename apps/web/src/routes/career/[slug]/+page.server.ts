import { offerBySlugQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const offer = await client.fetch(offerBySlugQuery, { slug: params.slug });

  if (!offer) {
    error(404, 'Offer not found');
  }

  return { offer };
};

export async function entries() {
  const offers = await client.fetch<{ current: string }[]>(
    `*[_type == "offer" && defined(slug.current)].slug`
  );

  return offers.map((slug) => ({
    slug: slug.current
  }));
}
