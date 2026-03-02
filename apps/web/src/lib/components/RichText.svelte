<script lang="ts">
  export let value: any[]
  export let textClass: string = ''
</script>

{#if value && value.length > 0}
  {#each value as block (block._key)}
    {#if block._type === 'block'}
      {#if block.style === 'h2'}
        <h2 class="text-3xl font-bold mt-8 mb-4 {textClass}">{block.children[0].text}</h2>
      {:else if block.style === 'h3'}
        <h3 class="text-2xl font-bold mt-6 mb-3 {textClass}">{block.children[0].text}</h3>
      {:else if block.style === 'h4'}
        <h4 class="text-xl font-bold mt-4 mb-2 {textClass}">{block.children[0].text}</h4>
      {:else if block.style === 'h5'}
        <h5 class="text-lg font-bold mt-3 mb-1 {textClass}">{block.children[0].text}</h5>
      {:else if block.style === 'h6'}
        <h6 class="text-base font-bold mt-2 mb-1 {textClass}">{block.children[0].text}</h6>
      {:else if block.style === 'blockquote'}
        <blockquote class="border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-4 {textClass}">
          {block.children[0].text}
        </blockquote>
      {:else}
        <p class="mb-4 {textClass}">
          {#each block.children as span (span._key)}
            {#if span.marks && span.marks.length > 0}
              {#each span.marks as mark}
                {#if mark === 'strong'}
                  <strong>{span.text}</strong>
                {:else if mark === 'em'}
                  <em>{span.text}</em>
                {:else if mark === 'code'}
                  <code class="bg-neutral-100 px-2 py-1 rounded font-mono text-sm">{span.text}</code>
                {:else if mark === 'axerielBlue'}
                  <span class="text-primary-500">{span.text}</span>
                {:else if mark === 'customLink'}
                  <span class="text-primary-500 underline hover:no-underline cursor-pointer">{span.text}</span>
                {/if}
              {/each}
            {:else}
              {span.text}
            {/if}
          {/each}
        </p>
      {/if}
    {/if}
  {/each}
{/if}