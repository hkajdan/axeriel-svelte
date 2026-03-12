import { navbarQuery, footerQuery, settingsQuery, pageAuthorBySlugQuery, homePageAuthorQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: LayoutServerLoad = async (event) => {
  const { locals: { sanity }, url, params } = event
  const { previewEnabled } = sanity
  const options = { stega: previewEnabled ? true : false }

  // Determine which author query to run
  const authorQuery = url.pathname === '/'
    ? client.fetch(homePageAuthorQuery, {}, options)
    : params.slug
      ? client.fetch(pageAuthorBySlugQuery, { slug: `/${params.slug}` }, options)
      : Promise.resolve(null)

  // Fetch all layout data in parallel (including page author)
  const [navbar, footer, settings, pageAuthor] = await Promise.all([
    client.fetch(navbarQuery, {}, options),
    client.fetch(footerQuery, {}, options),
    client.fetch(settingsQuery, {}, options),
    authorQuery
  ])

  return {
    previewEnabled,
    navbar,
    footer,
    settings,
    pageAuthor
  }
}
