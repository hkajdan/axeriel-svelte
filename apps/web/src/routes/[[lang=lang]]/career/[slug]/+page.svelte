<script lang="ts">
  import type { PageProps } from './$types';
  import SanityImage from '$lib/components/SanityImage.svelte';
  import RichText from '$lib/components/PortableText.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { urlForImage } from '$lib/sanity/image';
  import { reveal } from '$lib/actions/reveal';

  const { data }: PageProps = $props();

  const offer = $derived(data.offer);
  const contactEmail = $derived(data.settings?.contactEmail);
  const mailtoHref = $derived(
    contactEmail
      ? `mailto:${contactEmail}?subject=${encodeURIComponent(`Candidature - ${offer?.title || ''}`)}`
      : undefined
  );
  const imageUrl = $derived(
    offer?.image?.asset ? urlForImage(offer.image).width(1600).url() : null
  );
</script>

<svelte:head>
  <title>{offer?.title || 'Offre'} — Carrière</title>
  {#if imageUrl}
    <link rel="preload" as="image" href={imageUrl} />
  {/if}
</svelte:head>

<section class="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24">
  <div class="container mx-auto px-4">

    <!-- Back link -->
    <a
      href="/career"
      class="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary-500 transition-colors duration-200 mb-8 md:mb-12"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Toutes les offres
    </a>

    <!-- Image banner -->
    {#if offer?.image?.asset}
      <div
        class="relative w-full overflow-hidden rounded-2xl mb-10 md:mb-14"
        use:reveal
      >
        <div class="aspect-[21/9]">
          <SanityImage
            image={offer.image}
            alt={offer.title || 'Job offer'}
            imgClass="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
        {#if offer.type}
          <span class="absolute bottom-4 left-4 px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            {offer.type}
          </span>
        {/if}
      </div>
    {/if}

    <!-- Title block -->
    <div
      class="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 sm:space-y-6"
      use:reveal
    >
      <h1 class="text-4xl font-semibold md:text-5xl lg:text-6xl text-balance text-neutral-900">
        {offer?.title}
      </h1>

      {#if offer?.profile}
        <p class="text-lg text-neutral-500 text-balance">{offer.profile}</p>
      {/if}

      {#if offer?.type && !offer?.image?.asset}
        <div class="flex justify-center gap-3">
          <span class="bg-primary-50 text-primary-500 px-3 py-1 rounded-full text-sm font-medium">
            {offer.type}
          </span>
        </div>
      {/if}
    </div>

    <!-- Description -->
    {#if offer?.description}
      <div class="max-w-3xl mx-auto mt-12 md:mt-16" use:reveal>
        <RichText value={offer.description} />
      </div>
    {/if}

    <!-- CTA -->
    {#if mailtoHref}
      <div class="flex justify-center mt-12 md:mt-16" use:reveal>
        <Button variant="primary" size="lg" href={mailtoHref}>
          Postuler par email
        </Button>
      </div>
    {/if}

  </div>
</section>
