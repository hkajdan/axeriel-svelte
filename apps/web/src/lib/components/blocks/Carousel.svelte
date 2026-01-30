<script lang="ts">
  import type { Carousel } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  
  export let title: Carousel['title'];
  export let richText: Carousel['richText'];
  export let images: Carousel['images'];
  export let backgroundColor: Carousel['backgroundColor'];
  export let anchor: Carousel['anchor'];
  
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
              {#if block._type === 'block' && block.children}
                <p class="text-lg text-gray-600">{block.children[0].text}</p>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
      
      {#if images && images.length > 0}
        <div class="relative">
          <div class="overflow-hidden rounded-lg">
            <div class="flex transition-transform duration-300 ease-in-out">
              {#each images as image, index}
                <div class="w-full flex-shrink-0">
                  {#if image.image?.asset}
                    <img 
                      src={urlForImage(image.image).url()}
                      alt={(image.richText?.[0] as any)?._type === 'block' && (image.richText?.[0] as any)?.children?.[0]?.text || `Slide ${index + 1}`}
                      class="w-full h-96 object-cover"
                    />
                  {/if}
                  
                  {#if image.richText}
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                      <div class="prose prose-invert max-w-none">
                        {#each image.richText as block}
                          {#if block._type === 'block' && block.children}
                            <p class="text-white">{block.children[0].text}</p>
                          {/if}
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
          
          <div class="flex justify-center mt-6 gap-2">
            {#each images as _, index}
              <button class="w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-600 transition-colors"></button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>