import { offerBySlugQuery, jobOffersParentPageQuery } from '$lib/sanity/queries';
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
  const [offer, parentPage] = await Promise.all([
    client.fetch(offerBySlugQuery, { slug: params.slug, lang: locals.lang }),
    client.fetch(jobOffersParentPageQuery, { lang: locals.lang }),
  ]);

  if (!offer) {
    error(404, 'Offer not found');
  }

  return { offer, parentPageSlug: parentPage?.slug?.current ?? null };
};