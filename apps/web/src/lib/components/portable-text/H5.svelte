<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: BlockComponentProps
    children?: any
  }

  let { portableText, children }: Props = $props()
  let textClass = $derived((portableText.global?.context as any)?.textClass ?? '')
</script>

<h5 class="scroll-mt-24 md:scroll-mt-32 text-lg font-semibold">
  {@render children?.()}
</h5>
