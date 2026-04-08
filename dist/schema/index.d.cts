import { P as ProductSchema, A as ArticleSchema, O as OrganizationSchema, a as PersonSchema, B as BreadcrumbListSchema, F as FAQPageSchema, W as WebSiteSchema, b as OfferSchema } from '../types-ZCOJnFeE.cjs';
export { d as AggregateRatingSchema, c as BaseSchema, e as BreadcrumbItemSchema, Q as QuestionSchema, R as ReviewSchema, S as Schema } from '../types-ZCOJnFeE.cjs';

/**
 * Schema builders for structured data.
 * These functions create valid JSON-LD schemas with proper @context and @type.
 */

/**
 * Create a Product schema for e-commerce pages.
 * Enables rich results in Google Shopping and search.
 *
 * @example
 * ```typescript
 * Product({
 *   name: 'Widget Pro',
 *   description: 'The best widget',
 *   price: 29.99,
 *   currency: 'USD',
 *   image: '/widget.png',
 * })
 * ```
 */
declare function Product(props: {
    name: string;
    description?: string;
    image?: string | string[];
    sku?: string;
    brand?: string | {
        name: string;
    };
    price?: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
    rating?: number;
    reviewCount?: number;
}): ProductSchema;
/**
 * Create an Article schema for blog posts and news.
 *
 * @example
 * ```typescript
 * Article({
 *   headline: 'How to Build SEO for SPAs',
 *   author: { name: 'Jane Doe' },
 *   datePublished: '2025-01-15',
 *   image: '/blog/spa-seo.png',
 * })
 * ```
 */
declare function Article(props: {
    headline: string;
    description?: string;
    image?: string | string[];
    datePublished: string;
    dateModified?: string;
    author: {
        name: string;
        url?: string;
    } | Array<{
        name: string;
        url?: string;
    }>;
    type?: 'Article' | 'BlogPosting' | 'NewsArticle';
}): ArticleSchema;
/**
 * Create an Organization schema.
 *
 * @example
 * ```typescript
 * Organization({
 *   name: 'NimbleBrain',
 *   url: 'https://nimblebrain.ai',
 *   logo: 'https://nimblebrain.ai/logo.png',
 * })
 * ```
 */
declare function Organization(props: {
    name: string;
    url?: string;
    logo?: string;
    sameAs?: string[];
}): OrganizationSchema;
/**
 * Create a Person schema.
 *
 * @example
 * ```typescript
 * Person({
 *   name: 'Jane Doe',
 *   url: 'https://janedoe.com',
 *   jobTitle: 'Software Engineer',
 * })
 * ```
 */
declare function Person(props: {
    name: string;
    url?: string;
    image?: string;
    jobTitle?: string;
}): PersonSchema;
/**
 * Create a BreadcrumbList schema for navigation.
 *
 * @example
 * ```typescript
 * BreadcrumbList([
 *   { name: 'Home', url: '/' },
 *   { name: 'Products', url: '/products' },
 *   { name: 'Widget Pro' },
 * ])
 * ```
 */
declare function BreadcrumbList(items: Array<{
    name: string;
    url?: string;
}>): BreadcrumbListSchema;
/**
 * Create a FAQPage schema for FAQ sections.
 *
 * @example
 * ```typescript
 * FAQPage([
 *   { question: 'What is react-headgear?', answer: 'An AI-native SEO library.' },
 *   { question: 'How do I install it?', answer: 'npm install react-headgear' },
 * ])
 * ```
 */
declare function FAQPage(items: Array<{
    question: string;
    answer: string;
}>): FAQPageSchema;
/**
 * Create a WebSite schema.
 *
 * @example
 * ```typescript
 * WebSite({
 *   name: 'My Site',
 *   url: 'https://mysite.com',
 * })
 * ```
 */
declare function WebSite(props: {
    name: string;
    url: string;
    searchUrl?: string;
}): WebSiteSchema;
/**
 * Create an Offer schema (usually used within Product).
 */
declare function Offer(props: {
    price: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
    url?: string;
}): OfferSchema;

export { Article, ArticleSchema, BreadcrumbList, BreadcrumbListSchema, FAQPage, FAQPageSchema, Offer, OfferSchema, Organization, OrganizationSchema, Person, PersonSchema, Product, ProductSchema, WebSite, WebSiteSchema };
