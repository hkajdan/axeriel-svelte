<script lang="ts">
  import type { FeatureCardsIcon } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import RichText from '$lib/components/RichText.svelte';
  
  export let eyebrow: FeatureCardsIcon['eyebrow'];
  export let title: FeatureCardsIcon['title'];
  export let richText: FeatureCardsIcon['richText'];
  export let cards: FeatureCardsIcon['cards'];
  export let backgroundColor: FeatureCardsIcon['backgroundColor'];
  export let anchor: FeatureCardsIcon['anchor'];
  
  const sectionClasses = getSectionClasses(backgroundColor || 'white');
  const textColor = getTextColorClass(backgroundColor || 'white');
</script>

<section class={sectionClasses} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
         {#if eyebrow}
           <p class="text-sm font-medium text-primary-500 uppercase tracking-wider">{eyebrow}</p>
         {/if}
          
         {#if title}
           <h2 class={`text-3xl lg:text-4xl font-bold tracking-tight ${textColor}`}>{title}</h2>
         {/if}
        
         {#if richText}
           <RichText value={richText} textClass={textColor} />
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
                 <RichText value={card.richText} textClass="text-gray-600" />
               {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
