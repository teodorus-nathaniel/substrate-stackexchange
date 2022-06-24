/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif']
      },
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        text: {
          primary: 'rgb(255 255 255 / 0.87)',
          secondary: 'rgb(255 255 255 / 0.6)',
          disabled: 'rgb(255 255 255 / 0.38)'
        },
        bg: {
          0: 'rgb(var(--bg-0) / <alpha-value>)',
          100: 'rgb(var(--bg-100) / <alpha-value>)',
          200: 'rgb(var(--bg-200) / <alpha-value>)'
        },
        code: 'rgb(110 118 129 / 0.4)'
      }
    }
  },
  plugins: []
}
