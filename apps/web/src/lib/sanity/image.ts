import { createImageUrlBuilder } from '@sanity/image-url'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public'

const builder = createImageUrlBuilder({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET
})

export function urlForImage(source: any) {
  return builder.image(source)
}