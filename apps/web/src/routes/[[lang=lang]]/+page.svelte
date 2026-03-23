<script lang="ts">
  import type {PageProps} from './$types'
  import { PageBuilder } from '$lib/components'
  import { urlForImage } from '$lib/sanity/image'
  import Seo from '$lib/components/Seo.svelte'
  import { page as pageStore } from '$app/stores'

  const {data}: PageProps = $props()
  const siteName = $derived($pageStore.data.settings?.siteTitle)

  const heroBlock = $derived(data.page?.pageBuilder?.find((b: any) => (b._type || b.type) === 'hero') as any)
  const heroImageUrl = $derived(heroBlock?.image?.asset?._ref ? urlForImage(heroBlock.image).width(1600).url() : null)
  const heroVideoId = $derived((heroBlock?.video?.asset as any)?.playbackId ?? null)
</script>

<Seo
  title={data.page?.seoTitle || data.page?.title}
  {siteName}
  description={data.page?.seoDescription}
  ogTitle={data.page?.ogTitle}
  ogDescription={data.page?.ogDescription}
  ogImage={data.page?.seoImage}
/>

<svelte:head>
  {#if heroImageUrl}
    <link rel="preload" as="image" href={heroImageUrl} />
  {/if}
  {#if heroVideoId}
    <link rel="preload" as="image" href="https://image.mux.com/{heroVideoId}/thumbnail.webp?width=1920" />
  {/if}
</svelte:head>

{#if data.page?.pageBuilder?.length}
  <PageBuilder pageBuilder={data.page.pageBuilder as any} />
{/if}
