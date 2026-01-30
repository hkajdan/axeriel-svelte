/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0092D6',  // Brand blue
          600: '#0077B6',  // Hover state
          700: '#005f96'   // Active state
        },
        secondary: {
          500: '#727274',  // Brand grey
          600: '#5c5c5e',  // Hover state
          700: '#464648'   // Active state
        },
        neutral: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          500: '#718096',
          700: '#2d3748',
          900: '#1a202c'
        }
      },
      fontFamily: {
        sans: ['Overpass', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular']
      },
      fontSize: {
        'xs': '0.75rem',    /* 12px */
        'sm': '0.875rem',   /* 14px */
        'base': '1rem',     /* 16px */
        'lg': '1.125rem',   /* 18px */
        'xl': '1.25rem',    /* 20px */
        '2xl': '1.5rem',    /* 24px */
        '3xl': '1.875rem',  /* 30px */
        '4xl': '2.25rem',   /* 36px */
        '5xl': '3rem',      /* 48px */
        '6xl': '3.75rem'    /* 60px */
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        'sm': '0.125rem',   /* 2px */
        'DEFAULT': '0.25rem', /* 4px */
        'md': '0.375rem',   /* 6px */
        'lg': '0.5rem',     /* 8px */
        'xl': '0.75rem',    /* 12px */
        'full': '9999px'
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'shadow': 'box-shadow',
        'transform': 'transform'
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms'
      }
    }
  },
  plugins: []
}