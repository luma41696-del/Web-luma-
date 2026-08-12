import type { Config } from 'tailwindcss';

/**
 * LUMA Agency design tokens.
 *
 * The palette is sampled from the brand key visuals: a deep midnight-navy
 * cosmos, cool steel-blue detailing, starlight white type, and the warm gold
 * of the star that sits above the LUMA mark — used strictly as an accent.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          DEFAULT: '#020E1A', // deepest background
          900: '#02080F',
          800: '#020E1A',
          700: '#04121F',
        },
        midnight: {
          DEFAULT: '#061B2D',
          800: '#061B2D',
          700: '#0A2740',
          600: '#0E3352',
        },
        luma: {
          DEFAULT: '#16496E', // primary brand blue
          700: '#123C5C',
          600: '#16496E',
          500: '#1D5C8B',
          400: '#2A76AE',
        },
        steel: {
          DEFAULT: '#7892AD',
          300: '#B8C6D6',
          400: '#9FB3C8',
          500: '#7892AD',
          600: '#5C748F',
          700: '#42586F',
        },
        starlight: {
          DEFAULT: '#F5F7FA',
          dim: '#C9D4E0',
        },
        gold: {
          DEFAULT: '#E8B95C',
          400: '#F2CE84',
          500: '#E8B95C',
          600: '#C99B41',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      maxWidth: {
        shell: '80rem',
      },
      screens: {
        xs: '420px',
      },
      transitionTimingFunction: {
        cosmic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        haloPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        orbit: 'orbit 40s linear infinite',
        'orbit-slow': 'orbit 90s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        halo: 'haloPulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
