<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
  
  export let value: any
  export let textClass: string = ''
</script>

<div class="rich-text {textClass}">
  <PortableText value={value} />
</div>

<style>
  .rich-text :global(strong) {
    @apply font-bold;
  }
  
  .rich-text :global(em) {
    @apply italic;
  }
  
  .rich-text :global(code) {
    @apply bg-neutral-100 px-2 py-1 rounded font-mono text-sm;
  }
  
  .rich-text :global(a) {
    @apply text-primary-500 underline hover:no-underline;
  }
  
  .rich-text :global(h2) {
    @apply text-3xl font-bold mt-8 mb-4;
  }
  
  .rich-text :global(h3) {
    @apply text-2xl font-bold mt-6 mb-3;
  }
  
  .rich-text :global(h4) {
    @apply text-xl font-bold mt-4 mb-2;
  }
  
  .rich-text :global(h5) {
    @apply text-lg font-bold mt-3 mb-1;
  }
  
  .rich-text :global(h6) {
    @apply text-base font-bold mt-2 mb-1;
  }
  
  .rich-text :global(p) {
    @apply mb-4;
  }
  
  .rich-text :global(blockquote) {
    @apply border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-4;
  }
  
  .rich-text :global(ul) {
    @apply list-disc pl-6 mb-4;
  }
  
  .rich-text :global(ol) {
    @apply list-decimal pl-6 mb-4;
  }
  
  .rich-text :global(li) {
    @apply mb-1;
  }
</style>
