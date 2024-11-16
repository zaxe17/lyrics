import { color } from 'motion/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            dropShadow: {
                'shadow-color': '0 10px 20px #38bdf8',
        },
    },
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