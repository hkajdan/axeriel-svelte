<script lang="ts">
  import type { ImageLinkCards } from '$lib/sanity/sanity.types';
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links';
  import { page } from '$app/stores';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  interface Props {
    eyebrow?: ImageLinkCards['eyebrow'];
    title?: ImageLinkCards['title'];
    richText?: ImageLinkCards['richText'];
    cards?: ImageLinkCards['cards'];
    backgroundColor?: ImageLinkCards['backgroundColor'];
    anchor?: ImageLinkCards['anchor'];
  }

  let { eyebrow, title, richText, cards, backgroundColor, anchor }: Props = $props();
  const lang = $derived($page.data.lang ?? 'fr');

  const sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || ''));

  function getGridCols(count: number): string {
    if (count >= 4) return 'lg:grid-cols-4'
    if (count === 3) return 'lg:grid-cols-3'
    if (count === 2) return 'lg:grid-cols-2'
    return 'lg:grid-cols-1'
  }

  function getCardRounding(idx: number, total: number): string {
    if (idx === 0) return 'lg:rounded-l-3xl lg:rounded-r-none'
    if (idx === total - 1) return 'lg:rounded-r-3xl lg:rounded-l-none'
    return 'lg:rounded-none'
  }
</script>

<section id={anchor || 'image-link-cards'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl text-balance">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-balance" />
          {/if}
        </div>
      {/if}

      {#if cards && cards.length > 0}
        <div class="grid w-full grid-cols-1 gap-4 lg:gap-1 sm:grid-cols-2 {getGridCols(cards.length)}">
          {#each cards as card, idx}
            <a
              href={resolveSanityUrl(card.url, lang)}
              target={getLinkTarget(card.url)}
              rel={getLinkRel(card.url)}
              class="rounded-3xl p-4 md:p-8 transition-all duration-300 relative overflow-hidden group flex flex-col justify-end h-[300px] sm:h-[350px] xl:h-[400px] hover:shadow-lg bg-neutral-200 {getCardRounding(idx, cards.length)}"
            >
              {#if card.image?.asset}
                <div class="absolute inset-0 z-[1]">
                  <SanityImage
                    image={card.image}
                    alt={card.title || 'Card image'}
                    imgClass="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
              {/if}
              <div class="relative z-[2] mt-auto space-y-2 text-white">
                {#if card.title}
                  <h3 class="text-2xl md:text-3xl font-semibold leading-tight">{card.title}</h3>
                {/if}
                {#if card.description}
                  <p class="text-base md:text-lg text-white/90 line-clamp-2 group-hover:text-white transition-colors duration-300">{card.description}</p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
