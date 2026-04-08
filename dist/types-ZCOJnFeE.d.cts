/**
 * Schema.org type definitions for structured data.
 * Self-documenting with rich JSDoc for AI consumption.
 */
/**
 * Base schema with required JSON-LD properties.
 */
interface BaseSchema {
    '@context': 'https://schema.org';
    '@type': string;
}
/**
 * Union of all supported schema types.
 */
type Schema = ProductSchema | ArticleSchema | OrganizationSchema | BreadcrumbListSchema | FAQPageSchema | WebSiteSchema | PersonSchema;
/**
 * Product structured data for e-commerce.
 * Enables rich results in Google Shopping and search.
 * @see https://schema.org/Product
 * @see https://developers.google.com/search/docs/appearance/structured-data/product
 */
interface ProductSchema extends BaseSchema {
    '@type': 'Product';
    /**
     * Product name as it should appear in search results.
     * @example 'iPhone 15 Pro Max 256GB'
     */
    name: string;
    /**
     * Product description.
     * @example 'The most advanced iPhone ever with A17 Pro chip.'
     */
    description?: string;
    /**
     * URL to product image. Should be high quality (min 800x800).
     * @example 'https://example.com/iphone.jpg'
     */
    image?: string | string[];
    /**
     * Stock Keeping Unit identifier.
     * @example 'IPHONE-15-PRO-256-BLK'
     */
    sku?: string;
    /**
     * Manufacturer Part Number.
     */
    mpn?: string;
    /**
     * Global Trade Item Number (UPC, EAN, ISBN, etc).
     */
    gtin?: string;
    /**
     * Brand information.
     */
    brand?: {
        '@type': 'Brand' | 'Organization';
        name: string;
    };
    /**
     * Price and availability information. Required for rich results.
     */
    offers?: OfferSchema | OfferSchema[];
    /**
     * Aggregate rating from reviews.
     */
    aggregateRating?: AggregateRatingSchema;
    /**
     * Individual reviews.
     */
    review?: ReviewSchema[];
}
/**
 * Offer/pricing information for a product.
 * @see https://schema.org/Offer
 */
interface OfferSchema {
    '@type': 'Offer';
    /**
     * Price as a decimal number.
     * @example 999.99
     */
    price: number;
    /**
     * ISO 4217 currency code.
     * @example 'USD'
     */
    priceCurrency: string;
    /**
     * Availability status URL.
     * @example 'https://schema.org/InStock'
     */
    availability?: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock' | 'https://schema.org/PreOrder' | 'https://schema.org/BackOrder';
    /**
     * URL to purchase the item.
     */
    url?: string;
    /**
     * Date when the price becomes valid (ISO 8601).
     */
    priceValidUntil?: string;
}
/**
 * Aggregate rating from multiple reviews.
 */
interface AggregateRatingSchema {
    '@type': 'AggregateRating';
    /**
     * Average rating value.
     * @example 4.5
     */
    ratingValue: number;
    /**
     * Number of reviews.
     * @example 127
     */
    reviewCount: number;
    /**
     * Best possible rating.
     * @default 5
     */
    bestRating?: number;
    /**
     * Worst possible rating.
     * @default 1
     */
    worstRating?: number;
}
/**
 * Individual review.
 */
interface ReviewSchema {
    '@type': 'Review';
    author: {
        '@type': 'Person';
        name: string;
    };
    reviewRating: {
        '@type': 'Rating';
        ratingValue: number;
        bestRating?: number;
    };
    reviewBody?: string;
}
/**
 * Article structured data for blog posts and news.
 * @see https://schema.org/Article
 */
interface ArticleSchema extends BaseSchema {
    '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
    /**
     * Article headline. Keep under 110 characters.
     * @example 'How to Build SEO for React SPAs'
     */
    headline: string;
    /**
     * Article description or excerpt.
     */
    description?: string;
    /**
     * Featured image URL.
     */
    image?: string | string[];
    /**
     * Publication date (ISO 8601).
     * @example '2025-01-15T10:00:00Z'
     */
    datePublished: string;
    /**
     * Last modified date (ISO 8601).
     */
    dateModified?: string;
    /**
     * Article author(s).
     */
    author: PersonSchema | PersonSchema[];
    /**
     * Publishing organization.
     */
    publisher?: OrganizationSchema;
}
/**
 * Organization structured data.
 * @see https://schema.org/Organization
 */
interface OrganizationSchema extends BaseSchema {
    '@type': 'Organization';
    /**
     * Organization name.
     * @example 'NimbleBrain'
     */
    name: string;
    /**
     * Organization website URL.
     */
    url?: string;
    /**
     * Logo URL.
     */
    logo?: string;
    /**
     * Social media profile URLs.
     */
    sameAs?: string[];
}
/**
 * Person structured data.
 * @see https://schema.org/Person
 */
interface PersonSchema extends BaseSchema {
    '@type': 'Person';
    /**
     * Person's name.
     */
    name: string;
    /**
     * Person's website or profile URL.
     */
    url?: string;
    /**
     * Profile image URL.
     */
    image?: string;
    /**
     * Job title.
     */
    jobTitle?: string;
}
/**
 * Breadcrumb navigation for better search display.
 * @see https://schema.org/BreadcrumbList
 */
interface BreadcrumbListSchema extends BaseSchema {
    '@type': 'BreadcrumbList';
    /**
     * List of breadcrumb items in order.
     */
    itemListElement: BreadcrumbItemSchema[];
}
interface BreadcrumbItemSchema {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
}
/**
 * FAQ page structured data for rich results.
 * @see https://schema.org/FAQPage
 */
interface FAQPageSchema extends BaseSchema {
    '@type': 'FAQPage';
    /**
     * List of questions and answers.
     */
    mainEntity: QuestionSchema[];
}
interface QuestionSchema {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
        '@type': 'Answer';
        text: string;
    };
}
/**
 * Website structured data.
 * @see https://schema.org/WebSite
 */
interface WebSiteSchema extends BaseSchema {
    '@type': 'WebSite';
    /**
     * Website name.
     */
    name: string;
    /**
     * Website URL.
     */
    url: string;
    /**
     * Search action for sitelinks search box.
     */
    potentialAction?: {
        '@type': 'SearchAction';
        target: string;
        'query-input': string;
    };
}

export type { ArticleSchema as A, BreadcrumbListSchema as B, FAQPageSchema as F, OrganizationSchema as O, ProductSchema as P, QuestionSchema as Q, ReviewSchema as R, Schema as S, WebSiteSchema as W, PersonSchema as a, OfferSchema as b, BaseSchema as c, AggregateRatingSchema as d, BreadcrumbItemSchema as e };
