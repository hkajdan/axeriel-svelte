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
  
  // Debug: log the pageBuilder data when it changes
  $: {
    console.log('PageBuilder data update:', {
      hasData: !!pageBuilder,
      length: pageBuilder?.length,
      firstBlock: pageBuilder?.[0]
    });
  }
  
  // Get the component loader function for a block type
  function getComponentLoader(block: any) {
    if (!block) {
      console.error('Block is undefined or null');
      return null;
    }
    
    const blockType = (block as any).type || block._type;
    if (!blockType) {
      console.error('Block type is missing:', block);
      return null;
    }
    
    const componentLoader = componentMap[blockType];
    if (!componentLoader) {
      console.error(`Component not found for block type: ${blockType}. Available types:`, Object.keys(componentMap));
      return null;
    }
    
    return componentLoader;
  }
</script>
{#if pageBuilder && pageBuilder.length > 0}
  {#each pageBuilder as block, index}
    {#if getComponentLoader(block)}
      {#await getComponentLoader(block)()}
        <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Loading:</strong>
          <span class="block sm:inline">Loading {(block as any).type || block._type} component...</span>
        </div>
      {:then module}
        <svelte:component this={module.default} {...block} />
      {:catch error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error loading component:</strong>
          <span class="block sm:inline">Failed to load {(block as any).type || block._type}: {error.message}</span>
        </div>
      {/await}
    {:else}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">Component not found for block type: {(block as any).type || block._type}</span>
      </div>
    {/if}
  {/each}
{:else}
  <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Warning:</strong>
    <span class="block sm:inline">No page builder content available</span>
  </div>
  {/if}
