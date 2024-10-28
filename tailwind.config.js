/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E5751",
        secondary: "#B9684F",
        accent: "#D2E5D0",
        dark: "#2E2E2E",
        light: "#EDE5DE",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
        'float-delay-2': 'float 6s ease-in-out infinite 4s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2E2E2E',
            a: {
              color: '#2E5751',
              '&:hover': {
                color: '#FBD3C6',
              },
            },
            h1: {
              color: '#2E5751',
            },
            h2: {
              color: '#2E5751',
            },
            h3: {
              color: '#2E5751',
            },
            h4: {
              color: '#2E5751',
            },
            strong: {
              color: '#2E5751',
            },
            blockquote: {
              borderLeftColor: '#FBD3C6',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: '#2E5751',
              backgroundColor: '#EDE5DE',
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}