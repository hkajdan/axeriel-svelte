<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import NavbarDesktop from './NavbarDesktop.svelte';
  import NavbarMobile from './NavbarMobile.svelte';

  let props = $props<{
    settings: Settings;
    navbar: Navbar;
  }>();
</script>

<div class="block lg:hidden">
  <NavbarMobile navbar={props.navbar} settings={props.settings} />
</div>
<div class="hidden lg:block">
  <NavbarDesktop navbar={props.navbar} settings={props.settings} />
</div>
