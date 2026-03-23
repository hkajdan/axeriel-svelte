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
    width?: number
    height?: number
  }

  let {
    image,
    alt = '',
    imgClass = '',
    sizes = '(max-width: 768px) 100vw, 50vw',
    loading = 'lazy',
    fetchpriority = 'auto',
    width = undefined,
    height = undefined
  }: Props = $props();

  const srcSet = $derived(
    image?.asset?._ref
      ? [400, 800, 1200, 1600, 2000]
          .map(w => `${urlForImage(image).width(w).url()} ${w}w`)
          .join(', ')
      : ''
  );

  // Extract dimensions from Sanity asset ref (format: image-{id}-{width}x{height}-{ext})
  const intrinsicDimensions = $derived.by(() => {
    if (width && height) return { width, height };
    const ref = image?.asset?._ref;
    if (!ref) return null;
    const match = ref.match(/-(\d+)x(\d+)/);
    if (!match) return null;
    return { width: parseInt(match[1]), height: parseInt(match[2]) };
  });
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
    width={intrinsicDimensions?.width}
    height={intrinsicDimensions?.height}
  />
{/if}
