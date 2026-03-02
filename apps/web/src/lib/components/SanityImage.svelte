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
  
  /**
   * Generate responsive image srcset
   */
  function getSrcSet() {
    if (!image?.asset?._ref) return ''
    
    const widths = [400, 800, 1200, 1600, 2000]
    return widths
      .map(width => `${urlForImage(image).width(width).url()} ${width}w`)
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
    loading="lazy"
  />
{/if}