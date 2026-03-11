<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import NavbarDesktop from './NavbarDesktop.svelte';
  import NavbarMobile from './NavbarMobile.svelte';

  let props = $props<{
    settings: Settings;
    navbar: Navbar;
  }>();

  let isMobile = $state(false);

  $effect(() => {
    const check = () => { isMobile = window.innerWidth < 1024; };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  });
</script>

{#if isMobile}
  <NavbarMobile navbar={props.navbar} settings={props.settings} />
{:else}
  <NavbarDesktop navbar={props.navbar} settings={props.settings} />
{/if}

