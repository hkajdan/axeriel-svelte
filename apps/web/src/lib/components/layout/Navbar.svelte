<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import NavbarDesktop from './NavbarDesktop.svelte';
  import NavbarMobile from './NavbarMobile.svelte';
  import { onMount, onDestroy } from 'svelte';
  
  let props = $props<{
    settings: Settings;
    navbar: Navbar;
    isMobile?: boolean;
  }>();



  // Logic to detect if it's mobile
  let isMobile = $state(false);

  onMount(() => {
    if (typeof window !== 'undefined') {
      // Check if mobile on initial load
      checkIfMobile();
      
      // Add resize listener
      window.addEventListener('resize', checkIfMobile);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkIfMobile);
    }
  });

  const checkIfMobile = () => {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 1024; // Tailwind's lg breakpoint
    }
  };
</script>

{#if isMobile}
  <NavbarMobile navbar={props.navbar} settings={props.settings} />
{:else}
  <NavbarDesktop navbar={props.navbar} settings={props.settings} />
{/if}

