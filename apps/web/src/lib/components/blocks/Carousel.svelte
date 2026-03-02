<script lang="ts">
  import type { Carousel } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  
  let { title, richText, images, backgroundColor, anchor }: {
    title: Carousel['title'];
    richText: Carousel['richText'];
    images: Carousel['images'];
    backgroundColor: Carousel['backgroundColor'];
    anchor: Carousel['anchor'];
  } = $props();
  
  const bgClass = getSectionClasses(backgroundColor || '');
  
  // Carousel state
  let currentSlide = 0;
  let isAutoPlaying = true;
  let autoPlayInterval: ReturnType<typeof setInterval>;
  
  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (isAutoPlaying && images && images.length > 0) {
        currentSlide = (currentSlide + 1) % images.length;
      }
    }, 5000);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  function goToSlide(index: number) {
    currentSlide = index;
  }
  
  function nextSlide() {
    if (images && images.length > 0) {
      currentSlide = (currentSlide + 1) % images.length;
    }
  }
  
  function prevSlide() {
    if (images && images.length > 0) {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
    }
  }
  
  // Start auto-play when component mounts
  $effect(() => {
    if (images && images.length > 0) {
      startAutoPlay();
    }
  });
  
  // Clean up auto-play when component is destroyed
  $effect(() => {
    return () => {
      stopAutoPlay();
    };
  });
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
            <RichText value={richText} textClass="text-lg text-gray-600" />
          </div>
        {/if}
      </div>
      
      {#if images && images.length > 0}
        <div class="relative">
          <!-- Navigation Controls -->
          <button 
            on:click|preventDefault={prevSlide}
            on:mouseenter={() => isAutoPlaying = false}
            on:mouseleave={() => isAutoPlaying = true}
            class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Previous slide"
          >
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            on:click|preventDefault={nextSlide}
            on:mouseenter={() => isAutoPlaying = false}
            on:mouseleave={() => isAutoPlaying = true}
            class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Next slide"
          >
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <!-- Slides -->
          <div class="overflow-hidden rounded-lg">
            <div class="flex transition-transform duration-300 ease-in-out" style="transform: translateX(-{currentSlide * 100}%)">
              {#each images as image, index}
                <div class="w-full flex-shrink-0">
                  {#if image.image?.asset}
                    <div class="relative h-96">
                      <SanityImage 
                        image={image.image}
                        alt={(image.richText?.[0] as any)?._type === 'block' && (image.richText?.[0] as any)?.children?.[0]?.text || `Slide ${index + 1}`}
                        imgClass="w-full h-full object-cover"
                      />
                      
                      {#if image.richText}
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                          <div class="prose prose-invert max-w-none">
                            <RichText value={image.richText} textClass="text-white" />
                          </div>
                        </div>
                      {/if}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Dot Navigation -->
          <div class="flex justify-center mt-6 gap-2">
            {#each images as _, index}
              <button 
                on:click|preventDefault={() => goToSlide(index)}
                on:mouseenter={() => isAutoPlaying = false}
                on:mouseleave={() => isAutoPlaying = true}
                class="w-3 h-3 rounded-full transition-colors {currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'}"
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>