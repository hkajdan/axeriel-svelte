<script lang="ts">
  import type { Histogram } from '$lib/sanity/sanity.types';
  
  export let title: Histogram['title'];
  export let subtitle: Histogram['subtitle'];
  export let bars: Histogram['bars'];
  export let maxValue: Histogram['maxValue'];
  export let minValue: Histogram['minValue'];
  export let valueSuffix: Histogram['valueSuffix'];
  export let showValues: Histogram['showValues'];
  export let animationDuration: Histogram['animationDuration'];
  export let backgroundColor: Histogram['backgroundColor'];
  export let anchor: Histogram['anchor'];
  
  const bgClasses = {
    '': 'bg-white',
    'white': 'bg-white',
    'light-blue': 'bg-blue-50',
    'blue': 'bg-blue-600 text-white',
    'grey': 'bg-gray-100',
    'light-grey': 'bg-gray-50'
  };
  
  const bgClass = bgClasses[backgroundColor || ''] || bgClasses[''];
  
  // Calculate max value if not provided
  $: effectiveMaxValue = maxValue || (bars ? Math.max(...bars.map(bar => bar.value || 0)) : 100);
  $: effectiveMinValue = minValue || 0;
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if subtitle}
          <p class="text-xl text-gray-600">{subtitle}</p>
        {/if}
      </div>
      
      {#if bars && bars.length > 0}
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            {#each bars as bar}
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  {#if bar.label}
                    <span class="font-medium">{bar.label}</span>
                  {/if}
                  {#if showValues && bar.value !== undefined}
                    <span class="font-medium">{bar.value}{valueSuffix}</span>
                  {/if}
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    class="bg-blue-600 h-8 rounded-full transition-all duration-500 ease-out"
                    style={`width: ${((bar.value || 0) - effectiveMinValue) / (effectiveMaxValue - effectiveMinValue) * 100}%`}
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>