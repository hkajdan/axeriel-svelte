<script lang="ts">
  /**
   * Reusable Card Component
   * 
   * Features:
   * - White background with subtle shadows
   * - Configurable shadow levels
   * - Rounded corners with multiple size options
   * - Hover states for interactive cards
   * - Link support for clickable cards
   * 
   * Usage:
   * <Card shadow="sm" rounded="md">
   *   <!-- Card content -->
   * </Card>
   */
  
  export let hoverable = true;
  export let interactive = false;
  export let href: string | undefined = undefined;
  export let shadow: 'none' | 'sm' | 'md' = 'sm';
  export let rounded: 'sm' | 'md' | 'lg' = 'md';

  // Shadow classes - subtle shadows as requested
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md'
  };

  // Rounded classes
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  };

  // Hover classes for interactive cards
  const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow duration-300' : '';

  // Interactive classes
  const interactiveClasses = interactive ? 'cursor-pointer' : '';
</script>

{#if href}
  <a
    href={href}
    class="block bg-white {shadowClasses[shadow]} border border-neutral-200 {roundedClasses[rounded]} {hoverClasses} {interactiveClasses}"
  >
    <div class="p-6">
      <slot />
    </div>
  </a>
{:else}
  <div
    class="bg-white {shadowClasses[shadow]} border border-neutral-200 {roundedClasses[rounded]} {hoverClasses} {interactiveClasses}"
  >
    <div class="p-6">
      <slot />
    </div>
  </div>
{/if}

<style>
  /* Ensure smooth transitions for hover effects */
  div:hover {
    transition: box-shadow 300ms ease;
  }
</style>