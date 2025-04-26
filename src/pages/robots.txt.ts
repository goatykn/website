import type { APIRoute } from "astro";
import { isPreview } from "../utils/mode";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
${isPreview ? "Disallow: /" : "Allow: /"}
Disallow: /_server-islands/

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
