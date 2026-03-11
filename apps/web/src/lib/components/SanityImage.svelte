<script lang="ts">
  import { urlForImage } from '$lib/sanity/image'
  import type { SanityImageAssetReference } from '$lib/sanity/sanity.types'
  
  export let image: {
    asset?: SanityImageAssetReference
    media?: unknown
    hotspot?: any
    crop?: any
    _type: string
  }
  export let alt: string = ''
  export let imgClass: string = ''
  export let sizes: string = '(max-width: 768px) 100vw, 50vw'
  export let loading: 'lazy' | 'eager' = 'lazy'
  export let fetchpriority: 'high' | 'low' | 'auto' = 'auto'

  function getSrcSet() {
    if (!image?.asset?._ref) return ''
    return [400, 800, 1200, 1600, 2000]
      .map(w => `${urlForImage(image).width(w).url()} ${w}w`)
      .join(', ')
  }
</script>

{#if image?.asset?._ref}
  <img
    src={urlForImage(image).url()}
    srcset={getSrcSet()}
    alt={alt}
    class={imgClass}
    sizes={sizes}
    {loading}
    {fetchpriority}
  />
{/if}