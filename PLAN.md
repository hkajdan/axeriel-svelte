# Plan: Svelte Visual & Functional Parity — Phased Execution

## Context

All 14 page builder blocks exist as scaffolds but share these gaps:

- **Rich text**: Every block uses `block.children[0].text` — loses bold, links, lists, headings, images
- **Background colors**: Duplicated `bgClasses` map in every component; uses wrong Tailwind classes (e.g. `bg-blue-50` instead of `bg-primary-100`)
- **Buttons**: Inline button rendering duplicated across CTA, ImageLinkCards, Hero
- **Footer**: Placeholder only — no columns, contact, map, social icons
- **Animations**: StatList counters, Carousel slides, Histogram bars — all static
- **VideoSection**: Shows placeholder text instead of actual Mux player
- All Next.js files used as source are in @../axeriel-next/apps/web/

## Instructions

- Execute the plan one step at a time, ask to proceed to next step
- At each step, lint and build to check if everything works
- All types are generated, don't write types
- Use the Svelte, Sanity and Context7 MCPs when needed

---

## PHASE 1: Foundation Utilities

**Goal**: Create shared utilities that all blocks will consume. No block changes yet.

### 1.1 Create `src/lib/utils/background-colors.ts`

Extract the duplicated `bgClasses` map into reusable functions:

```ts
getSectionClasses(bg: string): string  // returns bg + text color classes
getTextColorClass(bg: string): string  // returns appropriate text color
```

Color mapping (using existing theme tokens from layout.css):

- `white` → `bg-white text-neutral-900`
- `light-blue` → `bg-primary-100 text-neutral-900`
- `blue` → `bg-primary-500 text-white`
- `grey` → `bg-neutral-200 text-neutral-900`
- `light-grey` → `bg-neutral-50 text-neutral-900`

### 1.2 Create `src/lib/components/RichText.svelte`

Install `@portabletext/svelte` and create a component that renders:

- **Marks**: bold, italic, code, `axerielBlue` (blue text), `customLink` (resolve via `resolveSanityUrl`)
- **Styles**: h2-h6 with proper sizing, `normal` as `<p>`, `inline` as `<span>`
- **Lists**: bullet and numbered
- **Images**: render with `urlForImage`
- Accept a `class` prop for text color overrides

### 1.3 Create `src/lib/components/SanityButtons.svelte`

Shared button row component:

- Props: `buttons` array, optional `justify` (center/start/end)
- Variant mapping: `default`→`btn-primary`, `secondary`→`btn-secondary`, `outline`→`btn-outline`, `link`→text link style
- Uses `resolveSanityUrl`, `getLinkTarget`, `getLinkRel`

### 1.4 Create `src/lib/components/SanityImage.svelte`

- Props: `image` (Sanity image ref), `alt`, `class`, `sizes`
- Generates responsive srcset via `urlForImage(image).width(w).url()`
- Lazy loading with `loading="lazy"`

### 1.5 Update Tailwind theme in `layout.css`

Add missing aliases if needed for the background-colors utility to work with existing `--color-primary-*` and `--color-neutral-*` tokens.

### Checkpoint

- `pnpm run build --filter=web` must pass
- `pnpm run check --filter=web` must pass (types)
- New utilities importable but no visual changes yet

---

## PHASE 2: Update All 14 Block Components

**Goal**: Replace inline rich text, bgClasses, and buttons with shared components.

### Common changes for EVERY block

1. Replace `const bgClasses = {...}` + `const bgClass = ...` with `import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors'`
2. Replace `{#each richText as block}...{block.children[0].text}...{/each}` with `<RichText value={richText} />`
3. Replace inline button `<a>` loops with `<SanityButtons buttons={buttons} />`
4. Replace raw `<img src={urlForImage(...).url()}` with `<SanityImage>` where appropriate

### Per-block specific work

**✅ Completed:**

- `CTA.svelte` — ✅ swap bg/richtext/buttons
- `FeatureCardsIcon.svelte` — ✅ swap bg/richtext, card richtext too
- `TextImage.svelte` — ✅ swap bg/richtext (main + rows) + SanityImage for images
- `LogoList.svelte` — ✅ swap bg/richtext + SanityImage for logos
- `SubscribeNewsletter.svelte` — ✅ swap bg, use RichText for subTitle and helperText
- `Timeline.svelte` — ✅ swap bg/richtext per timeline item

**Simple (styling swap only):**

- `JobOffers.svelte` — swap bg/richtext
- `VideoSection.svelte` — swap bg, add actual `<mux-player>` (already done in Hero, replicate pattern)

**Medium (some logic):**

- `Hero.svelte` — swap richtext, add buttons back (currently missing)
- `ImageLinkCards.svelte` — swap bg/richtext/buttons, use SanityImage for card images
- `StatList.svelte` — swap bg/richtext, add IntersectionObserver counter animation

**Complex:**

- `Carousel.svelte` — add slide state (`currentSlide`), prev/next controls, dot navigation, transition
- `ProductList.svelte` — needs product data resolution (currently shows `_ref`), accordion UI
- `Histogram.svelte` — add IntersectionObserver for bar animation on scroll

### Checkpoint

- `pnpm run build --filter=web` must pass
- `pnpm run check --filter=web` must pass
- `pnpm dev --filter=web` — visually verify each block renders rich text formatting

---

## PHASE 3: Footer

**Goal**: Replace placeholder footer in layout with full implementation.

### 3.1 Create `src/lib/components/layout/Footer.svelte`

Based on footer query data shape:

- **Contact section**: RichText for `footer.contact.richText`, buttons, contact author photo/name/position/email
- **Location**: address, city, phone (from `footer.location`)
- **Columns**: multi-column link grid (from `footer.columns[]`)
- **Social icons row**: inline SVGs for Facebook, Instagram, LinkedIn, X, YouTube
- **Copyright bar**: "© {year} Axeriel"
- **Logo**: footer logo from `footer.logo`

### 3.2 Update `+layout.svelte`

- Remove placeholder footer markup (lines 63-95)
- Import and use `<Footer {footer} pageAuthor={pageAuthor} />`
- Remove debug `console.log` and `console.warn` calls

### Checkpoint

- `pnpm run build --filter=web` must pass
- `pnpm run check --filter=web` must pass
- Footer renders with columns, contact info, social icons

---

## PHASE 4: Navbar Polish + Cleanup

**Goal**: Final visual polish.

- Remove stale debug logging from `+layout.svelte`
- Remove `<div class="absolute inset-0">` wrapper from `PageBuilder.svelte` (line 57) — it constrains block rendering
- Verify navbar z-index and mobile behavior
- Clean up unused imports across all modified files

### Checkpoint

- `pnpm run build --filter=web` must pass
- `pnpm run check --filter=web` must pass
- Full page renders correctly end-to-end

---

## Key Files

| File                                            | Action                          |
| ----------------------------------------------- | ------------------------------- |
| `src/lib/utils/background-colors.ts`            | CREATE                          |
| `src/lib/components/RichText.svelte`            | CREATE                          |
| `src/lib/components/SanityButtons.svelte`       | CREATE                          |
| `src/lib/components/SanityImage.svelte`         | CREATE                          |
| `src/lib/components/layout/Footer.svelte`       | CREATE                          |
| `src/lib/components/blocks/*.svelte` (14 files) | EDIT                            |
| `src/routes/+layout.svelte`                     | EDIT                            |
| `src/lib/components/PageBuilder.svelte`         | EDIT                            |
| `src/routes/layout.css`                         | EDIT (if needed)                |
| `package.json`                                  | EDIT (add @portabletext/svelte) |

All paths relative to `apps/web/`.
