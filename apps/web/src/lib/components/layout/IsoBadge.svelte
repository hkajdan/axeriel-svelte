<script lang="ts">
  import { localePath, type SupportedLang } from '$lib/utils/i18n';

  let { visible, lang, class: className = '' }: {
    visible: boolean;
    lang: SupportedLang;
    class?: string;
  } = $props();
</script>

<!-- ISO 19443 badge — slides out with the navbar on scroll -->
<a
  href={localePath('/certifications#certifications', lang)}
  class="fixed z-50 flex flex-col items-center justify-center rounded-full bg-white/80 backdrop-blur border border-neutral-200 text-neutral-800 leading-none shadow-sm transition-transform duration-300 ease-in-out hover:border-primary-500/40 hover:text-primary-600 {className}"
  style="transform: {visible ? 'translateY(0)' : 'translateY(250%)'};"
  aria-label="Certification ISO 19443"
>
  <span class="text-[0.75em] font-medium tracking-widest uppercase">ISO</span>
  <span class="text-[1.15em] font-semibold tracking-tight">19443</span>
</a>
