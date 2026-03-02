<script lang="ts">
  import type { Cta } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import RichText from '$lib/components/RichText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';
  
  export let eyebrow: Cta['eyebrow'];
  export let title: Cta['title'];
  export let richText: Cta['richText'];
  export let buttons: Cta['buttons'];
  export let backgroundColor: Cta['backgroundColor'];
  export let anchor: Cta['anchor'];
  
  const sectionClasses = getSectionClasses(backgroundColor || 'white');
  const textColor = getTextColorClass(backgroundColor || 'white');
</script>

<section class={sectionClasses} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center space-y-8">
       {#if eyebrow}
         <p class="text-sm font-medium text-primary-500 uppercase tracking-wider">{eyebrow}</p>
       {/if}
        
       {#if title}
         <h2 class={`text-3xl lg:text-4xl font-bold tracking-tight ${textColor}`}>{title}</h2>
       {/if}
      
         {#if richText}
           <RichText value={richText} textClass={textColor} />
         {/if}
         
        {#if buttons && buttons.length > 0}
          <SanityButtons buttons={buttons} justify="center" />
        {/if}
    </div>
  </div>
</section>
