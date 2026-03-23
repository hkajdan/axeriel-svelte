<script lang="ts">
  import type { SubscribeNewsletter } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';

  interface Props {
    title?: SubscribeNewsletter['title'];
    subTitle?: SubscribeNewsletter['subTitle'];
    helperText?: SubscribeNewsletter['helperText'];
    backgroundColor?: SubscribeNewsletter['backgroundColor'];
    anchor?: SubscribeNewsletter['anchor'];
  }

  let { title, subTitle, helperText, backgroundColor, anchor }: Props = $props();

  const sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || ''));
</script>

<section id={anchor || 'subscribe'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="relative rounded-3xl overflow-hidden {textColorClass} px-6 md:px-8 py-12 md:py-16 bg-neutral-50">
      <div class="relative z-10 mx-auto text-center">
        {#if title || subTitle}
          <div class={SECTION_HEADER_SPACING}>
            {#if title}
              <h2 class="mb-4 text-xl font-semibold text-neutral-900 sm:text-3xl md:text-5xl text-balance">{title}</h2>
            {/if}
            {#if subTitle}
              <RichText value={subTitle} textClass="text-sm text-neutral-600 sm:text-base text-balance" />
            {/if}
          </div>
        {/if}

        <form class="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2">
          <div class="flex bg-white items-center border rounded-xl p-2 drop-shadow-lg md:w-96 justify-between pl-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              aria-label="Adresse email"
              class="rounded-e-none border-e-0 focus-visible:ring-0 outline-none bg-transparent w-full"
            />
            <button
              type="submit"
              class="size-8 aspect-square bg-neutral-200 hover:bg-neutral-300 rounded-md flex items-center justify-center flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </form>

        {#if helperText}
          <RichText value={helperText} textClass="mt-3 text-sm text-neutral-800 opacity-80 sm:mt-4" />
        {/if}
      </div>
    </div>
  </div>
</section>
