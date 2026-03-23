<script lang="ts">
  import type { Timeline } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  interface Props {
    title?: Timeline['title'];
    timeline?: Timeline['timeline'];
    backgroundColor?: Timeline['backgroundColor'];
    anchor?: Timeline['anchor'];
  }

  let { title, timeline, backgroundColor, anchor }: Props = $props();

  const sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || ''));
</script>

<section id={anchor || 'timeline'} class={sectionClasses}>
  <div class="container mx-auto">
    {#if title}
      <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {textColorClass} {SECTION_HEADER_SPACING}">
        <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
      </div>
    {/if}

    {#if timeline && timeline.length > 0}
      <div class="relative mx-auto flex w-full flex-col gap-8 md:gap-36">
        <!-- Central vertical line -->
        <div class="absolute left-1/2 top-0 h-full w-[2px] bg-neutral-200 hidden md:block"></div>

        {#each timeline as event, index (event._key)}
          <div class="relative flex w-full flex-col md:items-center md:justify-between md:flex-row gap-4 md:gap-0">
            <!-- Image side -->
            <div class="flex w-full md:w-[53%] {index % 2 === 0 ? 'md:order-1 md:justify-end md:mr-40' : 'md:order-2 md:ml-40'}">
              {#if event.image}
                <div class="w-full max-w-[400px] mx-auto md:mx-0 aspect-video overflow-hidden rounded-3xl bg-neutral-200">
                  <SanityImage
                    image={event.image}
                    alt={event.title || 'Timeline image'}
                    imgClass="object-cover brightness-75 w-full h-full"
                  />
                </div>
              {/if}
            </div>

            <!-- Blue dot on center line -->
            <div class="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 hidden md:block"></div>

            <!-- Text side -->
            <div class="w-full md:w-[47%] {index % 2 === 0 ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}">
              <div class="bg-white p-4">
                {#if event.date}
                  <div class="mb-2 text-4xl font-bold">{event.date}</div>
                {/if}
                {#if event.richText}
                  <RichText value={event.richText} />
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>