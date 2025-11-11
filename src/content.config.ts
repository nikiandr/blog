import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().optional(),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
  }),
});

const albums = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/albums",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
      tripDates: z.array(z.coerce.date()).length(2),
      photosFolder: z.string(),
      photos: z.array(
        z.object({
          photo: image(),
          description: z.string(),
        })
      ),
    }),
});

export const collections = { blog, albums };
