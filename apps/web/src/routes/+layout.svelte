<script lang="ts">
  import {PreviewMode,VisualEditing} from '@sanity/sveltekit'
  import type {LayoutProps} from './$types'
  import './layout.css'
  import NavbarComponent from '$lib/components/layout/Navbar.svelte'
  import FooterComponent from '$lib/components/layout/Footer.svelte'
  import type { NavbarQueryResult as NavbarType, FooterQueryResult as FooterType, SettingsQueryResult as SettingsType, Author } from '$lib/sanity/sanity.types'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  
  const {data, children}: LayoutProps = $props()
  const {previewEnabled, navbar, footer, settings} = data
  const pageAuthor = (data as any).pageAuthor as Author | null
  
  // Debug: log des données pour le diagnostic
  console.log('Layout data:', { navbar, footer, settings, pageAuthor })
  
  // Vérification que les données nécessaires sont présentes
  onMount(() => {
    if (!navbar) {
      console.warn('Navbar data is missing')
    }
    if (!settings) {
      console.warn('Settings data is missing')
    }
    if (!footer) {
      console.warn('Footer data is missing')
    }
  })
  onNavigate((navigation) => {
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500;600;700&display=swap" rel="stylesheet">

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
    <!-- Layout container -->
    <div class="flex flex-col min-h-screen">
      <!-- Header/Navbar will go here -->
      <header>
        {#if navbar && settings}
          <NavbarComponent navbar={navbar as any} settings={settings as any} />
        {:else}
          <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3">
            <p>No navbar data available</p>
          </div>
        {/if}
      </header>
      
      <!-- Main content -->
      <main class="flex-1">
        {@render children()}
      </main>
      
      <!-- Footer -->
      <FooterComponent {footer} {pageAuthor} {settings} />
    </div>
    </VisualEditing>
</PreviewMode>
