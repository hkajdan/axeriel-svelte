<script lang="ts">
  import type { Carousel } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  let { title, richText, images, backgroundColor, anchor }: {
    title: Carousel['title'];
    richText: Carousel['richText'];
    images: Carousel['images'];
    backgroundColor: Carousel['backgroundColor'];
    anchor: Carousel['anchor'];
  } = $props();

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
  
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

<section class={sectionClasses} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {textColorClass} {SECTION_HEADER_SPACING}">
        {#if title}
          <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
        {/if}
        
        {#if richText}
          <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
        {/if}
      </div>
      
      {#if images && images.length > 0}
        <div class="relative">
          <!-- Navigation Controls -->
          <button 
            onclick={prevSlide}
            onmouseenter={() => isAutoPlaying = false}
            onmouseleave={() => isAutoPlaying = true}
            class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hidden md:block"
            aria-label="Previous slide"
          >
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            onclick={nextSlide}
            onmouseenter={() => isAutoPlaying = false}
            onmouseleave={() => isAutoPlaying = true}
            class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hidden md:block"
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
                    <div class="relative">
                      <div class="aspect-video w-full overflow-hidden rounded-xl">
                        <SanityImage 
                          image={image.image}
                          alt={`Slide ${index + 1}`}
                          imgClass="w-full h-full object-cover"
                        />
                      </div>

                      {#if image.richText}
                        <!-- Desktop overlay -->
                        <div class="hidden md:block absolute bottom-4 right-4 md:bottom-8 md:right-8 max-w-sm">
                          <div class="bg-black/30 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/20 shadow-xl">
                            <RichText value={image.richText} textClass="text-white text-sm md:text-base leading-relaxed" />
                          </div>
                        </div>
                      {/if}
                    </div>

                    {#if image.richText}
                      <!-- Mobile text below image -->
                      <div class="md:hidden mt-4 px-2">
                        <div class="bg-primary-500/10 backdrop-blur-sm p-4 rounded-xl border border-primary-500/20">
                          <RichText value={image.richText} textClass="text-sm leading-relaxed" />
                        </div>
                      </div>
                    {/if}
                  {/if}
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Dot Navigation -->
          <div class="flex justify-center mt-6 gap-2">
            {#each images as _, index}
              <button 
                onclick={() => goToSlide(index)}
                onmouseenter={() => isAutoPlaying = false}
                onmouseleave={() => isAutoPlaying = true}
                class="w-3 h-3 rounded-full transition-colors {currentSlide === index ? 'bg-primary-500 shadow-lg scale-110' : 'bg-gray-300 hover:bg-gray-400'}"
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>