<script lang="ts">
  import type {LayoutProps} from './$types'
  import './layout.css'
  import NavbarComponent from '$lib/components/layout/Navbar.svelte'
  import FooterComponent from '$lib/components/layout/Footer.svelte'
  import type { Author } from '$lib/sanity/sanity.types'
  import { onNavigate, afterNavigate } from '$app/navigation'
  import { PUBLIC_SITE_URL } from '$env/static/public'
  import { urlForImage } from '$lib/sanity/image'

  const {data, children}: LayoutProps = $props()
  const navbar = $derived(data.navbar)
  const footer = $derived(data.footer)
  const settings = $derived(data.settings)
  const pageAuthor = $derived((data as any).pageAuthor as Author | null)

  const siteUrl = PUBLIC_SITE_URL.replace(/\/$/, '')
  const orgJsonLd = $derived(settings ? {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteTitle,
    url: siteUrl,
    ...(settings.logo?.asset ? { logo: urlForImage(settings.logo).width(600).url() } : {}),
    ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
    ...(settings.socialLinks ? {
      sameAs: [
        settings.socialLinks.linkedin,
        settings.socialLinks.facebook,
      ].filter(Boolean)
    } : {}),
  } : null)

  // Scroll to anchor after navigation — needed because lazy-loaded blocks
  // may not be in the DOM when SvelteKit first tries to scroll
  afterNavigate(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const tryScroll = (attempts = 0) => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 10) {
        requestAnimationFrame(() => tryScroll(attempts + 1));
      }
    };
    // Small delay to let lazy components mount
    requestAnimationFrame(() => tryScroll());
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (navigation.type === 'popstate') return;
    // Skip view transition for same-page navigations (e.g. anchor links)
    if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>


<svelte:head>
  {#if orgJsonLd}
    {@html `<script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>`}
  {/if}
</svelte:head>

<!-- Layout container -->
<div class="flex flex-col min-h-screen">
  <!-- Header/Navbar will go here -->
  <header>
    {#if navbar && settings}
      <NavbarComponent navbar={navbar as any} settings={settings as any} />
    {/if}
  </header>

  <!-- Main content -->
  <main class="flex-1 min-h-screen" style="view-transition-name: main-content;">
    {@render children()}
  </main>

  <!-- Footer -->
  <FooterComponent {footer} {pageAuthor} {settings} />
</div>
