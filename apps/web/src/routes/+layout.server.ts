import { navbarQuery, footerQuery, settingsQuery } from '$lib/sanity/queries'
import type { LayoutServerLoad } from './$types'
import { client } from '$lib/sanity/client'

export const load: LayoutServerLoad = async ({ locals: { sanity } }) => {
  const { previewEnabled } = sanity
  const options = { stega: previewEnabled ? true : false }
  
  // Fetch all layout data in parallel
  const [navbar, footer, settings] = await Promise.all([
    client.fetch(navbarQuery, {}, options),
    client.fetch(footerQuery, {}, options),
    client.fetch(settingsQuery, {}, options)
  ])

  return { 
    previewEnabled,
    navbar,
    footer,
    settings
  }
}
