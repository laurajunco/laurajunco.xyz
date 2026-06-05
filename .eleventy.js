const { execSync } = require("child_process");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  // site/ is gitignored but must remain Eleventy's input after assemble
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.on("eleventy.beforeWatch", () => {
    execSync("node scripts/assemble.js", { stdio: "inherit" });
  });

  eleventyConfig.addWatchTarget("./content/");
  eleventyConfig.addWatchTarget("./template/");

  eleventyConfig.addNunjucksFilter("markdownify", function (value) {
    return md.render(value || "");
  });

  eleventyConfig.addNunjucksFilter("dateFilter", function (dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addCollection("work", function (collection) {
    return collection
      .getFilteredByGlob("work/*.md")
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
