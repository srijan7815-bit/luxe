/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxe-black': '#000000',
        'luxe-ivory': '#F5F0E6',
        'luxe-gold': '#D6B56C',
        'luxe-dark-gray': '#1A1A1A',
        'luxe-light-gray': '#333333',
      },
      fontFamily: {
        'serif-luxe': ['Playfair Display', 'Georgia', 'serif'],
        'sans-luxe': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}