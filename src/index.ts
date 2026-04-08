/**
 * react-headgear - The AI-native SEO library for React
 *
 * Gear up your document head with intent-based API, self-documenting types,
 * and introspection for AI agents.
 *
 * @example
 * ```typescript
 * import { useHeadgear, describe, validate, preview } from 'react-headgear';
 * import { Product, BreadcrumbList } from 'react-headgear/schema';
 *
 * function ProductPage({ product }) {
 *   useHeadgear({
 *     title: `${product.name} | My Store`,
 *     description: product.description,
 *     canonical: `https://mystore.com/products/${product.slug}`,
 *     schema: [
 *       Product({ name: product.name, price: product.price }),
 *       BreadcrumbList([
 *         { name: 'Home', url: '/' },
 *         { name: 'Products', url: '/products' },
 *         { name: product.name },
 *       ]),
 *     ],
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 *
 * @packageDocumentation
 */

// Core hook
export { useHeadgear } from './useHeadgear';

// Introspection API for AI agents
export { describe, validate, preview, listPresets } from './introspection';

// Types
export type {
  HeadgearConfig,
  OGConfig,
  TwitterConfig,
  OGImageConfig,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  PresetDescription,
  HeadgearPreview,
} from './types';

// Re-export schema types for convenience
export type { Schema } from './schema/types';
