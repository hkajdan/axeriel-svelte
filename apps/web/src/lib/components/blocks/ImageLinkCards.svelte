<script lang="ts">
  import type { ImageLinkCards } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  
  export let eyebrow: ImageLinkCards['eyebrow'];
  export let title: ImageLinkCards['title'];
  export let richText: ImageLinkCards['richText'];
  export let buttons: ImageLinkCards['buttons'];
  export let cards: ImageLinkCards['cards'];
  export let backgroundColor: ImageLinkCards['backgroundColor'];
  export let anchor: ImageLinkCards['anchor'];
  
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
        
        {#if buttons && buttons.length > 0}
          <div class="flex flex-wrap justify-center gap-4">
            <SanityButtons buttons={buttons} justify="center" />
          </div>
        {/if}
      </div>
      
       {#if cards && cards.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each cards as card}
            <a 
              href={resolveSanityUrl(card.url)}
              target={getLinkTarget(card.url)}
              rel={getLinkRel(card.url)}
              class="block bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
               {#if card.image?.asset}
                 <div class="aspect-video bg-gray-100">
                   <SanityImage 
                     image={card.image}
                     alt={card.title || 'Card image'}
                     imgClass="w-full h-full object-cover"
                   />
                 </div>
               {/if}
              
              <div class="p-6">
                {#if card.title}
                  <h3 class="text-xl font-semibold mb-2">{card.title}</h3>
                {/if}
                
                {#if card.description}
                  <p class="text-gray-600">{card.description}</p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>