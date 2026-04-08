/**
 * OG Image generation utilities.
 * Build-time generation coming in future versions.
 *
 * @module react-headgear/og
 */

import type { OGImageConfig } from '../types';

/**
 * Define an OG image configuration.
 * In future versions, this will be used for build-time generation.
 *
 * @example
 * ```typescript
 * import { ogImage } from 'react-headgear/og';
 *
 * const image = ogImage({
 *   template: 'product',
 *   props: {
 *     title: 'Widget Pro',
 *     price: '$29.99',
 *     image: '/widget.png',
 *   },
 * });
 * ```
 */
export function ogImage(config: OGImageConfig): OGImageConfig {
  return {
    width: 1200,
    height: 630,
    ...config,
  };
}

/**
 * Available built-in templates.
 */
export const templates = {
  simple: 'simple',
  product: 'product',
  article: 'article',
  profile: 'profile',
} as const;

export type TemplateName = keyof typeof templates;
