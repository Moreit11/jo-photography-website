//Navigation plugin eleventy https://www.11ty.dev/docs/plugins/navigation/
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import postcss from "postcss";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Ignore CSS files that are imported into tailwind.css
  eleventyConfig.ignores.add("src/assets/css/utility.css");
  eleventyConfig.ignores.add("src/assets/css/styles.css");

  // Process CSS with PostCSS and Tailwind
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      if (inputPath.includes("tailwind.css")) {
        return async () => {
          const result = await postcss([
            postcssImport,
            tailwindcss(path.resolve(__dirname, "tailwind.config.mjs")),
            autoprefixer,
          ]).process(inputContent, {
            from: inputPath,
          });
          return result.css;
        };
      }
      return async () => inputContent;
    }
  });

  // Copy other assets but exclude the tailwind source file
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/media": "assets/media" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    }
  };
}