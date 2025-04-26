// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
// Define a `loader` and `schema` for each collection
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    emoji: z.string(),
    author: z.string(),
    tags: z.array(z.string())
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { posts };
