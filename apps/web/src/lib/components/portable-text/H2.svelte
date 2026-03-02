<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: BlockComponentProps
    children?: any
  }

  let { portableText, children }: Props = $props()
  let textClass = $derived((portableText.global?.context as any)?.textClass ?? '')
</script>

<h2 class="scroll-mt-24 md:scroll-mt-32 border-b pb-2 text-3xl font-semibold first:mt-0">
  {@render children?.()}
</h2>
