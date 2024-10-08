import forms from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  darkMode: [
    'variant',
    ['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)'],
  ],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.neutral,
        secondary: colors.neutral,
        success: colors.green,
        info: colors.blue,
        warning: colors.yellow,
        danger: colors.red,
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [forms, tailwindAnimate, typographyPlugin],
} satisfies Config

export default config
