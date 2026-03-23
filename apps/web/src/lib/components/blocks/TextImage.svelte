<script lang="ts">
  import type { TextImage } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  interface Props {
    title?: TextImage['title'];
    richText?: TextImage['richText'];
    rows?: TextImage['rows'];
    backgroundColor?: TextImage['backgroundColor'];
    anchor?: TextImage['anchor'];
  }

  let { title, richText, rows, backgroundColor, anchor }: Props = $props();

  const sectionClasses = $derived(getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || 'white'));

  function isImageRight(position: string | null | undefined): boolean {
    return (position || '').replace(/[^\x20-\x7E]/g, '') === 'right'
  }
</script>

<section id={anchor || 'textImage'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 {SECTION_HEADER_SPACING}">
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}
    </div>

    {#if rows && rows.length > 0}
      <div class="mx-auto flex flex-col gap-8 md:gap-16">
        {#each rows as row, index}
          <div class="w-full flex flex-col gap-6 md:gap-16 {isImageRight(row.imagePosition) ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center">
            <div class="w-full md:w-1/2">
              {#if row.richText}
                <RichText value={row.richText} />
              {/if}
            </div>
            {#if row.image}
              <div class="w-full md:w-1/2">
                <div class="aspect-video w-full overflow-hidden rounded-lg">
                  <SanityImage
                    image={row.image}
                    alt={title || `Content image ${index + 1}`}
                    imgClass="w-full h-full object-cover"
                  />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>