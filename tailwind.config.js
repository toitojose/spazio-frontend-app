/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        highlight: {
          default: '#b74e91', // Color principal para destacar
          secondary: '#5e42a6', // Color alternativo para destacar
        },
        sidebar: '#1f1f1f', // Fondo del sidebar
      },
      fontFamily: {
        logo: ['"Poiret One"', 'serif'],
        sans: [
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
