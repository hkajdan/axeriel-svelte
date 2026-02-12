<script lang="ts">
  import type { Settings, Navbar } from '$lib/sanity/sanity.types';
  import { urlForImage as urlFor } from '$lib/sanity/image';
  import { resolveSanityUrl } from '$lib/sanity/links';
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  let props = $props<{
    settings: Settings;
    navbar: Navbar;
  }>();

  // State for mobile menu
  let isMenuOpen = $state(false);
  let activeAccordion = $state<string | null>(null);

  // Toggle menu
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    if (!isMenuOpen) {
      activeAccordion = null; // Close all accordions when menu closes
    }
  };

  // Toggle accordion
  const toggleAccordion = (key: string) => {
    activeAccordion = activeAccordion === key ? null : key;
  };

  // Close menu when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger-button');
    
    if (menu && hamburger && 
        !menu.contains(event.target as Node) && 
        !hamburger.contains(event.target as Node)) {
      isMenuOpen = false;
      activeAccordion = null;
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<!-- Transparent navbar for mobile -->
<nav class="fixed z-50 w-full top-0 left-0 right-0">
  <div class="flex items-center justify-between p-6 fixed top-0 left-0 right-0 z-50 bg-transparent">
    <!-- Logo - Increased size, stays visible when menu open -->
    <div class="flex items-center relative z-50">
      {#if props.settings?.logo?.asset}
        <a href="/">
          <img
            src={urlFor(props.settings.logo).width(150).height(50).url()}
            alt={props.settings.siteTitle || 'Company Logo'}
            class="h-12 w-auto transition-all duration-300"
          />
        </a>
      {:else}
        <div class="w-28 rounded flex items-center justify-center text-lg font-medium {isMenuOpen ? 'text-gray-800' : 'text-white'}">
          {props.settings?.siteTitle || 'Logo'}
        </div>
      {/if}
    </div>

    <!-- Hamburger menu button - transforms to close icon when open -->
    <button
      id="hamburger-button"
      onclick={toggleMenu}
      class="{isMenuOpen ? 'text-gray-800' : 'text-white'} focus:outline-none p-2 relative z-50"
      aria-label="Toggle menu"
    >
      {#if isMenuOpen}
        <!-- Close icon (X) -->
        <svg class="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      {:else}
        <!-- Hamburger icon -->
        <svg class="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile menu panel - full screen with quick animation -->
  {#if isMenuOpen}
    <div
      id="mobile-menu"
      class="fixed top-0 right-0 h-full w-full bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-40"
      in:fly={{ x: 100, opacity: 0, duration: 300, easing: cubicOut }}
      out:fly={{ x: 100, opacity: 0, duration: 300, easing: cubicIn }}
    >
      <div class="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto">

        <!-- Menu items with staggered animation -->
        <ul class="space-y-2">
          {#each props.navbar?.columns as column (column._key || `col-${column._type}-${column.title}`)}
            {#if column._type === 'navbarColumn'}
              <li>
                <button
                  onclick={() => toggleAccordion(column._key || '')}
                  class="w-full flex items-center justify-between py-4 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200"
                >
                  <span class="font-medium">{column.title}</span>
                  <svg
                    class={`w-5 h-5 transform transition-transform ${activeAccordion === (column._key || '') ? 'rotate-180' : 'rotate-0'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Accordion content for submenu items with animation -->
                {#if activeAccordion === (column._key || '') && column.links && column.links.length > 0}
                  <div
                    class="pl-6 pt-2 pb-2 space-y-2 border-l-2 border-gray-200 ml-2 overflow-hidden transition-all duration-200 ease-in-out"
                    class:max-h-0={activeAccordion !== (column._key || '')}
                    class:max-h-screen={activeAccordion === (column._key || '')}
                  >
                    {#each column.links as link (link._key || `link-${link.name}`)}
                      <a
                        href={resolveSanityUrl(link.url)}
                        class="block py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-200 transform hover:translate-x-1"
                        onclick={toggleMenu}
                      >
                        {link.name}
                      </a>
                    {/each}
                  </div>
                {/if}
              </li>
            {:else if column._type === 'navbarLink'}
              <li>
                <a
                  href={resolveSanityUrl(column.url)}
                  class="block py-4 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-200 transform hover:translate-x-1"
                  onclick={toggleMenu}
                >
                  {column.name}
                </a>
              </li>
            {/if}
          {/each}

          <!-- Contact button with enhanced animation -->
          <li class="mt-8">
            <a
              href="#contact"
              class="block w-full py-4 px-6 text-center bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              onclick={toggleMenu}
            >
              Contact
            </a>
          </li>

          <!-- LinkedIn Button with enhanced animation -->
          {#if props.settings?.socialLinks?.linkedin}
            <li class="mt-4">
              <a
                href={props.settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center py-4 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="mr-3">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  {/if}

  <!-- Overlay when menu is open with backdrop blur -->
  {#if isMenuOpen}
    <button
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 cursor-default"
      onclick={toggleMenu}
      aria-label="Close menu"
      in:fade={{ duration: 300 }}
      out:fade={{ duration: 300 }}
    ></button>
  {/if}
</nav>

<style>
  /* Ensure the navbar stays on top of other content */
  nav {
    z-index: 1000;
  }
  
  /* Smooth transitions for menu */
  #mobile-menu {
    transform: translateX(0);
  }
  
  /* Add some spacing for content below navbar */
  :global(body) {
    padding-top: 5rem; /* Adjust based on your navbar height */
  }
  
  /* Enhanced accordion animation */
  .accordion-content {
    transition: all 0.3s ease-in-out;
  }
  
  /* Hamburger icon animation */
  #hamburger-button:active {
    transform: scale(0.95);
  }
  
  /* Menu item hover effects */
  .menu-item:hover {
    transform: translateX(4px);
  }
  
  /* Panel slide animation */
  .panel-slide-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .panel-slide-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 0.5s ease-out;
  }
  
  .panel-slide-exit {
    transform: translateX(0);
    opacity: 1;
  }
  
  .panel-slide-exit-active {
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.5s ease-in;
  }
</style>