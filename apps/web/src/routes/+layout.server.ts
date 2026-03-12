import { navbarQuery, footerQuery, settingsQuery, pageAuthorBySlugQuery, homePageAuthorQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const prerender = true

export const load: LayoutServerLoad = async ({ url, params }) => {
  // Determine which author query to run
  const authorQuery = url.pathname === '/'
    ? client.fetch(homePageAuthorQuery)
    : params.slug
      ? client.fetch(pageAuthorBySlugQuery, { slug: `/${params.slug}` })
      : Promise.resolve(null)

  // Fetch all layout data in parallel (including page author)
  const [navbar, footer, settings, pageAuthor] = await Promise.all([
    client.fetch(navbarQuery),
    client.fetch(footerQuery),
    client.fetch(settingsQuery),
    authorQuery
  ])

  return {
    navbar,
    footer,
    settings,
    pageAuthor
  }
}
