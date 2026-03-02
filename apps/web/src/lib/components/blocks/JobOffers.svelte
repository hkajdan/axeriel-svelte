<script lang="ts">
  import type { JobOffers } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  
  export let eyebrow: JobOffers['eyebrow'];
  export let title: JobOffers['title'];
  export let richText: JobOffers['richText'];
  export let backgroundColor: JobOffers['backgroundColor'];
  export let anchor: JobOffers['anchor'];
  
  const bgClass = getSectionClasses(backgroundColor || '');
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if eyebrow}
          <p class="text-sm font-medium text-blue-600 uppercase tracking-wider">{eyebrow}</p>
        {/if}
        
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if richText}
          <div class="prose prose-lg max-w-none mx-auto">
            <RichText value={richText} textClass="text-lg text-gray-600" />
          </div>
        {/if}
      </div>
      
      <div class="text-center">
        <p class="text-gray-500">Job offers content would be displayed here</p>
        <!-- In a real implementation, this would fetch and display job offers -->
      </div>
    </div>
  </div>
</section>