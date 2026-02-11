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
 

console.log(video)
</script>

<section class="relative h-screen min-h-[600px] flex items-center justify-center" id={anchor}>
  <!-- Background Media - Fullscreen and Absolute -->
  {#if video?.asset?.playbackId}
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <mux-player
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover brightness-75"
        playback-id={video.asset.playbackId}
      >
        Your browser does not support the video tag.
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
  <div class="relative z-10 container mx-auto px-4 text-center">
    <div class="max-w-4xl mx-auto space-y-8">
      {#if badge}
        <span class="inline-block px-4 py-2 text-sm font-medium text-primary-500 bg-blue-100 rounded-full">
          {badge}
        </span>
      {/if}
      
      {#if title}
        <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase text-white">
          {title}
        </h1>
      {/if}
      
      {#if richText}
        <div class="prose prose-lg max-w-none text-white/90">
          <!-- Rich text rendering would go here -->
          {#each richText as block (block._key)}
            {#if block._type === 'block' && block.children}
              <p class="text-lg md:text-xl">{block.children[0].text}</p>
            {/if}
          {/each}
        </div>
      {/if}
      
      {#if buttons && buttons.length > 0}
        <div class="flex flex-wrap gap-4 justify-center">
        {#each buttons as button (button._key)}
          <a 
            href={resolveSanityUrl(button.url)}
            target={getLinkTarget(button.url)}
            rel={getLinkRel(button.url)}
            class={`px-6 py-3 rounded-lg font-medium transition-colors 
              ${button.variant === 'secondary' ? 'bg-white/20 hover:bg-white/30 text-white' : 
              button.variant === 'outline' ? 'border border-white/50 hover:bg-white/10 text-white' : 
              button.variant === 'link' ? 'text-white hover:underline' : 
              'bg-primary-500 text-white hover:bg-blue-700'}`}
          >
            {button.text}
          </a>
        {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
