export type SupportedLang = 'fr' | 'en';

export const SUPPORTED_LANGS: SupportedLang[] = ['fr', 'en'];
export const DEFAULT_LANG: SupportedLang = 'fr';

/**
 * Prefixes a path with the locale segment for non-default languages.
 * Only handles relative paths — absolute URLs are returned unchanged.
 */
export function localePath(path: string, lang: SupportedLang): string {
  // Don't prefix absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path;
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (lang === DEFAULT_LANG) {
    return normalizedPath;
  }

  // For root path, return /en (not /en/)
  if (normalizedPath === '/') {
    return `/${lang}`;
  }

  return `/${lang}${normalizedPath}`;
}
