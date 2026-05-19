/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinematic-bg': '#0a0a0a',
        'cinematic-gray': '#1c1c1c',
        'cinematic-accent': '#d4a373', // Warm vintage accent
        'cinematic-text': '#e5e5e5',
        'cinematic-muted': '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern sans-serif
        serif: ['Playfair Display', 'serif'], // Cinematic look for specific highlights if needed
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
