/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        '2.5': '10px', // Custom translation for 10px
      },

    },
  },
  plugins: [],
}