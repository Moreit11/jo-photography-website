//Navigation plugin eleventy https://www.11ty.dev/docs/plugins/navigation/
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import Image from "@11ty/eleventy-img";
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

  // Watch CSS files so changes trigger a rebuild
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/tailwind/");

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

  // Responsive image shortcode — generates 400/800/1200w WebP versions at build time
  eleventyConfig.addShortcode("galleryImage", async function(src, alt) {
    const imagePath = path.join(__dirname, "src", src);
    const metadata = await Image(imagePath, {
      widths: [400, 800, 1200],
      formats: ["webp"],
      outputDir: "./_site/assets/media/",
      urlPath: "/assets/media/",
    });
    return Image.generateHTML(metadata, {
      alt: alt || "",
      sizes: "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
      loading: "lazy",
      decoding: "async",
    });
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