<script lang="ts">
  import type { FooterQueryResult as Footer, Author, Settings } from '$lib/sanity/sanity.types'
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links'
  import RichText from '$lib/components/PortableText.svelte'
  import SanityButtons from '$lib/components/SanityButtons.svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'

  export let footer: Footer | null = null
  export let pageAuthor: Author | null = null
  export let settings: any | null = null

  const currentYear = new Date().getFullYear()

  // Determine contact person (pageAuthor > footer.contactAuthor > fallback)
  $: contactPerson = pageAuthor || footer?.contactAuthor || { name: 'Michel', position: 'expert énergie', image: null, email: null }
  $: contactEmail = (contactPerson as any)?.email || 'contact@axeriel.fr'
  $: contactPhone = footer?.location?.phone
</script>

<!-- Contact Section -->
<section class="mt-12 md:mt-20 p-6 md:p-12 bg-primary-500" id="contact">
  {#if footer?.contact?.richText}
    <RichText
      value={footer.contact.richText}
      textClass="text-white text-2xl md:text-4xl w-full md:w-3/4 text-center md:text-left"
    />
  {/if}

  <div class="container mx-auto flex flex-col md:flex-row justify-between items-center w-full py-8 md:py-10 text-center gap-8 md:gap-16 px-4 md:px-20">
    <!-- Left: Logo + Contact info -->
    <div class="w-full md:w-1/2 flex flex-col items-center gap-6 md:gap-12 text-center">
      {#if settings?.logo}
        <span class="flex items-center justify-center gap-4">
          <SanityImage
            image={settings.logo}
            alt="logo"
            imgClass="w-24 md:w-32"
          />
        </span>
      {/if}
      <div class="text-white text-lg md:text-3xl flex flex-col items-center gap-3 md:gap-4">
        {#if contactPhone}
          <span class="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span class="text-base md:text-3xl">{contactPhone}</span>
          </span>
        {/if}
        <a href="mailto:{contactEmail}" class="flex flex-col md:flex-row gap-2 md:gap-8 items-center hover:text-primary-200 transition-colors">
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span class="text-base md:text-3xl">{contactEmail}</span>
        </a>
      </div>
    </div>

    <!-- Right: Contact person -->
    <div class="text-lg md:text-3xl text-white w-full md:w-1/2 items-center gap-6 md:gap-8">
      <div class="flex flex-col items-center text-center gap-6 md:gap-12">
        {#if (contactPerson as any)?.image?.asset}
          <div class="rounded-full w-24 h-24 md:w-32 md:h-32 overflow-hidden">
            <SanityImage
              image={(contactPerson as any).image}
              alt={(contactPerson as any).name || 'Contact person'}
              imgClass="w-full h-full object-cover"
            />
          </div>
        {:else}
          <div class="rounded-full w-24 h-24 md:w-32 md:h-32 bg-neutral-500 flex items-center justify-center"></div>
        {/if}
        <a href="mailto:{contactEmail}" class="hover:text-primary-200 transition-colors text-center">
          <div class="text-base md:text-3xl">
            Contactez {(contactPerson as any)?.name || 'notre expert'}
            <br />
            {#if (contactPerson as any)?.position}notre {(contactPerson as any).position}{/if}
            {` ->`}
          </div>
        </a>
      </div>
    </div>
  </div>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.068314343158!2d5.801346076206103!3d45.18571335197695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478a5f839ad0ed77%3A0xba8ae9e4d35aff49!2sAxeriel!5e0!3m2!1sfr!2sfr!4v1750261109837!5m2!1sfr!2sfr"
    height="300"
    loading="lazy"
    class="rounded-md w-full mt-8"
    title="Google Maps - Axeriel location"
  ></iframe>
</section>

<!-- Footer Section -->
<section class="pt-12 md:pt-20 pb-8 bg-neutral-500 text-white">
  <div class="container mx-auto">
    <footer class="py-8 md:py-12">
      <div class="flex flex-col items-center justify-between gap-12 md:gap-8 text-center lg:flex-row lg:text-left mx-auto max-w-7xl px-4 md:px-6">
        <!-- Logo + subtitle -->
        <div class="flex w-full lg:max-w-96 shrink flex-col items-center gap-6 lg:items-start">
          <div class="w-full">
            {#if settings?.logo}
              <span class="flex items-center justify-center gap-4 lg:justify-start">
                <SanityImage
                  image={settings.logo}
                  alt="logo"
                  imgClass="w-20 md:w-24 lg:w-32"
                />
              </span>
            {/if}
            {#if settings?.subtitle}
              <p class="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-white">{settings.subtitle}</p>
            {/if}
          </div>

          <!-- Social icons -->
          {#if settings?.socialLinks}
            <ul class="flex items-center space-x-6 text-white">
              {#if settings.socialLinks.instagram}
                <li><a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.facebook}
                <li><a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.linkedin}
                <li><a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.twitter}
                <li><a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.youtube}
                <li><a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></li>
              {/if}
            </ul>
          {/if}
        </div>

        <!-- Navigation columns -->
        {#if footer?.columns && footer.columns.length > 0}
          <div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-8 lg:gap-16 xl:gap-28 w-full lg:w-auto lg:mr-20">
            {#each footer.columns as column}
              <div class="text-center lg:text-left">
                {#if column.title}
                  <h3 class="mb-3 md:mb-4 lg:mb-6 font-semibold uppercase text-sm md:text-base text-white">{column.title}</h3>
                {/if}
                {#if column.links && column.links.length > 0}
                  <ul class="space-y-2 md:space-y-3 lg:space-y-4 text-xs md:text-sm">
                    {#each column.links as link}
                      {#if link.url}
                        <li class="font-medium hover:text-primary-500">
                          <a
                            href={resolveSanityUrl(link.url as any)}
                            target={getLinkTarget(link.url as any)}
                            rel={getLinkRel(link.url as any)}
                          >
                            {link.name}
                          </a>
                        </li>
                      {/if}
                    {/each}
                  </ul>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 md:mt-16 lg:mt-20 border-t pt-6 md:pt-8">
        <div class="flex flex-col justify-between gap-4 text-center text-xs md:text-sm font-normal lg:flex-row lg:items-center lg:text-left mx-auto max-w-7xl px-4 md:px-6">
          <p class="text-gray-300">© {currentYear} {settings?.siteTitle || 'Axeriel'}. All rights reserved.</p>
          <ul class="flex flex-col gap-2 md:flex-row md:gap-4 lg:justify-start">
            <li class="hover:text-primary-500 transition-colors"><a href="/terms">Terms and Conditions</a></li>
            <li class="hover:text-primary-500 transition-colors"><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</section>