<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: BlockComponentProps
    children?: any
  }

  let { portableText, children }: Props = $props()
  let textClass = $derived((portableText.global?.context as any)?.textClass ?? '')
</script>

<span class="{textClass}">
  {@render children?.()}
</span>
