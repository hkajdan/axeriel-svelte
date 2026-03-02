<script lang="ts">
  import type { Timeline } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  
  export let badge: Timeline['badge'];
  export let title: Timeline['title'];
  export let timeline: Timeline['timeline'];
  export let backgroundColor: Timeline['backgroundColor'];
  export let anchor: Timeline['anchor'];
  
  const bgClass = getSectionClasses(backgroundColor || '');
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if badge}
          <span class="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {badge}
          </span>
        {/if}
        
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
      </div>
      
      {#if timeline && timeline.length > 0}
        <div class="space-y-8">
          {#each timeline as item, index}
            <div class="grid md:grid-cols-2 gap-8 items-start">
              <div class="text-right md:text-left">
                {#if item.date}
                  <div class="text-sm font-medium text-gray-500 mb-2">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                {/if}
              </div>
              
              <div class="space-y-4">
                {#if item.title}
                  <h3 class="text-xl font-semibold">{item.title}</h3>
                {/if}
                
                 {#if item.richText}
                   <div class="prose prose-sm max-w-none">
                     <RichText value={item.richText} textClass="text-gray-600" />
                   </div>
                 {/if}
                 
                 {#if item.image?.asset}
                   <SanityImage 
                     image={item.image}
                     alt={item.title || 'Timeline image'}
                     imgClass="w-full h-48 object-cover rounded-lg"
                   />
                 {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>