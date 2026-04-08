/**
 * Introspection API for AI agents.
 * Allows AI to discover requirements, validate configs, and preview output.
 *
 * @example
 * ```typescript
 * import { describe, validate, preview } from 'react-headgear';
 *
 * // Discover what's needed
 * const spec = describe('ecommerce.productPage');
 *
 * // Validate before applying
 * const result = validate(config);
 *
 * // Preview output without side effects
 * const output = preview(config);
 * ```
 */

import type {
  HeadgearConfig,
  PresetDescription,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  HeadgearPreview,
} from '../types';

/**
 * Preset descriptions for AI discoverability.
 */
const PRESET_DESCRIPTIONS: Record<string, PresetDescription> = {
  'ecommerce.productPage': {
    required: ['name', 'price', 'currency'],
    optional: ['description', 'image', 'sku', 'brand', 'inStock', 'rating', 'reviewCount'],
    defaults: { currency: 'USD', inStock: true },
    example: {
      name: 'Widget Pro',
      price: 29.99,
      currency: 'USD',
      description: 'The best widget for professionals',
      image: '/products/widget.png',
    },
  },
  'ecommerce.categoryPage': {
    required: ['name'],
    optional: ['description', 'image', 'products'],
    defaults: {},
    example: {
      name: 'Widgets',
      description: 'Browse our collection of widgets',
    },
  },
  'blog.articlePage': {
    required: ['title', 'author', 'datePublished'],
    optional: ['description', 'image', 'tags', 'dateModified'],
    defaults: {},
    example: {
      title: 'How to Build SEO for SPAs',
      author: { name: 'Jane Doe' },
      datePublished: '2025-01-15',
      image: '/blog/spa-seo.png',
    },
  },
  'blog.authorPage': {
    required: ['name'],
    optional: ['bio', 'image', 'url', 'social'],
    defaults: {},
    example: {
      name: 'Jane Doe',
      bio: 'Software engineer and writer',
      image: '/authors/jane.png',
    },
  },
  'saas.landingPage': {
    required: ['title', 'description'],
    optional: ['image', 'features'],
    defaults: {},
    example: {
      title: 'My SaaS App',
      description: 'The best app for doing things',
    },
  },
  'saas.pricingPage': {
    required: ['title'],
    optional: ['description', 'plans'],
    defaults: { title: 'Pricing' },
    example: {
      title: 'Pricing',
      plans: [
        { name: 'Free', price: 0 },
        { name: 'Pro', price: 29 },
      ],
    },
  },
};

/**
 * Describe a preset's requirements.
 * AI can use this to discover what fields are needed.
 *
 * @param presetName - Preset name like 'ecommerce.productPage' or 'blog.articlePage'
 * @returns Description of required/optional fields, defaults, and example
 *
 * @example
 * ```typescript
 * const spec = describe('ecommerce.productPage');
 * // {
 * //   required: ['name', 'price', 'currency'],
 * //   optional: ['description', 'image', 'sku', ...],
 * //   defaults: { currency: 'USD' },
 * //   example: { name: 'Widget', price: 29.99 }
 * // }
 * ```
 */
export function describe(presetName: string): PresetDescription {
  const description = PRESET_DESCRIPTIONS[presetName];

  if (!description) {
    const availablePresets = Object.keys(PRESET_DESCRIPTIONS);
    throw new Error(
      `Unknown preset: "${presetName}". ` +
        `Available presets: ${availablePresets.join(', ')}`
    );
  }

  return description;
}

/**
 * List all available presets.
 *
 * @returns Array of preset names
 */
export function listPresets(): string[] {
  return Object.keys(PRESET_DESCRIPTIONS);
}

/**
 * Validate a headgear config and return actionable errors.
 * AI can use this to check configs before applying.
 *
 * @param config - Headgear configuration to validate
 * @returns Validation result with errors and warnings
 *
 * @example
 * ```typescript
 * const result = validate({
 *   title: 'Widget Pro',
 *   description: '', // Too short!
 * });
 * // {
 * //   valid: false,
 * //   errors: [{ field: 'description', message: 'Required', fix: 'Add a description' }],
 * //   warnings: [{ field: 'og.image', message: 'Recommended for social sharing' }]
 * // }
 * ```
 */
export function validate(config: HeadgearConfig): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Required: title
  if (!config.title || config.title.trim() === '') {
    errors.push({
      field: 'title',
      message: 'Title is required',
      fix: 'Add title: "Your Page Title"',
    });
  } else if (config.title.length > 60) {
    warnings.push({
      field: 'title',
      message: `Title is ${config.title.length} characters. Keep under 60 for full display in Google.`,
    });
  }

  // Required: description
  if (!config.description || config.description.trim() === '') {
    errors.push({
      field: 'description',
      message: 'Description is required',
      fix: 'Add description: "Your page description"',
    });
  } else if (config.description.length < 50) {
    warnings.push({
      field: 'description',
      message: 'Description is short. Aim for 120-160 characters for optimal display.',
    });
  } else if (config.description.length > 160) {
    warnings.push({
      field: 'description',
      message: `Description is ${config.description.length} characters. Keep under 160 to avoid truncation.`,
    });
  }

  // Recommended: canonical
  if (!config.canonical) {
    warnings.push({
      field: 'canonical',
      message: 'Canonical URL recommended for duplicate content handling',
    });
  }

  // Recommended: og.image
  if (!config.og?.image) {
    warnings.push({
      field: 'og.image',
      message: 'OG image recommended for social sharing previews',
    });
  }

  // Validate schema if present
  if (config.schema) {
    const schemas = Array.isArray(config.schema) ? config.schema : [config.schema];

    schemas.forEach((schema, index) => {
      if (!schema['@context']) {
        errors.push({
          field: `schema[${index}].@context`,
          message: 'Schema missing @context',
          fix: 'Use schema builders from react-headgear/schema which add @context automatically',
        });
      }

      if (!schema['@type']) {
        errors.push({
          field: `schema[${index}].@type`,
          message: 'Schema missing @type',
          fix: 'Use schema builders from react-headgear/schema which add @type automatically',
        });
      }

      // Product-specific validation
      if (schema['@type'] === 'Product') {
        const product = schema as any;
        if (!product.offers && !product.price) {
          warnings.push({
            field: `schema[${index}].offers`,
            message: 'Product.offers recommended for Google rich results',
          });
        }
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Preview what headgear will generate without applying it.
 * AI can use this to inspect output before side effects.
 *
 * @param config - Headgear configuration to preview
 * @returns Preview of meta tags, JSON-LD, and OG image
 *
 * @example
 * ```typescript
 * const output = preview({
 *   title: 'Widget Pro',
 *   description: 'The best widget',
 * });
 * // {
 * //   meta: [
 * //     { name: 'title', content: 'Widget Pro' },
 * //     { name: 'description', content: 'The best widget' },
 * //     ...
 * //   ],
 * //   jsonLd: null,
 * //   ogImage: null
 * // }
 * ```
 */
export function preview(config: HeadgearConfig): HeadgearPreview {
  const meta: HeadgearPreview['meta'] = [];

  // Title (as meta for completeness)
  meta.push({ name: 'title', content: config.title });

  // Description
  meta.push({ name: 'description', content: config.description });

  // Robots
  if (config.noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' });
  }

  // Keywords
  if (config.keywords && config.keywords.length > 0) {
    meta.push({ name: 'keywords', content: config.keywords.join(', ') });
  }

  // Open Graph
  const ogTitle = config.og?.title || config.title;
  const ogDescription = config.og?.description || config.description;
  const ogType = config.og?.type || 'website';

  meta.push({ property: 'og:title', content: ogTitle });
  meta.push({ property: 'og:description', content: ogDescription });
  meta.push({ property: 'og:type', content: ogType });

  if (config.og?.url || config.canonical) {
    meta.push({ property: 'og:url', content: config.og?.url || config.canonical! });
  }

  if (config.og?.siteName) {
    meta.push({ property: 'og:site_name', content: config.og.siteName });
  }

  // Twitter
  meta.push({ name: 'twitter:card', content: config.twitter?.card || 'summary_large_image' });
  meta.push({ name: 'twitter:title', content: ogTitle });
  meta.push({ name: 'twitter:description', content: ogDescription });

  if (config.twitter?.site) {
    meta.push({ name: 'twitter:site', content: config.twitter.site });
  }

  // OG Image
  let ogImage: HeadgearPreview['ogImage'] = null;
  if (config.og?.image) {
    if (typeof config.og.image === 'string') {
      ogImage = { url: config.og.image, width: 1200, height: 630 };
      meta.push({ property: 'og:image', content: config.og.image });
      meta.push({ name: 'twitter:image', content: config.og.image });
    } else {
      const url = `/og/${config.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      ogImage = {
        url,
        width: config.og.image.width || 1200,
        height: config.og.image.height || 630,
      };
      meta.push({ property: 'og:image', content: url });
      meta.push({ name: 'twitter:image', content: url });
    }
  }

  // JSON-LD
  let jsonLd: HeadgearPreview['jsonLd'] = null;
  if (config.schema) {
    const schemas = Array.isArray(config.schema) ? config.schema : [config.schema];
    jsonLd = schemas.length === 1 ? schemas[0] : schemas;
  }

  return { meta, jsonLd, ogImage };
}
