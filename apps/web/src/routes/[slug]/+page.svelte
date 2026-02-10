<script lang="ts">
  import type { PageProps } from './$types';
  import { PageBuilder } from '$lib/components';

  const { data }: PageProps = $props();
  
  let page = $derived(data.page);
</script>

{#if page}
  {#if page.pageBuilder && page.pageBuilder.length > 0}
    <PageBuilder pageBuilder={page.pageBuilder} />
  {:else}
    <div class="text-center py-12">
      <p class="text-gray-500">No page builder content available</p>
      <p class="text-sm text-gray-400 mt-2">This page is ready for content from Sanity CMS</p>
    </div>
  {/if}
{:else}
  <div class="text-center py-12">
    <p class="text-gray-500">Page not found</p>
    <p class="text-sm text-gray-400 mt-2">The requested page could not be found</p>
  </div>
{/if}
