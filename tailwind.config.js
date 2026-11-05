/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dial: {
          base: '#E9DDBD',
          highlight: '#F8F0DA',
          champagne: '#D4C49B',
          dark: '#171613',
          border: '#D0C3A0',
        },
        metallic: {
          silver: '#C7C6C0',
          shine: '#E5E5E2',
          shadow: '#7A7A78',
          deep: '#111111',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}

