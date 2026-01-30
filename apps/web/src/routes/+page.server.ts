import { homePageQuery } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { previewEnabled } = sanity
  const options = { stega: previewEnabled ? true : false }
  const page = await client.fetch(homePageQuery, {}, options)

  return { page }
}
