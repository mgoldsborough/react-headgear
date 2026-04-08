# react-headgear

SEO for React SPAs. Meta tags, structured data, OG images.

## Quick Start

```typescript
import { useHeadgear } from 'react-headgear';
import { Product, BreadcrumbList } from 'react-headgear/schema';

// In your component
useHeadgear({
  title: 'Widget Pro | My Store',
  description: 'The best widget for professionals',
  canonical: 'https://mystore.com/products/widget-pro',
  schema: Product({
    name: 'Widget Pro',
    price: 29.99,
    currency: 'USD',
  }),
});
```

## Available Schema Builders

```typescript
import { Product, Article, Organization, Person, BreadcrumbList, FAQPage, WebSite } from 'react-headgear/schema';

Product({ name, price, currency, description?, image?, sku?, brand? })
Article({ headline, datePublished, author, description?, image? })
Organization({ name, url?, logo? })
Person({ name, url?, image?, jobTitle? })
BreadcrumbList([{ name, url? }, ...])
FAQPage([{ question, answer }, ...])
WebSite({ name, url })
```

## Introspection API (for validation)

```typescript
import { describe, validate, preview, listPresets } from 'react-headgear';

describe('ecommerce.productPage')  // What fields are needed?
validate(config)                    // Is this config valid?
preview(config)                     // What will be generated?
listPresets()                       // What presets exist?
```

## HeadgearConfig Type

```typescript
interface HeadgearConfig {
  title: string;           // Required. Page title.
  description: string;     // Required. Meta description.
  canonical?: string;      // Canonical URL.
  noindex?: boolean;       // Prevent indexing.
  keywords?: string[];     // Meta keywords.
  og?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article' | 'product';
    image?: string;
    url?: string;
    siteName?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    site?: string;
    creator?: string;
  };
  schema?: Schema | Schema[];
}
```

## Examples

### E-commerce Product Page

```typescript
useHeadgear({
  title: 'iPhone 15 Pro | Apple Store',
  description: 'The most advanced iPhone ever.',
  canonical: 'https://apple.com/shop/iphone-15-pro',
  og: { type: 'product', image: '/iphone.png' },
  schema: Product({
    name: 'iPhone 15 Pro',
    price: 999,
    currency: 'USD',
    brand: 'Apple',
    image: '/iphone.png',
  }),
});
```

### Blog Article

```typescript
useHeadgear({
  title: 'How to Build SEO for SPAs',
  description: 'A complete guide to SPA SEO.',
  canonical: 'https://blog.com/spa-seo',
  og: { type: 'article', image: '/spa-seo.png' },
  schema: Article({
    headline: 'How to Build SEO for SPAs',
    datePublished: '2025-01-15',
    author: { name: 'Jane Doe' },
  }),
});
```

### With Breadcrumbs

```typescript
useHeadgear({
  title: 'Widget Pro',
  description: 'The best widget',
  schema: [
    Product({ name: 'Widget Pro', price: 29.99 }),
    BreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: 'Widget Pro' },
    ]),
  ],
});
```
