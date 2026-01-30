<script lang="ts">
  import type { Cta } from '$lib/sanity/sanity.types';
  
  export let eyebrow: Cta['eyebrow'];
  export let title: Cta['title'];
  export let richText: Cta['richText'];
  export let buttons: Cta['buttons'];
  export let backgroundColor: Cta['backgroundColor'];
  export let anchor: Cta['anchor'];
  
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
    <div class="max-w-3xl mx-auto text-center space-y-8">
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
  </div>
</section>