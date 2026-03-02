<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<strong>{@render children?.()}</strong>
