<script lang="ts">
  import type { TextImage } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  
  export let title: TextImage['title'];
  export let richText: TextImage['richText'];
  export let rows: TextImage['rows'];
  export let backgroundColor: TextImage['backgroundColor'];
  export let anchor: TextImage['anchor'];
  
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
      {#if title}
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        </div>
      {/if}
      
      {#if rows && rows.length > 0}
        <div class="space-y-16">
          {#each rows as row, index}
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              {#if row.imagePosition === 'right'}
                <div class="order-2 lg:order-1">
                  {#if row.richText}
                    <div class="prose prose-lg max-w-none">
                      {#each row.richText as block}
                        {#if block.children}
                          <p class="text-lg text-gray-600">{block.children[0].text}</p>
                        {/if}
                      {/each}
                    </div>
                  {/if}
                </div>
                
                <div class="order-1 lg:order-2">
                  {#if row.image?.asset}
                    <img 
                      src={urlForImage(row.image).url()}
                      alt={title || `Content image ${index + 1}`}
                      class="w-full h-auto rounded-lg shadow-lg object-cover aspect-[16/9]"
                    />
                  {/if}
                </div>
              {:else}
                <div>
                  {#if row.image?.asset}
                    <img 
                      src={urlForImage(row.image).url()}
                      alt={title || `Content image ${index + 1}`}
                      class="w-full h-auto rounded-lg shadow-lg object-cover aspect-[16/9]"
                    />
                  {/if}
                </div>
                
                <div>
                  {#if row.richText}
                    <div class="prose prose-lg max-w-none">
                      {#each row.richText as block}
                        {#if block.children}
                          <p class="text-lg text-gray-600">{block.children[0].text}</p>
                        {/if}
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>