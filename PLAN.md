# Plan: Match Svelte Blocks to Next.js Design

## Context
The Svelte block components in `apps/web/src/lib/components/blocks/` need to match the design/styling of their Next.js equivalents in `/home/hugo/dev/axeriel-next/apps/web/src/components/sections/`. The Svelte versions were scaffolded with simplified markup and are missing many design details (layout patterns, spacing, rounded corners, glassmorphism effects, animations, badge components, etc.).

**Reference (Next.js):** `/home/hugo/dev/axeriel-next/apps/web/src/components/sections/`
**Target (Svelte):** `/home/hugo/dev/axeriel-svelte/apps/web/src/lib/components/blocks/`

---

## 0. Prerequisites: Utilities & Shared Components

### 0a. Update `apps/web/src/lib/utils/background-colors.ts`

The Next.js version uses `bg-blue`, `bg-grey`, `bg-light-blue` (custom Tailwind colors from their config). The Svelte version uses `bg-primary-500`, `bg-primary-100`, `bg-neutral-200` etc. **Keep the Svelte color tokens as-is** (they map to the same visual colors via the Svelte Tailwind config). However, add these missing features:

1. Add `scroll-mt-24 md:scroll-mt-32` to `getSectionClasses` return value (for anchor scroll offset).
2. Add an optional `{ hasTitle?: boolean }` second parameter. When `hasTitle` is false, use `py-8 md:py-24 lg:py-32` instead of `py-16 md:py-24 lg:py-32`.
3. Add `px-4 md:px-8` padding to the base classes.

**Current file:** `apps/web/src/lib/utils/background-colors.ts`

Replace with:
```ts
type BackgroundColor = '' | 'white' | 'light-blue' | 'blue' | 'grey' | 'light-grey'

export function getSectionClasses(bg: BackgroundColor, opts?: { hasTitle?: boolean }): string {
  const pyClass = opts?.hasTitle === false ? 'py-8 md:py-24 lg:py-32' : 'py-16 md:py-24 lg:py-32'
  const baseClasses = `w-full ${pyClass} px-4 md:px-8 scroll-mt-24 md:scroll-mt-32`

  switch (bg) {
    case 'white':
      return `${baseClasses} bg-white text-neutral-900`
    case 'light-blue':
      return `${baseClasses} bg-primary-100 text-neutral-900`
    case 'blue':
      return `${baseClasses} bg-primary-500 text-white`
    case 'grey':
      return `${baseClasses} bg-neutral-200 text-neutral-900`
    case 'light-grey':
      return `${baseClasses} bg-neutral-50 text-neutral-900`
    default:
      return `${baseClasses} bg-white text-neutral-900`
  }
}

export function getTextColorClass(bg: BackgroundColor): string {
  switch (bg) {
    case 'blue':
      return 'text-white'
    case 'grey':
      return 'text-white'
    default:
      return 'text-neutral-900'
  }
}
```

Note: In Next.js, `grey` maps to `text-white`. The current Svelte version maps it to `text-neutral-900`. Fix it to match.

### 0b. Create section spacing constant

Create file `apps/web/src/lib/utils/section-spacing.ts`:
```ts
export const SECTION_HEADER_SPACING = 'mb-10 md:mb-16'
```

### 0c. Add CSS animations to global CSS

Find the Svelte app's global CSS file (likely `apps/web/src/app.css` or similar). Add these animation keyframes and utility classes to match Next.js:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(2rem); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-2rem); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(2rem); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes zoomPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
.animate-fade-in-left { animation: fadeInLeft 0.7s ease-out forwards; }
.animate-fade-in-right { animation: fadeInRight 0.7s ease-out forwards; }
.animate-zoom-pulse { animation: zoomPulse 20s ease-in-out infinite; }
```

### 0d. PortableText wrapper: add `prose` classes

**File:** `apps/web/src/lib/components/PortableText.svelte`

The Next.js `RichText` wraps PortableText output in a `<div class="prose prose-zinc ... dark:prose-invert max-w-none {className}">`. The Svelte version has no prose wrapper.

Update PortableText.svelte to wrap the output in a prose div:
```svelte
{#if value && value.length > 0}
  <div class="prose prose-zinc dark:prose-invert max-w-none {textClass}">
    <SveltePortableText {value} {components} context={{ textClass }} />
  </div>
{/if}
```

**Important:** This means block-level portable-text sub-components (Paragraph, H2-H6, etc.) should **remove** the `textClass` from their own elements, since the parent prose div now handles it. Keep `textClass` only in the wrapper `<div>`. Update each portable-text block component to remove `{textClass}` from their class attributes (the prose styles will handle typography).

### 0e. Update portable-text heading classes to match Next.js

| Component | Next.js classes | New Svelte classes |
|-----------|----------------|-------------------|
| H2.svelte | `scroll-mt-24 md:scroll-mt-32 border-b pb-2 text-3xl font-semibold first:mt-0` | `scroll-mt-24 md:scroll-mt-32 border-b pb-2 text-3xl font-semibold first:mt-0` |
| H3.svelte | `scroll-mt-24 md:scroll-mt-32 text-2xl font-semibold` | `scroll-mt-24 md:scroll-mt-32 text-2xl font-semibold` |
| H4.svelte | `scroll-mt-24 md:scroll-mt-32 text-xl font-semibold` | `scroll-mt-24 md:scroll-mt-32 text-xl font-semibold` |
| H5.svelte | `scroll-mt-24 md:scroll-mt-32 text-lg font-semibold` | `scroll-mt-24 md:scroll-mt-32 text-lg font-semibold` |
| H6.svelte | `scroll-mt-24 md:scroll-mt-32 text-base font-semibold` | `scroll-mt-24 md:scroll-mt-32 text-base font-semibold` |

Note: Changed from `font-bold` to `font-semibold` to match Next.js.

### 0f. Update portable-text list components to match Next.js

**BulletList.svelte** — change to:
```svelte
<ul class="my-6 space-y-2 [&>li]:mt-2">
  {@render children?.()}
</ul>
```

**NumberList.svelte** — change to:
```svelte
<ol class="my-6 list-decimal space-y-2 [&>li]:mt-2 [&>li]:ml-6 [&>li]:pl-2">
  {@render children?.()}
</ol>
```

**ListItem.svelte** — needs to differentiate bullet vs number. In `@portabletext/svelte`, the `listItem` config can be an object keyed by list type. Update `PortableText.svelte`:
```ts
listItem: {
  bullet: BulletListItem,
  number: NumberListItem,
},
```

Create **BulletListItem.svelte**:
```svelte
<li class="leading-7 text-left flex items-center">
  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0 mt-0.5 p-1"></span>
  <span>{@render children?.()}</span>
</li>
```

Create **NumberListItem.svelte**:
```svelte
<li class="leading-7 text-left">
  {@render children?.()}
</li>
```

Delete the old `ListItem.svelte`.

---

## 1. Hero.svelte

**File:** `apps/web/src/lib/components/blocks/Hero.svelte`

**Current Svelte issues vs Next.js:**
- Missing closing `</div>` for `max-w-4xl` div (bug)
- Layout is centered; Next.js has title at 75% width left-aligned, RichText in a glassmorphism card at bottom-right
- Next.js uses `min-h-[100svh]` + `max-h-none md:max-h-[900px]`, Svelte uses `h-screen min-h-150`
- Missing `animate-zoom-pulse` on background image
- Missing `brightness-50` on image (Svelte has `brightness-75`)
- RichText should be in an absolute-positioned glassmorphism card

**Replace the entire template with:**
```svelte
<script lang="ts">
  import "@mux/mux-player"
  import type { Hero } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let badge: Hero['badge'];
  export let title: Hero['title'];
  export let richText: Hero['richText'];
  export let image: Hero['image'];
  export let video: Hero['video'];
  export let buttons: Hero['buttons'];
  export let anchor: Hero['anchor'];
  export let backgroundColor: Hero['backgroundColor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section
  id={anchor || 'hero'}
  class="relative flex flex-col min-h-[100svh] h-[100svh] md:h-[calc(90vh)] max-h-none md:max-h-[900px] {sectionClasses}"
>
  {#if image?.asset && !(video?.asset && (video.asset as any)?.playbackId)}
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <SanityImage
        image={image}
        alt={title || 'Hero image'}
        imgClass="w-full h-full object-cover brightness-50 animate-zoom-pulse"
      />
    </div>
  {/if}

  {#if video?.asset && (video.asset as any)?.playbackId}
    <div class="absolute inset-0 -z-50 overflow-hidden bg-black">
      <mux-player
        autoplay
        disable-tracking
        muted
        loop
        playsinline
        class="w-full h-full object-cover"
        playback-id={(video.asset as any).playbackId}
      ></mux-player>
    </div>
  {/if}

  <div class="relative flex-1 w-full flex flex-col z-10">
    <div class="container mx-auto flex-1 flex flex-col px-4 md:px-8 pt-24 md:pt-48">
      <div class="flex-1 flex flex-col gap-4 md:gap-8 items-start justify-center text-left {textColorClass || 'text-white'}">
        {#if badge}
          <span class="inline-block px-4 py-2 text-sm font-medium text-primary-500 bg-primary-100 rounded-full mx-auto md:mx-0 w-fit">
            {badge}
          </span>
        {/if}

        <div class="w-full gap-4 md:gap-8 flex flex-col justify-center h-full z-10">
          {#if title}
            <h1 class="text-3xl md:text-4xl lg:text-8xl uppercase font-semibold text-balance w-full md:w-[75%] mx-0">
              {title}
            </h1>
          {/if}
        </div>

        {#if richText}
          <div class="absolute bottom-8 md:bottom-20 left-4 right-4 md:left-auto md:right-0 mx-auto md:mx-0 text-white text-sm md:text-base lg:text-lg font-normal bg-primary-500/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/20 shadow-2xl md:w-[25%] transition-all duration-300 hover:bg-primary-500/95 hover:scale-105">
            <RichText value={richText} textClass="text-white" />
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
```

Key changes:
- Section sizing: `min-h-[100svh] h-[100svh] md:h-[calc(90vh)] max-h-none md:max-h-[900px]`
- Title: `text-3xl md:text-4xl lg:text-8xl uppercase font-semibold` at `w-full md:w-[75%]`
- RichText: absolutely positioned glassmorphism card at bottom-right (`bg-primary-500/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl md:w-[25%]`)
- Image: `brightness-50 animate-zoom-pulse`
- Buttons are commented out (matching Next.js)
- Badge: styled as pill

---

## 2. CTA.svelte

**File:** `apps/web/src/lib/components/blocks/CTA.svelte`

**Changes needed:**
- Add inner `rounded-3xl` card with padding `px-6 md:px-8 py-12 md:py-16`
- When `backgroundColor` is set, card uses `textColorClass`; otherwise `bg-neutral-100` (muted equivalent)
- Eyebrow: use a badge-style pill (`inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full`) instead of plain `<p>`
- Title: `text-2xl md:text-3xl lg:text-5xl font-semibold text-balance` (was `text-3xl lg:text-4xl font-bold`)
- RichText wrapper: `text-base md:text-lg text-neutral-500`
- Add `SECTION_HEADER_SPACING` (`mb-10 md:mb-16`) import and apply to header block
- Section header: `space-y-6 md:space-y-8`

**Replace with:**
```svelte
<script lang="ts">
  import type { Cta } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityButtons from '$lib/components/SanityButtons.svelte';

  export let eyebrow: Cta['eyebrow'];
  export let title: Cta['title'];
  export let richText: Cta['richText'];
  export let buttons: Cta['buttons'];
  export let backgroundColor: Cta['backgroundColor'];
  export let anchor: Cta['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="rounded-3xl px-6 md:px-8 py-12 md:py-16 {backgroundColor ? textColorClass : 'bg-neutral-100'}">
      <div class="text-center max-w-3xl mx-auto space-y-6 md:space-y-8 {SECTION_HEADER_SPACING}">
        {#if eyebrow}
          <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">
            {eyebrow}
          </span>
        {/if}

        {#if title}
          <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold text-balance">{title}</h2>
        {/if}

        {#if richText}
          <div class="text-base md:text-lg text-neutral-500">
            <RichText value={richText} textClass="text-balance" />
          </div>
        {/if}

        {#if buttons && buttons.length > 0}
          <div class="flex justify-center">
            <SanityButtons buttons={buttons} justify="center" />
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
```

---

## 3. Carousel.svelte

**File:** `apps/web/src/lib/components/blocks/Carousel.svelte`

**Changes needed:**
- Use `getSectionClasses` with `hasTitle` option
- Add `SECTION_HEADER_SPACING` below header
- Title: `text-3xl font-semibold md:text-5xl` (was `text-3xl lg:text-4xl font-bold`)
- RichText: `text-base md:text-lg text-balance max-w-3xl`
- Slide images: `aspect-video rounded-xl` containers
- Per-slide richText: **desktop** = absolute overlay at bottom-right with `bg-black/30 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/20 shadow-xl`; **mobile** = below image with `bg-primary-500/10 backdrop-blur-sm p-4 rounded-xl border border-primary-500/20`
- Dot navigation: active dot uses `bg-primary-500 shadow-lg scale-110`, inactive `bg-gray-300 hover:bg-gray-400`
- Prev/next arrows hidden on mobile (`hidden md:block`)
- Keep the existing JS carousel logic (auto-play, etc.)

**Replace the template portion (keep the script). Key template changes:**

Section header:
```svelte
<div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
  {#if title}
    <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
  {/if}
  {#if richText}
    <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
  {/if}
</div>
```

Each slide:
```svelte
<div class="w-full flex-shrink-0">
  {#if image.image?.asset}
    <div class="relative">
      <div class="aspect-video w-full overflow-hidden rounded-xl">
        <SanityImage
          image={image.image}
          alt={`Slide ${index + 1}`}
          imgClass="w-full h-full object-cover"
        />
      </div>

      {#if image.richText}
        <!-- Desktop overlay -->
        <div class="hidden md:block absolute bottom-4 right-4 md:bottom-8 md:right-8 max-w-sm">
          <div class="bg-black/30 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/20 shadow-xl">
            <RichText value={image.richText} textClass="text-white text-sm md:text-base leading-relaxed" />
          </div>
        </div>
      {/if}
    </div>

    {#if image.richText}
      <!-- Mobile text below image -->
      <div class="md:hidden mt-4 px-2">
        <div class="bg-primary-500/10 backdrop-blur-sm p-4 rounded-xl border border-primary-500/20">
          <RichText value={image.richText} textClass="text-sm leading-relaxed" />
        </div>
      </div>
    {/if}
  {/if}
</div>
```

Dots: change active class to `bg-primary-500 shadow-lg scale-110`, inactive to `bg-gray-300 hover:bg-gray-400`.

---

## 4. Timeline.svelte

**File:** `apps/web/src/lib/components/blocks/Timeline.svelte`

**Changes needed — major layout overhaul:**
- Alternating left/right layout on desktop (not simple 2-col grid)
- Central vertical line: `absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 hidden md:block`
- Blue dot at each event: `absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 hidden md:block`
- Event images: `aspect-video rounded-3xl` with `brightness-75`
- Date: `text-4xl font-bold` (not `toLocaleDateString()` — Next.js uses raw `event.date` string)
- RichText in a `bg-white p-4` card
- Title: `text-3xl font-semibold md:text-5xl`
- Add `SECTION_HEADER_SPACING`
- Gap between events: `gap-8 md:gap-36`

**Replace with:**
```svelte
<script lang="ts">
  import type { Timeline } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let title: Timeline['title'];
  export let timeline: Timeline['timeline'];
  export let backgroundColor: Timeline['backgroundColor'];
  export let anchor: Timeline['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || '');
</script>

<section id={anchor || 'timeline'} class={sectionClasses}>
  <div class="container mx-auto">
    {#if title}
      <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {textColorClass} {SECTION_HEADER_SPACING}">
        <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
      </div>
    {/if}

    {#if timeline && timeline.length > 0}
      <div class="relative mx-auto flex w-full flex-col gap-8 md:gap-36">
        <!-- Central vertical line -->
        <div class="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 hidden md:block"></div>

        {#each timeline as event, index (event._key)}
          <div class="relative flex w-full flex-col md:items-center md:justify-between md:flex-row gap-4 md:gap-0">
            <!-- Image side -->
            <div class="flex w-full md:w-[53%] {index % 2 === 0 ? 'md:order-1 md:justify-end md:mr-40' : 'md:order-2 md:ml-40'}">
              {#if event.image}
                <div class="w-full max-w-[400px] mx-auto md:mx-0 aspect-video overflow-hidden rounded-3xl bg-gray-200">
                  <SanityImage
                    image={event.image}
                    alt={event.title || 'Timeline image'}
                    imgClass="object-cover brightness-75 w-full h-full"
                  />
                </div>
              {/if}
            </div>

            <!-- Blue dot on center line -->
            <div class="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 hidden md:block"></div>

            <!-- Text side -->
            <div class="w-full md:w-[47%] {index % 2 === 0 ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}">
              <div class="bg-white p-4">
                {#if event.date}
                  <div class="mb-2 text-4xl font-bold">{event.date}</div>
                {/if}
                {#if event.richText}
                  <RichText value={event.richText} />
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
```

---

## 5. StatList.svelte

**File:** `apps/web/src/lib/components/blocks/StatList.svelte`

**Changes needed:**
- Title: `text-3xl font-semibold md:text-5xl` (was `text-3xl lg:text-4xl font-bold`)
- Use `SECTION_HEADER_SPACING` on header block
- Header layout: `flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center`
- RichText: `text-base md:text-lg text-balance max-w-3xl`
- Stats container: `<dl>` with `mx-auto grid items-start justify-center gap-x-12 gap-y-6 max-md:max-w-max sm:grid-cols-2 md:flex`
- Each stat: `w-full max-w-[250px] space-y-2 max-md:mx-auto`
- Stat display: prefix in `text-primary-500`, value in `text-6xl`, suffix in `text-primary-500`
- Text below: `font-bold text-balance`
- Use `textAlign` via `style` attribute on section (like Next.js uses `stegaClean`)
- Remove the complex IntersectionObserver animation; use a simpler counter animation approach (or keep simple display for now since the Next.js version uses a custom React hook `useCounterAnimation` that's hard to replicate)

**Replace with:**
```svelte
<script lang="ts">
  import type { StatList } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';

  let { title, richText, stats, textAlign, animateNumbers, animationDuration, backgroundColor, anchor }: {
    title: StatList['title'];
    richText: StatList['richText'];
    stats: StatList['stats'];
    textAlign: StatList['textAlign'];
    animateNumbers: StatList['animateNumbers'];
    animationDuration: StatList['animationDuration'];
    backgroundColor: StatList['backgroundColor'];
    anchor: StatList['anchor'];
  } = $props();

  const sectionClasses = getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || '');

  // Clean textAlign of any stega characters
  let cleanTextAlign = $derived((textAlign || 'center').replace(/[^\x20-\x7E]/g, '') as 'left' | 'center' | 'right');
</script>

<section
  class="{sectionClasses} {textColorClass}"
  style="text-align: {cleanTextAlign}"
  id={anchor || 'stats'}
>
  <div class="container mx-auto">
    {#if title || richText}
      <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
        {#if title}
          <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
        {/if}
        {#if richText}
          <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
        {/if}
      </div>
    {/if}

    {#if stats && stats.length > 0}
      <dl class="mx-auto grid items-start justify-center gap-x-12 gap-y-6 max-md:max-w-max sm:grid-cols-2 md:flex">
        {#each stats as stat}
          <div class="w-full max-w-[250px] space-y-2 max-md:mx-auto">
            <dt class="text-xl font-bold">
              {#if stat.prefix}<span class="text-primary-500">{stat.prefix}</span>{/if}
              <span class="text-6xl">{stat.value}</span>
              {#if stat.suffix}<span class="text-primary-500">{stat.suffix}</span>{/if}
            </dt>
            {#if stat.text}
              <dd class="font-bold text-balance">{stat.text}</dd>
            {/if}
          </div>
        {/each}
      </dl>
    {/if}
  </div>
</section>
```

---

## 6. FeatureCardsIcon.svelte

**File:** `apps/web/src/lib/components/blocks/FeatureCardsIcon.svelte`

**Changes needed:**
- Eyebrow: badge-style pill (like CTA)
- Title: `text-3xl font-semibold md:text-5xl` (was `text-3xl lg:text-4xl font-bold`)
- Section header: `flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center` + `SECTION_HEADER_SPACING`
- RichText header: `text-base md:text-lg text-balance max-w-3xl`
- Card: `rounded-3xl bg-neutral-100 p-8 md:min-h-[300px]` (was `bg-white p-6 rounded-lg shadow-sm border`)
- Icon: wrap in `rounded-full bg-white drop-shadow-xl p-3` container. Render the SVG icon properly (if `card.icon` has SVG data) or fall back to text. Current code renders `card.icon.name` as text — **keep this for now** unless `SanityIcon` component exists in Svelte.
- Card title: `text-lg font-medium md:text-2xl mb-2` (was `text-xl font-semibold mb-3`)
- Card richText: `font-normal text-sm md:text-[16px] text-black/90 leading-7 text-balance`
- Remove hover shadow effect from card

**Replace with:**
```svelte
<script lang="ts">
  import type { FeatureCardsIcon } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';

  export let eyebrow: FeatureCardsIcon['eyebrow'];
  export let title: FeatureCardsIcon['title'];
  export let richText: FeatureCardsIcon['richText'];
  export let cards: FeatureCardsIcon['cards'];
  export let backgroundColor: FeatureCardsIcon['backgroundColor'];
  export let anchor: FeatureCardsIcon['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}
    </div>

    {#if cards && cards.length > 0}
      <div class="mx-auto grid gap-8 lg:grid-cols-3">
        {#each cards as card}
          <div class="rounded-3xl bg-neutral-100 p-8 md:min-h-[300px]">
            {#if card.icon?.name}
              <span class="mb-9 flex w-fit p-3 items-center justify-center rounded-full bg-white drop-shadow-xl">
                <span class="text-3xl text-primary-500">{card.icon.name}</span>
              </span>
            {/if}
            <div>
              {#if card.title}
                <h3 class="text-lg font-medium md:text-2xl mb-2">{card.title}</h3>
              {/if}
              {#if card.richText}
                <RichText value={card.richText} textClass="font-normal text-sm md:text-[16px] text-black/90 leading-7 text-balance" />
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
```

---

## 7. ImageLinkCards.svelte

**File:** `apps/web/src/lib/components/blocks/ImageLinkCards.svelte`

**Changes needed — major overhaul to use CTACard-style cards:**
- Section header: same pattern as other blocks (badge eyebrow, `text-3xl font-semibold md:text-5xl`, `SECTION_HEADER_SPACING`)
- Cards: CTACard pattern — tall cards (`h-[300px] sm:h-[350px] xl:h-[400px]`) with background image, gradient overlay, text at bottom
- Dynamic grid cols based on card count (1/2/3/4 cols)
- First card: `lg:rounded-l-3xl lg:rounded-r-none`; last: `lg:rounded-r-3xl lg:rounded-l-none`; middle: `lg:rounded-none`
- Card image: absolute fill, `object-cover opacity-60 group-hover:scale-105 transition-transform duration-700`
- Gradient overlay: `bg-gradient-to-t from-black/70 via-black/20 to-transparent`
- Card text: white, title `text-2xl md:text-3xl font-semibold`, description `text-base md:text-lg text-white/90 line-clamp-2`

**Replace with:**
```svelte
<script lang="ts">
  import type { ImageLinkCards } from '$lib/sanity/sanity.types';
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let eyebrow: ImageLinkCards['eyebrow'];
  export let title: ImageLinkCards['title'];
  export let richText: ImageLinkCards['richText'];
  export let cards: ImageLinkCards['cards'];
  export let backgroundColor: ImageLinkCards['backgroundColor'];
  export let anchor: ImageLinkCards['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || '');

  function getGridCols(count: number): string {
    if (count >= 4) return 'lg:grid-cols-4'
    if (count === 3) return 'lg:grid-cols-3'
    if (count === 2) return 'lg:grid-cols-2'
    return 'lg:grid-cols-1'
  }

  function getCardRounding(idx: number, total: number): string {
    if (idx === 0) return 'lg:rounded-l-3xl lg:rounded-r-none'
    if (idx === total - 1) return 'lg:rounded-r-3xl lg:rounded-l-none'
    return 'lg:rounded-none'
  }
</script>

<section id={anchor || 'image-link-cards'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl text-balance">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-balance" />
          {/if}
        </div>
      {/if}

      {#if cards && cards.length > 0}
        <div class="grid w-full grid-cols-1 gap-4 lg:gap-1 sm:grid-cols-2 {getGridCols(cards.length)}">
          {#each cards as card, idx}
            <a
              href={resolveSanityUrl(card.url)}
              target={getLinkTarget(card.url)}
              rel={getLinkRel(card.url)}
              class="rounded-3xl p-4 md:p-8 transition-all duration-300 relative overflow-hidden group flex flex-col justify-end h-[300px] sm:h-[350px] xl:h-[400px] hover:shadow-lg bg-neutral-200 {getCardRounding(idx, cards.length)}"
            >
              {#if card.image?.asset}
                <div class="absolute inset-0 z-[1]">
                  <SanityImage
                    image={card.image}
                    alt={card.title || 'Card image'}
                    imgClass="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
              {/if}
              <div class="relative z-[2] mt-auto space-y-2 text-white">
                {#if card.title}
                  <h3 class="text-2xl md:text-3xl font-semibold leading-tight">{card.title}</h3>
                {/if}
                {#if card.description}
                  <p class="text-base md:text-lg text-white/90 line-clamp-2 group-hover:text-white transition-colors duration-300">{card.description}</p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
```

---

## 8. JobOffers.svelte

**File:** `apps/web/src/lib/components/blocks/JobOffers.svelte`

**Changes needed — replace placeholder with real implementation:**
- Section header: badge eyebrow, `text-3xl font-semibold md:text-5xl text-balance`, `SECTION_HEADER_SPACING`, `RichText` with `text-balance max-w-3xl`
- Accept `offers` prop (needs to be added — check Sanity types/queries)
- Job offer cards: `<a>` wrapping card with `rounded-2xl border border-neutral-200/50 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`
- Card has: optional image (`h-48 overflow-hidden rounded-xl`, hover `scale-105`), badge for job type, title `text-xl font-semibold`, profile text, summary `line-clamp-3`, "Learn more →" link
- Empty state: dashed border card with "No job offers available" message
- Grid: `sm:grid-cols-2 lg:grid-cols-3`

**Replace with:**
```svelte
<script lang="ts">
  import type { JobOffers } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let eyebrow: JobOffers['eyebrow'];
  export let title: JobOffers['title'];
  export let richText: JobOffers['richText'];
  export let offers: any[];
  export let backgroundColor: JobOffers['backgroundColor'];
  export let anchor: JobOffers['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || '');
</script>

<section id={anchor || 'job-offers'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if eyebrow || title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if eyebrow}
            <span class="inline-block px-3 py-1.5 text-sm font-medium bg-neutral-200 rounded-full">{eyebrow}</span>
          {/if}
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl text-balance">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}

      {#if Array.isArray(offers) && offers.length > 0}
        <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {#each offers as offer}
            <a
              href={offer.slug ? `/career/${offer.slug.split('/').pop()}` : `/career/${offer._id}`}
              class="group block rounded-2xl border border-neutral-200/50 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {#if offer.image?.asset}
                <div class="relative mb-6 h-48 w-full overflow-hidden rounded-xl">
                  <SanityImage
                    image={offer.image}
                    alt={offer.title || 'Job offer'}
                    imgClass="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              {/if}

              <div class="space-y-4">
                {#if offer.type}
                  <span class="inline-block px-2 py-1 text-xs font-medium bg-neutral-200 rounded-full">{offer.type}</span>
                {/if}

                <div>
                  {#if offer.title}
                    <h3 class="text-xl font-semibold group-hover:text-primary-500 transition-colors">{offer.title}</h3>
                  {/if}
                  {#if offer.profile}
                    <p class="mt-1 text-sm text-neutral-500">{offer.profile}</p>
                  {/if}
                </div>

                {#if offer.summary}
                  <p class="text-neutral-500 line-clamp-3">{offer.summary}</p>
                {/if}

                <div class="pt-2">
                  <span class="text-sm font-medium text-primary-500 group-hover:underline">Learn more →</span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="text-center w-full">
          <div class="rounded-2xl border border-dashed border-neutral-200/50 p-12">
            <h3 class="text-lg font-medium text-neutral-500">No job offers available</h3>
            <p class="mt-2 text-sm text-neutral-500">We're always looking for talented people. Check back soon for new opportunities!</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
```

---

## 9. LogoList.svelte

**File:** `apps/web/src/lib/components/blocks/LogoList.svelte`

**Changes needed:**
- Title: `text-3xl font-semibold md:text-5xl`
- Add `SECTION_HEADER_SPACING`
- RichText: `text-base md:text-lg text-balance max-w-3xl`
- Logo container: `flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto` (was grid)
- Each logo: `w-48 sm:w-52 md:w-56 lg:w-60` container with `flex-col items-center justify-center`
- Image: `w-auto rounded-3xl p-4 md:p-8 max-h-[200px] md:max-h-[240px]`
- Support for logo links (via `logo.url` — internal/external)
- Remove grayscale effect (Next.js doesn't have it)
- Optional text label below logo

**Replace with:**
```svelte
<script lang="ts">
  import type { LogoList } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let title: LogoList['title'];
  export let richText: LogoList['richText'];
  export let logos: LogoList['logos'];
  export let backgroundColor: LogoList['backgroundColor'];
  export let anchor: LogoList['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');
</script>

<section id={anchor || 'features'} class={sectionClasses}>
  <div class="container mx-auto">
    {#if title || richText}
      <div class="flex w-full flex-col items-center {textColorClass}">
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center {SECTION_HEADER_SPACING}">
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      </div>
    {/if}

    <div class="mx-auto flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
      {#if logos}
        {#each logos as logo, index}
          {#if logo.image}
            <div class="w-48 sm:w-52 md:w-56 lg:w-60 flex flex-col items-center justify-center">
              <SanityImage
                image={logo.image}
                alt={logo.text || 'Logo'}
                imgClass="w-auto rounded-3xl p-4 md:p-8 max-h-[200px] md:max-h-[240px]"
              />
              {#if logo.text}
                <span class="mt-2 text-sm text-center">{logo.text}</span>
              {/if}
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</section>
```

---

## 10. TextImage.svelte

**File:** `apps/web/src/lib/components/blocks/TextImage.svelte`

**Changes needed:**
- Section header: same centered pattern + `SECTION_HEADER_SPACING`
- Title: `text-3xl font-semibold md:text-5xl`
- RichText header: `text-base md:text-lg text-balance max-w-3xl`
- Row layout: `flex flex-col gap-6 md:gap-16 md:flex-row md:items-center` (not grid)
- `imagePosition === 'right'` → `md:flex-row-reverse`
- Each side: `w-full md:w-1/2`
- Image: `aspect-video w-full overflow-hidden rounded-lg` with `object-cover`
- Use `SanityImage` consistently for both positions (fix the inconsistency)
- Rows container: `flex flex-col gap-8 md:gap-16`
- Strip stega characters from `imagePosition` like Next.js does

**Replace with:**
```svelte
<script lang="ts">
  import type { TextImage } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let title: TextImage['title'];
  export let richText: TextImage['richText'];
  export let rows: TextImage['rows'];
  export let backgroundColor: TextImage['backgroundColor'];
  export let anchor: TextImage['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || 'white', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || 'white');

  function isImageRight(position: string | null | undefined): boolean {
    return (position || '').replace(/[^\x20-\x7E]/g, '') === 'right'
  }
</script>

<section id={anchor || 'textImage'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="flex w-full flex-col items-center {textColorClass}">
      {#if title || richText}
        <div class="flex flex-col items-center space-y-4 text-center sm:space-y-6 {SECTION_HEADER_SPACING}">
          {#if title}
            <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
          {/if}
          {#if richText}
            <RichText value={richText} textClass="text-base md:text-lg text-balance max-w-3xl" />
          {/if}
        </div>
      {/if}
    </div>

    {#if rows && rows.length > 0}
      <div class="mx-auto flex flex-col gap-8 md:gap-16">
        {#each rows as row, index}
          <div class="w-full flex flex-col gap-6 md:gap-16 {isImageRight(row.imagePosition) ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center">
            <div class="w-full md:w-1/2">
              {#if row.richText}
                <RichText value={row.richText} />
              {/if}
            </div>
            {#if row.image}
              <div class="w-full md:w-1/2">
                <div class="aspect-video w-full overflow-hidden rounded-lg">
                  <SanityImage
                    image={row.image}
                    alt={title || `Content image ${index + 1}`}
                    imgClass="w-full h-full object-cover"
                  />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
```

---

## 11. SubscribeNewsletter.svelte

**File:** `apps/web/src/lib/components/blocks/SubscribeNewsletter.svelte`

**Changes needed:**
- Container: `rounded-3xl overflow-hidden px-6 md:px-8 py-12 md:py-16 bg-neutral-50`
- Title: `text-xl font-semibold sm:text-3xl md:text-5xl text-balance text-neutral-900` (was `text-3xl lg:text-4xl font-bold`)
- `SECTION_HEADER_SPACING` on title+subtitle block
- Subtitle RichText: `text-sm sm:text-base text-balance text-neutral-600`
- Form: `flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2`
- Email input container: `flex bg-white items-center border rounded-xl p-2 drop-shadow-lg md:w-96 justify-between pl-4`
- Input: plain, no border, `outline-none bg-transparent w-full`
- Submit button: small icon button (`size-8 aspect-square bg-neutral-200 hover:bg-neutral-300 rounded-md flex items-center justify-center`) with a chevron-right SVG
- Helper text: `mt-3 text-sm text-neutral-800 opacity-80 sm:mt-4`

**Replace with:**
```svelte
<script lang="ts">
  import type { SubscribeNewsletter } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';

  export let title: SubscribeNewsletter['title'];
  export let subTitle: SubscribeNewsletter['subTitle'];
  export let helperText: SubscribeNewsletter['helperText'];
  export let backgroundColor: SubscribeNewsletter['backgroundColor'];
  export let anchor: SubscribeNewsletter['anchor'];

  const sectionClasses = getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) });
  const textColorClass = getTextColorClass(backgroundColor || '');
</script>

<section id={anchor || 'subscribe'} class={sectionClasses}>
  <div class="container mx-auto">
    <div class="relative rounded-3xl overflow-hidden {textColorClass} px-6 md:px-8 py-12 md:py-16 bg-neutral-50">
      <div class="relative z-10 mx-auto text-center">
        {#if title || subTitle}
          <div class={SECTION_HEADER_SPACING}>
            {#if title}
              <h2 class="mb-4 text-xl font-semibold text-neutral-900 sm:text-3xl md:text-5xl text-balance">{title}</h2>
            {/if}
            {#if subTitle}
              <RichText value={subTitle} textClass="text-sm text-neutral-600 sm:text-base text-balance" />
            {/if}
          </div>
        {/if}

        <form class="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2">
          <div class="flex bg-white items-center border rounded-xl p-2 drop-shadow-lg md:w-96 justify-between pl-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              class="rounded-e-none border-e-0 focus-visible:ring-0 outline-none bg-transparent w-full"
            />
            <button
              type="submit"
              class="size-8 aspect-square bg-neutral-200 hover:bg-neutral-300 rounded-md flex items-center justify-center flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </form>

        {#if helperText}
          <RichText value={helperText} textClass="mt-3 text-sm text-neutral-800 opacity-80 sm:mt-4" />
        {/if}
      </div>
    </div>
  </div>
</section>
```

---

## 12. Footer.svelte

**File:** `apps/web/src/lib/components/layout/Footer.svelte`

**Changes needed — major overhaul to two-section footer:**

The Next.js footer has two sections:
1. **Contact section** (`bg-primary-500` / `bg-blue`, `id="contact"`): RichText heading, phone + email with icons, contact person avatar + name, Google Maps iframe
2. **Footer proper** (`bg-neutral-500` / `bg-grey`, text-white): logo, subtitle, optional download link, social icons, nav columns (up to 4 cols), copyright + Terms/Privacy

This is a large change. The Svelte Footer currently has a single `bg-gray-100` section. It needs to be restructured into the two-section pattern.

**Replace with the following structure** (adapt prop names to existing Svelte types):
```svelte
<script lang="ts">
  import type { FooterQueryResult as Footer, Author, Settings } from '$lib/sanity/sanity.types'
  import { resolveSanityUrl, getLinkTarget, getLinkRel } from '$lib/sanity/links'
  import RichText from '$lib/components/PortableText.svelte'
  import SanityButtons from '$lib/components/SanityButtons.svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'

  export let footer: Footer | null = null
  export let pageAuthor: Author | null = null
  export let settings: any | null = null

  const currentYear = new Date().getFullYear()

  // Determine contact person (pageAuthor > footer.contactAuthor > fallback)
  $: contactPerson = pageAuthor || footer?.contactAuthor || { name: 'Michel', position: 'expert énergie', image: null, email: null }
  $: contactEmail = (contactPerson as any)?.email || 'contact@axeriel.fr'
  $: contactPhone = footer?.location?.phone
</script>

<!-- Contact Section -->
<section class="mt-12 md:mt-20 p-6 md:p-12 bg-primary-500" id="contact">
  {#if footer?.contact?.richText}
    <RichText
      value={footer.contact.richText}
      textClass="text-white text-2xl md:text-4xl w-full md:w-3/4 text-center md:text-left"
    />
  {/if}

  <div class="container mx-auto flex flex-col md:flex-row justify-between items-center w-full py-8 md:py-10 text-center gap-8 md:gap-16 px-4 md:px-20">
    <!-- Left: Logo + Contact info -->
    <div class="w-full md:w-1/2 flex flex-col items-center gap-6 md:gap-12 text-center">
      {#if settings?.logo}
        <span class="flex items-center justify-center gap-4">
          <SanityImage
            image={settings.logo}
            alt="logo"
            imgClass="w-24 md:w-32"
          />
        </span>
      {/if}
      <div class="text-white text-lg md:text-3xl flex flex-col items-center gap-3 md:gap-4">
        {#if contactPhone}
          <span class="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span class="text-base md:text-3xl">{contactPhone}</span>
          </span>
        {/if}
        <a href="mailto:{contactEmail}" class="flex flex-col md:flex-row gap-2 md:gap-8 items-center hover:text-primary-200 transition-colors">
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span class="text-base md:text-3xl">{contactEmail}</span>
        </a>
      </div>
    </div>

    <!-- Right: Contact person -->
    <div class="text-lg md:text-3xl text-white w-full md:w-1/2 items-center gap-6 md:gap-8">
      <div class="flex flex-col items-center text-center gap-6 md:gap-12">
        {#if (contactPerson as any)?.image?.asset}
          <div class="rounded-full w-24 h-24 md:w-32 md:h-32 overflow-hidden">
            <SanityImage
              image={(contactPerson as any).image}
              alt={(contactPerson as any).name || 'Contact person'}
              imgClass="w-full h-full object-cover"
            />
          </div>
        {:else}
          <div class="rounded-full w-24 h-24 md:w-32 md:h-32 bg-neutral-500 flex items-center justify-center"></div>
        {/if}
        <a href="mailto:{contactEmail}" class="hover:text-primary-200 transition-colors text-center">
          <div class="text-base md:text-3xl">
            Contactez {(contactPerson as any)?.name || 'notre expert'}
            <br />
            {#if (contactPerson as any)?.position}notre {(contactPerson as any).position}{/if}
            {` ->`}
          </div>
        </a>
      </div>
    </div>
  </div>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.068314343158!2d5.801346076206103!3d45.18571335197695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478a5f839ad0ed77%3A0xba8ae9e4d35aff49!2sAxeriel!5e0!3m2!1sfr!2sfr!4v1750261109837!5m2!1sfr!2sfr"
    height="300"
    loading="lazy"
    class="rounded-md w-full mt-8"
    title="Google Maps - Axeriel location"
  ></iframe>
</section>

<!-- Footer Section -->
<section class="pt-12 md:pt-20 pb-8 bg-neutral-500 text-white">
  <div class="container mx-auto">
    <footer class="py-8 md:py-12">
      <div class="flex flex-col items-center justify-between gap-12 md:gap-8 text-center lg:flex-row lg:text-left mx-auto max-w-7xl px-4 md:px-6">
        <!-- Logo + subtitle -->
        <div class="flex w-full lg:max-w-96 shrink flex-col items-center gap-6 lg:items-start">
          <div class="w-full">
            {#if settings?.logo}
              <span class="flex items-center justify-center gap-4 lg:justify-start">
                <SanityImage
                  image={settings.logo}
                  alt="logo"
                  imgClass="w-20 md:w-24 lg:w-32"
                />
              </span>
            {/if}
            {#if settings?.subtitle}
              <p class="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-white">{settings.subtitle}</p>
            {/if}
          </div>

          <!-- Social icons -->
          {#if settings?.socialLinks}
            <ul class="flex items-center space-x-6 text-white">
              {#if settings.socialLinks.instagram}
                <li><a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.facebook}
                <li><a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.linkedin}
                <li><a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.twitter}
                <li><a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a></li>
              {/if}
              {#if settings.socialLinks.youtube}
                <li><a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg class="w-5 h-5 fill-white hover:fill-neutral-400" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></li>
              {/if}
            </ul>
          {/if}
        </div>

        <!-- Navigation columns -->
        {#if footer?.columns && footer.columns.length > 0}
          <div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-8 lg:gap-16 xl:gap-28 w-full lg:w-auto lg:mr-20">
            {#each footer.columns as column}
              <div class="text-center lg:text-left">
                {#if column.title}
                  <h3 class="mb-3 md:mb-4 lg:mb-6 font-semibold uppercase text-sm md:text-base text-white">{column.title}</h3>
                {/if}
                {#if column.links && column.links.length > 0}
                  <ul class="space-y-2 md:space-y-3 lg:space-y-4 text-xs md:text-sm">
                    {#each column.links as link}
                      {#if link.url}
                        <li class="font-medium hover:text-primary-500">
                          <a
                            href={resolveSanityUrl(link.url)}
                            target={getLinkTarget(link.url)}
                            rel={getLinkRel(link.url)}
                          >
                            {link.name}
                          </a>
                        </li>
                      {/if}
                    {/each}
                  </ul>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 md:mt-16 lg:mt-20 border-t pt-6 md:pt-8">
        <div class="flex flex-col justify-between gap-4 text-center text-xs md:text-sm font-normal lg:flex-row lg:items-center lg:text-left mx-auto max-w-7xl px-4 md:px-6">
          <p class="text-gray-300">© {currentYear} {settings?.siteTitle || 'Axeriel'}. All rights reserved.</p>
          <ul class="flex flex-col gap-2 md:flex-row md:gap-4 lg:justify-start">
            <li class="hover:text-primary-500 transition-colors"><a href="/terms">Terms and Conditions</a></li>
            <li class="hover:text-primary-500 transition-colors"><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</section>
```

---

## 13. PageBuilder.svelte

**File:** `apps/web/src/lib/components/PageBuilder.svelte`

Update the outer wrapper to match Next.js:
```svelte
<main class="flex flex-col gap-10 md:gap-16 max-w-8xl mx-auto relative">
  <!-- blocks rendered here -->
</main>
```

If `max-w-8xl` is not in Tailwind config, use `max-w-[90rem]` (1440px).

---

## Files to delete (no longer needed)

- `apps/web/src/lib/components/RichText.svelte` (old manual implementation, replaced by PortableText.svelte)
- `apps/web/src/lib/components/portable-text/ListItem.svelte` (replaced by BulletListItem + NumberListItem)

## Files to create

- `apps/web/src/lib/utils/section-spacing.ts`
- `apps/web/src/lib/components/portable-text/BulletListItem.svelte`
- `apps/web/src/lib/components/portable-text/NumberListItem.svelte`

---

## Verification

1. Run `pnpm --filter web check` to verify no TypeScript/Svelte errors
2. Run `pnpm --filter web build` to verify the build succeeds
3. Start dev server (`pnpm --filter web dev`) and visually compare each block type against the Next.js version
4. Test on mobile viewport sizes — many blocks have responsive breakpoint differences
5. Verify anchor scrolling works with `scroll-mt-24 md:scroll-mt-32` offsets
6. Check that the PortableText prose wrapper doesn't conflict with block-level component text classes
