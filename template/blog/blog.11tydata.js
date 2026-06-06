// Shared defaults for everything in blog/.
// - Posts get the "blog" tag (for collections.blog) and navActive for the header.
// - blog/index.njk keeps its own layout (base.njk); posts use post.njk + main.post-page.
// - Posts with url are listed on the index only — no empty page is built.
const isBlogIndex = (data) => data.page.url === "/blog/";

module.exports = {
  tags: "blog",
  navActive: "blog",
  eleventyExcludeFromCollections: false,
  eleventyComputed: {
    layout: (data) => (isBlogIndex(data) ? "base.njk" : "post.njk"),
    mainClass: (data) => (isBlogIndex(data) ? undefined : "post-page"),
    permalink: (data) => (data.url ? false : null),
  },
};
