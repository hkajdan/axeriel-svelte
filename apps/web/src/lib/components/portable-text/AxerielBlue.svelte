<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<span class="text-primary-500 font-bold">{@render children?.()}</span>
