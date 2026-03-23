<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    hoverable?: boolean;
    interactive?: boolean;
    href?: string;
    shadow?: 'none' | 'sm' | 'md';
    rounded?: 'sm' | 'md' | 'lg';
    children: Snippet;
  }

  let {
    hoverable = true,
    interactive = false,
    href = undefined,
    shadow = 'sm',
    rounded = 'md',
    children
  }: Props = $props();

  const shadowClasses: Record<string, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md'
  };

  const roundedClasses: Record<string, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  };

  const hoverClasses = $derived(hoverable ? 'hover:shadow-md transition-shadow duration-300' : '');
  const interactiveClasses = $derived(interactive ? 'cursor-pointer' : '');
</script>

{#if href}
  <a
    {href}
    class="block bg-white {shadowClasses[shadow]} border border-neutral-200 {roundedClasses[rounded]} {hoverClasses} {interactiveClasses}"
  >
    <div class="p-6">
      {@render children()}
    </div>
  </a>
{:else}
  <div
    class="bg-white {shadowClasses[shadow]} border border-neutral-200 {roundedClasses[rounded]} {hoverClasses} {interactiveClasses}"
  >
    <div class="p-6">
      {@render children()}
    </div>
  </div>
{/if}
