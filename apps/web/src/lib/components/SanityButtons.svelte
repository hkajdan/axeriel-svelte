<script lang="ts">
  import type { Button } from '$lib/sanity/sanity.types'
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links'
  import { page } from '$app/stores'

  interface Props {
    buttons?: Button[];
    justify?: 'center' | 'start' | 'end';
  }

  let { buttons = [], justify = 'center' }: Props = $props();
  const lang = $derived($page.data.lang ?? 'fr');

  function getButtonClasses(variant: Button['variant']) {
    switch (variant) {
      case 'default':
        return 'btn-primary'
      case 'secondary':
        return 'btn-secondary'
      case 'outline':
        return 'btn-outline'
      case 'link':
      default:
        return 'text-primary-500 underline hover:no-underline'
    }
  }

  const justifyClass = $derived(
    justify === 'start' ? 'justify-start' : justify === 'end' ? 'justify-end' : 'justify-center'
  );
</script>

{#if buttons && buttons.length > 0}
  <div class="flex flex-wrap gap-4 {justifyClass}">
    {#each buttons as button (button._key)}
      <a
        href={resolveSanityUrl(button.url, lang)}
        target={getLinkTarget(button.url)}
        rel={getLinkRel(button.url)}
        class={getButtonClasses(button.variant)}
      >
        {button.text}
      </a>
    {/each}
  </div>
{/if}
