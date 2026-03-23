import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs22.x'
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (message.includes('404')) {
          console.warn(`Warning: ${path} (linked from ${referrer}) returned 404 — skipping`);
          return;
        }
        throw new Error(message);
      },
      handleMissingId: 'warn'
    }
  }
};

export default config;
