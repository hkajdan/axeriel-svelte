<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<em>{@render children?.()}</em>
