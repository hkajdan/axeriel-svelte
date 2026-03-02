<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte'

  interface Props {
    portableText: MarkComponentProps
    children?: any
  }

  let { portableText, children }: Props = $props()

  let linkAttrs = $derived.by(() => {
    const linkData = (portableText.value as any)?.customLink || {}
    const type = linkData.type || 'external'
    const external = linkData.external
    const internal = linkData.internal
    const file = linkData.file
    const openInNewTab = linkData.openInNewTab || false
    const anchor = linkData.anchor

    let href = '#'
    let target: string | undefined = undefined
    let rel: string | undefined = undefined

    if (type === 'external' && external) {
      href = external
      target = openInNewTab ? '_blank' : undefined
      rel = openInNewTab ? 'noopener noreferrer' : undefined
    } else if (type === 'internal' && internal) {
      href = `/${internal._ref || internal._id}`
      if (anchor) {
        href += `#${anchor}`
      }
    } else if (type === 'file' && file) {
      href = file.asset?.url || '#'
      target = '_blank'
      rel = 'noopener noreferrer'
    }

    return { href, target, rel }
  })
</script>

<a href={linkAttrs.href} target={linkAttrs.target} rel={linkAttrs.rel} class="text-grey underline hover:no-underline">
  {@render children?.()}
</a>
