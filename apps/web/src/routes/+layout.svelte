<script lang="ts">
  import type {LayoutProps} from './$types'
  import './layout.css'
  import NavbarComponent from '$lib/components/layout/Navbar.svelte'
  import FooterComponent from '$lib/components/layout/Footer.svelte'
  import type { Author } from '$lib/sanity/sanity.types'
  import { onNavigate } from '$app/navigation'

  const {data, children}: LayoutProps = $props()
  const {navbar, footer, settings} = data
  const pageAuthor = $derived((data as any).pageAuthor as Author | null)

  onNavigate((navigation) => {
	if (!document.startViewTransition) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

<!-- Layout container -->
<div class="flex flex-col min-h-screen">
  <!-- Header/Navbar will go here -->
  <header>
    {#if navbar && settings}
      <NavbarComponent navbar={navbar as any} settings={settings as any} />
    {/if}
  </header>

  <!-- Main content -->
  <main class="flex-1 min-h-screen">
    {@render children()}
  </main>

  <!-- Footer -->
  <FooterComponent {footer} {pageAuthor} {settings} />
</div>
