// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import openGraphImage from "./astro-integrations/open-graph-image";

// @ts-ignore
const { SITE_URL } = loadEnv(process.env.SITE_URL, process.cwd(), "");
if (SITE_URL === "") {
  throw new Error("SITE_URL is empty.");
}
// @ts-ignore
const { MODE } = loadEnv(process.env.MODE, process.cwd(), "");
if (MODE === "") {
  throw new Error("MODE is empty.");
}

// https://astro.build/config
// @ts-ignore
export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap(),
    mdx(),
    preact({
      devtools: true
    }),
    openGraphImage()
  ],
  // https://creativehike.com/posts/removing-trailng-slashes-astro
  trailingSlash: "never",
  build: {
    format: "file"
  },
  adapter: cloudflare({
    imageService: "compile",
    // @ts-ignore
    platformProxy: {
      enabled: true,
      environment: MODE
    }
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
