/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "Source Serif 4",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        sans: [
          "Inter Tight",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        // Light mode - Warm paper tones
        paper: {
          DEFAULT: "#faf8f5",
          50: "#fdfcfb",
          100: "#fdfcfa",
          200: "#f4f1eb",
          300: "#ede8e0",
          400: "#e5dfd4",
          500: "#d4cdc1",
        },
        ink: {
          DEFAULT: "#1a1814",
          50: "#f7f6f5",
          100: "#e8e6e3",
          200: "#d1cdc8",
          300: "#a8a29a",
          400: "#78726a",
          500: "#57524b",
          600: "#3d3933",
          700: "#2a2723",
          800: "#1a1814",
          900: "#0d0c0a",
        },
        accent: {
          DEFAULT: "#8b4049",
          light: "#a65d5d",
          muted: "#c9a6a6",
          subtle: "#e8d5d5",
        },
        // Dark mode - Warm charcoal
        paper_dark: {
          DEFAULT: "#1a1814",
          50: "#2e2a25",
          100: "#252220",
          200: "#1f1c19",
          300: "#1a1814",
          400: "#141210",
          500: "#0d0c0a",
        },
        ink_dark: {
          DEFAULT: "#e8e6e3",
          100: "#f7f6f5",
          200: "#e8e6e3",
          300: "#d1cdc8",
          400: "#a8a29a",
          500: "#78726a",
        },
        accent_dark: {
          DEFAULT: "#d4a5a5",
          light: "#e8c5c5",
          muted: "#b08585",
        },
        // Border colors
        border: {
          DEFAULT: "#e5dfd4",
          dark: "#2e2a25",
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out",
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "42rem",
          },
        },
      },
    },
  },
  plugins: [],
};
