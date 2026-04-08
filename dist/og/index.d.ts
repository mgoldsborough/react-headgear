import { b as OGImageConfig } from '../types-2hK7z4YT.js';
import '../types-ZCOJnFeE.js';

/**
 * OG Image generation utilities.
 * Build-time generation coming in future versions.
 *
 * @module react-headgear/og
 */

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
declare function ogImage(config: OGImageConfig): OGImageConfig;
/**
 * Available built-in templates.
 */
declare const templates: {
    readonly simple: "simple";
    readonly product: "product";
    readonly article: "article";
    readonly profile: "profile";
};
type TemplateName = keyof typeof templates;

export { type TemplateName, ogImage, templates };
