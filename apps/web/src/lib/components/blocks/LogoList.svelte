<script lang="ts">
  import type { LogoList } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  
  export let title: LogoList['title'];
  export let richText: LogoList['richText'];
  export let logos: LogoList['logos'];
  export let backgroundColor: LogoList['backgroundColor'];
  export let anchor: LogoList['anchor'];
  
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
      </div>
      
      {#if logos && logos.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {#each logos as logo}
            <div class="flex justify-center">
              {#if logo.image?.asset}
                <img 
                  src={urlForImage(logo.image).url()}
                  alt={logo.text || 'Logo'}
                  class="h-12 object-contain grayscale hover:grayscale-0 transition-all"
                />
              {:else if logo.text}
                <span class="text-lg font-semibold text-gray-600">{logo.text}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>