<script lang="ts">
  import type {PageProps} from './$types'
  import { PageBuilder } from '$lib/components'
  import { urlForImage } from '$lib/sanity/image'

  const {data}: PageProps = $props()

  const heroBlock = $derived(data.page?.pageBuilder?.find((b: any) => (b._type || b.type) === 'hero') as any)
  const heroImageUrl = $derived(heroBlock?.image?.asset?._ref ? urlForImage(heroBlock.image).width(1600).url() : null)
  const heroVideoId = $derived((heroBlock?.video?.asset as any)?.playbackId ?? null)
</script>

<svelte:head>
  {#if heroImageUrl}
    <link rel="preload" as="image" href={heroImageUrl} />
  {/if}
  {#if heroVideoId}
    <link rel="preload" as="image" href="https://image.mux.com/{heroVideoId}/thumbnail.jpg" />
  {/if}
</svelte:head>

{#if data.page?.pageBuilder?.length}
  <PageBuilder pageBuilder={data.page.pageBuilder as any} />
{/if}
