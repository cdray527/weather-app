import type { Config } from 'tailwindcss';

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji'
                ]
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)'
                },
                accent: {
                    DEFAULT: 'var(--accent)'
                }
            }
        }
    },
    plugins: [require('daisyui')]
} satisfies Config;
