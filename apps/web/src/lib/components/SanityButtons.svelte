<script lang="ts">
  import type { Button } from '$lib/sanity/sanity.types'
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links'
  
  export let buttons: Button[] = []
  export let justify: 'center' | 'start' | 'end' = 'center'
  
  /**
   * Map Sanity button variants to Tailwind classes
   */
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
  
  /**
   * Get justify classes for flex container
   */
  function getJustifyClasses() {
    switch (justify) {
      case 'start':
        return 'justify-start'
      case 'end':
        return 'justify-end'
      case 'center':
      default:
        return 'justify-center'
    }
  }
</script>

{#if buttons && buttons.length > 0}
  <div class="flex flex-wrap gap-4 {getJustifyClasses()}">
    {#each buttons as button}
      <a
        href={resolveSanityUrl(button.url)}
        target={getLinkTarget(button.url)}
        rel={getLinkRel(button.url)}
        class={getButtonClasses(button.variant)}
      >
        {button.text}
      </a>
    {/each}
  </div>
{/if}