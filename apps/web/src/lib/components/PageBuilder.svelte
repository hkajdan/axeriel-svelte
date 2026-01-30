<script lang="ts">
  import type { PageBuilder } from '$lib/sanity/sanity.types';
  

  
  // Import all block components dynamically
  const componentMap: Record<string, any> = {
    hero: () => import('./blocks/Hero.svelte'),
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
  
  // Error handling for missing components
  function getComponent(blockType: string) {
    const component = componentMap[blockType];
    if (!component) {
      console.error(`Component not found for block type: ${blockType}`);
      return null;
    }
    return component;
  }
</script>

{#if pageBuilder && pageBuilder.length > 0}
  {#each pageBuilder as block, index}
    {#if getComponent(block._type)}
      <svelte:component this={getComponent(block._type)} {...block} />
    {:else}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">Component not found for block type: {block._type}</span>
      </div>
    {/if}
  {/each}
{:else}
  <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Warning:</strong>
    <span class="block sm:inline">No page builder content available</span>
  </div>
{/if}