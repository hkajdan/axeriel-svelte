<script lang="ts">
import "@mux/mux-player"
  import type { Hero } from '$lib/sanity/sanity.types';
  import { urlForImage } from '$lib/sanity/image';
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links';
 
  export let badge: Hero['badge'];
  export let title: Hero['title'];
  export let richText: Hero['richText'];
  export let image: Hero['image'];
  export let video: Hero['video'];
  export let buttons: Hero['buttons'];
  export let anchor: Hero['anchor'];
 

</script>

<section class="relative h-screen min-h-150 flex items-center justify-center" id={anchor}>
  <!-- Background Media - Fullscreen and Absolute -->
  {#if video?.asset?.playbackId}
    <div class="absolute inset-0 w-full h-full overflow-hidden ">
      <mux-player
        autoplay
        disable-tracking
        muted
        loop
        playsinline
        class="w-full h-full object-cover brightness-50 scale-105"
        playback-id={video.asset.playbackId}
      >
      </mux-player>
    </div>
  {:else if image?.asset}
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <img
        src={urlForImage(image).url()}
        alt={title || 'Hero image'}
        class="w-full h-full object-cover brightness-75"
        style="brightness(0.6)"
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
          <!-- Rich text rendering would go here -->
          {#each richText as block (block._key)}
            {#if block._type === 'block' && block.children}
              <p class="text-lg md:text-2xl">{block.children[0].text}</p>
            {/if}
          {/each}
        </div>
      {/if}
      
  </div>
</section>
