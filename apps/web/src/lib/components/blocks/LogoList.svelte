<script lang="ts">
  import type { LogoList } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  
  export let title: LogoList['title'];
  export let richText: LogoList['richText'];
  export let logos: LogoList['logos'];
  export let backgroundColor: LogoList['backgroundColor'];
  export let anchor: LogoList['anchor'];
  
  const sectionClasses = getSectionClasses(backgroundColor || 'white');
  const textColor = getTextColorClass(backgroundColor || 'white');
</script>

<section class={sectionClasses} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
         {#if title}
           <h2 class={`text-3xl lg:text-4xl font-bold tracking-tight ${textColor}`}>{title}</h2>
         {/if}
         
         {#if richText}
           <RichText value={richText} textClass={textColor} />
         {/if}
      </div>
      
      {#if logos && logos.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {#each logos as logo}
            <div class="flex justify-center">
               {#if logo.image}
                 <SanityImage 
                   image={logo.image}
                   alt={logo.text || 'Logo'}
                   imgClass="h-12 object-contain grayscale hover:grayscale-0 transition-all"
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