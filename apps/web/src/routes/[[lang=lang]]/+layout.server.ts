import { navbarQuery, footerQuery, settingsQuery, pageAuthorBySlugQuery, homePageAuthorQuery, uiStringsQuery, enableEnglishQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: LayoutServerLoad = async ({ url, params, locals }) => {
  const lang = locals.lang

  // Determine which author query to run (home page has no slug param)
  const isHome = !params.slug
  const authorQuery = isHome
    ? client.fetch(homePageAuthorQuery, { lang })
    : params.slug
      ? client.fetch(pageAuthorBySlugQuery, { slug: `/${params.slug}`, lang })
      : Promise.resolve(null)

  // Fetch all layout data in parallel
  const [navbar, footer, settings, pageAuthor, uiStrings, enableEnglish] = await Promise.all([
    client.fetch(navbarQuery, { lang }),
    client.fetch(footerQuery, { lang }),
    client.fetch(settingsQuery, { lang }),
    authorQuery,
    client.fetch(uiStringsQuery, { lang }),
    // Always fetch enableEnglish from the FR settings document
    lang === 'en' ? client.fetch(enableEnglishQuery, {}) : Promise.resolve(null)
  ])

  return {
    navbar,
    footer,
    settings,
    pageAuthor,
    uiStrings,
    lang,
    enableEnglish: enableEnglish ?? settings?.enableEnglish ?? false
  }
}
