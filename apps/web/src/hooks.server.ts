import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Extract lang from route params (set by [[lang=lang]] matcher)
  const lang = (event.params.lang as 'en' | undefined) ?? 'fr';
  event.locals.lang = lang;

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('lang="fr"', `lang="${lang}"`)
  });
};
