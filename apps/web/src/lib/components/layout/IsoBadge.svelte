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
  class="fixed z-50 flex flex-col items-center justify-center rounded-full bg-linear-to-b from-primary-500 to-primary-600 text-white leading-none shadow-md ring-1 ring-primary-700/20 transition-transform duration-300 ease-in-out hover:from-primary-600 hover:to-primary-700 {className}"
  style="transform: {visible ? 'translateY(0)' : 'translateY(250%)'};"
  aria-label="Certification ISO 19443"
>
  <span class="text-[0.85em] font-medium tracking-widest uppercase">ISO</span>
  <span class="text-[1.35em] font-bold tracking-tight">19443</span>
</a>
