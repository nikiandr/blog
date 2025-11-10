// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), mdx()],
    redirects: {
      "/": { status: 302, destination: "/about-me" },
    },
    prefetch: true,
});