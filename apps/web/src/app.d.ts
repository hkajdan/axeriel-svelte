// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      lang: 'fr' | 'en';
    }
    interface PageData {
      navbar?: any
      footer?: any
      settings?: any
      page?: any
      lang?: 'fr' | 'en'
      uiStrings?: any
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
