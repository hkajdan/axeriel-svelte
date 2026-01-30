import { pageQuery } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { client, previewEnabled } = sanity
  const options = { stega: previewEnabled ? true : false }
  const page = await client.fetch(pageQuery, {}, options)

  return { page }
}
