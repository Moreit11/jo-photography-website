const eleventyNavigationPlugin = require("11ty/eleventy");

module.exports = function(eleventyConfig) {
  // You can configure plugins, passthroughs, filters, etc. using eleventyConfig here.
  
  // Add Eleventy Navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  return {
    dir: {
      input: "src",
      includes: "_includes", // relative to input
      layouts: "_includes", // optional
      output: "_site"
    }
  };
};
