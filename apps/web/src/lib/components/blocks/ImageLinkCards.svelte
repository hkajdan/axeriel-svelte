<script lang="ts">
  import type { ImageLinkCards } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  
  export let eyebrow: ImageLinkCards['eyebrow'];
  export let title: ImageLinkCards['title'];
  export let richText: ImageLinkCards['richText'];
  export let buttons: ImageLinkCards['buttons'];
  export let cards: ImageLinkCards['cards'];
  export let backgroundColor: ImageLinkCards['backgroundColor'];
  export let anchor: ImageLinkCards['anchor'];
  
  // Background color classes
  const bgClasses = {
    '': 'bg-white',
    'white': 'bg-white',
    'light-blue': 'bg-blue-50',
    'blue': 'bg-blue-600 text-white',
    'grey': 'bg-gray-100',
    'light-grey': 'bg-gray-50'
  };
  
  const bgClass = bgClasses[backgroundColor || ''] || bgClasses[''];
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
            {#each richText as block}
              {#if block.children}
                <p class="text-lg text-gray-600">{block.children[0].text}</p>
              {/if}
            {/each}
          </div>
        {/if}
        
        {#if buttons && buttons.length > 0}
          <div class="flex flex-wrap justify-center gap-4">
            {#each buttons as button}
              <a 
                href={button.url?.external || (button.url?.internal as any)?.slug?.current || '#'}
                class={`px-6 py-3 rounded-lg font-medium transition-colors 
                  ${button.variant === 'secondary' ? 'bg-gray-100 hover:bg-gray-200' : 
                  button.variant === 'outline' ? 'border border-blue-600 hover:bg-blue-50' : 
                  button.variant === 'link' ? 'text-blue-600 hover:underline' : 
                  'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {button.text}
              </a>
            {/each}
          </div>
        {/if}
      </div>
      
      {#if cards && cards.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each cards as card}
            <a 
              href={card.url?.external || (card.url?.internal as any)?.slug?.current || '#'}
              class="block bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              {#if card.image?.asset}
                <div class="aspect-video bg-gray-100">
                  <img 
                    src={urlForImage(card.image).url()}
                    alt={card.title || 'Card image'}
                    class="w-full h-full object-cover"
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