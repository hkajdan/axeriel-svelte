<script lang="ts">
  let { children }: { children?: any } = $props()
</script>

<ol class="my-6 list-decimal space-y-2 [&>li]:mt-2 [&>li]:ml-6 [&>li]:pl-2">
  {@render children?.()}
</ol>
