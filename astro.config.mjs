// @ts-check

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
