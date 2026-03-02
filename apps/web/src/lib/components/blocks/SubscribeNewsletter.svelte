<script lang="ts">
  import type { SubscribeNewsletter } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';
  import RichText from '$lib/components/RichText.svelte';
  
  export let title: SubscribeNewsletter['title'];
  export let subTitle: SubscribeNewsletter['subTitle'];
  export let helperText: SubscribeNewsletter['helperText'];
  export let backgroundColor: SubscribeNewsletter['backgroundColor'];
  export let anchor: SubscribeNewsletter['anchor'];
  
  const bgClass = getSectionClasses(backgroundColor || '');
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center space-y-6">
      {#if title}
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
      {/if}
      
      {#if subTitle}
        <div class="prose prose-lg max-w-none mx-auto">
          <RichText value={subTitle} textClass="text-lg text-gray-600" />
        </div>
      {/if}
      
      <form class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <input 
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button 
            type="submit"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </div>
        
        {#if helperText}
          <div class="text-sm text-gray-500">
            <RichText value={helperText} textClass="text-sm text-gray-500" />
          </div>
        {/if}
      </form>
    </div>
  </div>
</section>