<script lang="ts">
  import type { StatList } from '$lib/sanity/sanity.types';
  
  export let title: StatList['title'];
  export let richText: StatList['richText'];
  export let stats: StatList['stats'];
  export let textAlign: StatList['textAlign'];
  export let animateNumbers: StatList['animateNumbers'];
  export let animationDuration: StatList['animationDuration'];
  export let backgroundColor: StatList['backgroundColor'];
  export let anchor: StatList['anchor'];
  
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
  
  // Text alignment classes
  const alignClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };
  
  const alignClass = alignClasses[textAlign || 'center'] || alignClasses['center'];
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto space-y-4">
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if richText}
          <div class="prose prose-lg max-w-none">
            {#each richText as block}
              {#if block._type === 'block' && block.children}
                <p class="text-lg text-gray-600">{block.children[0].text}</p>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
      
      {#if stats && stats.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each stats as stat}
            <div class={`space-y-2 ${alignClass}`}>
              <div class="text-4xl lg:text-5xl font-bold">
                {#if stat.prefix}{stat.prefix}{/if}
                <span class="text-blue-600">{stat.value}</span>
                {#if stat.suffix}{stat.suffix}{/if}
              </div>
              {#if stat.text}
                <p class="text-gray-600">{stat.text}</p>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>