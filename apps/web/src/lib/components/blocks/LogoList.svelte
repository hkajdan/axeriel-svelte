<script lang="ts">
  import type { LogoList } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  interface Props {
    title?: LogoList['title'];
    richText?: LogoList['richText'];
    logos?: LogoList['logos'];
    backgroundColor?: LogoList['backgroundColor'];
    anchor?: LogoList['anchor'];
  }

  let { title, richText, logos, backgroundColor, anchor }: Props = $props();

  const sectionClasses = $derived(getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || 'white'));
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    {#if title || richText}
      <div class="flex w-full flex-col items-center {textColorClass}">
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      </div>
    {/if}

    <div class="mx-auto flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
      {#if logos}
        {#each logos as logo, index}
          {#if logo.image}
            <div class="w-48 sm:w-52 md:w-56 lg:w-60 flex flex-col items-center justify-center">
              <SanityImage
                image={logo.image}
                alt={logo.text || 'Logo'}
                imgClass="w-auto rounded-3xl p-4 md:p-8 max-h-[200px] md:max-h-[240px]"
              />
              {#if logo.text}
                <span class="mt-2 text-sm text-center">{logo.text}</span>
              {/if}
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</section>