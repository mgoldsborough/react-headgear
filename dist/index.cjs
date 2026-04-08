'use strict';

var react = require('react');

// src/useHeadgear.ts
function useHeadgear(config) {
  react.useEffect(() => {
    const cleanupFns = [];
    const previousTitle = document.title;
    document.title = config.title;
    cleanupFns.push(() => {
      document.title = previousTitle;
    });
    const setMeta = (selector, content, attrType = "name") => {
      let element = document.querySelector(selector);
      const isNew = !element;
      if (!element) {
        element = document.createElement("meta");
        const attrValue = selector.match(/(?:name|property)="([^"]+)"/)?.[1];
        if (attrValue) {
          element.setAttribute(attrType, attrValue);
        }
        document.head.appendChild(element);
      }
      const previousContent = element.content;
      element.content = content;
      if (isNew) {
        cleanupFns.push(() => element?.remove());
      } else {
        cleanupFns.push(() => {
          if (element) element.content = previousContent;
        });
      }
    };
    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      const isNew = !element;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      const previousHref = element.href;
      element.href = href;
      if (isNew) {
        cleanupFns.push(() => element?.remove());
      } else {
        cleanupFns.push(() => {
          if (element) element.href = previousHref;
        });
      }
    };
    setMeta('meta[name="description"]', config.description);
    if (config.noindex) {
      setMeta('meta[name="robots"]', "noindex, nofollow");
    }
    if (config.keywords && config.keywords.length > 0) {
      setMeta('meta[name="keywords"]', config.keywords.join(", "));
    }
    if (config.canonical) {
      setLink("canonical", config.canonical);
    }
    const ogTitle = config.og?.title || config.title;
    const ogDescription = config.og?.description || config.description;
    const ogType = config.og?.type || "website";
    setMeta('meta[property="og:title"]', ogTitle, "property");
    setMeta('meta[property="og:description"]', ogDescription, "property");
    setMeta('meta[property="og:type"]', ogType, "property");
    if (config.og?.image) {
      const imageUrl = typeof config.og.image === "string" ? config.og.image : `/og/${config.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      setMeta('meta[property="og:image"]', imageUrl, "property");
    }
    if (config.og?.url || config.canonical) {
      setMeta(
        'meta[property="og:url"]',
        config.og?.url || config.canonical,
        "property"
      );
    }
    if (config.og?.siteName) {
      setMeta('meta[property="og:site_name"]', config.og.siteName, "property");
    }
    const twitterCard = config.twitter?.card || "summary_large_image";
    setMeta('meta[name="twitter:card"]', twitterCard);
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[name="twitter:description"]', ogDescription);
    if (config.og?.image) {
      const imageUrl = typeof config.og.image === "string" ? config.og.image : `/og/${config.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      setMeta('meta[name="twitter:image"]', imageUrl);
    }
    if (config.twitter?.site) {
      setMeta('meta[name="twitter:site"]', config.twitter.site);
    }
    if (config.twitter?.creator) {
      setMeta('meta[name="twitter:creator"]', config.twitter.creator);
    }
    if (config.schema) {
      const schemas = Array.isArray(config.schema) ? config.schema : [config.schema];
      const schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-headgear", "true");
      schemaScript.textContent = JSON.stringify(
        schemas.length === 1 ? schemas[0] : schemas
      );
      document.head.appendChild(schemaScript);
      cleanupFns.push(() => schemaScript.remove());
    }
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [
    config.title,
    config.description,
    config.canonical,
    config.noindex,
    config.keywords,
    config.og,
    config.twitter,
    config.schema
  ]);
}

// src/introspection/index.ts
var PRESET_DESCRIPTIONS = {
  "ecommerce.productPage": {
    required: ["name", "price", "currency"],
    optional: ["description", "image", "sku", "brand", "inStock", "rating", "reviewCount"],
    defaults: { currency: "USD", inStock: true },
    example: {
      name: "Widget Pro",
      price: 29.99,
      currency: "USD",
      description: "The best widget for professionals",
      image: "/products/widget.png"
    }
  },
  "ecommerce.categoryPage": {
    required: ["name"],
    optional: ["description", "image", "products"],
    defaults: {},
    example: {
      name: "Widgets",
      description: "Browse our collection of widgets"
    }
  },
  "blog.articlePage": {
    required: ["title", "author", "datePublished"],
    optional: ["description", "image", "tags", "dateModified"],
    defaults: {},
    example: {
      title: "How to Build SEO for SPAs",
      author: { name: "Jane Doe" },
      datePublished: "2025-01-15",
      image: "/blog/spa-seo.png"
    }
  },
  "blog.authorPage": {
    required: ["name"],
    optional: ["bio", "image", "url", "social"],
    defaults: {},
    example: {
      name: "Jane Doe",
      bio: "Software engineer and writer",
      image: "/authors/jane.png"
    }
  },
  "saas.landingPage": {
    required: ["title", "description"],
    optional: ["image", "features"],
    defaults: {},
    example: {
      title: "My SaaS App",
      description: "The best app for doing things"
    }
  },
  "saas.pricingPage": {
    required: ["title"],
    optional: ["description", "plans"],
    defaults: { title: "Pricing" },
    example: {
      title: "Pricing",
      plans: [
        { name: "Free", price: 0 },
        { name: "Pro", price: 29 }
      ]
    }
  }
};
function describe(presetName) {
  const description = PRESET_DESCRIPTIONS[presetName];
  if (!description) {
    const availablePresets = Object.keys(PRESET_DESCRIPTIONS);
    throw new Error(
      `Unknown preset: "${presetName}". Available presets: ${availablePresets.join(", ")}`
    );
  }
  return description;
}
function listPresets() {
  return Object.keys(PRESET_DESCRIPTIONS);
}
function validate(config) {
  const errors = [];
  const warnings = [];
  if (!config.title || config.title.trim() === "") {
    errors.push({
      field: "title",
      message: "Title is required",
      fix: 'Add title: "Your Page Title"'
    });
  } else if (config.title.length > 60) {
    warnings.push({
      field: "title",
      message: `Title is ${config.title.length} characters. Keep under 60 for full display in Google.`
    });
  }
  if (!config.description || config.description.trim() === "") {
    errors.push({
      field: "description",
      message: "Description is required",
      fix: 'Add description: "Your page description"'
    });
  } else if (config.description.length < 50) {
    warnings.push({
      field: "description",
      message: "Description is short. Aim for 120-160 characters for optimal display."
    });
  } else if (config.description.length > 160) {
    warnings.push({
      field: "description",
      message: `Description is ${config.description.length} characters. Keep under 160 to avoid truncation.`
    });
  }
  if (!config.canonical) {
    warnings.push({
      field: "canonical",
      message: "Canonical URL recommended for duplicate content handling"
    });
  }
  if (!config.og?.image) {
    warnings.push({
      field: "og.image",
      message: "OG image recommended for social sharing previews"
    });
  }
  if (config.schema) {
    const schemas = Array.isArray(config.schema) ? config.schema : [config.schema];
    schemas.forEach((schema, index) => {
      if (!schema["@context"]) {
        errors.push({
          field: `schema[${index}].@context`,
          message: "Schema missing @context",
          fix: "Use schema builders from react-headgear/schema which add @context automatically"
        });
      }
      if (!schema["@type"]) {
        errors.push({
          field: `schema[${index}].@type`,
          message: "Schema missing @type",
          fix: "Use schema builders from react-headgear/schema which add @type automatically"
        });
      }
      if (schema["@type"] === "Product") {
        const product = schema;
        if (!product.offers && !product.price) {
          warnings.push({
            field: `schema[${index}].offers`,
            message: "Product.offers recommended for Google rich results"
          });
        }
      }
    });
  }
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
function preview(config) {
  const meta = [];
  meta.push({ name: "title", content: config.title });
  meta.push({ name: "description", content: config.description });
  if (config.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }
  if (config.keywords && config.keywords.length > 0) {
    meta.push({ name: "keywords", content: config.keywords.join(", ") });
  }
  const ogTitle = config.og?.title || config.title;
  const ogDescription = config.og?.description || config.description;
  const ogType = config.og?.type || "website";
  meta.push({ property: "og:title", content: ogTitle });
  meta.push({ property: "og:description", content: ogDescription });
  meta.push({ property: "og:type", content: ogType });
  if (config.og?.url || config.canonical) {
    meta.push({ property: "og:url", content: config.og?.url || config.canonical });
  }
  if (config.og?.siteName) {
    meta.push({ property: "og:site_name", content: config.og.siteName });
  }
  meta.push({ name: "twitter:card", content: config.twitter?.card || "summary_large_image" });
  meta.push({ name: "twitter:title", content: ogTitle });
  meta.push({ name: "twitter:description", content: ogDescription });
  if (config.twitter?.site) {
    meta.push({ name: "twitter:site", content: config.twitter.site });
  }
  let ogImage = null;
  if (config.og?.image) {
    if (typeof config.og.image === "string") {
      ogImage = { url: config.og.image, width: 1200, height: 630 };
      meta.push({ property: "og:image", content: config.og.image });
      meta.push({ name: "twitter:image", content: config.og.image });
    } else {
      const url = `/og/${config.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      ogImage = {
        url,
        width: config.og.image.width || 1200,
        height: config.og.image.height || 630
      };
      meta.push({ property: "og:image", content: url });
      meta.push({ name: "twitter:image", content: url });
    }
  }
  let jsonLd = null;
  if (config.schema) {
    const schemas = Array.isArray(config.schema) ? config.schema : [config.schema];
    jsonLd = schemas.length === 1 ? schemas[0] : schemas;
  }
  return { meta, jsonLd, ogImage };
}

exports.describe = describe;
exports.listPresets = listPresets;
exports.preview = preview;
exports.useHeadgear = useHeadgear;
exports.validate = validate;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map