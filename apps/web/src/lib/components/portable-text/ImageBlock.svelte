<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: CustomBlockComponentProps
  }

  let { portableText }: Props = $props()
  let value = $derived(portableText.value as any)
</script>

{#if value && value.asset}
  <div class="my-6">
    <img
      src={value.asset.url}
      alt={value.alt || ''}
      class="max-w-full h-auto rounded-lg"
    />
    {#if value.caption}
      <p class="text-sm text-neutral-500 mt-2 text-center">{value.caption}</p>
    {/if}
  </div>
{/if}
