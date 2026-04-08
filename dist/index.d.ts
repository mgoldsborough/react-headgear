import { H as HeadgearConfig, P as PresetDescription, V as ValidationResult, a as HeadgearPreview } from './types-2hK7z4YT.js';
export { O as OGConfig, b as OGImageConfig, T as TwitterConfig, c as ValidationError, d as ValidationWarning } from './types-2hK7z4YT.js';
export { S as Schema } from './types-ZCOJnFeE.js';

/**
 * React hook for managing document head SEO metadata.
 *
 * Updates meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 * Cleans up dynamically added elements on unmount.
 *
 * @example
 * ```typescript
 * import { useHeadgear } from 'react-headgear';
 * import { Product } from 'react-headgear/schema';
 *
 * function ProductPage({ product }) {
 *   useHeadgear({
 *     title: `${product.name} | My Store`,
 *     description: product.description,
 *     canonical: `https://mystore.com/products/${product.slug}`,
 *     schema: Product({
 *       name: product.name,
 *       price: product.price,
 *       currency: 'USD',
 *     }),
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
declare function useHeadgear(config: HeadgearConfig): void;

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
declare function describe(presetName: string): PresetDescription;
/**
 * List all available presets.
 *
 * @returns Array of preset names
 */
declare function listPresets(): string[];
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
declare function validate(config: HeadgearConfig): ValidationResult;
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
declare function preview(config: HeadgearConfig): HeadgearPreview;

export { HeadgearConfig, HeadgearPreview, PresetDescription, ValidationResult, describe, listPresets, preview, useHeadgear, validate };
