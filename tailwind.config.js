/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1F3F27',
          50: '#f2f7f3',
          100: '#e1ede3',
          200: '#c4dbc7',
          300: '#9bc1a1',
          400: '#6ea276',
          500: '#4c8455',
          600: '#396942',
          700: '#2d5335',
          800: '#1F3F27',
          900: '#1a3321',
          950: '#0e1d13',
        },
        sandstone: {
          DEFAULT: '#E2BD8B',
          light: '#F4E8D8',
          cream: '#FDFBF7',
          dark: '#C89F6B',
          pinkish: '#E2B9A2',
        }
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
