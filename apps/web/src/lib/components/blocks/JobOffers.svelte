<script lang="ts">
  import type { JobOffers } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';
  import { page as pageStore } from '$app/stores';
  import { localePath } from '$lib/utils/i18n';

  interface Props {
    eyebrow?: JobOffers['eyebrow'];
    title?: JobOffers['title'];
    richText?: JobOffers['richText'];
    offers?: any[];
    backgroundColor?: JobOffers['backgroundColor'];
    anchor?: JobOffers['anchor'];
  }

  let { eyebrow, title, richText, offers = [], backgroundColor, anchor }: Props = $props();

  const uiStrings = $derived($pageStore.data.uiStrings);
  const lang = $derived($pageStore.data.lang ?? 'fr');

  const sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  const textColorClass = $derived(getTextColorClass(backgroundColor || ''));
</script>

<section id={anchor || 'job-offers'} class="{sectionClasses} !pt-32 md:!pt-40 lg:!pt-48">
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-4xl font-semibold md:text-6xl lg:text-7xl text-balance">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}

      {#if Array.isArray(offers) && offers.length > 0}
        <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {#each offers as offer}
            <a
              href={localePath('/offers/' + (offer.slug ?? offer._id), lang)}
              class="group block rounded-2xl border border-neutral-200/50 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {#if offer.image?.asset}
                <div class="relative mb-6 h-48 w-full overflow-hidden rounded-xl">
                  <SanityImage
                    image={offer.image}
                    alt={offer.title || 'Job offer'}
                    imgClass="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {#if offer.type}
                    <span class="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/90 rounded-full">{offer.type}</span>
                  {/if}
                </div>
              {/if}

              <div class="space-y-4">

                <div>
                  {#if offer.title}
                    <h3 class="text-xl font-semibold group-hover:text-primary-500 transition-colors">{offer.title}</h3>
                  {/if}
                  {#if offer.profile}
                    <p class="mt-1 text-sm text-neutral-500">{offer.profile}</p>
                  {/if}
                </div>

                {#if offer.summary}
                  <p class="text-neutral-500 line-clamp-3">{offer.summary}</p>
                {/if}

                <div class="pt-2">
                  <span class="text-sm font-medium text-primary-500 group-hover:underline">{uiStrings?.learnMore ?? 'En savoir plus →'}</span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="text-center w-full">
          <div class="rounded-2xl border border-dashed border-neutral-200/50 p-12">
            <h3 class="text-lg font-medium text-neutral-500">{uiStrings?.noJobOffers ?? 'Pas d\'offres disponibles'}</h3>
            <p class="mt-2 text-sm text-neutral-500">{uiStrings?.noJobOffersDescription ?? 'Nous sommes toujours à la recherche de talents. Revenez bientôt !'}</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>