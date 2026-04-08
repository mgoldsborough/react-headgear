import { S as Schema } from './types-ZCOJnFeE.js';

/**
 * Core types for react-headgear
 * Self-documenting types with rich JSDoc for AI consumption
 */

/**
 * Open Graph type for the page.
 * @see https://ogp.me/#types
 */
type OGType = 'website' | 'article' | 'product' | 'profile';
/**
 * Configuration for OG image generation.
 */
interface OGImageConfig {
    /**
     * Built-in template name or custom template function.
     * @example 'product'
     * @example 'article'
     */
    template: 'simple' | 'product' | 'article' | 'profile';
    /**
     * Props passed to the template.
     */
    props: Record<string, unknown>;
    /**
     * Image width in pixels.
     * @default 1200
     */
    width?: number;
    /**
     * Image height in pixels.
     * @default 630
     */
    height?: number;
}
/**
 * Open Graph configuration.
 */
interface OGConfig {
    /**
     * OG title. Falls back to page title if not specified.
     */
    title?: string;
    /**
     * OG description. Falls back to page description if not specified.
     */
    description?: string;
    /**
     * OG content type.
     * @default 'website'
     */
    type?: OGType;
    /**
     * OG image URL or generation config.
     */
    image?: string | OGImageConfig;
    /**
     * Canonical URL for this page.
     */
    url?: string;
    /**
     * Site name shown in social cards.
     */
    siteName?: string;
}
/**
 * Twitter Card configuration.
 */
interface TwitterConfig {
    /**
     * Card type.
     * @default 'summary_large_image'
     */
    card?: 'summary' | 'summary_large_image';
    /**
     * Twitter @handle of the site.
     * @example '@nimblebrain'
     */
    site?: string;
    /**
     * Twitter @handle of the content creator.
     */
    creator?: string;
}
/**
 * Main headgear configuration.
 * Pass this to useHeadgear() to set all SEO metadata.
 */
interface HeadgearConfig {
    /**
     * Page title. Appears in browser tab and search results.
     * Keep under 60 characters for full display in Google.
     * @example 'Widget Pro - Best Widgets | My Store'
     */
    title: string;
    /**
     * Page description. Appears in search result snippets.
     * Keep between 120-160 characters for optimal display.
     * @example 'Discover Widget Pro, the most advanced widget for professionals.'
     */
    description: string;
    /**
     * Canonical URL for this page. Used for duplicate content handling.
     * Should be the full absolute URL.
     * @example 'https://mystore.com/products/widget-pro'
     */
    canonical?: string;
    /**
     * Set to true to prevent search engines from indexing this page.
     * @default false
     */
    noindex?: boolean;
    /**
     * Open Graph configuration for social sharing.
     */
    og?: OGConfig;
    /**
     * Twitter Card configuration.
     */
    twitter?: TwitterConfig;
    /**
     * Structured data schemas (JSON-LD).
     * Use schema builders from 'react-headgear/schema'.
     * @example [Product({ name: 'Widget', price: 29.99 })]
     */
    schema?: Schema | Schema[];
    /**
     * Additional keywords for meta keywords tag.
     * Note: Google ignores this, but other engines may use it.
     */
    keywords?: string[];
}
/**
 * Result of validating a headgear config.
 */
interface ValidationResult {
    /**
     * Whether the config is valid.
     */
    valid: boolean;
    /**
     * Errors that must be fixed.
     */
    errors: ValidationError[];
    /**
     * Warnings about best practices.
     */
    warnings: ValidationWarning[];
}
interface ValidationError {
    /**
     * Field path that has the error.
     * @example 'schema.price'
     */
    field: string;
    /**
     * Human-readable error message.
     */
    message: string;
    /**
     * Suggested fix.
     */
    fix?: string;
}
interface ValidationWarning {
    /**
     * Field path that triggered the warning.
     */
    field: string;
    /**
     * Human-readable warning message.
     */
    message: string;
}
/**
 * Description of a preset's requirements.
 */
interface PresetDescription {
    /**
     * Required fields for this preset.
     */
    required: string[];
    /**
     * Optional fields for this preset.
     */
    optional: string[];
    /**
     * Default values applied by this preset.
     */
    defaults: Record<string, unknown>;
    /**
     * Example usage.
     */
    example: Record<string, unknown>;
}
/**
 * Preview of what headgear will generate.
 */
interface HeadgearPreview {
    /**
     * Meta tags that will be set.
     */
    meta: Array<{
        name?: string;
        property?: string;
        content: string;
    }>;
    /**
     * JSON-LD structured data.
     */
    jsonLd: unknown;
    /**
     * OG image configuration.
     */
    ogImage: {
        url: string;
        width: number;
        height: number;
    } | null;
}

export type { HeadgearConfig as H, OGConfig as O, PresetDescription as P, TwitterConfig as T, ValidationResult as V, HeadgearPreview as a, OGImageConfig as b, ValidationError as c, ValidationWarning as d };
