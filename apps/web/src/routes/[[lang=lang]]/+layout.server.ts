import { navbarQuery, footerQuery, settingsQuery, pageAuthorBySlugQuery, homePageAuthorQuery, uiStringsQuery, enableEnglishQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ url, params, locals }) => {
  const lang = locals.lang

  // Always fetch enableEnglish from the FR settings document (sequential to short-circuit EN redirects before fetching everything else)
  const enableEnglish = lang === 'en'
    ? await client.fetch(enableEnglishQuery, {})
    : null // Will be fetched as part of settingsQuery for FR

  // Redirect EN routes to FR equivalent when English is disabled
  if (lang === 'en' && !enableEnglish) {
    const frPath = url.pathname.replace(/^\/en\/?/, '/') || '/'
    redirect(302, frPath + url.search)
  }

  // Determine which author query to run (home page has no slug param)
  const isHome = !params.slug
  const authorQuery = isHome
    ? client.fetch(homePageAuthorQuery, { lang })
    : params.slug
      ? client.fetch(pageAuthorBySlugQuery, { slug: `/${params.slug}`, lang })
      : Promise.resolve(null)

  // Fetch all layout data in parallel (including page author and uiStrings)
  const [navbar, footer, settings, pageAuthor, uiStrings] = await Promise.all([
    client.fetch(navbarQuery, { lang }),
    client.fetch(footerQuery, { lang }),
    client.fetch(settingsQuery, { lang }),
    authorQuery,
    client.fetch(uiStringsQuery, { lang })
  ])

  return {
    navbar,
    footer,
    settings,
    pageAuthor,
    uiStrings,
    lang,
    // For EN pages, enableEnglish is true (we passed the redirect check above).
    // For FR pages, it comes from settings.enableEnglish via settingsQuery.
    // Expose it explicitly so components can always read it from $page.data.enableEnglish.
    enableEnglish: enableEnglish ?? settings?.enableEnglish ?? false
  }
}
