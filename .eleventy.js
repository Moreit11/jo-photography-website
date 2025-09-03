module.exports = function(eleventyConfig) {
  // You can configure plugins, passthroughs, filters, etc. using eleventyConfig here.

  return {
    dir: {
      input: "src",
      includes: "_includes", // relative to input
      layouts: "_includes/layouts", // optional
      output: "_site"
    }
  };
};
