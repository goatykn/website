import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "Goaty",
    description: "ソフトウェアエンジニアGoatyのWebサイト兼ブログです。",
    // context.site returns a URL made from site in your Astro config.
    // It returns undefined if you have not set a value for site in your Astro config.
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}`,
      content: sanitizeHtml(parser.render(post.body!), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
      })
    })),
    customData: `<language>ja-jp</language>`
  });
}
