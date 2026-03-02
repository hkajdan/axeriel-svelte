<script lang="ts">
  import type { Cta } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';

  export let eyebrow: Cta['eyebrow'];
  export let title: Cta['title'];
  export let richText: Cta['richText'];
  export let buttons: Cta['buttons'];
  export let backgroundColor: Cta['backgroundColor'];
  export let anchor: Cta['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="rounded-3xl px-6 md:px-8 py-12 md:py-16 {backgroundColor ? textColorClass : 'bg-neutral-100'}">
      <div class="text-center max-w-3xl mx-auto space-y-6 md:space-y-8 {SECTION_HEADER_SPACING}">
        {#if eyebrow}
          <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">
            {eyebrow}
          </span>
        {/if}

        {#if title}
          <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold text-balance">{title}</h2>
        {/if}

        {#if richText}
          <div class="text-base md:text-lg text-neutral-500">
            <RichText value={richText} textClass="text-balance" />
          </div>
        {/if}

        {#if buttons && buttons.length > 0}
          <div class="flex justify-center">
            <SanityButtons buttons={buttons} justify="center" />
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>