<script lang="ts">
  import type { Hero } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  
  export let badge: Hero['badge'];
  export let title: Hero['title'];
  export let richText: Hero['richText'];
  export let image: Hero['image'];
  export let video: Hero['video'];
  export let buttons: Hero['buttons'];
  export let backgroundColor: Hero['backgroundColor'];
  export let anchor: Hero['anchor'];
  
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

<section class={`py-16 lg:py-24 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="space-y-6">
        {#if badge}
          <span class="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {badge}
          </span>
        {/if}
        
        {#if title}
          <h1 class="text-4xl lg:text-6xl font-bold tracking-tight">{title}</h1>
        {/if}
        
        {#if richText}
          <div class="prose prose-lg max-w-none">
            <!-- Rich text rendering would go here -->
            {#each richText as block}
              {#if block._type === 'block' && block.children}
                <p class="text-lg text-gray-600">{block.children[0].text}</p>
              {/if}
            {/each}
          </div>
        {/if}
        
        {#if buttons && buttons.length > 0}
          <div class="flex flex-wrap gap-4">
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
      
      <!-- Media Content -->
      <div class="space-y-6">
        {#if image?.asset}
          <img 
            src={urlForImage(image).url()}
            alt={title || 'Hero image'}
            class="w-full h-auto rounded-lg shadow-lg object-cover aspect-[16/9]"
          />
        {/if}
        
        {#if video}
          <!-- Video player would go here -->
          <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Video: {(video.asset as any)?.playbackId}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>