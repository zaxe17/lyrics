/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.user-drag-none': {
            'user-drag': 'none',
            '-webkit-user-drag': 'none',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}