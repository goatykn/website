import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string()
    }),
    handler: async (input) => {
      return `Hello, ${input.name}!`;
    }
  }),
  likePost: defineAction({
    input: z.object({
      postSlug: z.string()
    }),
    handler: async (input, context) => {
      const kv = context.locals.runtime.env.KV_WEBSITE_LIKE_COUNT;
      // Find the post in the database
      const likeCount = (await kv.get(input.postSlug)) as string | null;
      const likeCountNum = parseInt(likeCount ?? "0");
      await kv.put(input.postSlug, (likeCountNum + 1).toString());
    }
  })
};
