<script lang="ts">
  import { onMount } from 'svelte';
  import type { VideoSection } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';

  interface Props {
    eyebrow?: VideoSection['eyebrow'];
    title?: VideoSection['title'];
    subtitle?: VideoSection['subtitle'];
    video?: VideoSection['video'];
    thumbnailTime?: VideoSection['thumbnailTime'];
    videoCaption?: VideoSection['videoCaption'];
    aspectRatio?: VideoSection['aspectRatio'];
    autoplay?: VideoSection['autoplay'];
    loop?: VideoSection['loop'];
    backgroundColor?: VideoSection['backgroundColor'];
    anchor?: VideoSection['anchor'];
  }

  let { eyebrow, title, subtitle, video, thumbnailTime, videoCaption, aspectRatio, autoplay, loop, backgroundColor, anchor }: Props = $props();

  onMount(() => { import("@mux/mux-player"); });

  const bgClass = $derived(getSectionClasses(backgroundColor || ''));

  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '9/16': 'aspect-[9/16]'
  };

  const aspectClass = $derived(aspectClasses[aspectRatio || '16/9'] || aspectClasses['16/9']);
</script>

<section class={bgClass} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if eyebrow}
          <p class="text-sm font-medium text-primary-500 uppercase tracking-wider">{eyebrow}</p>
        {/if}
        
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if subtitle}
          <p class="text-xl text-neutral-500">{subtitle}</p>
        {/if}
      </div>
      
       {#if video?.asset && (video.asset as any)?.playbackId}
         <div class="max-w-4xl mx-auto">
           <div class={aspectClass}>
             <mux-player
               playback-id={(video.asset as any).playbackId}
               autoplay={autoplay}
               loop={loop}
               disable-tracking
               muted
               playsinline
               class="w-full h-full rounded-lg"
               {thumbnailTime}
             >
             </mux-player>
           </div>
           
           {#if videoCaption}
             <p class="text-center text-neutral-500 mt-4">{videoCaption}</p>
           {/if}
         </div>
       {/if}
    </div>
  </div>
</section>
