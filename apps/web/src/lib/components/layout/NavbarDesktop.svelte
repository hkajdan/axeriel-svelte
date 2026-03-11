<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import { urlForImage as urlFor } from '$lib/sanity/image';
  import { resolveSanityUrl } from '$lib/sanity/links';

  let props = $props<{
    settings: Settings;
    navbar: Navbar;
  }>();

  let isVisible = $state(true);
  let lastScrollPosition = $state(0);
  let navbarHeight = $state(0);
  let showSubmenu = $state(true);

  $effect(() => {
    const navbarElement = document.querySelector('nav');
    if (navbarElement) navbarHeight = navbarElement.offsetHeight;

    const handleScroll = () => {
      const current = window.scrollY;
      if (current > navbarHeight) {
        isVisible = current <= lastScrollPosition;
      } else {
        isVisible = true;
      }
      lastScrollPosition = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="fixed z-50 bg-white rounded-xl mx-auto max-w-7xl shadow-sm transition-transform duration-300 ease-in-out left-0 right-0 top-10" 
     style="transform: {isVisible ? 'translateY(0)' : 'translateY(-250%)'}">
  <div class="relative flex items-center pl-6 justify-between">
    <!-- Logo -->
    <div class="flex z-50">
      {#if props.settings?.logo?.asset}
        <a href="/">
          <img
            src={urlFor(props.settings.logo).width(120).height(40).url()}
            alt={props.settings.siteTitle || 'Company Logo'}
            class="h-12 w-auto"
            loading="eager"
            fetchpriority="high"
          />
  </a>
      {:else}
        <div class=" w-24 rounded flex items-center justify-center text-sm font-medium text-neutral-600">
          {props.settings?.siteTitle || 'Logo'}
        </div>
      {/if}
    </div>

    <!-- Menu principal -->
    <ul class="hidden lg:flex items-center h-18">
      {#each props.navbar?.columns as column (column._key || `col-${column._type}-${column.title}`)}
        <li class="group nth-[n+5]:bg-primary-500 px-4 h-full" >
          {#if column._type === 'navbarColumn'}
            <button class="flex items-center text-neutral-700 group-hover:text-primary-500 h-full transition-colors " onmouseenter={() => showSubmenu = true}>
              {column.title}
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
             <!-- Submenu panel - only appears if links exist -->
             {#if column.links && column.links.length > 0}
               <div class="absolute left-0 -mt-2 w-full bg-white rounded-b-md shadow-lg opacity-0 invisible transition-all duration-200 -z-10"
                    class:group-hover:opacity-100={showSubmenu}
                    class:group-hover:visible={showSubmenu}
                    class:opacity-100={!showSubmenu && false}
                    class:visible={!showSubmenu && false}
               >
                <div class="flex h-80 space-x-4 w-full p-4 pt-6">
                   {#each column.links as link (link._key || `link-${link.name}-${link.description}`)}
                     <a 
                       href={resolveSanityUrl(link.url)}
                       class="flex flex-row items-center transition-colors relative rounded-md overflow-hidden h-full w-full bg-white hover:bg-gray-50"
                       onclick={() => showSubmenu = false}
                     >
                      {#if link.image?.asset} <img
                          src={urlFor(link.image).width(200).height(200).url()}
                          alt={link.name || ''}
                          class="absolute w-full h-full overflow-hidden brightness-50 object-cover hover:scale-105 transition-transform duration-200 ease-in-out"
                          loading="eager"
                        />
                      {/if}
                      <div class="absolute bottom-4 left-4 text-white z-10">
                        <div class="text-lg font-semibold">{link.name}</div>
                        {#if link.description}
                          <p class="text-sm leading-snug line-clamp-1">{link.description}</p>
                        {/if}
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
            
          {:else}
            <a 
              href={resolveSanityUrl(column.url)}
              class="flex items-center text-white transition-colors h-full"
            >
              {column.name}
            </a>
          {/if}
        </li>
      {/each}
      
      <li class="flex items-center h-full">
        <a 
          href="#contact" 
          class="px-4 py-6 bg-primary-500 text-white"
          aria-label="Contact"
        >
          Contact
        </a>
      </li>
      
      <!-- LinkedIn Button -->
      {#if props.settings?.socialLinks?.linkedin}
        <li class="flex items-center h-full">
          <a 
            href={props.settings.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center flex-row px-4 pr-6 py-6 rounded-r-xl h-full text-white bg-primary-500 overflow-hidden"
            aria-label="LinkedIn"
          >
            <!-- LinkedIn SVG Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </li>
      {/if}
      
      
    </ul>
  </div>
</nav>

