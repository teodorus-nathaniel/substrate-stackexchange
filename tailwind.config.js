/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        text: {
          primary: 'rgb(255 255 255 / 0.87)',
          secondary: 'rgb(255 255 255 / 0.6)',
          disabled: 'rgb(255 255 255 / 0.38)',
        },
        bg: {
          0: '#121212',
          100: '#202020',
          200: '#353535',
        },
      },
    },
  },
  plugins: [],
}
