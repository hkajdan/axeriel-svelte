<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<li class="mb-1">
  {@render children?.()}
</li>
