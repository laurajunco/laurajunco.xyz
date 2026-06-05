const markdownIt = require("markdown-it");

const md = new markdownIt();
const defaultLinkOpen =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet("href") || "";
  if (/^https?:\/\//i.test(href)) {
    tokens[idx].attrSet("class", "external");
    tokens[idx].attrSet("target", "_blank");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

module.exports = md;
