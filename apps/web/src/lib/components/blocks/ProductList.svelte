<script lang="ts">
  import type { ProductList } from '$lib/sanity/sanity.types';
  
  export let eyebrow: ProductList['eyebrow'];
  export let title: ProductList['title'];
  export let subtitle: ProductList['subtitle'];
  export let products: ProductList['products'];
  export let backgroundColor: ProductList['backgroundColor'];
  export let anchor: ProductList['anchor'];
  
  // Background color classes
  const bgClasses = {
    '': 'bg-white',
    'white': 'bg-white',
    'light-blue': 'bg-blue-50',
    'blue': 'bg-blue-600 text-white',
    'grey': 'bg-gray-100',
    'light-grey': 'bg-gray-50'
  };
  
  const bgClass = bgClasses[backgroundColor || ''] || bgClasses[''];
</script>

<section class={`py-16 lg:py-20 ${bgClass}`} id={anchor}>
  <div class="container mx-auto px-4">
    <div class="space-y-12">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        {#if eyebrow}
          <p class="text-sm font-medium text-blue-600 uppercase tracking-wider">{eyebrow}</p>
        {/if}
        
        {#if title}
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {/if}
        
        {#if subtitle}
          <p class="text-xl text-gray-600">{subtitle}</p>
        {/if}
      </div>
      
      {#if products && products.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each products as product}
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="space-y-4">
                <h3 class="text-xl font-semibold">
                  {product._ref}
                </h3>
                <p class="text-gray-600">Product reference: {product._ref}</p>
                <!-- In a real implementation, you would fetch and display the actual product data -->
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-8">
          <p class="text-gray-500">No products available</p>
        </div>
      {/if}
    </div>
  </div>
</section>