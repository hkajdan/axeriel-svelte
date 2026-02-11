# Axeriel Svelte - Agent Coding Guide

## 📁 Project Structure

This is a Turborepo monorepo with two main applications:

```
axeriel-svelte/
├── apps/
│   ├── web/          # SvelteKit frontend application
│   └── studio/       # Sanity CMS backend
├── packages/         # Shared configurations
└── AGENTS.md         # This file
```

## 🚀 Technical Stack

- **Frontend**: SvelteKit 2.50.1 with Svelte 5.48.2
- **CMS**: Sanity.io 5.7.0
- **Styling**: Tailwind CSS 4.1.18
- **Build System**: Turborepo + Vite 7.3.1
- **Package Manager**: pnpm

## 🔧 Build/Lint/Test Commands

### Development

```bash
# Start both applications
pnpm run dev

# Start only frontend
pnpm run dev --filter=web

# Start only studio
pnpm run dev --filter=studio
```

!! The dev server is always running on port 5173 for Svelte and 3333 for Sanity, do not start a new dev server to test your implementations

### Build

```bash
# Build all applications
pnpm run build

# Build only frontend
pnpm run build --filter=web

# Build only studio
pnpm run build --filter=studio
```

### Type Checking

```bash
# Check types across all applications
pnpm run check-types

# Check types in web app only
cd apps/web && pnpm run check

# Check types in watch mode
cd apps/web && pnpm run check:watch
```

### Linting

```bash
# Run linting across all applications
pnpm run lint

# Run linting in web app only
cd apps/web && pnpm run lint

# Fix linting issues automatically
cd apps/web && eslint . --fix
```

### Formatting

```bash
# Format all files
pnpm run format

# Format with Prettier
prettier --write "**/*.{ts,tsx,md,json,html,svelte}"
```

### Testing

```bash
# Run SvelteKit checks
cd apps/web && pnpm run check

# No test framework configured - use SvelteKit preview for testing
cd apps/web && pnpm run preview
```

## 📝 Code Style Guidelines

### Imports

```typescript
// ✅ Correct - Grouped and ordered imports
import { onMount } from "svelte";
import type { PageData } from "./$types";
import Button from "$lib/components/Button.svelte";
import { fetchData } from "$lib/utils/api";

// ❌ Incorrect - Ungrouped imports
import Button from "$lib/components/Button.svelte";
import { onMount } from "svelte";
import { fetchData } from "$lib/utils/api";
```

### Formatting

- **Indentation**: 2 spaces (configured in Prettier)
- **Semicolons**: No semicolons (Prettier config)
- **Line Length**: 100 characters max
- **Quotes**: Single quotes for JS, double quotes for HTML attributes

### Types

```typescript
// ✅ Correct - Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Incorrect - Any type
let user: any;
```

### Naming Conventions

```typescript
// Components: PascalCase
// Hero.svelte, CTA.svelte, FeatureCardsIcon.svelte

// Utility files: kebab-case
// sanity-client.ts, api-helpers.ts

// Variables: camelCase
// const userData = {}

// Types/Interfaces: PascalCase
// interface UserProfile {}

// Constants: UPPER_SNAKE_CASE
// const MAX_RETRIES = 3
```

### Error Handling

```typescript
// ✅ Correct - Proper error handling
try {
  const data = await fetchData();
} catch (error) {
  console.error("Failed to fetch data:", error);
  // Handle error gracefully
}

// ❌ Incorrect - No error handling
const data = await fetchData();
```

### Component Structure

```svelte
<!-- ✅ Correct component structure -->
<script lang="ts">
  // Imports first
  import { onMount } from 'svelte'

  // Props interface
  export let title: string

  // Reactive statements
  $: derivedValue = count * 2

  // Lifecycle functions
  onMount(() => {
    // Setup code
  })
</script>

<!-- Component markup -->
<div class="component-class">
  <slot />
</div>

```

### Tailwind CSS Usage

```svelte
<!-- ✅ Correct - Use Tailwind classes directly -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

<!-- ❌ Incorrect - Avoid inline styles -->
<button style="background-color: blue; color: white;">
  Click me
</button>
```

### Sanity Integration

```typescript
// ✅ Correct - Use generated types
import type { SanityDocument } from "$lib/sanity/sanity.types";

// ❌ Incorrect - Don't modify generated types
// Never edit apps/web/src/lib/sanity/sanity.types.ts directly
```

## 🎯 Best Practices for Agentic Coding

### When Modifying Svelte Application

1. **Always** check generated types in `sanity.types.ts`
2. **Use** existing components in `components/blocks/`
3. **Follow** data structure defined in Sanity schemas
4. **Test** with mock data when necessary

### For New Features

1. **First** define schema in Sanity (if new content type)
2. **Then** generate types with `pnpm run type`
3. **Next** create corresponding Svelte component
4. **Finally** integrate into PageBuilder

### Error Handling in PageBuilder

The PageBuilder has built-in error handling:

- Async loading with states
- Missing component handling
- User error display

## 📚 Additional Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Documentation](https://turborepo.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ⚠️ Important Notes

1. **Never modify** auto-generated files
2. **Always** verify version compatibility
3. **Test** changes in isolated environment
4. **Document** significant changes

## 🚀 Next Steps

1. Implement full content retrieval from Sanity
2. Build pages based on existing schemas
3. Create missing Svelte components for blocks
4. Implement complete page builder system

_Last updated: 2026-02-11_
