<script lang="ts">
  import type { FooterQueryResult as Footer, Author, Settings } from '$lib/sanity/sanity.types'
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links'
  import RichText from '$lib/components/PortableText.svelte'
  import SanityButtons from '$lib/components/SanityButtons.svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'

  export let footer: Footer | null = null
  export let pageAuthor: Author | null = null
  export let settings: any | null = null

  // Get current year for copyright
  const currentYear = new Date().getFullYear()
</script>

<footer class="bg-gray-100 border-t border-gray-200 mt-12 py-12">
  <div class="container mx-auto px-4">
    {#if footer}
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Contact Section - 4 columns -->
      <div class="lg:col-span-4 space-y-6">
        {#if footer.contact?.richText}
          <div class="prose prose-sm max-w-none">
            <RichText value={footer.contact.richText} textClass="text-gray-700" />
          </div>
        {/if}

        {#if footer.contact?.buttons && footer.contact.buttons.length > 0}
          <SanityButtons buttons={footer.contact.buttons} justify="start" />
        {/if}

        <!-- Contact Author - use pageAuthor if available, otherwise footer.contactAuthor -->
        {#if pageAuthor}
          <div class="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
            {#if pageAuthor.image?.asset}
              <div class="flex-shrink-0">
                <SanityImage 
                  image={pageAuthor.image}
                  alt={pageAuthor.name || 'Contact author'}
                  imgClass="w-12 h-12 rounded-full object-cover"
                />
              </div>
            {/if}
            <div>
              {#if pageAuthor.name}
                <h4 class="font-semibold text-gray-900">{pageAuthor.name}</h4>
              {/if}
              {#if pageAuthor.position}
                <p class="text-sm text-gray-600">{pageAuthor.position}</p>
              {/if}
              {#if pageAuthor.email}
                <p class="text-sm text-gray-500 mt-1">{pageAuthor.email}</p>
              {/if}
              {#if pageAuthor.bio}
                <p class="text-xs text-gray-400 mt-2">{pageAuthor.bio}</p>
              {/if}
            </div>
          </div>
        {:else if footer.contactAuthor}
          <div class="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
            {#if footer.contactAuthor.image?.asset}
              <div class="flex-shrink-0">
                <SanityImage 
                  image={footer.contactAuthor.image}
                  alt={footer.contactAuthor.name || 'Contact author'}
                  imgClass="w-12 h-12 rounded-full object-cover"
                />
              </div>
            {/if}
            <div>
              {#if footer.contactAuthor.name}
                <h4 class="font-semibold text-gray-900">{footer.contactAuthor.name}</h4>
              {/if}
              {#if footer.contactAuthor.position}
                <p class="text-sm text-gray-600">{footer.contactAuthor.position}</p>
              {/if}
              {#if footer.contactAuthor.email}
                <p class="text-sm text-gray-500 mt-1">{footer.contactAuthor.email}</p>
              {/if}
              {#if footer.contactAuthor.bio}
                <p class="text-xs text-gray-400 mt-2">{footer.contactAuthor.bio}</p>
              {/if}
            </div>
          </div>
        {/if}
      </div>

      <!-- Link Columns - 6 columns -->
      <div class="lg:col-span-6">
        {#if footer.columns && footer.columns.length > 0}
          <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
            {#each footer.columns as column}
              <div class="space-y-4">
                {#if column.title}
                  <h3 class="font-semibold text-gray-900">{column.title}</h3>
                {/if}
                {#if column.links && column.links.length > 0}
                  <ul class="space-y-2">
                    {#each column.links as link}
                      {#if link.url}
                        <li>
                          <a 
                            href={resolveSanityUrl(link.url as any)}
                            target={getLinkTarget(link.url as any)}
                            rel={getLinkRel(link.url as any)}
                            class="text-gray-600 hover:text-primary-500 transition-colors"
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

      <!-- Location Info - 2 columns -->
      <div class="lg:col-span-2 space-y-4">
        {#if footer.location}
          <div class="space-y-2">
            {#if footer.location.title}
              <h3 class="font-semibold text-gray-900">{footer.location.title}</h3>
            {/if}
            {#if footer.location.address}
              <p class="text-gray-600">{footer.location.address}</p>
            {/if}
            {#if footer.location.city}
              <p class="text-gray-600">{footer.location.city}</p>
            {/if}
            {#if footer.location.phone}
              <p class="text-gray-600">{footer.location.phone}</p>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <!-- Social Icons & Copyright -->
    <div class="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <!-- Social Icons -->
      <div class="flex space-x-4 mb-4 md:mb-0">
        <!-- Social icons would go here - using placeholder for now -->
        {#if settings?.socialLinks}
          {#if settings?.socialLinks?.facebook}
            <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          {/if}
          {#if settings?.socialLinks?.instagram}
            <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          {/if}
          {#if settings?.socialLinks?.linkedin}
            <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          {/if}
          {#if settings?.socialLinks?.twitter}
            <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          {/if}
          {#if settings?.socialLinks?.youtube}
            <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          {/if}
        {/if}
      </div>

      <!-- Copyright -->
      <div class="text-sm text-gray-500">
        © {currentYear} Axeriel. All rights reserved.
      </div>
    </div>
    {:else}
      <div class="text-center py-8">
        <p class="text-gray-500">No footer data available</p>
      </div>
    {/if}
  </div>
</footer>