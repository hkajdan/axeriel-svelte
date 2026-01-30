# AGENTS.md - Axeriel Svelte Project Guidelines

This document provides comprehensive guidelines for agentic coding tools operating in the Axeriel Svelte monorepo. It covers build/lint/test commands, code style conventions, and project-specific rules.

## Project Structure

This is a Turborepo monorepo with:

- `apps/web`: Svelte 5 + SvelteKit frontend application
- `apps/studio`: Sanity CMS studio
- Shared configuration packages for ESLint and TypeScript

## Build/Lint/Test Commands

### Global Commands (Root Level)

```bash
# Build all apps
pnpm run build  # or: turbo run build

# Run all linters
pnpm run lint  # or: turbo run lint

# Format all code
pnpm run format  # Uses Prettier

# Check TypeScript types
pnpm run check-types  # or: turbo run check-types

# Run development servers
pnpm run dev  # or: turbo run dev
```

### Web App Commands (apps/web)

```bash
# Development server
cd apps/web && pnpm run dev  # or: vite dev

# Build for production
cd apps/web && pnpm run build  # or: vite build

# Preview production build
cd apps/web && pnpm run preview

# Type checking
cd apps/web && pnpm run check  # svelte-kit sync && svelte-check

# Watch mode for type checking
cd apps/web && pnpm run check:watch

# Linting
cd apps/web && pnpm run lint  # eslint .

# Run specific lint check
cd apps/web && npx eslint src/path/to/file.svelte
```

### Studio App Commands (apps/studio)

```bash
# Development server
cd apps/studio && pnpm run dev  # sanity dev

# Build
cd apps/studio && pnpm run build  # sanity build

# Deploy
cd apps/studio && pnpm run deploy  # sanity deploy

# Type generation
cd apps/studio && pnpm run type  # sanity schema extract && sanity typegen

# Linting
cd apps/studio && npx eslint .
```

### Turbo-specific Commands

```bash
# Run commands for specific apps using filters
turbo dev --filter=web
turbo build --filter=studio
turbo lint --filter=web

# Cache management
turbo prune
turbo login  # For remote caching
```

## Code Style Guidelines

### TypeScript/JavaScript

1. **Type Safety**: Always use TypeScript with strict mode enabled
2. **Imports**:
   - Use named imports for specific exports
   - Group imports: external libraries, local files, types
   - Use `$lib` alias for local imports in SvelteKit
3. **Naming Conventions**:
   - PascalCase for components and types
   - camelCase for variables and functions
   - UPPER_CASE for constants and environment variables
   - Prefix boolean variables with `is`, `has`, `can`, etc.

### Svelte Components

1. **Script Tags**: Always use `lang="ts"` for TypeScript
2. **Props**: Use explicit prop declarations with types
3. **Reactivity**: Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
4. **Styling**:
   - Use Tailwind CSS classes
   - Avoid inline styles
   - Use responsive design patterns
5. **Component Structure**:

   ```svelte
   <script lang="ts">
     // Imports first
     // Props with types
     // Component logic
     // Derived state
   </script>

   <!-- Template with proper indentation -->

   <style>
     /* Component-specific styles if needed */
   </style>
   ```

### Formatting Rules

1. **Prettier Configuration**:
   - Single quotes for strings
   - No semicolons
   - 100 character line length
   - 2-space indentation
   - Bracket spacing: false
2. **Tailwind CSS**:
   - Use utility classes over custom CSS when possible
   - Group related classes logically
   - Use responsive prefixes (sm:, md:, lg:, xl:)

### Error Handling

1. **Svelte Components**: Use `{#if}` blocks for conditional rendering
2. **Async Operations**: Handle errors in `$effect` or lifecycle functions
3. **API Calls**: Always include error boundaries and loading states
4. **Type Safety**: Use TypeScript discriminated unions for error states

### File Organization

1. **Component Files**: `.svelte` extension
2. **Utility Files**: `.ts` extension
3. **Type Files**: `.types.ts` suffix
4. **Server Files**: `.server.ts` suffix for server-side code
5. **Test Files**: `.spec.ts` or `.test.ts` (when implemented)

## Project-Specific Conventions

### Environment Variables

- Use `$env/static/public` for client-side environment variables
- Use `$env/static/private` for server-side environment variables
- Prefix with `PUBLIC_` for client-accessible variables

### Sanity Integration

1. **Client Setup**: Use `@sanity/sveltekit` client
2. **Image Handling**: Use `urlForImage()` utility
3. **Type Generation**: Types are auto-generated from Sanity schema
4. **Stega Enabled**: Visual editing is enabled

### Tailwind CSS

1. **Configuration**: Uses `tailwind.config.js` in web app
2. **Plugins**: No additional plugins (clean setup)
3. **Customization**: Extend theme in `tailwind.config.js`

### ESLint Configuration

- Extends: ESLint recommended, TypeScript recommended, Svelte recommended
- Prettier integration for formatting
- TypeScript parser for `.svelte` files
- Disabled `no-undef` rule (handled by TypeScript)

## Best Practices

1. **Component Design**:
   - Keep components small and focused
   - Use slots for composition
   - Extract complex logic to stores or utilities

2. **State Management**:
   - Use Svelte stores for global state
   - Prefer local state for component-specific data
   - Use derived stores for computed state

3. **Performance**:
   - Use `{#key}` for dynamic lists
   - Memoize expensive computations
   - Use lazy loading for non-critical resources

4. **Accessibility**:
   - Use semantic HTML
   - Add proper ARIA attributes
   - Ensure keyboard navigation
   - Use sufficient color contrast

5. **Internationalization**:
   - Ready for i18n implementation
   - Use consistent date/time formatting
   - Avoid hardcoded strings in components

## Testing (Future Implementation)

When tests are added, follow these patterns:

```bash
# Run all tests (when implemented)
pnpm test

# Run specific test file
pnpm test src/path/to/file.spec.ts

# Watch mode
pnpm test:watch
```

Test file structure:

- Co-locate tests with source files
- Use `.spec.ts` or `.test.ts` naming
- Follow AAA pattern (Arrange, Act, Assert)

## Git Workflow

1. **Branching**: Use feature branches with descriptive names
2. **Commits**: Follow conventional commits format
3. **Pull Requests**: Include description and context
4. **Reviews**: Required for all changes

## VSCode Settings

Recommended VSCode extensions:

- Svelte for VS Code
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- TypeScript Toolbox

## Continuous Integration

- Turbo Remote Caching enabled
- Type checking on push
- Linting on push
- Build verification

## Debugging Tips

1. **Type Errors**: Run `pnpm run check-types` for detailed type checking
2. **Linting Issues**: Run `pnpm run lint` to identify problems
3. **Build Issues**: Check Turbo cache with `turbo run build --force`
4. **Sanity Issues**: Run `pnpm run type` to regenerate types

## Learning Resources

- Svelte 5 Documentation: https://svelte.dev/docs
- SvelteKit Documentation: https://kit.svelte.dev/docs
- Sanity Documentation: https://www.sanity.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Turbo: https://turborepo.dev/docs

This AGENTS.md file provides comprehensive guidance for working with the Axeriel Svelte monorepo, ensuring consistent code quality and development practices.
