import GoLogo from "../assets/tags/GoLogo.svg";
import GoatyLogoBG from "../assets/GoatyLogoBg.svg";
import AstroLogo from "../assets/tags/AstroLogo.svg";

type TagInfo = {
  label: string;
  icon: ((_props: astroHTML.JSX.SVGAttributes) => any) & ImageMetadata;
};

const TAG_MAP: Record<string, TagInfo> = {
  astro: { label: "Astro", icon: AstroLogo },
  go: { label: "Go", icon: GoLogo },
  default: { label: "default", icon: GoatyLogoBG }
};

/**
 * Retrieves information about a specific tag.
 *
 * @param tag - The name of the tag to retrieve information for.
 * @returns The `TagInfo` object associated with the given tag, or the default `TagInfo` if the tag is not found.
 */
export const getTagInfo = (tag: string): TagInfo => {
  return TAG_MAP[tag] || TAG_MAP["default"]!;
};
