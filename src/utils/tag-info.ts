type TagInfo = {
  label: string;
  emoji: string;
};

const TAG_MAP: Record<string, TagInfo> = {
  astro: { label: "Astro", emoji: "🧑‍🚀" },
  go: { label: "Go", emoji: "🦔" },
  test: { label: "Test", emoji: "🧪" },
  default: { label: "default", emoji: "🏷️" }
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
