import { homePageQuery } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: PageServerLoad = async () => {
  const page = await client.fetch(homePageQuery)

  return { page }
}
