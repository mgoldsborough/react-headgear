/**
 * Schema builders for structured data.
 * These functions create valid JSON-LD schemas with proper @context and @type.
 */

import type {
  ProductSchema,
  ArticleSchema,
  OrganizationSchema,
  PersonSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  WebSiteSchema,
  OfferSchema,
  AggregateRatingSchema,
} from './types';

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
export function Product(props: {
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  brand?: string | { name: string };
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
  rating?: number;
  reviewCount?: number;
}): ProductSchema {
  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
  };

  if (props.description) schema.description = props.description;
  if (props.image) schema.image = props.image;
  if (props.sku) schema.sku = props.sku;

  if (props.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: typeof props.brand === 'string' ? props.brand : props.brand.name,
    };
  }

  if (props.price !== undefined) {
    const availability = props.availability
      ? (`https://schema.org/${props.availability}` as const)
      : undefined;

    schema.offers = {
      '@type': 'Offer',
      price: props.price,
      priceCurrency: props.currency || 'USD',
      ...(availability && { availability }),
    };
  }

  if (props.rating !== undefined && props.reviewCount !== undefined) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: props.rating,
      reviewCount: props.reviewCount,
    };
  }

  return schema;
}

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
export function Article(props: {
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string } | Array<{ name: string; url?: string }>;
  type?: 'Article' | 'BlogPosting' | 'NewsArticle';
}): ArticleSchema {
  const authors = Array.isArray(props.author) ? props.author : [props.author];

  const authorSchemas: PersonSchema[] = authors.map((a) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: a.name,
    ...(a.url && { url: a.url }),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': props.type || 'Article',
    headline: props.headline,
    ...(props.description && { description: props.description }),
    ...(props.image && { image: props.image }),
    datePublished: props.datePublished,
    ...(props.dateModified && { dateModified: props.dateModified }),
    author: authorSchemas.length === 1 ? authorSchemas[0] : authorSchemas,
  };
}

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
export function Organization(props: {
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: props.name,
    ...(props.url && { url: props.url }),
    ...(props.logo && { logo: props.logo }),
    ...(props.sameAs && { sameAs: props.sameAs }),
  };
}

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
export function Person(props: {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
}): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.name,
    ...(props.url && { url: props.url }),
    ...(props.image && { image: props.image }),
    ...(props.jobTitle && { jobTitle: props.jobTitle }),
  };
}

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
export function BreadcrumbList(
  items: Array<{ name: string; url?: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

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
export function FAQPage(
  items: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

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
export function WebSite(props: {
  name: string;
  url: string;
  searchUrl?: string;
}): WebSiteSchema {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: props.name,
    url: props.url,
  };

  if (props.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: props.searchUrl,
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

/**
 * Create an Offer schema (usually used within Product).
 */
export function Offer(props: {
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
  url?: string;
}): OfferSchema {
  const availability = props.availability
    ? (`https://schema.org/${props.availability}` as const)
    : undefined;

  return {
    '@type': 'Offer',
    price: props.price,
    priceCurrency: props.currency || 'USD',
    ...(availability && { availability }),
    ...(props.url && { url: props.url }),
  };
}
