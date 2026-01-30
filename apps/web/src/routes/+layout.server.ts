import { navbarQuery, footerQuery, settingsQuery, pageAuthorBySlugQuery, homePageAuthorQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: LayoutServerLoad = async (event) => {
  const { locals: { sanity }, url, params } = event
  const { previewEnabled } = sanity
  const options = { stega: previewEnabled ? true : false }

  // Fetch all layout data in parallel
  const [navbar, footer, settings] = await Promise.all([
    client.fetch(navbarQuery, {}, options),
    client.fetch(footerQuery, {}, options),
    client.fetch(settingsQuery, {}, options)
  ])

  // Fetch page author based on current route
  let pageAuthor = null
  if (url.pathname === '/') {
    // Homepage - fetch homepage author
    pageAuthor = await client.fetch(homePageAuthorQuery, {}, options)
  } else if (params.slug) {
    // Page route - extract slug and fetch page author
    pageAuthor = await client.fetch(pageAuthorBySlugQuery, { slug: `/${params.slug}` }, options)
  }

  return {
    previewEnabled,
    navbar,
    footer,
    settings,
    pageAuthor
  }
}
