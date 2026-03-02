<script lang="ts">
  import type { Histogram } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import { onMount } from 'svelte';
  
  let { title, subtitle, bars, maxValue, minValue, valueSuffix, showValues, animationDuration, backgroundColor, anchor }: {
    title: Histogram['title'];
    subtitle: Histogram['subtitle'];
    bars: Histogram['bars'];
    maxValue: Histogram['maxValue'];
    minValue: Histogram['minValue'];
    valueSuffix: Histogram['valueSuffix'];
    showValues: Histogram['showValues'];
    animationDuration: Histogram['animationDuration'];
    backgroundColor: Histogram['backgroundColor'];
    anchor: Histogram['anchor'];
  } = $props();
  
  let bgClass = $derived(getSectionClasses(backgroundColor || ''));
  
  // Calculate max value if not provided
  let effectiveMaxValue = $derived(maxValue || (bars ? Math.max(...bars.map(bar => bar.value || 0)) : 100));
  let effectiveMinValue = $derived(minValue || 0);
  
  // Animation state
  let animatedBars: Record<string, boolean> = {};
  let barElements: HTMLElement[] = [];
  
  // Intersection Observer for animations
  let observer: IntersectionObserver;
  
  onMount(() => {
    // Initialize animated state for all bars as false
    if (bars) {
      animatedBars = bars.reduce((acc, bar, index) => {
        acc[index] = false;
        return acc;
      }, {} as Record<string, boolean>);
    }
    
    // Set up Intersection Observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            if (index !== null) {
              animatedBars = { ...animatedBars, [index]: true };
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    // Observe all bar elements
    barElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      // Clean up observer on unmount
      if (observer) {
        barElements.forEach((element) => {
          if (element) {
            observer.unobserve(element);
          }
        });
      }
    };
  });
  
  // Get animation duration with fallback
  function getAnimationDuration() {
    return animationDuration ? `${animationDuration}ms` : '1000ms';
  }
  
  // Get transition style for animated bars
  function getBarTransition(index: string | number) {
    return animatedBars[index] 
      ? `width ${getAnimationDuration()} ease-out`
      : 'width 0.1s ease-out';
  }
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
           {#each bars as bar, index}
               <div class="space-y-2">
                 <div class="flex justify-between items-center">
                   {#if bar.label}
                     <span class="font-medium">{bar.label}</span>
                   {/if}
                   {#if showValues && bar.value !== undefined}
                     <span class="font-medium">{bar.value}{valueSuffix}</span>
                   {/if}
                 </div>
                 
                 <div class="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                   <div 
                     class="bg-blue-600 h-8 rounded-full"
                     style={`width: ${animatedBars[index] ? ((bar.value || 0) - effectiveMinValue) / (effectiveMaxValue - effectiveMinValue) * 100 : 0}%; transition: ${getBarTransition(index)}`}
                     data-index={index}
                     bind:this={barElements[index]}
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