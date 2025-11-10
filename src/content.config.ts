import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./articles" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(), // Optional draft field
    })
  });

export const collections = { blog };