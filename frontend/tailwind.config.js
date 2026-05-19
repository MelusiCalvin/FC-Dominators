/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fc-orange': '#FF5722',
        'fc-dark': '#1a1a1a',
        'fc-darker': '#0f0f0f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

module.exports = config
