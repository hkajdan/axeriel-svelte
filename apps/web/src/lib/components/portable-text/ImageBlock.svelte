<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte'
  import { urlForImage } from '$lib/sanity/image'

  interface Props {
    portableText: CustomBlockComponentProps
  }

  let { portableText }: Props = $props()
  let value = $derived(portableText.value as any)
</script>

{#if value && value.asset}
  <div class="my-6">
    <img
      src={value.asset._ref ? urlForImage(value).width(1200).url() : value.asset.url}
      srcset={value.asset._ref
        ? [400, 800, 1200].map(w => `${urlForImage(value).width(w).url()} ${w}w`).join(', ')
        : undefined}
      sizes="(max-width: 768px) 100vw, 800px"
      alt={value.alt || ''}
      class="max-w-full h-auto rounded-lg"
      loading="lazy"
    />
    {#if value.caption}
      <p class="text-sm text-neutral-500 mt-2 text-center">{value.caption}</p>
    {/if}
  </div>
{/if}
