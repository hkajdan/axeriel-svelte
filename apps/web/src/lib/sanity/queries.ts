import { defineQuery } from '@sanity/sveltekit'

export const pageQuery = defineQuery(`*[_type == "page"][0]{title}`)
