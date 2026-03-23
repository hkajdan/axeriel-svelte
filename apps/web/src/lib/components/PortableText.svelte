<script lang="ts">
  import { PortableText as SveltePortableText } from '@portabletext/svelte'
  import type { PortableTextComponents } from '@portabletext/svelte'

  // Import custom components
  import H2 from './portable-text/H2.svelte'
  import H3 from './portable-text/H3.svelte'
  import H4 from './portable-text/H4.svelte'
  import H5 from './portable-text/H5.svelte'
  import H6 from './portable-text/H6.svelte'
  import Blockquote from './portable-text/Blockquote.svelte'
  import Paragraph from './portable-text/Paragraph.svelte'
  import InlineBlock from './portable-text/InlineBlock.svelte'
  import Strong from './portable-text/Strong.svelte'
  import Em from './portable-text/Em.svelte'
  import Code from './portable-text/Code.svelte'
  import AxerielBlue from './portable-text/AxerielBlue.svelte'
  import CustomLink from './portable-text/CustomLink.svelte'
  import ImageBlock from './portable-text/ImageBlock.svelte'
  import BulletList from './portable-text/BulletList.svelte'
  import NumberList from './portable-text/NumberList.svelte'
  import BulletListItem from './portable-text/BulletListItem.svelte'
  import NumberListItem from './portable-text/NumberListItem.svelte'

  interface Props {
    value: any[]
    textClass?: string
  }

  let { value, textClass = '' }: Props = $props()

  // Define custom components for PortableText
  const components: PortableTextComponents = {
    block: {
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      h6: H6,
      blockquote: Blockquote,
      normal: Paragraph,
      inline: InlineBlock,
    },

    marks: {
      strong: Strong,
      em: Em,
      code: Code,
      axerielBlue: AxerielBlue,
      customLink: CustomLink,
    },

    types: {
      image: ImageBlock,
    },

    list: {
      bullet: BulletList,
      number: NumberList,
    },

    listItem: {
      bullet: BulletListItem,
      number: NumberListItem,
      normal: BulletListItem,
    },
  }
</script>

{#if value && value.length > 0}
  <div class="prose prose-zinc dark:prose-invert max-w-none {textClass}">
    <SveltePortableText {value} {components} context={{ textClass }} />
  </div>
{/if}
