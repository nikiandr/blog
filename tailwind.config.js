/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter Tight', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        'alice_blue': {
          DEFAULT: '#f4faff',
          100: '#003764',
          200: '#006ec8',
          300: '#2da0ff',
          400: '#91cdff',
          500: '#f4faff',
          600: '#f7fbff',
          700: '#f9fcff',
          800: '#fbfdff',
          900: '#fdfeff'
        },
        'platinum': {
          DEFAULT: '#dee7e7',
          100: '#263535',
          200: '#4c6969',
          300: '#759b9b',
          400: '#aac1c1',
          500: '#dee7e7',
          600: '#e5ecec',
          700: '#ebf1f1',
          800: '#f2f6f6',
          900: '#f8fafa'
        },
        'thistle': {
          DEFAULT: '#b7adcf',
          100: '#221c30',
          200: '#453960',
          300: '#675591',
          400: '#8e7eb4',
          500: '#b7adcf',
          600: '#c7bfd9',
          700: '#d5cfe3',
          800: '#e3dfec',
          900: '#f1eff6'
        },
        'payne_gray': {
          DEFAULT: '#4f646f',
          100: '#101416',
          200: '#1f282c',
          300: '#2f3b42',
          400: '#3f4f58',
          500: '#4f646f',
          600: '#698594',
          700: '#8ea4af',
          800: '#b4c2ca',
          900: '#d9e1e4'
        },
        'davy_gray': {
          DEFAULT: '#535657',
          100: '#101111',
          200: '#212222',
          300: '#313333',
          400: '#424445',
          500: '#535657',
          600: '#747879',
          700: '#969a9b',
          800: '#b9bbbc',
          900: '#dcddde'
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

