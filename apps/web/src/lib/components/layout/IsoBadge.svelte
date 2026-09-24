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
  href={localePath('/certifications', lang)}
  class="fixed z-50 flex flex-col items-center justify-center rounded-full bg-linear-to-b from-red-500 to-red-600 text-white leading-none shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 {className}"
  style="transform: {visible ? 'translateY(0)' : 'translateY(250%)'};"
  aria-label="Certification ISO 19443"
>
  <span class="text-[1.25em] font-light">ISO</span>
  <span class="text-[1.5em] font-bold">19443</span>
</a>
