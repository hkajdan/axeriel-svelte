<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<li class="leading-7 text-left">
  {@render children?.()}
</li>