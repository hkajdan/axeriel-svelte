<script lang="ts">
  import type { ProductList } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import SanityImage from '$lib/components/SanityImage.svelte';
  import RichText from '$lib/components/PortableText.svelte';
  import { onMount } from 'svelte';

  let { eyebrow, title, subtitle, products, backgroundColor, anchor }: {
    eyebrow: ProductList['eyebrow'];
    title: ProductList['title'];
    subtitle: ProductList['subtitle'];
    products: Array<{
      _ref: string;
      _key: string;
      productData?: {
        _id: string;
        title: string | null;
        richText?: any;
        images?: Array<{
          image?: any;
          caption?: any;
          _type: string;
          _key: string;
        }> | null;
      } | null;
    }>;
    backgroundColor: ProductList['backgroundColor'];
    anchor: ProductList['anchor'];
  } = $props();

  let sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  let textColorClass = $derived(getTextColorClass(backgroundColor || ''));

  // Card entrance animation
  let visibleCards: Record<number, boolean> = $state({});
  let gridEl: HTMLElement | undefined = $state();

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          products?.forEach((_, i) => {
            setTimeout(() => {
              visibleCards = { ...visibleCards, [i]: true };
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (gridEl) observer.observe(gridEl);
    return () => observer.disconnect();
  });

  // Slider state
  let activeIndices: Record<number, number> = $state({});
  let touchStartX: Record<number, number> = $state({});
  let dragOffset: Record<number, number> = $state({});
  let isDragging: Record<number, boolean> = $state({});

  function prev(cardIdx: number) {
    const current = activeIndices[cardIdx] ?? 0;
    if (current > 0) activeIndices = { ...activeIndices, [cardIdx]: current - 1 };
  }

  function next(cardIdx: number, max: number) {
    const current = activeIndices[cardIdx] ?? 0;
    if (current < max - 1) activeIndices = { ...activeIndices, [cardIdx]: current + 1 };
  }

  function goTo(cardIdx: number, imgIdx: number) {
    activeIndices = { ...activeIndices, [cardIdx]: imgIdx };
  }

  function handleTouchStart(cardIdx: number, e: TouchEvent) {
    touchStartX = { ...touchStartX, [cardIdx]: e.touches[0].clientX };
    dragOffset = { ...dragOffset, [cardIdx]: 0 };
    isDragging = { ...isDragging, [cardIdx]: true };
  }

  function handleTouchMove(cardIdx: number, e: TouchEvent) {
    if (!isDragging[cardIdx]) return;
    const delta = e.touches[0].clientX - (touchStartX[cardIdx] ?? 0);
    dragOffset = { ...dragOffset, [cardIdx]: delta };
  }

  function handleTouchEnd(cardIdx: number, imageCount: number) {
    const offset = dragOffset[cardIdx] ?? 0;
    if (offset < -50) next(cardIdx, imageCount);
    else if (offset > 50) prev(cardIdx);
    isDragging = { ...isDragging, [cardIdx]: false };
    dragOffset = { ...dragOffset, [cardIdx]: 0 };
  }

  function getGridCols(count: number): string {
    if (count >= 3) return 'sm:grid-cols-2 lg:grid-cols-3';
    if (count === 2) return 'sm:grid-cols-2';
    return 'max-w-md';
  }
</script>

<section class={sectionClasses} id={anchor}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">

      {#if eyebrow || title || subtitle}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 text-neutral-700 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl text-balance">{title}</h2>
          {/if}
          {#if subtitle}
            <p class="text-lg opacity-70 max-w-2xl text-balance">{subtitle}</p>
          {/if}
        </div>
      {/if}

      {#if products && products.length > 0}
        <div
          bind:this={gridEl}
          class="grid w-full grid-cols-1 gap-6 md:gap-8 {getGridCols(products.length)}"
        >
          {#each products as product, i}
            {@const data = product.productData}
            {@const images = data?.images ?? []}
            {@const imageCount = images.length}
            {@const activeIdx = activeIndices[i] ?? 0}
            {@const dragging = isDragging[i] ?? false}
            {@const drag = dragOffset[i] ?? 0}

            <div
              class="group/card rounded-3xl bg-neutral-100 overflow-hidden flex flex-col hover:shadow-xl"
              style="
                opacity: {visibleCards[i] ? 1 : 0};
                transform: translateY({visibleCards[i] ? 0 : 28}px);
                transition: opacity 600ms ease {i * 100}ms, transform 600ms cubic-bezier(0.34, 1.2, 0.64, 1) {i * 100}ms, box-shadow 300ms ease;
              "
            >
              <!-- Image slider -->
              <!--
                The track must be `absolute inset-0` so its width == the viewport width.
                That way `translateX(-N * 100%)` is always exactly N slide-widths, regardless
                of how many slides are in the track.
              -->
              <div
                class="group/slider relative aspect-[4/3] overflow-hidden bg-neutral-200"
                ontouchstart={(e) => handleTouchStart(i, e)}
                ontouchmove={(e) => handleTouchMove(i, e)}
                ontouchend={() => handleTouchEnd(i, imageCount)}
              >
                {#if imageCount > 0}
                  <!-- Track: absolutely fills the viewport so its own width == viewport -->
                  <div
                    class="absolute inset-0 flex"
                    style="
                      transform: translateX(calc(-{activeIdx * 100}% + {dragging ? drag : 0}px));
                      transition: {dragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'};
                    "
                  >
                    {#each images as img}
                      <!-- Each slide: w-full here = viewport width since track == viewport -->
                      <div class="w-full h-full flex-shrink-0">
                        {#if img.image?.asset}
                          <SanityImage
                            image={img.image}
                            alt={data?.title ?? 'Product'}
                            imgClass="w-full h-full object-cover pointer-events-none"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        {/if}
                      </div>
                    {/each}
                  </div>
                {:else}
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                {/if}

                {#if imageCount > 1}
                  <!-- Prev arrow -->
                  <button
                    onclick={(e) => { e.stopPropagation(); prev(i); }}
                    aria-label="Previous photo"
                    class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60
                           opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200
                           disabled:opacity-20 disabled:cursor-not-allowed"
                    disabled={activeIdx === 0}
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <!-- Next arrow -->
                  <button
                    onclick={(e) => { e.stopPropagation(); next(i, imageCount); }}
                    aria-label="Next photo"
                    class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60
                           opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200
                           disabled:opacity-20 disabled:cursor-not-allowed"
                    disabled={activeIdx === imageCount - 1}
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <!-- Dot indicators -->
                  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                    {#each images as _, j}
                      <button
                        onclick={(e) => { e.stopPropagation(); goTo(i, j); }}
                        aria-label="Go to photo {j + 1}"
                        class="rounded-full bg-white transition-all duration-300 {j === activeIdx ? 'w-4 h-2 opacity-100' : 'w-2 h-2 opacity-50 hover:opacity-80'}"
                      ></button>
                    {/each}
                  </div>
                {/if}

                <!-- Caption overlay -->
                {#key activeIdx}
                  {@const activeCaption = images[activeIdx]?.caption}
                  {#if activeCaption}
                    <div class="caption-fade absolute inset-x-0 bottom-0 z-10 pointer-events-none select-none">
                      <div class="bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pt-20 pb-7">
                        <RichText value={activeCaption} textClass="text-sm md:text-base prose-invert [&_*]:!text-white [&_*]:!opacity-100 line-clamp-3" />
                      </div>
                    </div>
                  {/if}
                {/key}

              </div>

              <!-- Content -->
              <div class="px-6 md:px-8 py-6">
                {#if data?.title}
                  <h3 class="text-xl font-semibold md:text-2xl leading-tight">{data.title}</h3>
                {/if}
              </div>

            </div>
          {/each}
        </div>
      {/if}

    </div>
  </div>
</section>

<style>
  .caption-fade {
    animation: captionFadeIn 280ms ease both;
  }
  @keyframes captionFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
