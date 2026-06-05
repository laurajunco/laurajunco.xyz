const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("markdownify", function (value) {
    return md.render(value || "");
  });

  eleventyConfig.addNunjucksFilter("dateFilter", function (dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("main.js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addCollection("blog", function (collection) {
    return collection
      .getFilteredByGlob("blog/*.md")
      .filter((post) => post.fileSlug !== "index")
      .map((post) => ({
        date: post.data.date,
        title: post.data.title,
        type: post.data.externalUrl ? "external" : "local",
        url: post.data.externalUrl || post.url,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "md", "njk"],
  };
};
