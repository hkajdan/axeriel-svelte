# 🎨 Axeriel Svelte Design System

This document outlines the comprehensive design system for the Axeriel corporate website, including brand guidelines, component specifications, and implementation details.

## 📋 Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Button System](#button-system)
6. [Card System](#card-system)
7. [Component Library](#component-library)
8. [Responsive Design](#responsive-design)
9. [Animations & Transitions](#animations--transitions)
10. [Implementation Guide](#implementation-guide)

## 🎯 Brand Identity

**Design Direction**: Professional corporate website with a modern, clean aesthetic that balances minimalism and boldness.

**Key Characteristics**:

- Trustworthy and reliable
- Modern yet professional
- Clean and uncluttered
- Simple and classy
- Equal priority for mobile and desktop

## 🎨 Color Palette

### Brand Colors

- **Primary Blue**: `#0092D6` (corporate brand color)
- **Secondary Grey**: `#727274` (neutral brand color)
- **Background**: `#FFFFFF` (white - used throughout)

### Extended Color System

```javascript
// Tailwind configuration colors
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0092D6',  // Brand blue
    600: '#0077B6',  // Hover state
    700: '#005f96'   // Active state
  },
  secondary: {
    500: '#727274',  // Brand grey
    600: '#5c5c5e',  // Hover state
    700: '#464648'   // Active state
  },
  neutral: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    500: '#718096',
    700: '#2d3748',
    900: '#1a202c'
  }
}
```

### Color Usage Guidelines

- **Primary Blue**: Call-to-action buttons, key interactive elements
- **Secondary Grey**: Text, borders, secondary elements
- **White**: Backgrounds, cards, containers
- **Light Grey**: Dividers, subtle borders, backgrounds

## 🔤 Typography

### Font Family

- **Primary**: Overpass
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Font Weights

- **Regular**: 400 (body text)
- **Medium**: 500 (subheadings, emphasis)
- **Semibold**: 600 (headings, important text)
- **Bold**: 700 (main headings, CTAs)

### Font Sizes

```css
/* Responsive typography scale */
.text-xs {
  font-size: 0.75rem;
} /* 12px */
.text-sm {
  font-size: 0.875rem;
} /* 14px */
.text-base {
  font-size: 1rem;
} /* 16px */
.text-lg {
  font-size: 1.125rem;
} /* 18px */
.text-xl {
  font-size: 1.25rem;
} /* 20px */
.text-2xl {
  font-size: 1.5rem;
} /* 24px */
.text-3xl {
  font-size: 1.875rem;
} /* 30px */
.text-4xl {
  font-size: 2.25rem;
} /* 36px */
.text-5xl {
  font-size: 3rem;
} /* 48px */
.text-6xl {
  font-size: 3.75rem;
} /* 60px */
```

### Line Heights

- **Body**: 1.5 (comfortable reading)
- **Headings**: 1.2 (compact, impactful)
- **Buttons**: 1.5 (readability)

### Letter Spacing

- **Body**: Normal
- **Headings**: -0.025em (slightly tighter)
- **Buttons**: 0.025em (slightly wider)

## 📏 Spacing System

### Base Unit

- **1 unit = 4px (0.25rem)**

### Spacing Scale

```css
/* Consistent spacing scale */
.gap-1 {
  gap: 0.25rem;
} /* 4px */
.gap-2 {
  gap: 0.5rem;
} /* 8px */
.gap-3 {
  gap: 0.75rem;
} /* 12px */
.gap-4 {
  gap: 1rem;
} /* 16px */
.gap-6 {
  gap: 1.5rem;
} /* 24px */
.gap-8 {
  gap: 2rem;
} /* 32px */
.gap-12 {
  gap: 3rem;
} /* 48px */
.gap-16 {
  gap: 4rem;
} /* 64px */
```

### Container Padding

- **Mobile**: 1rem (16px)
- **Tablet**: 1.5rem (24px)
- **Desktop**: 2rem (32px)

## 🔘 Button System

### Variants

1. **Primary** - Blue background, white text, subtle hover lift

   ```svelte
   <Button variant="primary">Primary Action</Button>
   ```

2. **Secondary** - Grey background, white text

   ```svelte
   <Button variant="secondary">Secondary Action</Button>
   ```

3. **Outline** - Transparent with blue border

   ```svelte
   <Button variant="outline">Outline Button</Button>
   ```

4. **Ghost** - Transparent with hover background

   ```svelte
   <Button variant="ghost">Ghost Button</Button>
   ```

5. **Text** - Text-only with hover color change
   ```svelte
   <Button variant="text">Text Button</Button>
   ```

### Sizes

- **Small**: `px-4 py-2 text-sm` (compact buttons)
- **Medium**: `px-6 py-3 text-base` (default size)
- **Large**: `px-8 py-4 text-lg` (prominent CTAs)

### States

- **Default**: Full opacity, normal cursor
- **Hover**: Subtle color change + transform (primary only)
- **Active**: Slightly darker color
- **Disabled**: 50% opacity, no-pointer cursor
- **Focus**: Ring outline for accessibility

### Usage Examples

```svelte
<!-- Primary CTA -->
<Button variant="primary" size="lg">Get Started</Button>

<!-- Secondary Action -->
<Button variant="secondary">Learn More</Button>

<!-- Outline Button -->
<Button variant="outline">View Details</Button>

<!-- Full width button -->
<Button variant="primary" fullWidth>Submit Form</Button>
```

## 📦 Card System

### Variants

1. **Standard Card** - White background, subtle shadow

   ```svelte
   <Card shadow="sm">
     <!-- Content -->
   </Card>
   ```

2. **Interactive Card** - Hover states, cursor pointer

   ```svelte
   <Card interactive shadow="sm">
     <!-- Content -->
   </Card>
   ```

3. **Media Card** - Image support, aspect ratios
   ```svelte
   <Card shadow="md">
     <img src="..." alt="..." class="aspect-video object-cover">
     <!-- Content -->
   </Card>
   ```

### Shadow Options

- **None**: No shadow (`shadow="none"`)
- **Small**: Subtle shadow (`shadow="sm"`)
- **Medium**: Slightly more pronounced (`shadow="md"`)

### Rounded Corners

- **Small**: `rounded-sm` (2px)
- **Medium**: `rounded-md` (6px) - default
- **Large**: `rounded-lg` (8px)

### Usage Examples

```svelte
<!-- Standard card -->
<Card shadow="sm" rounded="md">
  <h3 class="text-xl font-semibold">Card Title</h3>
  <p class="text-neutral-600">Card content goes here.</p>
</Card>

<!-- Interactive card with link -->
<Card interactive shadow="sm" href="/details">
  <h3 class="text-xl font-semibold">Interactive Card</h3>
  <p class="text-neutral-600">Click to view details.</p>
</Card>

<!-- Media card -->
<Card shadow="md" rounded="lg">
  <div class="aspect-video bg-neutral-200 rounded-t-lg">
    <img src="image.jpg" alt="Card image" class="w-full h-full object-cover rounded-t-lg">
  </div>
  <div class="p-6">
    <h3 class="text-xl font-semibold">Media Card</h3>
    <p class="text-neutral-600">Content with image support.</p>
  </div>
</Card>
```

## 🧩 Component Library

### Hero Component

**Structure:**

- Optional badge/eyebrow
- Main headline (H1)
- Supporting text/rich content
- CTA buttons (primary + secondary)
- Optional media (image/video)

**Design Tokens:**

- Background: White or brand colors
- Padding: `py-16 lg:py-24`
- Container: Full width with max-width constraints
- Layout: Grid with text + media columns

### CTA Component

**Structure:**

- Optional eyebrow
- Main headline (H2)
- Supporting text
- Action buttons
- Centered layout

**Design Tokens:**

- Background: White or brand colors
- Padding: `py-16 lg:py-20`
- Max width: `max-w-3xl`
- Text alignment: Center

### Feature Cards Component

**Structure:**

- Optional eyebrow and title
- Grid of feature cards (3 columns on desktop)
- Each card: icon, title, description

**Design Tokens:**

- Card background: White
- Card shadow: `shadow-sm`
- Card border: `border border-neutral-200`
- Grid gap: `gap-8`

### Product List Component

**Structure:**

- Optional eyebrow and title
- Grid of product cards (3 columns on desktop)
- Each card: product image, title, description, CTA

**Design Tokens:**

- Card background: White
- Card shadow: `shadow-sm`
- Card border: `border border-neutral-200`
- Grid gap: `gap-8`

### Image Link Cards Component

**Structure:**

- Optional eyebrow, title, and CTA buttons
- Grid of image cards (3 columns on desktop)
- Each card: image, title, description, link

**Design Tokens:**

- Card background: White
- Card shadow: `shadow-sm`
- Card border: `border border-neutral-200`
- Image aspect ratio: `aspect-video`

## 📱 Responsive Design

### Breakpoint System

```css
/* Mobile-first breakpoints */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

### Container System

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### Grid System

```svelte
<!-- Responsive grid example -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Grid items -->
</div>
```

### Typography Scaling

```css
.text-responsive {
  font-size: 1.5rem; /* 24px */
}

@media (min-width: 768px) {
  .text-responsive {
    font-size: 1.875rem; /* 30px */
  }
}

@media (min-width: 1024px) {
  .text-responsive {
    font-size: 2.25rem; /* 36px */
  }
}
```

## ✨ Animations & Transitions

### Transition Properties

```javascript
// Tailwind transition configuration
transitionProperty: {
  'colors': 'background-color, border-color, color, fill, stroke',
  'shadow': 'box-shadow',
  'transform': 'transform'
},
transitionDuration: {
  '200': '200ms',
  '300': '300ms'
}
```

### Button Animations

```css
/* Primary button hover lift */
.button-primary:hover {
  transform: translateY(-1px);
  transition:
    transform 200ms ease,
    background-color 200ms ease;
}

/* Card hover shadow */
.card:hover {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: box-shadow 300ms ease;
}
```

### Usage Guidelines

- **Subtle Animations**: Use for hover states and transitions
- **Duration**: 200-300ms for smooth but quick feedback
- **Easing**: Default ease for natural feel
- **Performance**: Prefer transform and opacity animations

## 🛠️ Implementation Guide

### Setting Up Tailwind

1. **Install Tailwind CSS**

   ```bash
   pnpm add -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. **Configure Tailwind**

   ```javascript
   // tailwind.config.js
   module.exports = {
     content: [
       "./src/**/*.{html,js,svelte,ts}",
       "./src/**/**/*.{html,js,svelte,ts}",
     ],
     theme: {
       extend: {
         colors: {
           /* Brand colors */
         },
         fontFamily: {
           /* Overpass font */
         },
         // ... other extensions
       },
     },
     plugins: [],
   };
   ```

3. **Add Tailwind to CSS**
   ```css
   /* src/app.css or similar */
   @import "tailwindcss/base";
   @import "tailwindcss/components";
   @import "tailwindcss/utilities";
   ```

### Using Components

```svelte
<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
</script>

<!-- Primary button -->
<Button variant="primary" size="lg">Get Started</Button>

<!-- Card with content -->
<Card shadow="sm">
  <h3 class="text-xl font-semibold">Card Title</h3>
  <p class="text-neutral-600 mt-2">Card content goes here.</p>
</Card>
```

### Best Practices

1. **Consistency**: Use the design system components consistently
2. **Accessibility**: Ensure proper color contrast and focus states
3. **Responsive**: Test components at all breakpoints
4. **Performance**: Use efficient animations and transitions
5. **Documentation**: Follow the established patterns

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Svelte**: https://svelte.dev/docs
- **Overpass Font**: https://fonts.google.com/specimen/Overpass
- **Color Contrast**: https://webaim.org/resources/contrastchecker/

This design system provides a comprehensive foundation for building a professional, modern corporate website with consistent branding and user experience.
