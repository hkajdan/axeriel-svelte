<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: BlockComponentProps
    children?: any
  }

  let { portableText, children }: Props = $props()
  let textClass = $derived((portableText.global?.context as any)?.textClass ?? '')
</script>

<blockquote class="border-l-4 border-primary-500 pl-4 italic text-neutral-600 my-4 {textClass}">
  {@render children?.()}
</blockquote>
