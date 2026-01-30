<script lang="ts">
  import { Button, Card } from '$lib/components/ui';
</script>

<div class="container mx-auto px-4 py-8 space-y-12">
  <h1 class="text-4xl font-bold text-neutral-900 mb-8">UI Components Test Page</h1>

  <!-- Button Tests -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-neutral-800">Button Component Tests</h2>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Variants (Medium Size)</h3>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" size="md">Primary Button</Button>
        <Button variant="secondary" size="md">Secondary Button</Button>
        <Button variant="outline" size="md">Outline Button</Button>
        <Button variant="ghost" size="md">Ghost Button</Button>
        <Button variant="text" size="md">Text Button</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Sizes (Primary Variant)</h3>
      <div class="flex flex-wrap gap-4 items-end">
        <Button variant="primary" size="sm">SM Button</Button>
        <Button variant="primary" size="md">MD Button</Button>
        <Button variant="primary" size="lg">LG Button</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Full Width Buttons</h3>
      <div class="space-y-2 max-w-md">
        <Button variant="primary" fullWidth>Full Width Primary</Button>
        <Button variant="outline" fullWidth>Full Width Outline</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Disabled Buttons</h3>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" disabled>Disabled Primary</Button>
        <Button variant="secondary" disabled>Disabled Secondary</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Link Buttons</h3>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" href="/">Primary Link</Button>
        <Button variant="text" href="/">Text Link</Button>
      </div>
    </div>
  </section>

  <!-- Card Tests -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-neutral-800">Card Component Tests</h2>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Shadow Variants</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <Card shadow="none">
          <h4 class="text-lg font-semibold mb-2">No Shadow</h4>
          <p class="text-neutral-600">Card with no shadow effect.</p>
        </Card>

        <Card shadow="sm">
          <h4 class="text-lg font-semibold mb-2">Small Shadow</h4>
          <p class="text-neutral-600">Card with subtle small shadow.</p>
        </Card>

        <Card shadow="md">
          <h4 class="text-lg font-semibold mb-2">Medium Shadow</h4>
          <p class="text-neutral-600">Card with slightly more pronounced shadow.</p>
        </Card>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Rounded Corners</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <Card rounded="sm" shadow="sm">
          <h4 class="text-lg font-semibold mb-2">Small Rounded</h4>
          <p class="text-neutral-600">Card with small rounded corners.</p>
        </Card>

        <Card rounded="md" shadow="sm">
          <h4 class="text-lg font-semibold mb-2">Medium Rounded</h4>
          <p class="text-neutral-600">Card with medium rounded corners (default).</p>
        </Card>

        <Card rounded="lg" shadow="sm">
          <h4 class="text-lg font-semibold mb-2">Large Rounded</h4>
          <p class="text-neutral-600">Card with large rounded corners.</p>
        </Card>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Interactive Cards</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <Card interactive shadow="sm" href="/">
          <h4 class="text-lg font-semibold mb-2">Clickable Card</h4>
          <p class="text-neutral-600">This card is interactive and clickable.</p>
        </Card>

        <Card hoverable shadow="sm">
          <h4 class="text-lg font-semibold mb-2">Hoverable Card</h4>
          <p class="text-neutral-600">This card has hover effects but isn't clickable.</p>
        </Card>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium text-neutral-700">Complex Card Example</h3>
      <Card shadow="md" rounded="lg">
        <div class="flex items-center justify-between mb-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-600">
            Featured
          </span>
          <span class="text-sm text-neutral-500">Updated 2 hours ago</span>
        </div>

        <h4 class="text-xl font-semibold mb-2">Card with Complex Content</h4>
        <p class="text-neutral-600 mb-4">This demonstrates a more complex card layout with multiple elements.</p>

        <div class="flex flex-wrap gap-2">
          <Button variant="primary" size="sm">Primary Action</Button>
          <Button variant="outline" size="sm">Secondary Action</Button>
        </div>
      </Card>
    </div>
  </section>

  <!-- Combined Test -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-neutral-800">Combined Components Test</h2>

    <Card shadow="sm" rounded="md">
      <h4 class="text-xl font-semibold mb-4">Card with Buttons</h4>
      <p class="text-neutral-600 mb-6">This card contains multiple button variants to test the combination.</p>

      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="outline">Outline Action</Button>
      </div>
    </Card>
  </section>

  <!-- Brand Colors Test -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold text-neutral-800">Brand Colors Test</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-primary-500 text-white p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Primary Color</h3>
        <p class="text-primary-100">#0092D6 - Brand Blue</p>
        <div class="mt-4">
          <Button variant="secondary">Contrast Button</Button>
        </div>
      </div>

      <div class="bg-secondary-500 text-white p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Secondary Color</h3>
        <p class="text-secondary-100">#727274 - Brand Grey</p>
        <div class="mt-4">
          <Button variant="primary">Contrast Button</Button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Test page specific styles */
  section {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 2rem;
  }

  section:last-child {
    border-bottom: none;
  }
</style>