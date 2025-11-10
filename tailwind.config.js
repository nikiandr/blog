/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable dark mode with class strategy
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
        },
        // Dark Mode Colors
        'dark_slate': {
          DEFAULT: '#0f1419',
          100: '#0a0d11',
          200: '#0f1419',
          300: '#151b21',
          400: '#1a1f26',
          500: '#20252d',
          600: '#252b34',
          700: '#2d3540',
          800: '#374150',
          900: '#434d5e'
        },
        'silver_gray': {
          DEFAULT: '#d4dce4',
          100: '#f0f3f6',
          200: '#e8eff6',
          300: '#d4dce4',
          400: '#c5cdd7',
          500: '#b4bcc4',
          600: '#a3abb3',
          700: '#919aa3',
          800: '#7f8891',
          900: '#6d7680'
        },
        'midnight_purple': {
          DEFAULT: '#c7b8e5',
          100: '#f3f0fa',
          200: '#e7e0f5',
          300: '#d7cceb',
          400: '#c7b8e5',
          500: '#b7a4df',
          600: '#a790d9',
          700: '#977cd3',
          800: '#8768cd',
          900: '#7754c7'
        },
        'slate_border': {
          DEFAULT: '#2d3540',
          100: '#434d5e',
          200: '#3e4856',
          300: '#38424f',
          400: '#333c48',
          500: '#2d3540',
          600: '#282f39',
          700: '#232932',
          800: '#1e232b',
          900: '#191d24'
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

