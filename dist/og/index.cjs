'use strict';

// src/og/index.ts
function ogImage(config) {
  return {
    width: 1200,
    height: 630,
    ...config
  };
}
var templates = {
  simple: "simple",
  product: "product",
  article: "article",
  profile: "profile"
};

exports.ogImage = ogImage;
exports.templates = templates;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map