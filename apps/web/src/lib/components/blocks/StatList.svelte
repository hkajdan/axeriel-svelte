<script lang="ts">
  import type { StatList } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/RichText.svelte';
  import { onMount } from 'svelte';
  
  let { title, richText, stats, textAlign, animateNumbers, animationDuration, backgroundColor, anchor }: {
    title: StatList['title'];
    richText: StatList['richText'];
    stats: StatList['stats'];
    textAlign: StatList['textAlign'];
    animateNumbers: StatList['animateNumbers'];
    animationDuration: StatList['animationDuration'];
    backgroundColor: StatList['backgroundColor'];
    anchor: StatList['anchor'];
  } = $props();
  
  let bgClass = $derived(getSectionClasses(backgroundColor || ''));
  
  // Text alignment classes
  const alignClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };
  
  let alignClass = $derived(alignClasses[textAlign || 'center'] || alignClasses['center']);
  
  // Animation state
  let animatedStats: Record<string, boolean> = {};
  let statElements: HTMLElement[] = [];
  
  // Intersection Observer for animations
  let observer: IntersectionObserver;
  
  onMount(() => {
    // Initialize animated state for all stats as false
    if (stats) {
      animatedStats = stats.reduce((acc, stat, index) => {
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
              animatedStats = { ...animatedStats, [index]: true };
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    // Observe all stat elements
    statElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      // Clean up observer on unmount
      if (observer) {
        statElements.forEach((element) => {
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
  
  // Format number with animation
  function formatAnimatedNumber(value: number | string | undefined, index: number) {
    if (!value || !animateNumbers || !animatedStats[index]) {
      return value?.toString() || '0';
    }
    
    // Simple animation: show the number directly since CSS will handle the transition
    return value.toString();
  }
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
             <RichText value={richText} textClass="text-lg text-gray-600" />
           </div>
         {/if}
      </div>
      
       {#if stats && stats.length > 0}
         <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {#each stats as stat, index}
             <div class={`space-y-2 ${alignClass}`}>
               <div class="text-4xl lg:text-5xl font-bold">
                 {#if stat.prefix}{stat.prefix}{/if}
                 <span 
                   class="text-blue-600 inline-block"
                   style={`transition: transform ${getAnimationDuration()} ease-out`}
                   style:transform={animateNumbers && animatedStats[index] ? 'scale(1)' : 'scale(0.95)'}
                   style:opacity={animateNumbers && animatedStats[index] ? '1' : '0.5'}
                 >
                   {formatAnimatedNumber(stat.value, index)}
                 </span>
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