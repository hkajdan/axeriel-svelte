<script lang="ts">
  import { urlForImage } from '$lib/sanity/image'
  import type { SanityImageAssetReference } from '$lib/sanity/sanity.types'

  interface Props {
    image: {
      asset?: SanityImageAssetReference
      media?: unknown
      hotspot?: { x: number; y: number; height: number; width: number }
      crop?: { top: number; bottom: number; left: number; right: number }
      _type: string
    }
    alt?: string
    imgClass?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
  }

  let {
    image,
    alt = '',
    imgClass = '',
    sizes = '(max-width: 768px) 100vw, 50vw',
    loading = 'lazy',
    fetchpriority = 'auto'
  }: Props = $props();

  const srcSet = $derived(
    image?.asset?._ref
      ? [400, 800, 1200, 1600, 2000]
          .map(w => `${urlForImage(image).width(w).url()} ${w}w`)
          .join(', ')
      : ''
  );
</script>

{#if image?.asset?._ref}
  <img
    src={urlForImage(image).width(1200).url()}
    srcset={srcSet}
    alt={alt}
    class={imgClass}
    {sizes}
    {loading}
    {fetchpriority}
  />
{/if}
