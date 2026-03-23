import { homePageQuery } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'
import { client } from '$lib/sanity/client'
import { error } from '@sveltejs/kit'
import { REVALIDATION_SECRET } from '$env/static/private'

export const config = {
  isr: {
    expiration: false,
    bypassToken: REVALIDATION_SECRET
  }
}

export const load: PageServerLoad = async () => {
  const page = await client.fetch(homePageQuery)

  if (!page) {
    error(404, 'Home page not found')
  }

  return { page }
}
