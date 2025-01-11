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
                    DEFAULT: 'var(--primary-foreground)',
                    foreground: 'var(--primary-foreground)',
                    background: 'var(--primary-background)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary-foreground)',
                    foreground: 'var(--secondary-foreground)',
                    background: 'var(--secondary-background)'
                },
                tertiary: {
                    DEFAULT: 'var(--tertiary-foreground)',
                    foreground: 'var(--tertiary-foreground)',
                    background: 'var(--tertiary-background)'
                }
            }
        }
    },
    plugins: [require('daisyui')]
} satisfies Config;
