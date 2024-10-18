/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#023e35',
          900: '#064e3b',
          800: '#166534',
        },
      },
    },
  },
  content: [
    './public/**/*.html',
    './src/**/*.{html,js}',
  ],
  plugins: [],
}

