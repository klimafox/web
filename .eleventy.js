module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Split array into N roughly-equal chunks for multi-column layouts
  eleventyConfig.addFilter("chunk3", (array) => {
    if (!array || !array.length) return [[], [], []];
    const size = Math.ceil(array.length / 3);
    return [
      array.slice(0, size),
      array.slice(size, size * 2),
      array.slice(size * 2)
    ];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
