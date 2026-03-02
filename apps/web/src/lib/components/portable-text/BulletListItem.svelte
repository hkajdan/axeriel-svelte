<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<li class="leading-7 text-left flex items-center">
  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0 mt-0.5 p-1"></span>
  <span>{@render children?.()}</span>
</li>