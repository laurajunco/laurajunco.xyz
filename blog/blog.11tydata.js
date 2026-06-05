// Shared defaults for everything in blog/.
// - All files get the "blog" tag (for collections.blog) and navActive for the header.
// - blog/index.njk keeps its own layout (base.njk); posts use post.njk + main.post-page.
// - Posts with externalUrl are listed on the index only — no empty page is built.
module.exports = {
  tags: "blog",
  navActive: "blog",
  eleventyComputed: {
    layout: (data) =>
      data.page.fileSlug === "index" ? null : "post.njk",
    mainClass: (data) =>
      data.page.fileSlug === "index" ? null : "post-page",
    permalink: (data) => (data.externalUrl ? false : null),
  },
};
