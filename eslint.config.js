import eslintPluginAstro from "eslint-plugin-astro";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ignores: ["**/dist/*"]
  },
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  }
];
