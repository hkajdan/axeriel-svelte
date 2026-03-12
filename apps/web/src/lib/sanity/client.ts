import { createClient } from '@sanity/sveltekit'
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID
} from '$env/static/public'

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: '2024-10-28',
  useCdn: true,
  stega: {
    enabled: false
  }
})
