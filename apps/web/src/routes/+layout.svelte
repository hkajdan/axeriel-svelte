<script lang="ts">
  import {PreviewMode,VisualEditing} from '@sanity/sveltekit'
  import type {LayoutProps} from './$types'
  import './layout.css'
  
  const {children, data}: LayoutProps = $props()
  const {previewEnabled, navbar, footer, settings} = data
  const pageAuthor = (data as any).pageAuthor
  
  // Debug: log the layout data
  console.log('Layout data:', { navbar, footer, settings, pageAuthor })
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500;600;700&display=swap" rel="stylesheet">

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
    <!-- Header/Navbar will go here -->
    <header>
      {#if navbar}
        <div class="bg-blue-600 text-white p-4">
          <h2 class="text-xl font-bold">{navbar.label || 'Navigation'}</h2>
          <p class="text-sm">Navbar data loaded: {navbar.columns?.length || 0} items</p>
        </div>
      {:else}
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3">
          <p>No navbar data available</p>
        </div>
      {/if}
    </header>

    <!-- Main content -->
    <main class="min-h-screen">
      {@render children()}
    </main>

    <!-- Footer will go here -->
    <footer class="bg-gray-100 border-t border-gray-200 mt-12 py-8">
      {#if footer}
        <div class="container mx-auto px-4">
          <h3 class="text-lg font-semibold mb-4">{footer.label || 'Footer'}</h3>
          <p class="text-gray-600">Footer data loaded with {footer.columns?.length || 0} columns</p>
          
          <!-- Display page-specific author if available, otherwise use footer's contactAuthor -->
          {#if pageAuthor}
            <div class="mt-4 p-4 bg-white rounded-lg shadow">
              <h4 class="font-medium">Page Contact</h4>
              <p>{pageAuthor.name} - {pageAuthor.position}</p>
              <p class="text-sm text-gray-500">{pageAuthor.email}</p>
              {#if pageAuthor.bio}
                <p class="text-xs text-gray-400 mt-1">{pageAuthor.bio}</p>
              {/if}
            </div>
          {:else if footer.contactAuthor}
            <div class="mt-4 p-4 bg-white rounded-lg shadow">
              <h4 class="font-medium">Contact Author</h4>
              <p>{footer.contactAuthor.name} - {footer.contactAuthor.position}</p>
              <p class="text-sm text-gray-500">{footer.contactAuthor.email}</p>
              {#if footer.contactAuthor.bio}
                <p class="text-xs text-gray-400 mt-1">{footer.contactAuthor.bio}</p>
              {/if}
            </div>
          {/if}
        </div>
      {:else}
        <div class="container mx-auto px-4">
          <p class="text-gray-500">No footer data available</p>
        </div>
      {/if}
    </footer>
    </VisualEditing>
</PreviewMode>
