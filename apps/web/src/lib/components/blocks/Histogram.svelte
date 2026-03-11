<script lang="ts">
  import type { Histogram } from '$lib/sanity/sanity.types';
  import { getSectionClasses, getTextColorClass } from '$lib/utils/background-colors';
  import { SECTION_HEADER_SPACING } from '$lib/utils/section-spacing';
  import { onMount } from 'svelte';

  let {
    title, subtitle, bars, maxValue, minValue, valueSuffix, showValues,
    animationDuration, backgroundColor, anchor
  }: {
    title: Histogram['title'];
    subtitle: Histogram['subtitle'];
    bars: Histogram['bars'];
    maxValue: Histogram['maxValue'];
    minValue: Histogram['minValue'];
    valueSuffix: Histogram['valueSuffix'];
    showValues: Histogram['showValues'];
    animationDuration: Histogram['animationDuration'];
    backgroundColor: Histogram['backgroundColor'];
    anchor: Histogram['anchor'];
  } = $props();

  // Layout constants
  const DEPTH = 14;       // 3D depth in px
  const CHART_H = 260;    // chart area height in px
  const BAR_W = 52;       // bar face width in px
  const Y_AXIS_W = 56;    // y-axis label column width in px
  const DEFAULT_CLR = '#0092D6';

  let sectionClasses = $derived(getSectionClasses(backgroundColor || '', { hasTitle: Boolean(title) }));
  let textColorClass = $derived(getTextColorClass(backgroundColor || ''));

  let effectiveMax = $derived(maxValue ?? (bars?.length ? Math.max(...bars.map(b => b.value ?? 0)) : 100));
  let effectiveMin = $derived(minValue ?? 0);

  // 5 evenly-spaced Y-axis ticks
  let yTicks = $derived.by(() => {
    const range = effectiveMax - effectiveMin;
    const step = range / 4;
    return Array.from({ length: 5 }, (_, i) => {
      const v = effectiveMin + step * i;
      return Math.round(v * 1000) / 1000;
    });
  });

  let animatedBars: Record<number, boolean> = $state({});
  let chartEl: HTMLElement | undefined = $state();

  function getBarHeight(value: number): number {
    const range = effectiveMax - effectiveMin;
    if (range === 0) return CHART_H;
    return Math.max(2, ((value - effectiveMin) / range) * CHART_H);
  }

  function barColor(color?: string | null): string {
    return color?.startsWith('#') ? color : DEFAULT_CLR;
  }

  function formatValue(n: number): string {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (abs >= 1_000_000_000) return `${sign}${+((abs / 1_000_000_000).toPrecision(3)).toString().replace(/\.?0+$/, '')}B`;
    if (abs >= 1_000_000)     return `${sign}${+((abs / 1_000_000).toPrecision(3)).toString().replace(/\.?0+$/, '')}M`;
    if (abs >= 1_000)         return `${sign}${+((abs / 1_000).toPrecision(3)).toString().replace(/\.?0+$/, '')}K`;
    return String(n);
  }

  // Y position (px from top of chart area) for a given tick value
  function tickTop(tick: number): number {
    return DEPTH + (1 - (tick - effectiveMin) / (effectiveMax - effectiveMin)) * CHART_H;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars?.forEach((_, i) => {
            setTimeout(() => {
              animatedBars = { ...animatedBars, [i]: true };
            }, i * 70);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (chartEl) observer.observe(chartEl);
    return () => observer.disconnect();
  });
</script>

<section class="{sectionClasses} {textColorClass}" id={anchor}>
  <div class="container mx-auto">

    {#if title || subtitle}
      <div class="flex flex-col items-center space-y-4 text-center {SECTION_HEADER_SPACING}">
        {#if title}
          <h2 class="text-3xl font-semibold md:text-5xl">{title}</h2>
        {/if}
        {#if subtitle}
          <p class="text-lg opacity-70 max-w-2xl">{subtitle}</p>
        {/if}
      </div>
    {/if}

    {#if bars?.length}
      <div class="max-w-5xl mx-auto overflow-x-auto" bind:this={chartEl}>
        <div class="flex min-w-[320px]">

          <!-- Y-axis labels -->
          <div
            class="relative shrink-0"
            style="width: {Y_AXIS_W}px; height: {CHART_H + DEPTH}px;"
          >
            {#each yTicks as tick}
              <span
                class="absolute right-3 text-xs opacity-50 -translate-y-1/2 tabular-nums"
                style="top: {tickTop(tick)}px;"
              >
                {formatValue(tick)}{valueSuffix ?? ''}
              </span>
            {/each}
          </div>

          <!-- Chart body -->
          <div
            class="flex-1 relative"
            style="height: {CHART_H + DEPTH + 40}px;"
          >
            <!-- Horizontal grid lines -->
            {#each yTicks as tick}
              <div
                class="absolute left-0 right-0 border-t border-dashed opacity-20 border-current"
                style="top: {tickTop(tick)}px;"
              ></div>
            {/each}

            <!-- X-axis baseline -->
            <div
              class="absolute left-0 right-0 border-t-2 opacity-30 border-current"
              style="top: {DEPTH + CHART_H}px;"
            ></div>

            <!-- Bars row -->
            <div
              class="absolute inset-x-0 flex items-stretch justify-around px-2"
              style="top: {DEPTH}px; height: {CHART_H}px;"
            >
              {#each bars as bar, i}
                {@const bh = getBarHeight(bar.value ?? 0)}
                {@const clr = barColor(bar.color)}
                {@const dur = animationDuration ?? 1200}
                {@const del = i * 70}
                {@const ready = !!animatedBars[i]}

                <!-- Bar slot (full-height relative container) -->
                <div class="relative flex-1" style="max-width: {BAR_W + DEPTH + 24}px;">

                  <!-- Value label (above bar, fades in after animation) -->
                  {#if showValues !== false && bar.value !== undefined}
                    <div
                      class="absolute left-0 right-0 text-xs font-semibold text-center whitespace-nowrap pointer-events-none"
                      style="
                        bottom: {bh + DEPTH + 6}px;
                        opacity: {ready ? 1 : 0};
                        color: {clr};
                        transition: opacity 300ms ease {dur * 0.85 + del}ms;
                      "
                    >
                      {formatValue(bar.value)}{valueSuffix ?? ''}
                    </div>
                  {/if}

                  <!-- 3D bar (scaleY from bottom) -->
                  <div
                    class="absolute overflow-visible"
                    style="
                      bottom: 0;
                      left: calc(50% - {BAR_W / 2}px);
                      width: {BAR_W}px;
                      height: {bh}px;
                      transform: scaleY({ready ? 1 : 0});
                      transform-origin: center bottom;
                      transition: transform {dur}ms cubic-bezier(0.34, 1.56, 0.64, 1) {del}ms;
                    "
                  >
                    <!-- Front face -->
                    <div
                      class="absolute inset-0"
                      style="background-color: {clr};"
                    ></div>

                    <!-- Right side face (darker, skewed) -->
                    <div
                      class="absolute top-0 bottom-0"
                      style="
                        left: 100%;
                        width: {DEPTH}px;
                        background-color: color-mix(in srgb, {clr}, black 32%);
                        transform: skewY(-45deg);
                        transform-origin: left bottom;
                      "
                    ></div>

                    <!-- Top face (lighter, skewed) -->
                    <div
                      class="absolute left-0 w-full"
                      style="
                        top: -{DEPTH}px;
                        height: {DEPTH}px;
                        background-color: color-mix(in srgb, {clr}, white 42%);
                        transform: skewX(-45deg);
                        transform-origin: left bottom;
                      "
                    ></div>
                  </div>

                  <!-- X-axis label (year) -->
                  <div
                    class="absolute left-0 right-0 text-xs text-center opacity-60 truncate"
                    style="top: calc(100% + 10px);"
                  >
                    {bar.label ?? ''}
                  </div>
                </div>
              {/each}
            </div>
          </div>

        </div>
      </div>
    {/if}

  </div>
</section>
