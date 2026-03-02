<script lang="ts">
  import type { FeatureCardsIcon } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';

  export let eyebrow: FeatureCardsIcon['eyebrow'];
  export let title: FeatureCardsIcon['title'];
  export let richText: FeatureCardsIcon['richText'];
  export let cards: FeatureCardsIcon['cards'];
  export let backgroundColor: FeatureCardsIcon['backgroundColor'];
  export let anchor: FeatureCardsIcon['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}
    </div>

    {#if cards && cards.length > 0}
      <div class="mx-auto grid gap-8 lg:grid-cols-3">
        {#each cards as card}
          <div class="rounded-3xl bg-neutral-100 p-8 md:min-h-[300px]">
            {#if card.icon?.name}
              <span class="mb-9 flex w-fit p-3 items-center justify-center rounded-full bg-white drop-shadow-xl">
                <span class="text-3xl text-primary-500">{card.icon.name}</span>
              </span>
            {/if}
            <div>
              {#if card.title}
                <h3 class="text-lg font-medium md:text-2xl mb-2">{card.title}</h3>
              {/if}
              {#if card.richText}
                <RichText value={card.richText} textClass="font-normal text-sm md:text-[16px] text-black/90 leading-7 text-balance" />
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>