/** @type {import("prettier").Config} */
export default {
  printWidth: 130,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
  tailwindStylesheet: "./apps/web/src/styles/global.css",
};
