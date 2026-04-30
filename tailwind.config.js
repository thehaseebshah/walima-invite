/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#E8D5A3',
          400: '#ecc94b',
          500: '#d69e2e',
          600: '#b7791f',
          700: '#9F7624',
          900: '#5F4314',
        },
        navy: {
          900: '#0a192f',
          800: '#112240',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
