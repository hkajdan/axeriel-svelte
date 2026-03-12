<script lang="ts">
  import type { PageBuilder } from '$lib/sanity/sanity.types';
  import { reveal } from '$lib/actions/reveal';
  import Hero from './blocks/Hero.svelte';

  const componentMap: Record<string, any> = {
    hero: null, // loaded eagerly above
    cta: () => import('./blocks/CTA.svelte'),
    featureCardsIcon: () => import('./blocks/FeatureCardsIcon.svelte'),
    productList: () => import('./blocks/ProductList.svelte'),
    imageLinkCards: () => import('./blocks/ImageLinkCards.svelte'),
    subscribeNewsletter: () => import('./blocks/SubscribeNewsletter.svelte'),
    statList: () => import('./blocks/StatList.svelte'),
    logoList: () => import('./blocks/LogoList.svelte'),
    timeline: () => import('./blocks/Timeline.svelte'),
    textImage: () => import('./blocks/TextImage.svelte'),
    carousel: () => import('./blocks/Carousel.svelte'),
    jobOffers: () => import('./blocks/JobOffers.svelte'),
    videoSection: () => import('./blocks/VideoSection.svelte'),
    histogram: () => import('./blocks/Histogram.svelte')
  };

  export let pageBuilder: PageBuilder;

  function getBlockType(block: any) {
    return block?._type || block?.type;
  }

  function getComponentLoader(block: any) {
    const blockType = getBlockType(block);
    return blockType ? componentMap[blockType] ?? null : null;
  }
</script>
<main class="flex flex-col gap-10 md:gap-16 max-w-8xl mx-auto relative">
  {#if pageBuilder && pageBuilder.length > 0}
    {#each pageBuilder as block}
      {#if getBlockType(block) === 'hero'}
        <!-- Hero is eagerly loaded and never revealed (it's above the fold) -->
        <Hero {...block} />
      {:else if getComponentLoader(block)}
        <div use:reveal>
          {#await getComponentLoader(block)()}
            <!-- loading -->
          {:then module}
            <svelte:component this={module.default} {...block} />
          {:catch error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Error loading component:</strong>
              <span class="block sm:inline">Failed to load {(block as any).type || block._type}: {error.message}</span>
            </div>
          {/await}
        </div>
      {/if}
    {/each}
  {/if}
</main>
