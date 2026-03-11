<script lang="ts">
  import type { PageProps } from './$types';
  import { PageBuilder } from '$lib/components';

  const { data }: PageProps = $props();
</script>

{#if data.page?.pageBuilder?.length}
  <PageBuilder pageBuilder={data.page.pageBuilder} />
{/if}
