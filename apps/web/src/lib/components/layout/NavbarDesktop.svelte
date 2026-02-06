<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import { urlForImage as urlFor } from '$lib/sanity/image';
    import { resolveSanityUrl } from '$lib/sanity/links';
  
  let props = $props<{
    settings: Settings;
    navbar: Navbar;
  }>();

</script>

<nav class="sticky z-50 bg-white rounded-xl mx-auto max-w-7xl  shadow-sm ">
  <div class="relative flex items-center px-6 h-20 justify-between">
    <!-- Logo -->
    <div class="flex z-50">
      {#if props.settings?.logo?.asset}
        <a href="/">
          <img
            src={urlFor(props.settings.logo).width(120).height(40).url()}
            alt={props.settings.siteTitle || 'Company Logo'}
            class="h-12 w-auto"
          />
  </a>
      {:else}
        <div class="h-8 w-24 rounded flex items-center justify-center text-sm font-medium text-neutral-600">
          {props.settings?.siteTitle || 'Logo'}
        </div>
      {/if}
    </div>

    <!-- Menu principal -->
    <ul class="hidden lg:flex items-center space-x-4">
      {#each props.navbar?.columns as column (column._key || `col-${column._type}-${column.title}`)}
        <li class="group">
          {#if column._type === 'navbarColumn'}
            <button class="flex items-center px-3 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium bg-white">
              {column.title}
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Panel de sous-menu - n'apparaît que si des liens existent -->
            {#if column.links && column.links.length > 0}
              <div class="absolute left-0 mt-4 w-full bg-white rounded-b-md shadow-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="flex h-80 w-full mx-auto p-4">
                  {#each column.links as link (link._key || `link-${link.name}-${link.description}`)}
                    <a 
                      href={resolveSanityUrl(link.url)}
                      class="flex-1 p-4 flex flex-row items-center transition-colors relative rounded-md overflow-hidden h-full w-full bg-white hover:bg-gray-50"
                    >
                      {#if link.image?.asset}
                        <img
                          src={urlFor(link.image).width(200).height(200).url()}
                          alt={link.name || ''}
                          class="absolute w-full h-full brightness-50 object-cover rounded-md hover:scale-105 transition-transform duration-200 ease-in-out"
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
              class="px-3 py-2 text-white bg-blue rounded-full bg-primary-500 hover:bg-primary-600 transition-colors font-medium"
            >
              {column.name}
            </a>
          {/if}
        </li>
      {/each}
      
      <!-- Boutons -->
      {#if props.navbar?.buttons && props.navbar.buttons.length > 0}
        <li class="flex items-center space-x-2 ml-4">
          {#each props.navbar.buttons as button (button._key || `btn-${button.label}`)}
            <a 
              href={button.url?.href || '#'} 
              class="px-4 py-2 border border-primary-600 text-primary-600 bg-primary-500 hover:text-white transition-colors text-sm font-medium"
            >
              {button.label}
            </a>
          {/each}
        </li>
      {/if}
    </ul>
  </div>
</nav>

