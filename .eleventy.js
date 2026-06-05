const md = require("./scripts/markdown");

module.exports = function (eleventyConfig) {
  // site/ is gitignored; assemble creates it as symlinks to template/ + content/
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addNunjucksFilter("markdownify", (value) => md.render(value || ""));

  eleventyConfig.addNunjucksFilter("dateFilter", function (dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addPassthroughCopy("site/style.css");
  eleventyConfig.addPassthroughCopy("site/assets");
  eleventyConfig.addPassthroughCopy("site/CNAME");
  eleventyConfig.addPassthroughCopy("site/robots.txt");

  eleventyConfig.addCollection("work", function (collection) {
    return collection
      .getFilteredByGlob("site/work/*.md")
      .filter((project) => project.fileSlug !== "index")
      .sort((a, b) => a.data.order - b.data.order);
  });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "md", "njk"],
  };
};
