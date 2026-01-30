<script lang="ts">
  import type { FeatureCardsIcon } from '$lib/sanity/sanity.types';
  
  export let eyebrow: FeatureCardsIcon['eyebrow'];
  export let title: FeatureCardsIcon['title'];
  export let richText: FeatureCardsIcon['richText'];
  export let cards: FeatureCardsIcon['cards'];
  export let backgroundColor: FeatureCardsIcon['backgroundColor'];
  export let anchor: FeatureCardsIcon['anchor'];
  
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
              {#if block._type === 'block' && block.children}
                <p class="text-lg text-gray-600">{block.children[0].text}</p>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
      
      {#if cards && cards.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each cards as card}
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {#if card.icon?.name}
                <div class="mb-4">
                  <span class="text-3xl">{card.icon.name}</span>
                </div>
              {/if}
              
              {#if card.title}
                <h3 class="text-xl font-semibold mb-3">{card.title}</h3>
              {/if}
              
              {#if card.richText}
                <div class="prose prose-sm max-w-none">
                  {#each card.richText as block}
                    {#if block.children}
                      <p class="text-gray-600">{block.children[0].text}</p>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
