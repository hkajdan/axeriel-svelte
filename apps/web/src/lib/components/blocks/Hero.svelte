<script lang="ts">
  import "@mux/mux-player"
  import type { Hero } from '$lib/sanity/sanity.types';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  interface Props {
    badge?: Hero['badge'];
    title?: Hero['title'];
    richText?: Hero['richText'];
    image?: Hero['image'];
    video?: Hero['video'];
    buttons?: Hero['buttons'];
    anchor?: Hero['anchor'];
  }

  let { badge, title, richText, image, video, buttons, anchor }: Props = $props();
  let videoReady = $state(false);
</script>

<section class="relative h-screen min-h-150 flex items-center justify-center bg-neutral-900" id={anchor}>
  <!-- Background Media - Fullscreen and Absolute -->
  {#if video?.asset && (video.asset as any)?.playbackId}
    {@const playbackId = (video.asset as any).playbackId}
    {@const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`}
    <div
      class="absolute inset-0 w-full h-full overflow-hidden"
      style="background: url('{posterUrl}') center/cover no-repeat"
    >
      <mux-player
        autoplay
        disable-tracking
        muted
        aria-hidden="true"
        loop
        playsinline
        preload="auto"
        class="w-full h-full brightness-50 transition-opacity duration-700 {videoReady ? 'opacity-100' : 'opacity-0'}"
        style="--media-object-fit: cover; --media-object-position: center;"
        playback-id={playbackId}
        poster={posterUrl}
        onplaying={() => { videoReady = true; }}
      ></mux-player>
    </div>
  {:else if image?.asset}
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <SanityImage
        image={image}
        alt={title || 'Hero image'}
        imgClass="w-full h-full object-cover brightness-75"
        loading="eager"
        fetchpriority="high"
        sizes="100vw"
      />
    </div>
  {/if}

  <!-- Overlay for better text contrast -->
  <div class="absolute inset-0 bg-black/20"></div>

  <!-- Text Content - Centered and Responsive -->
  <div class="relative z-10 container px-4 text-left pt-20">
    <div class="max-w-4xl space-y-8">
      {#if badge}
        <span class="inline-block px-4 py-2 text-sm font-medium text-primary-500 bg-blue-100 rounded-full">
          {badge}
        </span>
      {/if}

      {#if title}
        <h1 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight uppercase text-white">
          {title}
        </h1>
      {/if}

      {#if richText}
        <div class="prose prose-lg max-w-none text-white/90">
          <RichText value={richText} textClass="text-lg md:text-2xl text-white/90" />
        </div>
      {/if}

      {#if buttons && buttons.length > 0}
        <div class="mt-8">
          <SanityButtons buttons={buttons} justify="start" />
        </div>
      {/if}
    </div>
  </div>
</section>
