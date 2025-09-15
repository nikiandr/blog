/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        'primary': '#ffffff',
        'secondary': '#cccccc', 
        'accent': '#8b5cf6',
        'text': '#ffffff',
        'bg': '#000000',
        'terminal-bg': '#111111',
        'border': '#333333',
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

