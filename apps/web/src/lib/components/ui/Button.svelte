<script lang="ts">
  /**
   * Reusable Button Component
   * 
   * Variants:
   * - primary: Blue background, white text, subtle hover lift
   * - secondary: Grey background, white text
   * - outline: Transparent with blue border
   * - ghost: Transparent with hover background
   * - text: Text-only with hover color change
   * 
   * Sizes:
   * - sm: Compact button
   * - md: Default size
   * - lg: Prominent CTA
   */
  
  export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let href: string | undefined = undefined;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let fullWidth = false;

  // Base classes with subtle transitions
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant classes with brand colors
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 transform hover:translate-y-[-1px]',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500 border border-transparent',
    text: 'bg-transparent text-primary-500 hover:text-primary-600 focus:ring-primary-500'
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none';
</script>

{#if href}
  <a
    href={href}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {widthClasses} {disabled ? disabledClasses : ''}"
    on:click|preventDefault={(e) => disabled ? e.preventDefault() : null}
  >
    <slot />
  </a>
{:else}
  <button
    type={type}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {widthClasses} {disabled ? disabledClasses : ''}"
    disabled={disabled}
  >
    <slot />
  </button>
{/if}

<style>
  /* Ensure focus ring is visible for accessibility */
  button:focus, a:focus {
    outline: none;
  }
</style>