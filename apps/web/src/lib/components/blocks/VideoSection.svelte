<script lang="ts">
  import type { VideoSection } from '$lib/sanity/sanity.types';
  
  export let eyebrow: VideoSection['eyebrow'];
  export let title: VideoSection['title'];
  export let subtitle: VideoSection['subtitle'];
  export let video: VideoSection['video'];
  export let thumbnailTime: VideoSection['thumbnailTime'];
  export let videoCaption: VideoSection['videoCaption'];
  export let aspectRatio: VideoSection['aspectRatio'];
  export let autoplay: VideoSection['autoplay'];
  export let loop: VideoSection['loop'];
  export let backgroundColor: VideoSection['backgroundColor'];
  export let anchor: VideoSection['anchor'];
  
  const bgClasses = {
    '': 'bg-white',
    'white': 'bg-white',
    'light-blue': 'bg-blue-50',
    'blue': 'bg-blue-600 text-white',
    'grey': 'bg-gray-100',
    'light-grey': 'bg-gray-50'
  };
  
  const bgClass = bgClasses[backgroundColor || ''] || bgClasses[''];
  
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '9/16': 'aspect-[9/16]'
  };
  
  const aspectClass = aspectClasses[aspectRatio || '16/9'] || aspectClasses['16/9'];
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if eyebrow}
          <p class="text-sm font-medium text-blue-600 uppercase tracking-wider">{eyebrow}</p>
        {/if}
        
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if subtitle}
          <p class="text-xl text-gray-600">{subtitle}</p>
        {/if}
      </div>
      
      {#if video}
        <div class="max-w-4xl mx-auto">
          <div class={`${aspectClass} bg-gray-200 rounded-lg flex items-center justify-center`}>
            <div class="text-center">
              <p class="text-gray-500">Video Player</p>
              <p class="text-sm text-gray-400">Playback ID: {(video.asset as any)?.playbackId}</p>
              <p class="text-sm text-gray-400">Autoplay: {autoplay ? 'Yes' : 'No'}, Loop: {loop ? 'Yes' : 'No'}</p>
            </div>
          </div>
          
          {#if videoCaption}
            <p class="text-center text-gray-600 mt-4">{videoCaption}</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>