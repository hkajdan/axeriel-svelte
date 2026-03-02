<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<code class="bg-neutral-100 px-2 py-1 rounded font-mono text-sm">{@render children?.()}</code>
