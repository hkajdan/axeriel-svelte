<script lang="ts">
  import type { StatList } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import RichText from '$lib/components/PortableText.svelte';
  import { onMount } from 'svelte';

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

  let cleanTextAlign = $derived((textAlign || 'center').replace(/[^\x20-\x7E]/g, '') as 'left' | 'center' | 'right');

  // Displayed counter values (string); null = not yet started, show original
  let displayValues: (string | null)[] = $state([]);
  let sectionEl: HTMLElement | undefined = $state();

  function parseNumeric(val: string | null | undefined): number | null {
    if (!val) return null;
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
  }

  function decimalPlaces(val: string): number {
    const m = val.match(/\.(\d+)/);
    return m ? m[1].length : 0;
  }

  // ease-out cubic
  function easeOut(t: number): number {
    return 1 - (1 - t) ** 3;
  }

  onMount(() => {
    if (animateNumbers === false || !stats?.length) return;

    const duration = (animationDuration ?? 2) * 1000;

    const targets = stats.map(s => ({
      target: parseNumeric(s.value),
      decimals: decimalPlaces(s.value || ''),
      original: s.value || '',
    }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now();

        function tick(now: number) {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = easeOut(t);

          displayValues = targets.map(({ target, decimals, original }) => {
            if (target === null) return original;
            return (target * eased).toFixed(decimals);
          });

          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section
  class="{sectionClasses} {textColorClass}"
  style="text-align: {cleanTextAlign}"
  id={anchor || 'stats'}
  bind:this={sectionEl}
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
        {#each stats as stat, i}
          <div class="w-full max-w-[250px] space-y-2 max-md:mx-auto">
            <dt class="text-xl font-bold">
              {#if stat.prefix}<span class="text-primary-500">{stat.prefix}</span>{/if}
              <span class="text-6xl tabular-nums">{displayValues[i] ?? stat.value}</span>
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
