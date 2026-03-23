<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    children: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    href = undefined,
    type = 'button',
    fullWidth = false,
    children
  }: Props = $props();

  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses: Record<string, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 transform hover:translate-y-[-1px]',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500 border border-transparent',
    text: 'bg-transparent text-primary-500 hover:text-primary-600 focus-visible:ring-primary-500'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none';
</script>

{#if href}
  <a
    {href}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {fullWidth ? 'w-full' : ''} {disabled ? disabledClasses : ''}"
    onclick={(e) => { if (disabled) e.preventDefault(); }}
    aria-disabled={disabled || undefined}
  >
    {@render children()}
  </a>
{:else}
  <button
    {type}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {fullWidth ? 'w-full' : ''} {disabled ? disabledClasses : ''}"
    {disabled}
  >
    {@render children()}
  </button>
{/if}
