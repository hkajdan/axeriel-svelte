/**
 * Svelte action: fade-up reveal when an element enters the viewport.
 *
 * Uses requestAnimationFrame so the hidden state is applied after the first
 * SSR paint (no hydration flash). IntersectionObserver then fires immediately
 * for elements already visible, animating them in. Below-fold elements animate
 * in as the user scrolls to them.
 *
 * Respects prefers-reduced-motion.
 */
export function reveal(node: HTMLElement) {
  if (typeof window === 'undefined') return { destroy() {} }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy() {} }

  let observer: IntersectionObserver | null = null

  // rAF: apply hidden state after the browser's first paint so SSR-rendered
  // content isn't invisible before hydration, then immediately start observing.
  const raf = requestAnimationFrame(() => {
    node.style.opacity = '0'
    node.style.transform = 'translateY(2rem)'
    node.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)'

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1'
          node.style.transform = 'translateY(0)'
          observer?.disconnect()
          observer = null
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(node)
  })

  return {
    destroy() {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }
}
