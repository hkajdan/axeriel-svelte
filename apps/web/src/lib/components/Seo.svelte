<script lang="ts">
  import { page } from '$app/stores';
  import { PUBLIC_SITE_URL } from '$env/static/public';
  import { urlForImage } from '$lib/sanity/image';
  import type { SupportedLang } from '$lib/utils/i18n';

  interface Props {
    title?: string | null;
    siteName?: string | null;
    description?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: any | null;
    noIndex?: boolean;
    type?: 'website' | 'article';
    jsonLd?: Record<string, any> | null;
  }

  const {
    title = null,
    siteName = null,
    description = null,
    ogTitle = null,
    ogDescription = null,
    ogImage = null,
    noIndex = false,
    type = 'website',
    jsonLd = null,
  }: Props = $props();

  const siteUrl = PUBLIC_SITE_URL.replace(/\/$/, '');

  // Build canonical URL from current page
  const canonicalUrl = $derived(`${siteUrl}${$page.url.pathname}`);

  // Build hreflang alternates
  const lang = $derived(($page.data.lang ?? 'fr') as SupportedLang);
  const pathname = $derived($page.url.pathname);

  // Compute the path without lang prefix for building alternates
  const basePath = $derived(
    pathname.startsWith('/en/') ? pathname.slice(3) :
    pathname === '/en' ? '/' :
    pathname
  );

  const hreflangs = $derived([
    { lang: 'fr', href: `${siteUrl}${basePath}` },
    { lang: 'en', href: `${siteUrl}/en${basePath === '/' ? '' : basePath}` },
    { lang: 'x-default', href: `${siteUrl}${basePath}` },
  ]);

  // Resolve OG image URL
  const ogImageUrl = $derived(
    ogImage?.asset
      ? urlForImage(ogImage).width(1200).height(630).url()
      : null
  );

  // Effective values (with fallback chain)
  const effectiveOgTitle = $derived(ogTitle || title);
  const effectiveOgDescription = $derived(ogDescription || description);

  // Locale for og:locale
  const ogLocale = $derived(lang === 'en' ? 'en_US' : 'fr_FR');
  const ogLocaleAlternate = $derived(lang === 'en' ? 'fr_FR' : 'en_US');

  // BreadcrumbList JSON-LD from URL segments
  const breadcrumbJsonLd = $derived(() => {
    const segments = basePath.split('/').filter(Boolean);
    if (segments.length === 0) return null;

    const homeLabel = lang === 'en' ? 'Home' : 'Accueil';
    const items = [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: `${siteUrl}${lang === 'en' ? '/en' : '/'}` },
    ];

    let currentPath = '';
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      const href = lang === 'en' ? `${siteUrl}/en${currentPath}` : `${siteUrl}${currentPath}`;
      items.push({
        '@type': 'ListItem',
        position: i + 2,
        name: title && i === segments.length - 1 ? title : segments[i].replace(/-/g, ' '),
        item: href,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  });

  // Default WebPage JSON-LD
  const defaultJsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: canonicalUrl,
    inLanguage: lang,
  });

  const effectiveJsonLd = $derived(jsonLd || defaultJsonLd);
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if noIndex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <!-- Canonical -->
  <link rel="canonical" href={canonicalUrl} />

  <!-- hreflang alternates -->
  {#each hreflangs as alt}
    <link rel="alternate" hreflang={alt.lang} href={alt.href} />
  {/each}

  <!-- Open Graph -->
  {#if effectiveOgTitle}
    <meta property="og:title" content={effectiveOgTitle} />
  {/if}
  {#if effectiveOgDescription}
    <meta property="og:description" content={effectiveOgDescription} />
  {/if}
  {#if ogImageUrl}
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {/if}
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content={type} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:locale:alternate" content={ogLocaleAlternate} />
  {#if siteName}
    <meta property="og:site_name" content={siteName} />
  {/if}

  <!-- Twitter Card -->
  <meta name="twitter:card" content={ogImageUrl ? 'summary_large_image' : 'summary'} />
  {#if effectiveOgTitle}
    <meta name="twitter:title" content={effectiveOgTitle} />
  {/if}
  {#if effectiveOgDescription}
    <meta name="twitter:description" content={effectiveOgDescription} />
  {/if}
  {#if ogImageUrl}
    <meta name="twitter:image" content={ogImageUrl} />
  {/if}

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(effectiveJsonLd)}</script>`}

  <!-- BreadcrumbList JSON-LD -->
  {#if breadcrumbJsonLd()}
    {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd())}</script>`}
  {/if}
</svelte:head>
