import type { AstroIntegration } from "astro";
import satori, { type SatoriOptions } from "satori";
import fs from "fs";
import parseFrontmatter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";
import type { InferEntrySchema } from "astro:content";
import { getTagInfo } from "../src/utils/tag-info";

/**
 * Generates OpenGraph images for an Astro project during the build process.
 *
 * This integration creates dynamic OpenGraph images for specific pages:
 * - A default image is generated for the home page (`pathname === ""`).
 * - For pages under the `posts/` directory, a unique image is generated using the page's frontmatter title.
 *
 * The images are styled with a gradient background, a logo, and dynamic text content.
 *
 * @returns {AstroIntegration} The Astro integration object for OpenGraph image generation.
 *
 * @example
 * ```typescript
 * import og from './astro-integrations/og';
 *
 * export default defineConfig({
 *   integrations: [og()],
 * });
 * ```
 *
 * @remarks
 * - The integration uses the `satori` library to generate SVGs and `resvg` to convert them to PNGs.
 * - Font files (`NotoSansJP-Regular.ttf` and `NotoSansJP-Bold.ttf`) and a logo image (`GoatyLogoImg.png`) are required in the `src/assets/fonts` and `src/assets` directories, respectively.
 * - The generated images are saved in the build output directory `dist/` with the filename `og.png`.
 *
 * @throws Will log an error message if OpenGraph image generation fails.
 *
 * @see
 * - https://dietcode.io/p/astro-og/
 * - https://og-playground.vercel.app
 */
const openGraphImage: () => AstroIntegration = (): AstroIntegration => ({
  name: "open-graph-image",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      try {
        const regularFont = fs.readFileSync(
          "src/assets/fonts/NotoSansJP-Regular.ttf"
        );
        const boldFont = fs.readFileSync(
          "src/assets/fonts/NotoSansJP-Bold.ttf"
        );
        const goatyImage = fs.readFileSync("src/assets/GoatyLogoImg.png");

        const satoriOptions: SatoriOptions = {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: "NotoSansJP",
              data: regularFont,
              weight: 400,
              style: "normal"
            },
            {
              name: "NotoSansJP",
              data: boldFont,
              weight: 700,
              style: "normal"
            }
          ]
        };

        for (const { pathname } of pages) {
          if (pathname === "") {
            const svg = await satori(
              {
                type: "div",
                props: {
                  style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, #BF5E47 0%, #EBB578 50%, #6E7F4B 100%)",
                    borderRadius: "40px",
                    padding: "40px",
                    boxSizing: "border-box"
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          backgroundColor: "white",
                          borderRadius: "32px",
                          padding: "64px",
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: {
                                width: "148px",
                                height: "148px",
                                borderRadius: "9999px",
                                backgroundColor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden"
                              },
                              children: {
                                type: "img",
                                props: {
                                  src: `data:image/png;base64,${goatyImage.toString("base64")}`,
                                  width: "100%",
                                  height: "100%",
                                  style: {
                                    objectFit: "contain"
                                  }
                                }
                              }
                            }
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                fontSize: "64px",
                                fontWeight: 700,
                                color: "#000",
                                fontFamily: "NotoSansJP"
                              },
                              children: "Goaty"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              satoriOptions
            );
            const resvg = new Resvg(svg, {
              fitTo: {
                mode: "width",
                value: 1200
              }
            });
            const png = new Uint8Array(resvg.render().asPng());
            fs.writeFileSync(`${dir.pathname}${pathname}og.png`, png);

            continue;
          }

          if (pathname.startsWith("posts/")) {
            const file = fs.readFileSync(`src/${pathname}.md`);
            const { title, tags } = parseFrontmatter(file)
              .data as InferEntrySchema<"posts">;

            const svg = await satori(
              {
                type: "div",
                props: {
                  style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, #BF5E47 0%, #EBB578 50%, #6E7F4B 100%)",
                    borderRadius: "40px",
                    padding: "40px",
                    boxSizing: "border-box"
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          backgroundColor: "white",
                          borderRadius: "32px",
                          padding: "64px",
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          position: "relative"
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: {
                                display: "flex",
                                flexDirection: "column"
                              },
                              children: [
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      fontSize: "56px",
                                      fontWeight: 700,
                                      lineHeight: 1.5,
                                      color: "#000",
                                      wordBreak: "break-word",
                                      whiteSpace: "pre-wrap"
                                    },
                                    children: title
                                  }
                                },
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "8px",
                                      marginTop: "16px"
                                    },
                                    children: tags.map((tag: string) => {
                                      const tagInfo = getTagInfo(tag);
                                      return {
                                        type: "span",
                                        props: {
                                          style: {
                                            border: "2px solid #e5e7eb",
                                            color: "#000",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            padding: "8px 16px",
                                            borderRadius: "16px",
                                            fontFamily: "NotoSansJP"
                                          },
                                          children: `#${tagInfo.label}`
                                        }
                                      };
                                    })
                                  }
                                }
                              ]
                            }
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                position: "absolute",
                                bottom: "36px",
                                left: "56px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                              },
                              children: [
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      width: "128px",
                                      height: "128px",
                                      borderRadius: "9999px",
                                      backgroundColor: "#fff",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden"
                                    },
                                    children: {
                                      type: "img",
                                      props: {
                                        src: `data:image/png;base64,${goatyImage.toString("base64")}`,
                                        width: "100%",
                                        height: "100%",
                                        style: {
                                          objectFit: "contain"
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      fontSize: "48px",
                                      fontWeight: 700,
                                      color: "#000",
                                      fontFamily: "NotoSansJP"
                                    },
                                    children: "Goaty"
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              satoriOptions
            );
            const resvg = new Resvg(svg, {
              fitTo: {
                mode: "width",
                value: 1200
              }
            });
            const png = new Uint8Array(resvg.render().asPng());
            fs.writeFileSync(`${dir.pathname}${pathname}og.png`, png);
          }
        }
        log("`**/*og.png` created at `dist`");
      } catch (e) {
        log("OpenGraph image generation failed", true);
        console.log(e);
      }
    }
  }
});

/**
 * Logs a message to the console with a timestamp and a label indicating its source.
 *
 * @param message - The message to log.
 * @param isError - Optional. If `true`, the log is treated as an error and displayed in red. Defaults to `false`.
 */
function log(message: string, isError: boolean = false) {
  const now = color(new Date().toTimeString().split(" ")[0] ?? "", 90);
  const label = color("[open-graph-image]", isError ? 31 : 34);
  console.log(`${now} ${label} ${message}`);
}

/**
 * Applies ANSI color codes to a given text string, allowing for colored output in the terminal.
 *
 * @param text - The text to be colored.
 * @param code - The ANSI color code to apply to the text.
 * @returns The text wrapped with the specified ANSI color code.
 */
function color(text: string, code: number) {
  return `\x1b[${code}m${text}\x1b[0m`;
}

export default openGraphImage;
