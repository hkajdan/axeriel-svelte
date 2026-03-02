<script lang="ts">
  import type { ProductList } from '$lib/sanity/sanity.types';
  import { getSectionClasses } from '$lib/utils/background-colors';
  
  let { eyebrow, title, subtitle, products, backgroundColor, anchor }: {
    eyebrow: ProductList['eyebrow'];
    title: ProductList['title'];
    subtitle: ProductList['subtitle'];
    products: Array<{
      _ref: string;
      _key: string;
      productData?: any; // Product data will be populated by the page query
    }>;
    backgroundColor: ProductList['backgroundColor'];
    anchor: ProductList['anchor'];
  } = $props();
  
  let bgClass = $derived(getSectionClasses(backgroundColor || ''));
  
  // Accordion state
  let expandedProduct: string | null = null;
  

  
   function toggleProduct(productId: string) {
     if (expandedProduct === productId) {
       expandedProduct = null;
     } else {
       expandedProduct = productId;
     }
   }
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
         <div class="space-y-4">
           {#each products as product}
             <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
               <!-- Product Header -->
               <button
                 onclick={() => toggleProduct(product._ref)}
                 class="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
               >
                 <div>
                   <h3 class="text-xl font-semibold">{product._ref}</h3>
                   <p class="text-gray-600 text-sm">Product reference: {product._ref}</p>
                 </div>
                 <svg 
                   class={`w-5 h-5 text-gray-500 transition-transform ${expandedProduct === product._ref ? 'rotate-180' : ''}`}
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                 >
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                 </svg>
               </button>
               
               <!-- Product Details Accordion -->
               {#if expandedProduct === product._ref}
                 <div class="p-6 border-t border-gray-100">
                   {#if product.productData}
                     <div class="space-y-4">
                       {#if product.productData.title}
                         <h4 class="text-lg font-medium">{product.productData.title}</h4>
                       {/if}
                       
                       {#if product.productData.description}
                         <p class="text-gray-600">{product.productData.description}</p>
                       {/if}
                       
                       {#if product.productData.price}
                         <div class="font-semibold text-blue-600">
                           Price: ${product.productData.price}
                         </div>
                       {/if}
                       
                       {#if product.productData.features && product.productData.features.length > 0}
                         <div class="space-y-2">
                           <h5 class="font-medium">Features:</h5>
                           <ul class="list-disc list-inside text-gray-600">
                             {#each product.productData.features as feature}
                               <li>{feature}</li>
                             {/each}
                           </ul>
                         </div>
                       {/if}
                     </div>
                   {:else}
                     <div class="text-center py-4">
                       <p class="text-gray-500">No product details available</p>
                     </div>
                   {/if}
                 </div>
               {/if}
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