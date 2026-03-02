<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<ul class="my-6 space-y-2 [&>li]:mt-2">
  {@render children?.()}
</ul>
