<script lang="ts">
  import {PreviewMode,VisualEditing} from '@sanity/sveltekit'
  import type {LayoutProps} from './$types'

  const {children, data}: LayoutProps = $props()
  const {previewEnabled} = data
</script>

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
  {@render children()}
    </VisualEditing>
</PreviewMode>
