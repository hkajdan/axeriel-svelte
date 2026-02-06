<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import NavbarDesktop from './NavbarDesktop.svelte';
  
  let props = $props<{
    settings: Settings;
    navbar: Navbar;
    isMobile?: boolean;
  }>();

  // Logique pour détecter si c'est mobile (à implémenter plus tard) On pourrait utiliser un store ou un media query
  // Pour l'instant, on utilise une prop isMobile qui peut être passée
  // ou on pourrait utiliser une approche plus sophistiquée avec onMount et window.innerWidth

  // Component NavbarMobile à créer plus tard
  // import NavbarMobile from './NavbarMobile.svelte';

  // Logique de switching entre desktop et mobile
  // if (props.isMobile) {
  //   <NavbarMobile navbar={props.navbar} settings={props.settings} />
  // } else {
  //   <NavbarDesktop navbar={props.navbar} settings={props.settings} />
  // }
</script>

<!-- Pour l'instant, on utilise uniquement NavbarDesktop -->
<!-- Le switching mobile sera implémenté quand NavbarMobile sera créé -->
<NavbarDesktop navbar={props.navbar} settings={props.settings} />

<style>
  /* Styles globaux pour la navbar si nécessaire */
  :global(body) {
    /* Ajout d'un padding top pour permettre au sticky de fonctionner correctement */
    padding-top: 20px;
  }
</style>
