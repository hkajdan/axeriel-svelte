// See https://svelte.dev/axeriel-svelte/apps/web/src/app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      sanity: SanityLocals
    }
    interface PageData {
      previewEnabled: any
      navbar?: any
      footer?: any
      settings?: any
      page?: any
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
