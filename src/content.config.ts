import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
    pattern: "**/album.json",
    base: "./src/albums",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      draft: z.boolean().optional(),
      tripDates: z.array(z.coerce.date()).length(2),
      coverPhoto: image(),
      photos: z.array(
        z.object({
          url: z.string().url().optional(),
          photo: image().optional(),
          description: z.string(),
        })
      ),
    }),
});

export const collections = { blog, albums };
