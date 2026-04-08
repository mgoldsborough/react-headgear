# react-headgear

> The AI-native SEO library for React. Gear up your document head.

[![npm version](https://img.shields.io/npm/v/react-headgear.svg)](https://www.npmjs.com/package/react-headgear)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**react-headgear** is a modern SEO library for React SPAs with:

- **Self-documenting types** - Rich JSDoc that AI agents can read
- **Introspection API** - `describe()`, `validate()`, `preview()` for programmatic discovery
- **Schema builders** - Typed JSON-LD generation for structured data
- **Zero dependencies** - Just React as a peer dependency

## Installation

```bash
npm install react-headgear
```

## Quick Start

```typescript
import { useHeadgear } from 'react-headgear';
import { Product } from 'react-headgear/schema';

function ProductPage({ product }) {
  useHeadgear({
    title: `${product.name} | My Store`,
    description: product.description,
    canonical: `https://mystore.com/products/${product.slug}`,
    og: {
      type: 'product',
      image: product.image,
    },
    schema: Product({
      name: product.name,
      price: product.price,
      currency: 'USD',
      image: product.image,
    }),
  });

  return <div>{/* Your component */}</div>;
}
```

## Features

### Meta Tags & Open Graph

```typescript
useHeadgear({
  title: 'Page Title',
  description: 'Page description for search results',
  canonical: 'https://example.com/page',
  noindex: false,
  keywords: ['react', 'seo'],
  og: {
    type: 'website',
    image: '/og-image.png',
    siteName: 'My Site',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myhandle',
  },
});
```

### Structured Data (JSON-LD)

```typescript
import { Product, Article, BreadcrumbList, FAQPage } from 'react-headgear/schema';

// Product
Product({
  name: 'Widget Pro',
  price: 29.99,
  currency: 'USD',
  brand: 'Acme',
  image: '/widget.png',
});

// Article
Article({
  headline: 'How to Use react-headgear',
  datePublished: '2025-01-15',
  author: { name: 'Jane Doe' },
});

// Breadcrumbs
BreadcrumbList([
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'Widget Pro' },
]);

// FAQ
FAQPage([
  { question: 'What is react-headgear?', answer: 'An AI-native SEO library.' },
]);
```

### Introspection API

For AI agents and programmatic use:

```typescript
import { describe, validate, preview, listPresets } from 'react-headgear';

// Discover preset requirements
const spec = describe('ecommerce.productPage');
// { required: ['name', 'price'], optional: [...], example: {...} }

// Validate config before applying
const result = validate(config);
// { valid: false, errors: [...], warnings: [...] }

// Preview output without side effects
const output = preview(config);
// { meta: [...], jsonLd: {...}, ogImage: {...} }

// List all presets
const presets = listPresets();
// ['ecommerce.productPage', 'blog.articlePage', ...]
```

## API Reference

### `useHeadgear(config)`

React hook that manages document head metadata.

### `describe(presetName)`

Get requirements for a preset. Returns `{ required, optional, defaults, example }`.

### `validate(config)`

Validate a config. Returns `{ valid, errors, warnings }`.

### `preview(config)`

Preview output without side effects. Returns `{ meta, jsonLd, ogImage }`.

## Schema Builders

| Builder | Use Case |
|---------|----------|
| `Product()` | E-commerce products |
| `Article()` | Blog posts, news |
| `Organization()` | Company info |
| `Person()` | Author profiles |
| `BreadcrumbList()` | Navigation breadcrumbs |
| `FAQPage()` | FAQ sections |
| `WebSite()` | Site-wide metadata |

## Why react-headgear?

- **Not just another helmet** - Built with AI agents in mind
- **Typed structured data** - Schema builders with full TypeScript support
- **Validation included** - Catch SEO mistakes before deploy
- **Framework agnostic** - Works with any React setup (Vite, CRA, etc.)

## License

MIT
